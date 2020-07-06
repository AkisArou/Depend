"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var Scope_1 = require("./Scope");
var Container = /** @class */ (function () {
    function Container() {
        this.singletons = new Map();
        this.lazySingletonsKeeper = new Map();
        this.onDemands = new Map();
    }
    Container.prototype.bind = function (name) {
        this.tempName = name;
        return this;
    };
    Container.prototype.to = function (cls) {
        this.tempCls = cls;
        return this;
    };
    Container.prototype.submit = function (type) {
        switch (type) {
            case Scope_1.Scope.SINGLETON:
                this.singletons.set(this.tempName, new this.tempCls());
                break;
            case Scope_1.Scope.LAZY_SINGLETON:
                this.lazySingletonsKeeper.set(this.tempName, this.tempCls);
                break;
            case Scope_1.Scope.ON_DEMAND:
                this.onDemands.set(this.tempName, this.tempCls);
                break;
        }
        this.tempCls = undefined;
        this.tempName = undefined;
    };
    Container.prototype.get = function (name) {
        if (this.singletons.has(name)) {
            return this.singletons.get(name);
        }
        else if (this.lazySingletonsKeeper.has(name)) {
            this.singletons.set(name, new (this.lazySingletonsKeeper.get(name))());
            this.lazySingletonsKeeper.delete(name);
            return this.singletons.get(name);
        }
        else {
            return new (this.onDemands.get(name))();
        }
    };
    Container.instance = new Container();
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map