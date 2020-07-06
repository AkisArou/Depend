"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.Injectable = void 0;
var Container_1 = require("./Container");
var Scope_1 = require("./Scope");
function Injectable(type, lifetime) {
    if (lifetime === void 0) { lifetime = Scope_1.Scope.ON_DEMAND; }
    return function (target) {
        Container_1.Container.instance.bind(type).to(target).submit(lifetime);
    };
}
exports.Injectable = Injectable;
function Inject(type) {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                var instance = Container_1.Container.instance.get(type);
                Object.defineProperty(this, propertyKey, { value: instance });
                return instance;
            }
        });
    };
}
exports.Inject = Inject;
/*TODO mayyybe*/
function MultiInject(type) {
    return function (target, propertyKey) {
        console.log("TODO multiInject");
    };
}
//# sourceMappingURL=decorators.js.map