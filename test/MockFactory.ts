import { Factory } from "../src/core/Factory";

export class MockFactory<OUT = any> extends Factory<OUT> {

    public single(): OUT {
        throw new Error("NOT IMPLEMENTED!");
    }
}
