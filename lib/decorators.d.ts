import { Scope } from "./Scope";
import { Constructor, Identifier } from "./types";
export declare function Injectable(type: Identifier, lifetime?: Scope): (target: Constructor) => void;
export declare function Inject(type: Identifier): (target: any, propertyKey: string) => void;
//# sourceMappingURL=decorators.d.ts.map