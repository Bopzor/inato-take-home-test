const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;
const UPDATE_BENEFIT_VALUE_STEP = 1;
const UPDATE_EXPIRED_BENEFIT_VALUE_STEP = UPDATE_BENEFIT_VALUE_STEP * 2;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateBenefitValue() {
    switch (this.name) {
      case "Magic Pill":
        this._updateMagicPillBenefit();
        break;

      case "Herbal Tea":
        this._updateHerbalTeaBenefit();
        break;

      case "Fervex":
        this._updateFervexBenefit();
        break;

      case "Dafalgan":
        this._updateDafalganBenefit();
        break;

      default:
        this._updateDefaultBenefit();
        break;
    }

    this._clampBenefit();
  }

  updateExpiresInValue() {
    this.expiresIn -= 1;
  }

  _updateMagicPillBenefit() {
    this._ensureCorrectDrug("Magic Pill");

    return this.benefit;
  }

  _updateHerbalTeaBenefit() {
    this._ensureCorrectDrug("Herbal Tea");

    this._increaseBenefitValueByFactor(1);
  }

  _updateFervexBenefit() {
    this._ensureCorrectDrug("Fervex");

    if (this._isExpired()) {
      this.benefit = 0;
    } else if (this.expiresIn <= 5) {
      this.benefit += 3;
    } else if (this.expiresIn <= 10) {
      this.benefit += 2;
    } else {
      this._increaseBenefitValueByFactor(1);
    }
  }

  _updateDafalganBenefit() {
    this._ensureCorrectDrug("Dafalgan");

    this._decreaseBenefitValueByFactor(2);
  }

  _updateDefaultBenefit() {
    this._decreaseBenefitValueByFactor(1);
  }

  _decreaseBenefitValueByFactor(factor = 1) {
    if (this._isExpired()) {
      this.benefit -= UPDATE_EXPIRED_BENEFIT_VALUE_STEP * factor;
    } else {
      this.benefit -= UPDATE_BENEFIT_VALUE_STEP * factor;
    }
  }

  _increaseBenefitValueByFactor(factor = 1) {
    if (this._isExpired()) {
      this.benefit += UPDATE_EXPIRED_BENEFIT_VALUE_STEP * factor;
    } else {
      this.benefit += UPDATE_BENEFIT_VALUE_STEP * factor;
    }
  }

  _isExpired() {
    return this.expiresIn <= 0;
  }

  _ensureCorrectDrug(expectedName) {
    if (this.name !== expectedName) {
      throw new InvalidDrugError(expectedName, this.name);
    }
  }

  _clampBenefit() {
    if (this.benefit < MIN_BENEFIT) {
      this.benefit = MIN_BENEFIT;
    }

    if (this.benefit > MAX_BENEFIT) {
      this.benefit = MAX_BENEFIT;
    }
  }
}

class InvalidDrugError extends Error {
  constructor(expectedName, givenName) {
    super(`Only handle ${expectedName}. Given Drug is '${givenName}'`);
  }
}
