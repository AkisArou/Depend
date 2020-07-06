import {Container} from "./Container";
import {Scope} from "./Scope";
import {Constructor, Identifier, Instance} from "./types";

export function Injectable(type: Identifier, lifetime: Scope = Scope.ON_DEMAND) {
    return function (target: Constructor): void {
        Container.instance.bind(type).to(target).withScope(lifetime);
    }
}

export function Inject(type: Identifier) {
    return function (target: any, propertyKey: string): void {
        Object.defineProperty(target, propertyKey, {
            get() {
                const instance = Container.instance.get(type);
                Object.defineProperty(this, propertyKey, {value: instance});
                return instance;
            }
        });
    }
}

/*TODO mayyybe*/
function MultiInject(type: Identifier) {
    return function (target: any, propertyKey: string): void {
        console.log("TODO multiInject");
    }
}