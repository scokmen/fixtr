import {Factory} from "../Factory";

export class ValueAdapter<OUT = any> extends Factory<OUT> {

    private readonly _value: OUT;

    public constructor(value: OUT) {
        super();
        this._value = value;
    }

    public getValue(): OUT {
        return this._value;
    }

    public single(): OUT {
        return this._value;
    }
}
