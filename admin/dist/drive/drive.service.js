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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let DriveService = class DriveService {
    drive;
    constructor() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: 'src/config/credentials.json',
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        this.drive = googleapis_1.google.drive({
            version: 'v3',
            auth,
        });
    }
    async listPDFs() {
        try {
            const response = await this.drive.files.list({
                q: "mimeType='application/pdf'",
                fields: 'files(id,name)'
            });
            return response.data.files;
        }
        catch (error) {
            console.error("Drive API Error:", error);
            throw error;
        }
    }
    async downloadPDF(fileId, fileName) {
        const filePath = path.join(process.cwd(), 'src/uploads', fileName);
        const dest = fs.createWriteStream(filePath);
        const response = await this.drive.files.get({
            fileId,
            alt: 'media',
        }, {
            responseType: 'stream',
        });
        return new Promise((resolve, reject) => {
            response.data
                .pipe(dest)
                .on('finish', () => {
                console.log("PDF downloaded:", fileName);
                resolve(filePath);
            })
                .on('error', reject);
        });
    }
};
exports.DriveService = DriveService;
exports.DriveService = DriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DriveService);
//# sourceMappingURL=drive.service.js.map