import { Scope } from "./Scope";
import { Constructor, Identifier } from "./types";
export declare class Container<T extends Constructor> {
    private singletons;
    private lazySingletonsKeeper;
    private onDemands;
    private tempCls?;
    private tempName?;
    static readonly instance: Container<Constructor>;
    bind(name: Identifier): this;
    to(cls: Constructor): this;
    submit(type: Scope): void;
    get<I>(name: Identifier): I;
}
//# sourceMappingURL=Container.d.ts.map