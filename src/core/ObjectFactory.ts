import {Factory} from "./Factory";
import {Assert} from "../utils/Assert";
import {INVALID_FIXTURE_OBJECT_MESSAGE} from "../constants/ErrorMessages";
import {IFactory} from "./IFactory";

export class ObjectFactory extends Factory<Record<string, any>> {

    private readonly _model: Record<string, IFactory>;

    public constructor(model: Record<string, IFactory>) {
        Assert.isObject(model, INVALID_FIXTURE_OBJECT_MESSAGE);
        Assert.isObjectFactoryModel(model, INVALID_FIXTURE_OBJECT_MESSAGE);
        super();
        this._model = model;
    }

    public getModel(): Record<string, IFactory> {
        return this._model;
    }

    public single(): Record<string, any> {
        return Object.keys(this._model).reduce((result: Record<string, any>, key: string) => {
            result[key] = this._model[key].single();
            return result;
        }, {});
    }
}
