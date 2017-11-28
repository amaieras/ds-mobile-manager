"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProblemGSMListComponent = /** @class */ (function () {
    function ProblemGSMListComponent(_problemListService, _utilService) {
        var _this = this;
        this._problemListService = _problemListService;
        this._utilService = _utilService;
        this.problemsList = [];
        this.selectedProblem = 'Sticla';
        this._problemListService.getProblemList().subscribe(function (problemsList) {
            problemsList.forEach(function (snapshot) {
                _this.problemsList.push({ label: snapshot.name, value: snapshot.id });
            });
            _this.problems = _this.problemsList;
        });
    }
    ProblemGSMListComponent.prototype.checkIsOther = function () {
        return this._utilService.checkIsOther(this.selectedProblem);
    };
    __decorate([
        core_1.Input('group')
    ], ProblemGSMListComponent.prototype, "problemGSMListGroup", void 0);
    ProblemGSMListComponent = __decorate([
        core_1.Component({
            selector: 'app-problem-gsm-list',
            templateUrl: 'problem-gsm-list.component.html'
        })
    ], ProblemGSMListComponent);
    return ProblemGSMListComponent;
}());
exports.ProblemGSMListComponent = ProblemGSMListComponent;
