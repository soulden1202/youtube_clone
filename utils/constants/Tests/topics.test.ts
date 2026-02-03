import { topics } from "../topics";

describe("topics", () => {
  it("is an array", () => {
    expect(Array.isArray(topics)).toBe(true);
  });
});
