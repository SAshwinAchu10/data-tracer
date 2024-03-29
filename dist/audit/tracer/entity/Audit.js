"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
var typeorm_3 = require("typeorm");
var Audit = /** @class */ (function () {
    function Audit() {
    }
    __decorate([
        (0, typeorm_2.PrimaryColumn)("integer"),
        (0, typeorm_3.Generated)()
    ], Audit.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "why", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "where", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "what", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "when", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "severity", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "meta", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "who", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true })
    ], Audit.prototype, "status", void 0);
    Audit = __decorate([
        (0, typeorm_1.Entity)("audits")
    ], Audit);
    return Audit;
}());
exports.default = Audit;
