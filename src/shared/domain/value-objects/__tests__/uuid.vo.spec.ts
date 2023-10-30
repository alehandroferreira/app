import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
  test("should trhow errpr when uuid is invalid", () => {
    expect(() => {
      new Uuid("invalid-uui");
    }).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should accept a valid uuid", () => {
    const uuid = new Uuid("d6d1b80d-c15c-46df-9979-171ef524df07");
    expect(uuid.id).toEqual("d6d1b80d-c15c-46df-9979-171ef524df07");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
