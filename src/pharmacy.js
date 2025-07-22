export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

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
