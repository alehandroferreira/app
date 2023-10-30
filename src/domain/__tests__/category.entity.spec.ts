import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("Constructor", () => {
    test("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.category_id).toBeUndefined();
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

      expect(category.category_id).toBeUndefined();
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

      expect(category.category_id).toBeUndefined();
      expect(category.name).toEqual("Movie2");
      expect(category.description).toEqual("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });
});
