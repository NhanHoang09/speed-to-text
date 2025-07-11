import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { AppService } from '../services/app.service';
import { spawn } from 'child_process';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import type { Request } from 'express';
import { v2 as Translate } from '@google-cloud/translate';

const translate = new Translate.Translate();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers() {
    return [
      { id: '1', name: 'Nguyen Van A', email: 'a@example.com' },
      { id: '2', name: 'Tran Thi B', email: 'b@example.com' },
      { id: '3', name: 'Le Van C', email: 'c@example.com' },
    ];
  }

  @Post('detect-voice')
  @UseInterceptors(FileInterceptor('file'))
  async detectVoice(@UploadedFile() file: Multer.File, @Req() req: Request) {
    // Đảm bảo thư mục tmp tồn tại
    if (!existsSync('./tmp')) {
      await mkdir('./tmp');
    }
    // Lưu file tạm
    const tempPath = `./tmp/${Date.now()}_${file.originalname}`;
    await writeFile(tempPath, file.buffer);

    // Không truyền lang nữa
    const python = spawn('python3', ['detect_voice.py', tempPath]);
    let output = '';
    for await (const chunk of python.stdout) {
      output += chunk;
    }
    await new Promise((resolve) => python.on('close', resolve));
    await unlink(tempPath);

    try {
      const data = JSON.parse(output.trim());
      return {
        text: data.text || '',
        segments: data.segments || [],
        language: data.language || 'unknown',
      };
    } catch {
      return { text: output.trim(), segments: [], language: 'unknown' };
    }
  }

  @Post('translate')
  async translateText(@Req() req: Request) {
    const { text, sourceLang, targetLang } = req.body;
    if (!text || !sourceLang || !targetLang) {
      return { error: 'Missing params' };
    }
    try {
      const [translated] = await translate.translate(text, {
        from: sourceLang,
        to: targetLang,
      });
      return {
        translatedText: Array.isArray(translated)
          ? translated.join('\n')
          : translated,
      };
    } catch (err) {
      return { error: 'Translate failed', detail: err?.message };
    }
  }
}
