import {describe, expect, test} from '@jest/globals';

/**
 * https://www.typescriptlang.org/docs/handbook/utility-types.html
 */
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // optionales property
}

type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;
type UserWithoutEmail = Omit<User, 'email'>;
// more stuff like this Pick, Exclude, Extract

export { User, PartialUser, RequiredUser, ReadonlyUser, UserKeys, UserWithoutEmail };

describe('Utility Types', () => {
    test('should allow partial properties', () => {
        const user: PartialUser = {
            name: "Alice"
        };

        expect(user.name).toBe("Alice");
        expect(user.id).toBeUndefined();
    });

    test('should require all properties when using Required', () => {
        const user: RequiredUser = {
            id: 2,
            name: "Alice",
            email: "alice@example.com",
            age: 30
        };

        // Check all properties are present
        expect(user.id).toBe(1);
        expect(user.name).toBe("Alice");
        expect(user.email).toBe("alice@example.com");
        expect(user.age).toBe(30);
    });

    test('should not allow modifications of readonly properties', () => {
        const readonlyUser: ReadonlyUser = {
            id: 1,
            name: "Alice",
            email: "alice@example.com",
            age: 30
        };

        readonlyUser.name = "new"
    });

    test('should return keys of User interface', () => {
        const keys: UserKeys[] = ["id", "name", "email", "age"];
    });

    test('should omit specified properties', () => {
        const userWithoutEmail: UserWithoutEmail = {
            id: 1,
            name: "Alice",
            age: 30
        };

        expect(userWithoutEmail.email).toBeUndefined();
        expect(userWithoutEmail.id).toBe(1);
        expect(userWithoutEmail.name).toBe("Alice");
    });

    test('showcase awaited type', () => {
        async function foo<T>(x: T) {
            const y = await x;
            // const y: Awaited<T> in TS4.5 and above
            // (just T in TS4.4 and below)
        }

        async function baz(x: Promise<string>) {
            const y = await x;
            // const y: string
            // Awaited<Promise<string>> is just string
        }

        async function qux(x: Promise<Promise<string>>) {
            const y = await x;
            // const y: string
        }
    })

    test('showcase record type', () => {
        type CatName = "miffy" | "boris" | "mordred";

        interface CatInfo {
            age: number;
            breed: string;
        }

        const cats: Record<CatName, CatInfo> = {
            miffy: { age: 10, breed: "Persian" },
            boris: { age: 5, breed: "Maine Coon" },
            mordred: { age: 16, breed: "British Shorthair" },
        };

        expect(cats.boris).toBeDefined();
    })

    test('showcase non nullable type', () => {
        type CatName = string | null | undefined;

        const catName: NonNullable<CatName> = null
    })

    test('showcase noinfer type', () => {
        const createStreetLight = <C extends string>(
            colors: C[],
            defaultColor?: NoInfer<C>,
        )=> { // see void inferred type
        }
        createStreetLight(["red", "yellow", "green"], "red");  // OK
        createStreetLight(["red", "yellow", "green"], "blue"); // Error
    })

    test('showcase instancetype and typeof', () => {
        class C {
            x = 0;
            y = 0;
        }
        type T0 = typeof C;
        type T1 = InstanceType<typeof C>;

        const test: T0 = { // compilation error typeof C returns not the type of the instance but the type of the class which is a constructor function
            x: 2,
            y: 4,
        }
        const test2: T1 = { // working
            x: 2,
            y: 4,
        }
    })

    test('showcase constructro interface and constructorparameters', () => {
        interface CustomConstructor {
            new (str: string): string
        }
        type T0 = ConstructorParameters<ErrorConstructor>; // [message?: string]
        type T1 = ConstructorParameters<CustomConstructor>; // [str?: string]

        const test0: T0 = ""; // Error
        const test1: T0 = [""];
        const test2: T1 = [""];
    })

    test('showcase returntype utility type', () => {
        const func = () => {
            return "str";
        }

        type T0 = ReturnType<typeof func>
    })

    test('never returntype', () => {
        const func = (): never => { // will never return anything --> never
            throw new Error("blabla")
        }
    })

    test('should convert string to lowercase using Lowercase', () => {
        type Original = 'HELLO WORLD';
        type Lowercased = Lowercase<Original>;

        const testValue: Lowercased = 'hello world'; // This should be valid
        expect(testValue).toBe('hello world');
    });
});