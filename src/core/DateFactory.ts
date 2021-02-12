import {RangeFactory} from "./RangeFactory";
import {Assert} from "../utils/Assert";
import {MAXIMUM_DATE, MINIMUM_DATE} from "../constants/Configurations";
import {Random} from "../random/Random";
import {INVALID_DATE_MESSAGE} from "../constants/ErrorMessages";

export class DateFactory extends RangeFactory<Date> {

    public constructor(min: Date, max: Date) {
        Assert.isDate(min, INVALID_DATE_MESSAGE);
        Assert.isDateInRange(min, MINIMUM_DATE, MAXIMUM_DATE, INVALID_DATE_MESSAGE);
        Assert.isDate(max, INVALID_DATE_MESSAGE);
        Assert.isDateInRange(max, MINIMUM_DATE, MAXIMUM_DATE, INVALID_DATE_MESSAGE);
        super(min, max);
    }

    public single(): Date {
        return Random.date(this.getMin(), this.getMax());
    }
}
