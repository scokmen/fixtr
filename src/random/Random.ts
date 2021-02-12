import * as rand from "random-js";
import randomize from "randomatic";

export class Random {

    private static readonly engine: any = rand.MersenneTwister19937.autoSeed();

    public static date(min: Date, max: Date): Date {
        return rand.date(min, max)(Random.engine);
    }

    public static boolean(percentage: number): boolean {
        return rand.bool(percentage / 100)(Random.engine);
    }

    public static integer(min: number, max: number): number {
        return rand.integer(min, max)(Random.engine);
    }

    public static string(pattern: string, length: number): string {
        return randomize(pattern, length);
    }

    public static decimal(min: number, max: number): number {
        return rand.real(min, max, true)(Random.engine);
    }
}
