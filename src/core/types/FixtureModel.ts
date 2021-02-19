import {IFactory} from "../IFactory";

export type FixtureModel<T extends object> = {
    [K in keyof T]: IFactory<T[K]>
};
