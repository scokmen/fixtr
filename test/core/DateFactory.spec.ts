import {MAXIMUM_DATE, MINIMUM_DATE} from "../../src/constants/Configurations";
import {DateFactory} from "../../src/core/DateFactory";
import * as sinon from "sinon";
import {Random} from "../../src/random/Random";
import {INVALID_DATE_MESSAGE} from "../../src/constants/ErrorMessages";

describe("DateFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given min date is not a date", () => {

            // given
            const min = 1;
            const max = new Date();

            // when
            const thrown = () => {
                new DateFactory(min as any, max);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });

        it("should throw error when given min date is less than the minimum date", () => {

            // given
            const min = new Date(MINIMUM_DATE.getTime() - 1);
            const max = new Date();

            // when
            const thrown = () => {
                new DateFactory(min, max);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });

        it("should throw error when given min date is greater than the maximum date", () => {

            // given
            const min = new Date(MAXIMUM_DATE.getTime() + 1);
            const max = new Date();

            // when
            const thrown = () => {
                new DateFactory(min, max);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });

        it("should throw error when given max date is not a date", () => {

            // given
            const min = new Date();
            const max = 1;

            // when
            const thrown = () => {
                new DateFactory(min, max as any);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });

        it("should throw error when given max date is less than the minimum date", () => {

            // given
            const min = new Date();
            const max = new Date(MINIMUM_DATE.getTime() - 1);

            // when
            const thrown = () => {
                new DateFactory(min, max);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });

        it("should throw error when given max date is greater than the maximum date", () => {

            // given
            const min = new Date();
            const max = new Date(MAXIMUM_DATE.getTime() + 1);

            // when
            const thrown = () => {
                new DateFactory(min, max);
            };

            // then
            expect(thrown).toThrowError(INVALID_DATE_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create a date by using random", () => {

            // given
            const min = new Date();
            const max = new Date();
            const output = new Date();

            max.setHours(max.getHours() + 1);

            const stub = sandbox.stub(Random, "date").callsFake(() => output);

            const dateFactory = new DateFactory(min, max);

            // when
            const result = dateFactory.single();

            // then
            expect(result).toBe(output);
            expect(dateFactory.getMin()).toBe(min);
            expect(dateFactory.getMax()).toBe(max);
            expect(stub.calledWithExactly(min, max)).toBe(true);
        });
    });
});
