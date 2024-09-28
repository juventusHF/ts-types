import { describe, expect, test } from "@jest/globals";

/**
 * https://www.typescriptlang.org/docs/handbook/2/generics.html
 */

describe("generics", () => {
  test("generic with one type", () => {
    function testvar<T>(arg: T): T {
      return arg;
    }

    // without type inference
    const num = testvar<number>(42);
    const str = testvar<string>("hello");

    expect(typeof num).toBe("number");
    expect(typeof str).toBe("string");

    // with type inference
    const num2 = testvar(42);
    const str2 = testvar("hello");

    expect(typeof num2).toBe("number");
    expect(typeof str2).toBe("string");
  });

  test("generic with two types", () => {
    function pair<T, U>(first: T, second: U): [T, U] {
      return [first, second];
    }

    const result = pair("apple", 5);

    expect(result).toEqual(["apple", 5]);
    expect(typeof result[0]).toBe("string");
    expect(typeof result[1]).toBe("number");

    const result2 = pair<boolean, Array<number>>(false, [1,2,3]);

    expect(result2).toEqual([false, [1,2,3]]);
    expect(typeof result2[0]).toBe("boolean");
    expect(typeof result2[1]).toBe("object");

  });

  test("generic class", () => {
    class Box<T> {
      stuff: T;

      constructor(value: T) {
        this.stuff = value;
      }

      getStuff(): T {
        return this.stuff;
      }
    }

    const numberBox = new Box(123);
    const stringBox = new Box("hello");

    expect(numberBox.getStuff()).toBe(123);
    expect(stringBox.getStuff()).toBe("hello");
  });

  test("generic array", () => {
    function getFirst<T>(items: T[]): T {
      return items[0];
    }

    const numArray = [10, 20, 30];
    const strArray = ["apple", "banana", "cherry"];

    const varx = getFirst(numArray);

    expect(getFirst(numArray)).toBe(10);
    expect(getFirst(strArray)).toBe("apple");
  });

  test("generic interface", () => {
    interface KeyValue<K, V> {
      key: K;
      value: V;
    }

    function displayKeyValue<K, V>(item: KeyValue<K, V>): string {
      return `Key: ${item.key}, Value: ${item.value}`;
    }

    const result = displayKeyValue({ key: "name", value: "Aaron" });
    expect(result).toBe("Key: name, Value: Aaron");

    const result2 = displayKeyValue({ key: "age", value: 22 });
    expect(result2).toBe("Key: age, Value: 22");

    const result3 = displayKeyValue({ key: "retarded", value: true });
    expect(result3).toBe("Key: retarded, Value: true");
  });
});
