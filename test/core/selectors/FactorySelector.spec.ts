import * as sinon from "sinon";
import {MockFactory} from "../../MockFactory";
import {FactorySelector} from "../../../src/core/selectors/FactorySelector";
import {MAXIMUM_CHANCE, MINIMUM_CHANCE} from "../../../src/constants/Configurations";
import {Random} from "../../../src/random/Random";
import {INVALID_CHANCE_MESSAGE, INVALID_FACTORY_MESSAGE} from "../../../src/constants/ErrorMessages";

describe("FactorySelector", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given chance is not an integer", () => {

            // given
            const chance = -1.2;
            const mockFactory1 = new MockFactory();
            const mockFactory2 = new MockFactory();

            // when
            const thrown = () => {
                new FactorySelector(mockFactory1, mockFactory2, chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });

        it("should throw error when given chance is less than the minimum chance", () => {

            // given
            const chance = MINIMUM_CHANCE - 1;
            const mockFactory1 = new MockFactory();
            const mockFactory2 = new MockFactory();

            // when
            const thrown = () => {
                new FactorySelector(mockFactory1, mockFactory2, chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });

        it("should throw error when given chance is greater than the maximum chance", () => {

            // given
            const chance = MAXIMUM_CHANCE + 1;
            const mockFactory1 = new MockFactory();
            const mockFactory2 = new MockFactory();

            // when
            const thrown = () => {
                new FactorySelector(mockFactory1, mockFactory2, chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });

        it("should throw error when given primary factory is not an instance of IFactory", () => {

            // given
            const chance = 0;
            const mockFactory1: MockFactory = null;
            const mockFactory2 = new MockFactory();

            // when
            const thrown = () => {
                new FactorySelector(mockFactory1, mockFactory2, chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });

        it("should throw error when given secondary factory is not an instance of IFactory", () => {

            // given
            const chance = 0;
            const mockFactory1 = new MockFactory();
            const mockFactory2: MockFactory = null;

            // when
            const thrown = () => {
                new FactorySelector(mockFactory1, mockFactory2, chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should return value by using primary factory when random value is true", () => {

            // given
            const data = {};
            const chance = 100;
            const output = true;
            const mockFactory1 = new MockFactory();
            const mockFactory2 = new MockFactory();
            const stub = sandbox.stub(Random, "boolean").withArgs(chance).callsFake(() => output);

            const factorySelector = new FactorySelector(mockFactory1, mockFactory2, chance);

            sandbox.mock(mockFactory1).expects("single").withExactArgs().returns(data);
            sandbox.mock(mockFactory2).expects("single").never();

            // when
            const result = factorySelector.single();

            // then
            expect(result).toBe(data);
            expect(factorySelector.getChance()).toBe(chance);
            expect(factorySelector.getPrimaryFactory()).toBe(mockFactory1);
            expect(factorySelector.getSecondaryFactory()).toBe(mockFactory2);
            expect(stub.calledWithExactly(chance)).toBe(true);
        });

        it("should return value by using secondary factory when random value is false", () => {

            // given
            const data = {};
            const chance = 100;
            const output = false;
            const mockFactory1 = new MockFactory();
            const mockFactory2 = new MockFactory();
            const stub = sandbox.stub(Random, "boolean").withArgs(chance).callsFake(() => output);

            const factorySelector: FactorySelector<any, any> = new FactorySelector(mockFactory1, mockFactory2, chance);

            sandbox.mock(mockFactory1).expects("single").never();
            sandbox.mock(mockFactory2).expects("single").withExactArgs().returns(data);

            // when
            const result = factorySelector.single();

            // then
            expect(result).toBe(data);
            expect(factorySelector.getChance()).toBe(chance);
            expect(factorySelector.getPrimaryFactory()).toBe(mockFactory1);
            expect(factorySelector.getSecondaryFactory()).toBe(mockFactory2);
            expect(stub.calledWithExactly(chance)).toBe(true);
        });
    });
});
