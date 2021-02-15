import * as sinon from "sinon";
import {MockFactory} from "../../MockFactory";
import {FunctionDecorator} from "../../../src/core/decorators/FunctionDecorator";
import {INVALID_FACTORY_MESSAGE, INVALID_FUNCTION_MESSAGE} from "../../../src/constants/ErrorMessages";
import {MapFunction} from "../../../src/core/types/MapFunction";

describe("FunctionDecorator", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given factory is not an instance of AbstractFactory", () => {

            // given
            const mockFactory: MockFactory = null;
            const mapFunction = () => {};

            // when
            const thrown = () => {
                new FunctionDecorator(mockFactory, mapFunction);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });

        it("should throw error when given mapper function is not a function", () => {

            // given
            const mockFactory = new MockFactory();
            const mapFunction: MapFunction = null;

            // when
            const thrown = () => {
                new FunctionDecorator(mockFactory, mapFunction);
            };

            // then
            expect(thrown).toThrowError(INVALID_FUNCTION_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should map output of given factory by using given map function", () => {

            // given
            const mapResult = 2;
            const factoryResult = 1;
            const mockFactory = new MockFactory();
            const mapFunction = sandbox.fake.returns(mapResult);
            const functionDecorator = new FunctionDecorator(mockFactory, mapFunction);

            sandbox.mock(mockFactory).expects("single").withExactArgs().returns(factoryResult);

            // when
            const result = functionDecorator.single();

            // then
            expect(result).toBe(mapResult);
            expect(mapFunction.calledOnceWithExactly(factoryResult)).toBe(true);
            expect(functionDecorator.getFactory()).toBe(mockFactory);
            expect(functionDecorator.getFunction()).toBe(mapFunction);
        });
    });
});
