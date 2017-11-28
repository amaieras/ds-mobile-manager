"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/take");
var ProblemListService = /** @class */ (function () {
    function ProblemListService(db, _utilService) {
        this.db = db;
        this._utilService = _utilService;
        this.problemList = null;
        this.problemPriceList = null;
        this.problemList = this.db.list('problems-list');
        this.problemPriceList = this.db.list('parts-pf');
    }
    ProblemListService.prototype.ngOnInit = function () {
    };
    ProblemListService.prototype.getProblemList = function () {
        return this.problemList.snapshotChanges().map(function (arr) {
            //noinspection TypeScriptUnresolvedVariable
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    ProblemListService.prototype.getProblemPriceList = function () {
        return this.problemPriceList.snapshotChanges().map(function (arr) {
            //noinspection TypeScriptUnresolvedVariable
            return arr.map(function (snap) { return Object.assign(snap.payload.val(), { $key: snap.key }); });
        });
    };
    ProblemListService.prototype.addNewProblem = function (problem) {
        this.problemList.push({ name: problem });
    };
    ProblemListService = __decorate([
        core_1.Injectable()
    ], ProblemListService);
    return ProblemListService;
}());
exports.ProblemListService = ProblemListService;
