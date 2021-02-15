import {Factory} from "../Factory";
import {Assert} from "../../utils/Assert";
import {Random} from "../../random/Random";
import {INVALID_ARRAY_MESSAGE} from "../../constants/ErrorMessages";

export class ValueSelector<OUT> extends Factory<OUT> {

    private readonly _pool: ReadonlyArray<OUT>;

    public constructor(pool: Array<OUT>) {
        Assert.isNonEmptyArray(pool, INVALID_ARRAY_MESSAGE);
        super();
        this._pool = pool;
    }

    public getPool(): ReadonlyArray<OUT> {
        return this._pool;
    }

    public single(): OUT {
        return Random.pick(this._pool);
    }
}
