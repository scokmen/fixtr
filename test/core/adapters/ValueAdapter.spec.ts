import {ValueAdapter} from "../../../src/core/adapters/ValueAdapter";

describe("ValueAdapter", () => {

    describe(".single()", () => {

        it("should return always given value", () => {

            // given
            const value = {};
            const valueAdapter = new ValueAdapter(value);

            // when
            const result = valueAdapter.single();

            // then
            expect(result).toBe(value);
            expect(valueAdapter.getValue()).toBe(value);
        });
    });
});
