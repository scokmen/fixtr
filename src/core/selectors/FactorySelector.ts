import {Factory} from "../Factory";
import {Assert} from "../../utils/Assert";
import {MAXIMUM_CHANCE, MINIMUM_CHANCE} from "../../constants/Configurations";
import {Random} from "../../random/Random";
import {INVALID_CHANCE_MESSAGE, INVALID_FACTORY_MESSAGE} from "../../constants/ErrorMessages";
import {IFactory} from "../IFactory";

export class FactorySelector<PRIMARY, SECONDARY> extends Factory<PRIMARY | SECONDARY> {

    private readonly _chance: number;
    private readonly _primaryFactory: IFactory<PRIMARY>;
    private readonly _secondaryFactory: IFactory<SECONDARY>;

    public constructor(primaryFactory: IFactory<PRIMARY>, secondaryFactory: IFactory<SECONDARY>, chance: number) {
        Assert.isInteger(chance, INVALID_CHANCE_MESSAGE);
        Assert.isNumberInRange(chance, MINIMUM_CHANCE, MAXIMUM_CHANCE, INVALID_CHANCE_MESSAGE);
        Assert.isFactoryInstance(primaryFactory, INVALID_FACTORY_MESSAGE);
        Assert.isFactoryInstance(secondaryFactory, INVALID_FACTORY_MESSAGE);
        super();
        this._chance = chance;
        this._primaryFactory = primaryFactory;
        this._secondaryFactory = secondaryFactory;
    }

    public getChance(): number {
        return this._chance;
    }

    public getPrimaryFactory(): IFactory<PRIMARY> {
        return this._primaryFactory;
    }

    public getSecondaryFactory(): IFactory<SECONDARY> {
        return this._secondaryFactory;
    }

    public single(): PRIMARY | SECONDARY {
        return Random.boolean(this._chance)
            ? this._primaryFactory.single()
            : this._secondaryFactory.single();
    }
}
