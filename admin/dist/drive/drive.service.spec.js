"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const drive_service_1 = require("./drive.service");
describe('DriveService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [drive_service_1.DriveService],
        }).compile();
        service = module.get(drive_service_1.DriveService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=drive.service.spec.js.map