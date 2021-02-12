import sinon from "sinon";
import {MockFactory} from "../MockFactory";
import {DEFAULT_ARRAY_LENGTH, MAXIMUM_ARRAY_LENGTH, MINIMUM_ARRAY_LENGTH} from "../../src/constants/Configurations";
import {INVALID_ARRAY_LENGTH_MESSAGE} from "../../src/constants/ErrorMessages";

describe("Factory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".many()", () => {

        it("should throw error when given count is not an integer", () => {

            // given
            const count = 1.2;
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("single").never();

            // when
            const thrown = () => {
                mockFactory.many(count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });

        it("should throw error when given count is less than the minimum array length", () => {

            // given
            const count = MINIMUM_ARRAY_LENGTH - 1;
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("single").never();

            // when
            const thrown = () => {
                mockFactory.many(count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });

        it("should throw error when given count is greater than the maximum array length", () => {

            // given
            const count = MAXIMUM_ARRAY_LENGTH + 1;
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("single").never();

            // when
            const thrown = () => {
                mockFactory.many(count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });

        it("should create an array with given count", () => {

            // given
            const data = {};
            const count = 3;
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("single").withExactArgs().exactly(count).returns(data);

            // when
            const result = mockFactory.many(count);

            // then
            expect(result).toHaveLength(count);
        });

        it("should create an array with default count when no parameter is given", () => {

            // given
            const data = {};
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("single").withExactArgs().exactly(DEFAULT_ARRAY_LENGTH).returns(data);

            // when
            const result = mockFactory.many();

            // then
            expect(result).toHaveLength(DEFAULT_ARRAY_LENGTH);
        });
    });
});
