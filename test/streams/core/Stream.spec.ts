import sinon from "sinon";
import {MockFactory} from "../../MockFactory";
import {Stream} from "../../../src/streams/core/Stream";
import {FactorySelector} from "../../../src/core/selectors/FactorySelector";
import {ValueAdapter} from "../../../src/core/adapters/ValueAdapter";
import {FunctionDecorator} from "../../../src/core/decorators/FunctionDecorator";
import {DEFAULT_ARRAY_LENGTH, DEFAULT_CHANCE} from "../../../src/constants/Configurations";
import {Multiplexer} from "../../../src/core/misc/Multiplexer";
import {Iterator} from "../../../src/core/misc/Iterator";
import {INVALID_FACTORY_MESSAGE} from "../../../src/constants/ErrorMessages";

describe("Stream", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given factory is not an instance of IFactory", () => {

            // given
            const mockFactory: MockFactory = null;

            // when
            const thrown: Function = () => {
                new Stream(mockFactory);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create data by using given factory", () => {

            // given
            const data = {};
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            sinon.mock(mockFactory).expects("single").returns(data);

            // when
            const result = stream.single();

            // then
            expect(result).toBe(data);
            expect(stream.getFactory()).toBe(mockFactory);
        });
    });

    describe(".optional()", () => {

        it("should return a factory selector stream", () => {

            // given
            const chance = 50;
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const optional = stream.optional(chance);

            // then
            expect(optional).toBeInstanceOf(Stream);

            const factorySelector = optional.getFactory() as FactorySelector<any, undefined>;

            expect(factorySelector).toBeInstanceOf(FactorySelector);
            expect(factorySelector.getChance()).toBe(chance);
            expect(factorySelector.getPrimaryFactory()).toBe(stream);
            expect(factorySelector.getSecondaryFactory()).toBeInstanceOf(ValueAdapter);

            const valueAdapter = factorySelector.getSecondaryFactory() as ValueAdapter;

            expect(valueAdapter).toBeInstanceOf(ValueAdapter);
            expect(valueAdapter.getValue()).toBeUndefined();
        });

        it("should return a factory selector stream with default change when no change given", () => {

            // given
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const optional = stream.optional();

            // then
            expect(optional).toBeInstanceOf(Stream);

            const factorySelector = optional.getFactory() as FactorySelector<any, undefined>;

            expect(factorySelector).toBeInstanceOf(FactorySelector);
            expect(factorySelector.getChance()).toBe(DEFAULT_CHANCE);
            expect(factorySelector.getPrimaryFactory()).toBe(stream);
            expect(factorySelector.getSecondaryFactory()).toBeInstanceOf(ValueAdapter);

            const valueAdapter = factorySelector.getSecondaryFactory() as ValueAdapter;

            expect(valueAdapter).toBeInstanceOf(ValueAdapter);
            expect(valueAdapter.getValue()).toBeUndefined();
        });
    });

    describe(".nullable()", () => {

        it("should return a factory selector stream", () => {

            // given
            const chance = 50;
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const optional = stream.nullable(chance);

            // then
            expect(optional).toBeInstanceOf(Stream);

            const factorySelector = optional.getFactory() as FactorySelector<any, null>;

            expect(factorySelector).toBeInstanceOf(FactorySelector);
            expect(factorySelector.getChance()).toBe(chance);
            expect(factorySelector.getPrimaryFactory()).toBe(stream);
            expect(factorySelector.getSecondaryFactory()).toBeInstanceOf(ValueAdapter);

            const valueAdapter = factorySelector.getSecondaryFactory() as ValueAdapter;

            expect(valueAdapter).toBeInstanceOf(ValueAdapter);
            expect(valueAdapter.getValue()).toBeNull();
        });

        it("should return a factory selector stream with default chance when no chance given", () => {

            // given
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const optional = stream.nullable();

            // then
            expect(optional).toBeInstanceOf(Stream);

            const factorySelector = optional.getFactory() as FactorySelector<any, null>;

            expect(factorySelector).toBeInstanceOf(FactorySelector);
            expect(factorySelector.getChance()).toBe(DEFAULT_CHANCE);
            expect(factorySelector.getPrimaryFactory()).toBe(stream);
            expect(factorySelector.getSecondaryFactory()).toBeInstanceOf(ValueAdapter);

            const valueAdapter = factorySelector.getSecondaryFactory() as ValueAdapter;

            expect(valueAdapter).toBeInstanceOf(ValueAdapter);
            expect(valueAdapter.getValue()).toBeNull();
        });
    });

    describe(".map()", () => {

        it("should return a map function decorator stream", () => {

            // given
            const data = {};
            const mapFunction = () => {
                return data;
            };
            const mockFactory= new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const mapper = stream.map(mapFunction);

            // then
            expect(mapper).toBeInstanceOf(Stream);

            const mapFunctionDecorator = mapper.getFactory() as FunctionDecorator<any, any>;

            expect(mapFunctionDecorator).toBeInstanceOf(FunctionDecorator);
            expect(mapFunctionDecorator.getFactory()).toBe(stream);
            expect(mapFunctionDecorator.getFunction()).toBe(mapFunction);
        });
    });

    describe(".dump()", () => {

        it("should return a multiplexer stream", () => {

            // given
            const data = {};
            const consumerFunction = () => {
                return data;
            };
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const dumpedStream = stream.dump(consumerFunction);

            // then
            expect(dumpedStream).toBeInstanceOf(Stream);

            const multiplexer = dumpedStream.getFactory() as Multiplexer;

            expect(multiplexer).toBeInstanceOf(Multiplexer);
            expect(multiplexer.getFunction()).toBe(consumerFunction);
            expect(multiplexer.getFactory()).toBe(stream);
        });
    });

    describe(".array()", () => {

        it("should return an iterator stream", () => {

            // given
            const count = 3;
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const arrayStream = stream.array(count);

            // then
            expect(arrayStream).toBeInstanceOf(Stream);

            const iterator = arrayStream.getFactory() as Iterator;

            expect(iterator).toBeInstanceOf(Iterator);
            expect(iterator.getCount()).toBe(count);
        });

        it("should use default array length when length not provided", () => {

            // given
            const mockFactory = new MockFactory();
            const stream = new Stream(mockFactory);

            // when
            const arrayStream = stream.array();

            // then
            expect(arrayStream).toBeInstanceOf(Stream);

            const iterator = arrayStream.getFactory() as Iterator;

            expect(iterator).toBeInstanceOf(Iterator);
            expect(iterator.getCount()).toBe(DEFAULT_ARRAY_LENGTH);
        });
    });
});
