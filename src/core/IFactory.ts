export interface IFactory<OUT = any> {
    single(): OUT;
    many(count?: number): Array<OUT>;
}
