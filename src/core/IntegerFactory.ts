import {RangeFactory} from "./RangeFactory";
import {Assert} from "../utils/Assert";
import {MAXIMUM_INTEGER, MINIMUM_INTEGER} from "../constants/Configurations";
import {Random} from "../random/Random";
import {INVALID_INTEGER_MESSAGE} from "../constants/ErrorMessages";

export class IntegerFactory extends RangeFactory<number> {

    public constructor(min: number, max: number) {
        Assert.isInteger(min, INVALID_INTEGER_MESSAGE);
        Assert.isNumberInRange(min, MINIMUM_INTEGER, MAXIMUM_INTEGER, INVALID_INTEGER_MESSAGE);
        Assert.isInteger(max, INVALID_INTEGER_MESSAGE);
        Assert.isNumberInRange(max, MINIMUM_INTEGER, MAXIMUM_INTEGER, INVALID_INTEGER_MESSAGE);
        super(min, max);
    }

    public single(): number {
        return Random.integer(this.getMin(), this.getMax());
    }
}
