export class Pharmacy {
  min_benefit = 0;
  max_benefit = 50;

  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (let i = 0; i < this.drugs.length; i++) {
      if (this.drugs[i].name === "Magic Pill") {
        this.drugs[i] = this._updateMagicPill(this.drugs[i]);
      } else if (this.drugs[i].name === "Herbal Tea") {
        this.drugs[i] = this._updateHerbalTea(this.drugs[i]);
      } else if (this.drugs[i].name === "Fervex") {
        this.drugs[i] = this._updateFervex(this.drugs[i]);
      } else {
        this.drugs[i] = this._updateDefault(this.drugs[i]);
      }

      this.drugs[i] = this._clampBenefit(this.drugs[i]);
    }

    return this.drugs;
  }

  _updateMagicPill(drug) {
    if (drug.name !== "Magic Pill") {
      throw new Error(`Only handle Magic Pill. Drug passed is '${drug.name}'`);
    }

    return drug;
  }

  _updateHerbalTea(drug) {
    if (drug.name !== "Herbal Tea") {
      throw new Error(`Only handle Herbal Tea. Drug passed is '${drug.name}'`);
    }

    if (drug.expiresIn <= 0) {
      drug.benefit += 2;
    } else {
      drug.benefit += 1;
    }

    drug.expiresIn -= 1;

    return drug;
  }

  _updateFervex(drug) {
    if (drug.name !== "Fervex") {
      throw new Error(`Only handle Fervex. Drug passed is '${drug.name}'`);
    }

    if (drug.expiresIn <= 0) {
      drug.benefit = 0;
    } else if (drug.expiresIn <= 5) {
      drug.benefit += 3;
    } else if (drug.expiresIn <= 10) {
      drug.benefit += 2;
    } else {
      drug.benefit += 1;
    }

    drug.expiresIn -= 1;

    return drug;
  }

  _updateDefault(drug) {
    if (drug.expiresIn <= 0) {
      drug.benefit -= 2;
    } else {
      drug.benefit -= 1;
    }

    drug.expiresIn -= 1;

    return drug;
  }

  _clampBenefit(drug) {
    if (drug.benefit < this.min_benefit) {
      drug.benefit = 0;
    }

    if (drug.benefit > this.max_benefit) {
      drug.benefit = 50;
    }

    return drug;
  }
}
