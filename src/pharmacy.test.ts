import { describe, it, expect, vi } from "vitest";

import { Drug } from "./drug";
import { Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  class TestDrug extends Drug {
    override updateBenefitValue = vi.fn();
    override updateExpiresInValue = vi.fn();
  }

  it("should call for update expires in value for all except Magic Pill", () => {
    const testDrug = new TestDrug("test", 2, 3);
    const magicPill = new TestDrug("Magic Pill", 2, 1);

    new Pharmacy([testDrug, magicPill]).updateBenefitValue();

    expect(testDrug.updateExpiresInValue).toHaveBeenCalledTimes(1);
    expect(magicPill.updateExpiresInValue).not.toHaveBeenCalled();
  });

  it("should call update benefit value for all drugs", () => {
    const testDrug = new TestDrug("test", 2, 3);
    const magicPill = new TestDrug("Magic Pill", 2, 1);

    new Pharmacy([testDrug, magicPill]).updateBenefitValue();

    expect(testDrug.updateBenefitValue).toHaveBeenCalledTimes(1);
    expect(magicPill.updateBenefitValue).toHaveBeenCalledTimes(1);
  });
});
