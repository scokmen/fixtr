import * as sinon from "sinon";
import {BooleanFactory} from "../../src/core/BooleanFactory";
import {MAXIMUM_CHANCE, MINIMUM_CHANCE} from "../../src/constants/Configurations";
import {Random} from "../../src/random/Random";
import {INVALID_CHANCE_MESSAGE} from "../../src/constants/ErrorMessages";

describe("BooleanFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given chance is not an integer", () => {

            // given
            const chance = -1.2;

            // when
            const thrown = () => {
                new BooleanFactory(chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });

        it("should throw error when given change is less than the minimum chance", () => {

            // given
            const chance = MINIMUM_CHANCE - 1;

            // when
            const thrown = () => {
                new BooleanFactory(chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });

        it("should throw error when given change is greater than the maximum chance", () => {

            // given
            const chance = MAXIMUM_CHANCE + 1;

            // when
            const thrown = () => {
                new BooleanFactory(chance);
            };

            // then
            expect(thrown).toThrowError(INVALID_CHANCE_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should always create boolean by using random", () => {

            // given
            const chance = 50;
            const output = true;
            const booleanFactory = new BooleanFactory(chance);
            const stub = sandbox.stub(Random, "boolean").callsFake(() => output);

            // when
            const result = booleanFactory.single();

            // then
            expect(result).toBe(output);
            expect(booleanFactory.getChance()).toBe(chance);
            expect(stub.calledWithExactly(chance)).toBe(true);
        });
    });
});
