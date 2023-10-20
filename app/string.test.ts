/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type CamelCase,
  type SnakeCase,
  camelCase,
  snakeCase,
  deepCamelKeys,
  deepSnakeKeys,
} from "string-ts";

const SEPARATORS_TEXT =
  "[one] two-three/four.five(six){seven}|eight_nine\\ten" as const;

const WEIRD_TEXT =
  " someWeird-cased$*String1986Foo [Bar] W_FOR_WUMBO..." as const;

type WeirdTextUnion = typeof WEIRD_TEXT | "dont.distribute unions";

// TEST UTILITIES
type Expect<T extends true> = T;
type Equal<A, B> =
  // prettier-ignore
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

namespace TypeTransforms {
  type testCamel = Expect<
    Equal<
      CamelCase<WeirdTextUnion>,
      "someWeirdCased$*String1986FooBarWForWumbo" | "dontDistributeUnions"
    >
  >;
  type testSnake = Expect<
    Equal<
      SnakeCase<WeirdTextUnion>,
      | "some_weird_cased_$*_string1986_foo_bar_w_for_wumbo"
      | "dont_distribute_unions"
    >
  >;
}

describe("camelCase", () => {
  test("casing functions", () => {
    const expected = "someWeirdCased$*String1986FooBarWForWumbo" as const;
    const result = camelCase(WEIRD_TEXT);
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });
  test("with various separators", () => {
    const result = camelCase(SEPARATORS_TEXT);
    const expected = "oneTwoThreeFourFiveSixSevenEightNineTen";
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });
});

describe("snakeCase", () => {
  test("casing functions", () => {
    const expected =
      "some_weird_cased_$*_string1986_foo_bar_w_for_wumbo" as const;
    const result = snakeCase(WEIRD_TEXT);
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });
  test("with various separators", () => {
    const result = snakeCase(SEPARATORS_TEXT);
    const expected = "one_two_three_four_five_six_seven_eight_nine_ten";
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });
});

describe("requested changes by RoNoLo", () => {
  test("camelCase", () => {
    const result = camelCase("address_line1");
    const expected = "addressLine1";
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });

  test("snakeCase", () => {
    const result = snakeCase("addressLine1");
    const expected = "address_line1";
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });

  test("both camel and snake", () => {
    const result = snakeCase(camelCase("address_line1"));
    const expected = "address_line1";
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;

    const result2 = camelCase(snakeCase("addressLine1"));
    const expected2 = "addressLine1";
    expect(result2).toEqual(expected2);
    type test2 = Expect<Equal<typeof result2, typeof expected2>>;
  });

  test("deepCamelKeys", () => {
    const result = deepCamelKeys({
      address_line1: "Somestreet 15",
      address_line2: "next to Müller",
    });
    const expected = {
      addressLine1: "Somestreet 15",
      addressLine2: "next to Müller",
    };
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });

  test("deepSnakeKeys", () => {
    const result = deepSnakeKeys({
      addressLine1: "Somestreet 15",
      addressLine2: "next to Müller",
    });
    const expected = {
      address_line1: "Somestreet 15",
      address_line2: "next to Müller",
    };
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;
  });

  test("both deepSnake and deepCamel", () => {
    const result = deepCamelKeys(
      deepSnakeKeys({
        addressLine1: "Somestreet 15",
        addressLine2: "next to Müller",
      })
    );
    const expected = {
      addressLine1: "Somestreet 15",
      addressLine2: "next to Müller",
    };
    expect(result).toEqual(expected);
    type test = Expect<Equal<typeof result, typeof expected>>;

    const result2 = deepSnakeKeys(
      deepCamelKeys({
        address_line1: "Somestreet 15",
        address_line2: "next to Müller",
      })
    );
    const expected2 = {
      address_line1: "Somestreet 15",
      address_line2: "next to Müller",
    };
    expect(result2).toEqual(expected2);
    type test2 = Expect<Equal<typeof result2, typeof expected2>>;
  });
});
