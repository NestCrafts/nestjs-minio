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
exports.NestMinioClientController = void 0;
/**
 *  NestMinioClientController is a testing controller that verifies that
 *  NestMinioModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestMinioModule`.
 *
 *  Once you begin customizing NestMinioModule, you'll probably want
 *  to delete this controller.
 */
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let NestMinioClientController = /** @class */ (() => {
    let NestMinioClientController = class NestMinioClientController {
        constructor(minioClient) {
            this.minioClient = minioClient;
        }
        index() {
            const file = '/tmp/app.zip';
            const metaData = {
                'Content-Type': 'application/octet-stream',
                'X-Amz-Meta-Testing': 1234,
                example: 5678,
            };
            // Using fPutObject API upload your file to the bucket europetrip.
            this.minioClient.fPutObject('europetripxxx3', 'app.zip', file, metaData, function (err, etag) {
                if (err) {
                    return console.log(err);
                }
                console.log('File uploaded successfully.');
            });
        }
    };
    __decorate([
        common_1.Get(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestMinioClientController.prototype, "index", null);
    NestMinioClientController = __decorate([
        common_1.Controller(),
        __param(0, common_1.Inject(constants_1.MINIO_CONNECTION)),
        __metadata("design:paramtypes", [Object])
    ], NestMinioClientController);
    return NestMinioClientController;
})();
exports.NestMinioClientController = NestMinioClientController;
