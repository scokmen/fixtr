import {Assert} from "../utils/Assert";
import {MINIMUM_STRING_LENGTH, MAXIMUM_STRING_LENGTH} from "../constants/Configurations";
import {Random} from "../random/Random";
import {Factory} from "./Factory";
import {INVALID_STRING_PATTERN_MESSAGE, INVALID_STRING_LENGTH_MESSAGE} from "../constants/ErrorMessages";

export class StringFactory extends Factory<string> {

    private readonly _pattern: string;
    private readonly _length: number;

    public constructor(pattern: string, length: number) {
        Assert.isNonEmptyString(pattern, INVALID_STRING_PATTERN_MESSAGE);
        Assert.isInteger(length, INVALID_STRING_LENGTH_MESSAGE);
        Assert.isNumberInRange(length, MINIMUM_STRING_LENGTH, MAXIMUM_STRING_LENGTH, INVALID_STRING_LENGTH_MESSAGE);
        super();
        this._pattern = pattern;
        this._length = length;
    }

    public getPattern(): string {
        return this._pattern;
    }

    public getLength(): number {
        return this._length;
    }

    public single(): string {
        return Random.string(this._pattern, this._length);
    }
}
