import {Assert} from "../../utils/Assert";
import {Factory} from "../Factory";
import {INVALID_FACTORY_MESSAGE, INVALID_FUNCTION_MESSAGE} from "../../constants/ErrorMessages";
import {MapFunction} from "../types/MapFunction";
import {IFactory} from "../IFactory";

export class FunctionDecorator<IN, OUT> extends Factory<OUT> {

    private readonly _factory: IFactory<IN>;
    private readonly _function: MapFunction<IN, OUT>;

    public constructor(factory: IFactory<IN>, fn: MapFunction<IN, OUT>) {
        Assert.isFactoryInstance(factory, INVALID_FACTORY_MESSAGE);
        Assert.isFunction(fn, INVALID_FUNCTION_MESSAGE);
        super();
        this._factory = factory;
        this._function = fn;
    }

    public getFactory(): Factory<IN> {
        return this._factory;
    }

    public getFunction(): MapFunction<IN, OUT> {
        return this._function;
    }

    public single(): OUT {
        return this._function(this._factory.single());
    }
}
