import {Assert} from "../../utils/Assert";
import {MAXIMUM_ARRAY_LENGTH, MINIMUM_ARRAY_LENGTH} from "../../constants/Configurations";
import {Factory} from "../Factory";
import {INVALID_ARRAY_LENGTH_MESSAGE, INVALID_FACTORY_MESSAGE} from "../../constants/ErrorMessages";
import {IFactory} from "../IFactory";

export class Iterator<OUT = any> extends Factory<ReadonlyArray<OUT>> {

    private readonly _factory: IFactory<OUT>;
    private readonly _count: number;

    public constructor(factory: IFactory<OUT>, count: number) {
        Assert.isInteger(count, INVALID_ARRAY_LENGTH_MESSAGE);
        Assert.isNumberInRange(count, MINIMUM_ARRAY_LENGTH, MAXIMUM_ARRAY_LENGTH, INVALID_ARRAY_LENGTH_MESSAGE);
        Assert.isFactoryInstance(factory, INVALID_FACTORY_MESSAGE);
        super();
        this._factory = factory;
        this._count = count;
    }

    public getCount(): number {
        return this._count;
    }

    public getFactory(): IFactory<OUT> {
        return this._factory;
    }

    public single(): ReadonlyArray<OUT> {
        return this._factory.many(this._count);
    }
}
