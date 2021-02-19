import {Factory} from "./Factory";
import {Assert} from "../utils/Assert";
import {INVALID_FIXTURE_OBJECT_MESSAGE} from "../constants/ErrorMessages";
import {FixtureModel} from "./types/FixtureModel";

export class ObjectFactory<OUT extends object> extends Factory<OUT> {

    private readonly _model: FixtureModel<OUT>;

    public constructor(model: FixtureModel<OUT>) {
        Assert.isObject(model, INVALID_FIXTURE_OBJECT_MESSAGE);
        Assert.isObjectFactoryModel<OUT>(model, INVALID_FIXTURE_OBJECT_MESSAGE);
        super();
        this._model = model;
    }

    public getModel(): FixtureModel<OUT> {
        return this._model;
    }

    public single(): OUT {
        return Object.keys(this._model).reduce((result: OUT, key: string) => {
            result[key as keyof OUT] = this._model[key as keyof OUT].single();
            return result;
        }, { }) as OUT;
    }
}
