import { Drug } from "./drug";

export class Pharmacy {
  constructor(public drugs: Drug[]) {}

  updateBenefitValue() {
    this.drugs.forEach(function (drug) {
      drug.updateBenefitValue();

      if (drug.name !== "Magic Pill") {
        drug.updateExpiresInValue();
      }
    });

    return this.drugs;
  }
}
