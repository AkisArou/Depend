import {Scope} from "./Scope";
import {Constructor, Identifier, Instance} from "./types";

export class Container<T extends Constructor> {
    private singletons = new Map<Identifier, Instance<T>>();
    private lazySingletonsKeeper = new Map<Identifier, Constructor>();
    private onDemands = new Map<Identifier, Constructor>();
    private tempCls?: Constructor;
    private tempName?: Identifier;

    public static readonly instance = new Container();

    public bind<I>(name: Identifier) {
        this.tempName = name;
        return this;
    }

    public to(cls: Constructor) {
        this.tempCls = cls;
        return this;
    }

    public withScope(type: Scope) {
        switch (type) {
            case Scope.SINGLETON:
                this.singletons.set(this.tempName!, new this.tempCls!());
                break;
            case Scope.LAZY_SINGLETON:
                this.lazySingletonsKeeper.set(this.tempName!, this.tempCls!);
                break;
            case Scope.ON_DEMAND:
                this.onDemands.set(this.tempName!, this.tempCls!);
                break;
        }

        this.tempCls = undefined;
        this.tempName = undefined;
    }

    public get<I>(name: Identifier): I {
        if (this.singletons.has(name)) {
            return this.singletons.get(name)!;
        } else if (this.lazySingletonsKeeper.has(name)) {
            this.singletons.set(name, new (this.lazySingletonsKeeper.get(name)!)());
            this.lazySingletonsKeeper.delete(name);
            return this.singletons.get(name)!;
        } else {
            return new (this.onDemands.get(name) as Constructor)!();
        }
    }
}
