"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("../services/app.service");
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const translate_1 = require("@google-cloud/translate");
const translate = new translate_1.v2.Translate();
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getUsers() {
        return [
            { id: '1', name: 'Nguyen Van A', email: 'a@example.com' },
            { id: '2', name: 'Tran Thi B', email: 'b@example.com' },
            { id: '3', name: 'Le Van C', email: 'c@example.com' },
        ];
    }
    async detectVoice(file, req) {
        if (!(0, fs_1.existsSync)('./tmp')) {
            await (0, promises_1.mkdir)('./tmp');
        }
        const tempPath = `./tmp/${Date.now()}_${file.originalname}`;
        await (0, promises_1.writeFile)(tempPath, file.buffer);
        const python = (0, child_process_1.spawn)('python3', ['detect_voice.py', tempPath]);
        let output = '';
        for await (const chunk of python.stdout) {
            output += chunk;
        }
        await new Promise((resolve) => python.on('close', resolve));
        await (0, promises_1.unlink)(tempPath);
        try {
            const data = JSON.parse(output.trim());
            return {
                text: data.text || '',
                segments: data.segments || [],
                language: data.language || 'unknown',
            };
        }
        catch {
            return { text: output.trim(), segments: [], language: 'unknown' };
        }
    }
    async translateText(req) {
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
        }
        catch (err) {
            return { error: 'Translate failed', detail: err?.message };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('detect-voice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "detectVoice", null);
__decorate([
    (0, common_1.Post)('translate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "translateText", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map