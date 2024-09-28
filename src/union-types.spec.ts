import { describe, expect, test } from '@jest/globals';

/**
 * https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types
 */


describe('union types', () => {
    function operations(id: number | string) {
        // Won't run -> method doesn't exist for "number"
        //console.log(id.toUpperCase());

        // This will run
        if (typeof id === "string") {
            console.log(id.toUpperCase());
        }
    }

    function checking(x: string[] | string) {
        if (Array.isArray(x)) {
            console.log("Hello, " + x.join(" and "));
        } else {
            console.log("Hi, " + x);
        }
    }

    function commonMethod(x: number[] | string) {
        // both arrays and strings have a .slice() method
        const a = "Hello";
        return x.slice(0, 3);
    }

    test('Test that function can only take types that are in the union', () => {
        const printId = (id: number | string) => {
            if (typeof id !== 'number' && typeof id !== 'string') {
                throw new TypeError("Invalid ID type");
            }
            console.log("Your ID is: " + id);
        };

        expect(() => printId({ id: "hello" } as any)).toThrow(TypeError);
    });
});
