import * as sinon from "sinon";
import {StringFactory} from "../../src/core/StringFactory";
import {MAXIMUM_STRING_LENGTH, MINIMUM_STRING_LENGTH} from "../../src/constants/Configurations";
import {Random} from "../../src/random/Random";
import {INVALID_STRING_PATTERN_MESSAGE, INVALID_STRING_LENGTH_MESSAGE} from "../../src/constants/ErrorMessages";

describe("StringFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given pattern is empty", () => {

            // given
            const pattern = "";
            const length = 5;

            // when
            const thrown = () => {
                new StringFactory(pattern, length);
            };

            // then
            expect(thrown).toThrowError(INVALID_STRING_PATTERN_MESSAGE);
        });

        it("should throw error when given length is not an integer", () => {

            // given
            const pattern = "pattern";
            const length = 5.1;

            // when
            const thrown = () => {
                new StringFactory(pattern, length);
            };

            // then
            expect(thrown).toThrowError(INVALID_STRING_LENGTH_MESSAGE);
        });

        it("should throw error when given length is less than the minimum string length", () => {

            // given
            const pattern = "pattern";
            const length = MINIMUM_STRING_LENGTH - 1;

            // when
            const thrown = () => {
                new StringFactory(pattern, length);
            };

            // then
            expect(thrown).toThrowError(INVALID_STRING_LENGTH_MESSAGE);
        });

        it("should throw error when given length is greater than the maximum string length", () => {

            // given
            const pattern = "pattern";
            const length = MAXIMUM_STRING_LENGTH + 1;

            // when
            const thrown = () => {
                new StringFactory(pattern, length);
            };

            // then
            expect(thrown).toThrowError(INVALID_STRING_LENGTH_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create string by given pattern", () => {

            // given
            const pattern = "pattern";
            const length = 2;
            const output = "output";
            const stub = sandbox.stub(Random, "string").callsFake(() => output);
            const stringFactory = new StringFactory(pattern, length);

            // when
            const result = stringFactory.single();

            // then
            expect(result).toBe(output);
            expect(stringFactory.getPattern()).toBe(pattern);
            expect(stringFactory.getLength()).toBe(length);
            expect(stub.calledWithExactly(pattern, length)).toBe(true);
        });
    });
});
