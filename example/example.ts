import {Inject, Injectable} from "../src/decorators";
import {Scope} from "../src/Scope";
import {Container} from "../src/Container";

//TODO remove DOM from tsconfig lib

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const T = {
    Arous: "Arous",
    Fucker: "Fucker"
}

interface Fucker {
    fuck(): void;
}

const TYPES = {
    Arous: Symbol.for(T.Arous),
    Fucker: Symbol.for(T.Fucker)
}


@Injectable(TYPES.Fucker)
class PallasGewrgios implements Fucker {
    public fuck(): void {
        console.log("Hmmm... Fap fap fap...");
    }
}

class User {
    @Inject(TYPES.Fucker)
    private readonly fucker!: Fucker;

    public init(): void {
        this.fucker.fuck();
    }
}

@Injectable(TYPES.Arous, Scope.LAZY_SINGLETON)
class Arous {
    public arousSayHello(): void {
        console.log("Arous says Hello!");
    }
}

class Both {
    @Inject(TYPES.Arous)
    private readonly arous!: Arous;

    @Inject(TYPES.Fucker)
    private readonly fucker!: Fucker;


    public sayHelloFromBoth(): void {
        this.arous.arousSayHello();
        this.fucker.fuck();
    }
}

const fucker = Container.instance.get<Fucker>(TYPES.Fucker);
fucker.fuck();

const both = new Both();
both.sayHelloFromBoth();

const user = new User();
user.init();


const id = "id";

@Injectable(id)
class Test {
    private count = 0;

    constructor() {
        console.log("INITING TEST")
    }

    async hello() {
        document.querySelector("#output")!.textContent = `Hello! Count: ${this.count++}`;
        await sleep(1000);
    }
}


class Cont {
    @Inject(id)
    private readonly test!: Test

    async init() {
        for (let i = 0; i < 10; i++)
            await this.test.hello();
    }
}


const cont = new Cont();
cont.init();

setInterval(async () => {
    const cont = new Cont();
    await cont.init();
}, 10_000);



