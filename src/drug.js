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
    if (this.name !== "Magic Pill") {
      throw new Error(`Only handle Magic Pill. Given Drug is '${this.name}'`);
    }

    return this.benefit;
  }

  _updateHerbalTeaBenefit() {
    if (this.name !== "Herbal Tea") {
      throw new Error(`Only handle Herbal Tea. Given Drug is '${this.name}'`);
    }

    this._increaseBenefitValueByFactor(1);
  }

  _updateFervexBenefit() {
    if (this.name !== "Fervex") {
      throw new Error(`Only handle Fervex. Given Drug is '${this.name}'`);
    }

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
    if (this.name !== "Dafalgan") {
      throw new Error(`Only handle Dafalgan. Given Drug is '${this.name}'`);
    }

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

  _clampBenefit() {
    if (this.benefit < MIN_BENEFIT) {
      this.benefit = MIN_BENEFIT;
    }

    if (this.benefit > MAX_BENEFIT) {
      this.benefit = MAX_BENEFIT;
    }
  }
}
