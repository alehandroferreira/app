import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests:", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe("Constructor", () => {
    test("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with all values", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie2",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie2");
      expect(category.description).toEqual("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toEqual(created_at);
    });

    test("should create a category with name and description", () => {
      const category = new Category({
        name: "Movie2",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie2");
      expect(category.description).toEqual("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("Create Command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toBeCalledTimes(1);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie");
      expect(category.description).toEqual("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toBeCalledTimes(1);
      expect(validateSpy).toBeCalledTimes(1);
    });

    test("should create a category with is_active", () => {
      const category = Category.create({
        name: "Movie",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toEqual("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toBeCalledTimes(1);
    });
  });

  describe("Changes name and description", () => {
    test("should change name", () => {
      const category = Category.create({
        name: "Movie",
      });

      category.changeName("Movie2");
      expect(category.name).toEqual("Movie2");
      expect(validateSpy).toBeCalledTimes(2);
    });

    test("should change description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      category.changeDescription("Movie description2");
      expect(category.description).toEqual("Movie description2");
      expect(validateSpy).toBeCalledTimes(2);
    });
  });

  describe("Activate and Deactivate", () => {
    test("should activate a category", () => {
      const category = Category.create({
        name: "Movie",
        is_active: false,
      });

      category.activate();
      expect(category.is_active).toBeTruthy();
    });

    test("should disable a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)("id=%j", ({ category_id }) => {
      const category = Category.create({
        name: "Movie",
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });
});

describe("Category Validator:", () => {
  describe("Create Command", () => {
    test("should an invalid category with name property", () => {
      expect(() => Category.create({ name: null })).containsErrorMessage({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => Category.create({ name: "" })).containsErrorMessage({
        name: ["name should not be empty"],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessage({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        Category.create({ name: "t".repeat(256) })
      ).containsErrorMessage({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("should an invalid category with description property", () => {
      expect(() =>
        Category.create({ name: "Movie", description: null })
      ).containsErrorMessage({
        description: [
          "description should not be empty",
          "description must be a string",
          "description must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        Category.create({ name: "Movie", description: "" })
      ).containsErrorMessage({
        description: ["description should not be empty"],
      });

      expect(() =>
        Category.create({ name: "Movie", description: 5 as any })
      ).containsErrorMessage({
        description: ["description must be a string"],
      });
    });

    test("should an invalid category using is_active property", () => {
      expect(() =>
        Category.create({ name: "Movie", is_active: 5 as any })
      ).containsErrorMessage({
        is_active: ["is_active must be a boolean value"],
      });
    });
  });
});
