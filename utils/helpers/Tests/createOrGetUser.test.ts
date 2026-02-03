import { createOrGetUser } from "../createOrGetUser";

describe("createOrGetUser", () => {
  it("is a function", () => {
    expect(typeof createOrGetUser).toBe("function");
  });
});
