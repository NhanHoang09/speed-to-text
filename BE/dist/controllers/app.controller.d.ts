import type { Multer } from 'multer';
import { AppService } from '../services/app.service';
import type { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getUsers(): {
        id: string;
        name: string;
        email: string;
    }[];
    detectVoice(file: Multer.File, req: Request): Promise<{
        text: any;
        segments: any;
        language: any;
    }>;
    translateText(req: Request): Promise<{
        error: string;
        translatedText?: undefined;
        detail?: undefined;
    } | {
        translatedText: string;
        error?: undefined;
        detail?: undefined;
    } | {
        error: string;
        detail: any;
        translatedText?: undefined;
    }>;
}
