import { Drug } from "./drug";

describe("Drug", () => {
  describe("updateExpiresInValue", () => {
    it("should decrease expiresIn by 1", () => {
      const drug = new Drug("test", 1, 3);

      drug.updateExpiresInValue();

      expect(drug).toHaveProperty("expiresIn", 0);

      drug.updateExpiresInValue();

      expect(drug).toHaveProperty("expiresIn", -1);
    });
  });

  describe("updateBenefitValue", () => {
    describe("Benefit value cannot be lower 0 and over 50", () => {
      it("should not decrease the benefit under 0", () => {
        const drug = new Drug("test", 1, 0);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 0);
      });

      it("should increase the benefit more than 50", () => {
        const drug = new Drug("Herbal Tea", 0, 50);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 50);
      });
    });

    describe("Default", () => {
      it("should decrease the benefit by 1", () => {
        const drug = new Drug("test", 2, 3);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 2);
      });

      it("should decrease the benefit by 2 when expiration date has passed", () => {
        const drug = new Drug("test", 0, 3);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 1);
      });
    });

    describe("Herbal Tea", () => {
      it("should increase the benefit of Herbal Tea while expiration date has not passed", () => {
        const drug = new Drug("Herbal Tea", 2, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 2);
      });

      it("should increase the benefit of Herbal Tea by 2 when expiration date has passed", () => {
        const drug = new Drug("Herbal Tea", 0, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 3);
      });
    });

    describe("Magic Pill", () => {
      it("should not decrease the benefit of Magic Pill", () => {
        const drug = new Drug("Magic Pill", 2, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 1);
      });
    });

    describe("Fervex", () => {
      it("should set the benefit at 0 when the expiration date of Fervex has passed", () => {
        const drug = new Drug("Fervex", 0, 10);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 0);
      });

      it("should increase the benefit of Fervex by 1 while expiration date is more than 10", () => {
        const drug = new Drug("Fervex", 12, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 2);
      });

      it("should increase the benefit of Fervex by 2 while expiration date is between 10 included and 5 excluded", () => {
        const drug = new Drug("Fervex", 10, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 3);
      });

      it("should increase the benefit of Fervex by 3 while expiration date is between 5 included and 0 excluded", () => {
        const drug = new Drug("Fervex", 5, 1);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 4);
      });
    });

    describe("Dafalgan", () => {
      it("should decrease the benefit of Dafalgan by 2 while expiration date has not passed", () => {
        const drug = new Drug("Dafalgan", 2, 3);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 1);
      });

      it("should increase the benefit of Dafalgan by 4 when expiration date has passed", () => {
        const drug = new Drug("Dafalgan", 0, 5);

        drug.updateBenefitValue();

        expect(drug).toHaveProperty("benefit", 1);
      });
    });
  });
});
