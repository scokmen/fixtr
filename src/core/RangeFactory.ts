import {Factory} from "./Factory";
import {RangeType} from "./types/RangeType";

export abstract class RangeFactory<OUT extends RangeType> extends Factory<OUT> {

    private readonly _min: OUT;
    private readonly _max: OUT;

    protected constructor(min: OUT, max: OUT) {
        super();
        this._min = min;
        this._max = max;
    }

    public getMin(): OUT {
        return this._min;
    }

    public getMax(): OUT {
        return this._max;
    }
}
