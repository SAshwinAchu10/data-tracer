"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
var typeorm_3 = require("typeorm");
var Audit = /** @class */ (function () {
    function Audit() {
    }
    __decorate([
        typeorm_2.PrimaryColumn("integer"),
        typeorm_3.Generated()
    ], Audit.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "why", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "where", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "what", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "when", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "severity", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "subject", void 0);
    __decorate([
        typeorm_1.Column()
    ], Audit.prototype, "meta", void 0);
    Audit = __decorate([
        typeorm_1.Entity("audits")
    ], Audit);
    return Audit;
}());
exports.default = Audit;
