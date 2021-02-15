import {ValueSelector} from "../../../src/core/selectors/ValueSelector";
import * as sinon from "sinon";
import {Random} from "../../../src/random/Random";
import {INVALID_ARRAY_MESSAGE} from "../../../src/constants/ErrorMessages";

describe("ValueSelector", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given pool is not a non-empty array", () => {

            // given
            const pool: Array<any> = [];

            // when
            const thrown = () => {
                new ValueSelector<any>(pool);
            };

            // then
            expect(thrown).toThrowError(INVALID_ARRAY_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should select one item from given pool", () => {

            // given
            const pool = [1, 2];
            const output = 1;
            const stub = sandbox.stub(Random, "pick").callsFake(() => output);
            const valueSelector = new ValueSelector<any>(pool);

            // when
            const result = valueSelector.single();

            // then
            expect(result).toBe(output);
            expect(valueSelector.getPool()).toBe(pool);
            expect(stub.calledWithExactly(pool)).toBe(true);
        });
    });
});
