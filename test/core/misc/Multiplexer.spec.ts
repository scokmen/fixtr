import * as sinon from "sinon";
import {MockFactory} from "../../MockFactory";
import {Multiplexer} from "../../../src/core/misc/Multiplexer";
import {INVALID_FACTORY_MESSAGE, INVALID_FUNCTION_MESSAGE} from "../../../src/constants/ErrorMessages";
import {ConsumerFunction} from "../../../src/core/types/ConsumerFunction";

describe("Multiplexer", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given factory is not an instance of IFactory", () => {

            // given
            const mockFactory: MockFactory = null;
            const consumerFunction = () => {
            };

            // when
            const thrown = () => {
                new Multiplexer(mockFactory, consumerFunction);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });

        it("should throw error when given consumer function is not a function", () => {

            // given
            const mockFactory = new MockFactory();
            const consumerFunction: ConsumerFunction = null;

            // when
            const thrown = () => {
                new Multiplexer(mockFactory, consumerFunction);
            };

            // then
            expect(thrown).toThrowError(INVALID_FUNCTION_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should call given consumer function with the result of factory instance then return this result", () => {

            // given
            const factoryResult = 1;
            const mockFactory = new MockFactory();
            const mapFunction = sandbox.fake.returns(null);
            const multiplexer = new Multiplexer(mockFactory, mapFunction);

            sandbox.mock(mockFactory).expects("single").withExactArgs().returns(factoryResult);

            // when
            const result = multiplexer.single();

            // then
            expect(result).toBe(factoryResult);
            expect(mapFunction.calledOnceWithExactly(factoryResult)).toBe(true);
            expect(multiplexer.getFactory()).toBe(mockFactory);
            expect(multiplexer.getFunction()).toBe(mapFunction);
        });
    });
});
