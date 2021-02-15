import * as sinon from "sinon";
import {FunctionAdapter} from "../../../src/core/adapters/FunctionAdapter";
import {INVALID_FUNCTION_MESSAGE} from "../../../src/constants/ErrorMessages";
import {ProducerFunction} from "../../../src/core/types/ProducerFunction";

describe("FunctionAdapter", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given function is not a function", () => {

            // given
            const fn: ProducerFunction = null;

            // when
            const thrown = () => {
                new FunctionAdapter<any>(fn);
            };

            // then
            expect(thrown).toThrowError(INVALID_FUNCTION_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create value by using given function", () => {

            // given
            const value = {};
            const stub = sandbox.stub().returns(value);
            const functionAdapter = new FunctionAdapter(stub);

            // when
            const result = functionAdapter.single();

            // then
            expect(result).toBe(value);
            expect(functionAdapter.getFunction()).toBe(stub);
            expect(stub.calledWithExactly()).toBe(true);
        });
    });
});
