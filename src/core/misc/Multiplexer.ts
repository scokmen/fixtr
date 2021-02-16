import {Factory} from "../Factory";
import {Assert} from "../../utils/Assert";
import {INVALID_FACTORY_MESSAGE, INVALID_FUNCTION_MESSAGE} from "../../constants/ErrorMessages";
import {IFactory} from "../IFactory";
import {ConsumerFunction} from "../types/ConsumerFunction";

export class Multiplexer<OUT = any> extends Factory<OUT> {

    private readonly _factory: IFactory<OUT>;
    private readonly _function: ConsumerFunction<OUT>;

    public constructor(factory: IFactory<OUT>, fn: ConsumerFunction<OUT>) {
        Assert.isFactoryInstance(factory, INVALID_FACTORY_MESSAGE);
        Assert.isFunction(fn, INVALID_FUNCTION_MESSAGE);
        super();
        this._factory = factory;
        this._function = fn;
    }

    public getFactory(): IFactory<OUT> {
        return this._factory;
    }

    public getFunction(): ConsumerFunction<OUT> {
        return this._function;
    }

    public single(): OUT {
        const value = this._factory.single();
        this._function(value);
        return value;
    }
}
