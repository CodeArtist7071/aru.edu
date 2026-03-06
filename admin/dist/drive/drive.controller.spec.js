"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const drive_controller_1 = require("./drive.controller");
describe('DriveController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [drive_controller_1.DriveController],
        }).compile();
        controller = module.get(drive_controller_1.DriveController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=drive.controller.spec.js.map