import {RangeFactory} from "./RangeFactory";
import {Assert} from "../utils/Assert";
import {MAXIMUM_INTEGER, MINIMUM_INTEGER} from "../constants/Configurations";
import {Random} from "../random/Random";
import {INVALID_NUMBER_MESSAGE} from "../constants/ErrorMessages";

export class DecimalFactory extends RangeFactory<number> {

    public constructor(min: number, max: number) {
        Assert.isNumber(min, INVALID_NUMBER_MESSAGE);
        Assert.isNumberInRange(min, MINIMUM_INTEGER, MAXIMUM_INTEGER, INVALID_NUMBER_MESSAGE);
        Assert.isNumber(max, INVALID_NUMBER_MESSAGE);
        Assert.isNumberInRange(max, MINIMUM_INTEGER, MAXIMUM_INTEGER, INVALID_NUMBER_MESSAGE);
        super(min, max);
    }

    public single(): number {
        return Random.decimal(this.getMin(), this.getMax());
    }
}
