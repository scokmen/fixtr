import {Factory} from "../../core/Factory";
import {Assert} from "../../utils/Assert";
import {ValueAdapter} from "../../core/adapters/ValueAdapter";
import {FunctionDecorator} from "../../core/decorators/FunctionDecorator";
import {FactorySelector} from "../../core/selectors/FactorySelector";
import {DEFAULT_ARRAY_LENGTH, DEFAULT_CHANCE} from "../../constants/Configurations";
import {Multiplexer} from "../../core/misc/Multiplexer";
import {INVALID_FACTORY_MESSAGE} from "../../constants/ErrorMessages";
import {MapFunction} from "../../core/types/MapFunction";
import {ConsumerFunction} from "../../core/types/ConsumerFunction";
import {IFactory} from "../../core/IFactory";
import {Iterator} from "../../core/misc/Iterator";

export class Stream<OUT = any> extends Factory<OUT> {

    private readonly _factory: IFactory<OUT>;

    public constructor(factory: IFactory<OUT>) {
        Assert.isFactoryInstance(factory, INVALID_FACTORY_MESSAGE);
        super();
        this._factory = factory;
    }

    public single(): OUT {
        return this._factory.single();
    }

    public getFactory(): IFactory<OUT> {
        return this._factory;
    }

    public dump(fn: ConsumerFunction<OUT>): Stream<OUT> {
        return new Stream<OUT>(new Multiplexer<OUT>(this, fn));
    }

    public map<TARGET>(mapFunction: MapFunction<OUT, TARGET>): Stream<TARGET> {
        return new Stream<TARGET>(new FunctionDecorator<OUT, TARGET>(this, mapFunction));
    }

    public array(count: number = DEFAULT_ARRAY_LENGTH): Stream<ReadonlyArray<OUT>> {
        return new Stream<ReadonlyArray<OUT>>(new Iterator(this, count));
    }

    public optional(chance: number = DEFAULT_CHANCE): Stream<OUT | undefined> {
        return new Stream(new FactorySelector(this, new ValueAdapter(undefined), chance));
    }

    public nullable(chance: number = DEFAULT_CHANCE): Stream<OUT | null> {
        return new Stream(new FactorySelector(this, new ValueAdapter(null), chance));
    }
}
