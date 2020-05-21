"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMinioClientModule = void 0;
const common_1 = require("@nestjs/common");
const nest_minio_client_controller_1 = require("./nest-minio-client.controller");
const nest_minio_module_1 = require("../nest-minio.module");
let NestMinioClientModule = /** @class */ (() => {
    let NestMinioClientModule = class NestMinioClientModule {
    };
    NestMinioClientModule = __decorate([
        common_1.Module({
            controllers: [nest_minio_client_controller_1.NestMinioClientController],
            imports: [
                nest_minio_module_1.NestMinioModule.register({
                    endPoint: 'play.min.io',
                    port: 9000,
                    useSSL: true,
                    accessKey: 'Q3AM3UQ867SPQQA43P2F',
                    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
                }),
            ],
        })
    ], NestMinioClientModule);
    return NestMinioClientModule;
})();
exports.NestMinioClientModule = NestMinioClientModule;
