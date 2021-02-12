import {Factory} from "../Factory";
import {Assert} from "../../utils/Assert";
import {INVALID_FUNCTION_MESSAGE} from "../../constants/ErrorMessages";
import {ProducerFunction} from "../types/ProducerFunction";

export class FunctionAdapter<OUT = any> extends Factory<OUT> {

    private readonly _function: ProducerFunction<OUT>;

    public constructor(fn: ProducerFunction<OUT>) {
        Assert.isFunction(fn, INVALID_FUNCTION_MESSAGE);
        super();
        this._function = fn;
    }

    public getFunction(): ProducerFunction<OUT> {
        return this._function;
    }

    public single(): OUT {
        return this._function();
    }
}
