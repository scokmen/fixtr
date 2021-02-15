import * as check from "check-types";
import {Factory} from "../core/Factory";
import {IFactory} from "../core/IFactory";

export class Assert {

    public static isInteger(number: number, message: string): void {
        if (!check.integer(number)) {
            throw new Error(message);
        }
    }

    public static isNumberInRange(number: number, min: number, max: number, message: string): void {
        if (!check.inRange(number, min, max)) {
            throw new Error(message);
        }
    }

    public static isDate(date: Date, message: string): void {
        if (!check.date(date)) {
            throw new Error(message);
        }
    }

    public static isDateInRange(date: Date, min: Date, max: Date, message: string): void {
        if (!check.inRange(date.getTime(), min.getTime(), max.getTime())) {
            throw new Error(message);
        }
    }

    public static isNumber(number: number, message: string): void {
        if (!check.number(number)) {
            throw new Error(message);
        }
    }

    public static isObject(object: any, message: string): void {
        if (!check.object(object)) {
            throw new Error(message);
        }
    }

    public static isNonEmptyString(str: string, message: string): void {
        if (!check.nonEmptyString(str)) {
            throw new Error(message);
        }
    }

    public static isObjectFactoryModel(model: Record<string, IFactory>, message: string): void {
        const isValid = Object.keys(model).every((key) => check.instance(model[key], Factory));
        if (!isValid) {
            throw new Error(message);
        }
    }

    public static isFunction(fn: Function, message: string): void {
        if (!check.function(fn)) {
            throw new Error(message);
        }
    }

    public static isFactoryInstance(factory: IFactory, message: string): void {
        if (!check.instance(factory, Factory)) {
            throw new Error(message);
        }
    }

    public static isNonEmptyArray(array: Array<any>, message: string): void {
        if (!check.nonEmptyArray(array)) {
            throw new Error(message);
        }
    }
}
