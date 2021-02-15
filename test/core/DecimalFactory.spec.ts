import { DecimalFactory } from "../../src/core/DecimalFactory";
import * as sinon from "sinon";
import { Random } from "../../src/random/Random";
import { INVALID_NUMBER_MESSAGE } from "../../src/constants/ErrorMessages";
import {MAXIMUM_INTEGER, MINIMUM_INTEGER} from "../../src/constants/Configurations";

describe("DecimalFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given min number is not a number", () => {

            // given
            const min = NaN;
            const max = 2;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });

        it("should throw error when given min number is less than the minimum integer", () => {

            // given
            const min = MINIMUM_INTEGER - 1;
            const max = 2;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });

        it("should throw error when given min number is greater than the maximum integer", () => {

            // given
            const min = MAXIMUM_INTEGER + 1;
            const max = 2;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });

        it("should throw error when given max number is not a number", () => {

            // given
            const min = 1;
            const max = NaN;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });

        it("should throw error when given max number is less than the minimum integer", () => {

            // given
            const min = 1;
            const max = MINIMUM_INTEGER - 1;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });

        it("should throw error when given max number is greater than the maximum integer", () => {

            // given
            const min = 1;
            const max = MAXIMUM_INTEGER + 1;

            // when
            const thrown = () => { new DecimalFactory(min, max); };

            // then
            expect(thrown).toThrowError(INVALID_NUMBER_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create number by using random", () => {

            // given
            const min = 1;
            const max = 2;
            const output = 1.5;
            const stub = sinon.stub(Random, "decimal").callsFake(() => output);

            const decimalFactory = new DecimalFactory(min, max);

            // when
            const result = decimalFactory.single();

            // then
            expect(result).toBe(output);
            expect(decimalFactory.getMin()).toBe(min);
            expect(decimalFactory.getMax()).toBe(max);
            expect(stub.calledWithExactly(min, max)).toBe(true);
        });
    });
});
