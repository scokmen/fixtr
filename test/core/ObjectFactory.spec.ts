import sinon from "sinon";
import {ObjectFactory} from "../../src/core/ObjectFactory";
import {MockFactory} from "../MockFactory";
import {INVALID_FIXTURE_OBJECT_MESSAGE} from "../../src/constants/ErrorMessages";
import {IFactory} from "../../src/core/IFactory";

describe("ObjectFactory", () => {

    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    describe(".constructor()", () => {

        it("should throw error when given model is not an object", () => {

            // given
            const model: Record<string, IFactory> = null;

            // when
            const thrown = () => {
                new ObjectFactory(model);
            };

            // then
            expect(thrown).toThrowError(INVALID_FIXTURE_OBJECT_MESSAGE);
        });

        it("should throw error when given model has non object factory value", () => {

            // given
            const model: Record<string, IFactory> = {
                "key": null
            };

            // when
            const thrown = () => {
                new ObjectFactory(model);
            };

            // then
            expect(thrown).toThrowError(INVALID_FIXTURE_OBJECT_MESSAGE);
        });
    });

    describe(".single()", () => {

        it("should create an object with given model", () => {

            // given
            const value: any = "VALUE";
            const mockFactory = new MockFactory();
            const model = {"key": mockFactory};
            const objectFactory = new ObjectFactory(model);

            sandbox.mock(mockFactory).expects("single").returns(value);

            // when
            const result = objectFactory.single();

            // then
            expect(result["key"]).toBe(value);
            expect(objectFactory.getModel()).toBe(model);
        });
    });
});
