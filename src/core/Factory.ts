import {Assert} from "../utils/Assert";
import {DEFAULT_ARRAY_LENGTH, MAXIMUM_ARRAY_LENGTH, MINIMUM_ARRAY_LENGTH} from "../constants/Configurations";
import {INVALID_ARRAY_LENGTH_MESSAGE} from "../constants/ErrorMessages";
import {IFactory} from "./IFactory";

export abstract class Factory<OUT = any> implements IFactory<OUT> {

    public abstract single(): OUT;

    public many(count?: number): Array<OUT> {
        const length = count ?? DEFAULT_ARRAY_LENGTH;
        Assert.isInteger(length, INVALID_ARRAY_LENGTH_MESSAGE);
        Assert.isNumberInRange(length, MINIMUM_ARRAY_LENGTH, MAXIMUM_ARRAY_LENGTH, INVALID_ARRAY_LENGTH_MESSAGE);
        return Array.from({ length }, () => this.single());
    }
}
