import sinon from "sinon";
import {MockFactory} from "../../MockFactory";
import {Iterator} from "../../../src/core/misc/Iterator";
import {MAXIMUM_ARRAY_LENGTH, MINIMUM_ARRAY_LENGTH} from "../../../src/constants/Configurations";
import {INVALID_ARRAY_LENGTH_MESSAGE, INVALID_FACTORY_MESSAGE} from "../../../src/constants/ErrorMessages";

describe("Iterator", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given factory is not an instance of IFactory", () => {

            // given
            const count = 10;
            const mockFactory: MockFactory = null;

            // when
            const thrown = () => {
                new Iterator(mockFactory, count);
            };

            // then
            expect(thrown).toThrowError(INVALID_FACTORY_MESSAGE);
        });

        it("should throw error when given count is not an integer", () => {

            // given
            const count = 1.2;
            const mockFactory = new MockFactory();

            // when
            const thrown = () => {
                new Iterator(mockFactory, count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });

        it("should throw error when given count is less than the minimum array length", () => {

            // given
            const count = MINIMUM_ARRAY_LENGTH - 1;
            const mockFactory = new MockFactory();

            // when
            const thrown = () => {
                new Iterator(mockFactory, count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });

        it("should throw error when given count is greater than the maximum array length", () => {

            // given
            const count = MAXIMUM_ARRAY_LENGTH + 1;
            const mockFactory = new MockFactory();

            // when
            const thrown = () => {
                new Iterator(mockFactory, count);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_LENGTH_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create an array by using given factory", () => {

            // given
            const count = 3;
            const data = [1, 2, 3];
            const mockFactory = new MockFactory();

            sandbox.mock(mockFactory).expects("many").withExactArgs(count).returns(data);

            const iterator = new Iterator(mockFactory, count);

            // when
            const result = iterator.single();

            // then
            expect(result).toBe(data);
            expect(iterator.getCount()).toBe(count);
            expect(iterator.getFactory()).toBe(mockFactory);
        });
    });
});
