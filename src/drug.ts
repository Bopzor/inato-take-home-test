const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;
const UPDATE_BENEFIT_VALUE_STEP = 1;
const UPDATE_EXPIRED_BENEFIT_VALUE_STEP = UPDATE_BENEFIT_VALUE_STEP * 2;

export class Drug {
  constructor(
    public name: string,
    public expiresIn: number,
    public benefit: number,
  ) {}

  updateBenefitValue() {
    switch (this.name) {
      case "Magic Pill":
        this.updateMagicPillBenefit();
        break;

      case "Herbal Tea":
        this.updateHerbalTeaBenefit();
        break;

      case "Fervex":
        this.updateFervexBenefit();
        break;

      case "Dafalgan":
        this.updateDafalganBenefit();
        break;

      default:
        this.updateDefaultBenefit();
        break;
    }

    this.clampBenefit();
  }

  updateExpiresInValue() {
    this.expiresIn -= 1;
  }

  private updateMagicPillBenefit() {
    this.ensureCorrectDrug("Magic Pill");

    return this.benefit;
  }

  private updateHerbalTeaBenefit() {
    this.ensureCorrectDrug("Herbal Tea");

    this.increaseBenefitValueByFactor(1);
  }

  private updateFervexBenefit() {
    this.ensureCorrectDrug("Fervex");

    if (this.isExpired()) {
      this.benefit = 0;
    } else if (this.expiresIn <= 5) {
      this.benefit += 3;
    } else if (this.expiresIn <= 10) {
      this.benefit += 2;
    } else {
      this.increaseBenefitValueByFactor(1);
    }
  }

  private updateDafalganBenefit() {
    this.ensureCorrectDrug("Dafalgan");

    this.decreaseBenefitValueByFactor(2);
  }

  private updateDefaultBenefit() {
    this.decreaseBenefitValueByFactor(1);
  }

  private decreaseBenefitValueByFactor(factor = 1) {
    if (this.isExpired()) {
      this.benefit -= UPDATE_EXPIRED_BENEFIT_VALUE_STEP * factor;
    } else {
      this.benefit -= UPDATE_BENEFIT_VALUE_STEP * factor;
    }
  }

  private increaseBenefitValueByFactor(factor = 1) {
    if (this.isExpired()) {
      this.benefit += UPDATE_EXPIRED_BENEFIT_VALUE_STEP * factor;
    } else {
      this.benefit += UPDATE_BENEFIT_VALUE_STEP * factor;
    }
  }

  private isExpired() {
    return this.expiresIn <= 0;
  }

  private ensureCorrectDrug(expectedName: Drug["name"]) {
    if (this.name !== expectedName) {
      throw new InvalidDrugError(expectedName, this.name);
    }
  }

  private clampBenefit() {
    if (this.benefit < MIN_BENEFIT) {
      this.benefit = MIN_BENEFIT;
    }

    if (this.benefit > MAX_BENEFIT) {
      this.benefit = MAX_BENEFIT;
    }
  }
}

class InvalidDrugError extends Error {
  constructor(expectedName: Drug["name"], givenName: Drug["name"]) {
    super(`Only handle ${expectedName}. Given Drug is '${givenName}'`);
  }
}
