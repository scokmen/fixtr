import {Factory} from "./Factory";
import {Assert} from "../utils/Assert";
import {MAXIMUM_CHANCE, MINIMUM_CHANCE} from "../constants/Configurations";
import {Random} from "../random/Random";
import {INVALID_CHANCE_MESSAGE} from "../constants/ErrorMessages";

export class BooleanFactory extends Factory<boolean> {

    private readonly _chance: number;

    public constructor(chance: number) {
        Assert.isInteger(chance, INVALID_CHANCE_MESSAGE);
        Assert.isNumberInRange(chance, MINIMUM_CHANCE, MAXIMUM_CHANCE, INVALID_CHANCE_MESSAGE);
        super();
        this._chance = chance;
    }

    public getChance(): number {
        return this._chance;
    }

    public single(): boolean {
        return Random.boolean(this._chance);
    }
}
