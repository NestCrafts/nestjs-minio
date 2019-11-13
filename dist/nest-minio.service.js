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
// tslint:disable: variable-name
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const Minio = require("minio");
let NestMinioService = class NestMinioService {
    constructor(_NestMinioOptions) {
        this._NestMinioOptions = _NestMinioOptions;
        this.logger = new common_1.Logger('NestMinioService');
        this.logger.log(`Options: ${JSON.stringify(this._NestMinioOptions)}`);
    }
    getMinio() {
        if (!this._minioConnection) {
            this._minioConnection = new Minio.Client(this._NestMinioOptions);
        }
        return this._minioConnection;
    }
};
NestMinioService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.NEST_MINIO_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], NestMinioService);
exports.NestMinioService = NestMinioService;
