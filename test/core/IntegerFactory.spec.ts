import { MAXIMUM_INTEGER, MINIMUM_INTEGER } from "../../src/constants/Configurations";
import { IntegerFactory } from "../../src/core/IntegerFactory";
import * as sinon from "sinon";
import { Random } from "../../src/random/Random";
import { INVALID_INTEGER_MESSAGE } from "../../src/constants/ErrorMessages";

describe("IntegerFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given min number is not an integer", () => {

            // given
            const min = 1.2;
            const max = 2;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });

        it("should throw error when given min number is less than the minimum integer", () => {

            // given
            const min = MINIMUM_INTEGER - 1;
            const max = 2;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });

        it("should throw error when given min number is greater than the maximum integer", () => {

            // given
            const min = MAXIMUM_INTEGER + 1;
            const max = 2;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });

        it("should throw error when given max number is not an integer", () => {

            // given
            const min = 1;
            const max = 2.1;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });

        it("should throw error when given max number is less than the minimum integer", () => {

            // given
            const min = 1;
            const max = MINIMUM_INTEGER - 1;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });

        it("should throw error when given max number is greater than the maximum integer", () => {

            // given
            const min = 1;
            const max = MAXIMUM_INTEGER + 1;

            // when
            const thrown = () => { new IntegerFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_INTEGER_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create number by using random", () => {

            // given
            const min = 1;
            const max = 2;
            const output = 2;
            const stub = sandbox.stub(Random, "integer").callsFake(() => output);
            const integerFactory = new IntegerFactory(min, max);

            // when
            const result = integerFactory.single();

            // then
            expect(result).toBe(output);
            expect(integerFactory.getMin()).toBe(min);
            expect(integerFactory.getMax()).toBe(max);
            expect(stub.calledWithExactly(min, max)).toBe(true);

            stub.restore();
        });
    });
});
