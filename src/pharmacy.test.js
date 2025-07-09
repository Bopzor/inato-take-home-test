import { Drug } from "./drug";
import { Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Default", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 2)]);
    });

    it("should decrease the benefit by 2 when expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", -1, 1)]);
    });

    it("should not decrease the benefit under 0", () => {
      expect(
        new Pharmacy([new Drug("test", 1, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 0, 0)]);
    });

    it("should increase the benefit more than 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit of Herbal Tea while expiration date has not passed", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 2)]);
    });

    it("should increase the benefit of Herbal Tea by 2 when expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 3)]);
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease the benefit nor the expiration date of Magic Pill", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 2, 1)]);
    });
  });

  describe("Fervex", () => {
    it("should set the benefit at 0 when the expiration date of Fervex has passed", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("should increase the benefit of Fervex by 1 while expiration date is more than 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 12, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 11, 2)]);
    });

    it("should increase the benefit of Fervex by 2 while expiration date is between 10 included and 5 excluded", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 3)]);

      expect(
        new Pharmacy([new Drug("Fervex", 6, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 5, 3)]);
    });

    it("should increase the benefit of Fervex by 3 while expiration date is between 5 included and 0 excluded", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 4)]);

      expect(
        new Pharmacy([new Drug("Fervex", 1, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 0, 4)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit of Dafalgan by 2 while expiration date has not passed", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 1, 1)]);
    });

    it("should increase the benefit of Dafalgan by 4 when expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -1, 1)]);
    });
  });
});
