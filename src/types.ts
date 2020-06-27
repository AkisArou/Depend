export type Constructor = (new (...args: any[]) => any);
export type Instance<T extends Constructor> = InstanceType<T>;
export type Identifier = string | symbol;