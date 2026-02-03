import { allPostsQuery } from "../allPostsQuery";

describe("allPostsQuery", () => {
  it("returns a string", () => {
    expect(typeof allPostsQuery()).toBe("string");
  });
});
