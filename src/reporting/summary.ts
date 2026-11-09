import type { ValidationResult } from '../core/types';

export interface ValidationSummary {
  valid: boolean;
  totalIssues: number;
  errors: number;
  warnings: number;
  byCode: Record<string, number>;
}

export function summarize(result: ValidationResult): ValidationSummary {
  const byCode: Record<string, number> = {};
  let errors = 0;
  let warnings = 0;

  for (const item of result.issues) {
    byCode[item.code] = (byCode[item.code] ?? 0) + 1;
    if (item.severity === 'error') errors += 1;
    else warnings += 1;
  }

  return { valid: result.valid, totalIssues: result.issues.length, errors, warnings, byCode };
}
