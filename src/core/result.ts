import type { ValidationIssue, ValidationResult } from './types';

export function createResult(issues: ValidationIssue[]): ValidationResult {
  return {
    valid: !issues.some((issue) => issue.severity === 'error'),
    issues,
  };
}

export function issue(
  path: string,
  code: string,
  message: string,
  severity: ValidationIssue['severity'] = 'error',
): ValidationIssue {
  return { path, code, message, severity };
}
