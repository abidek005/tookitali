export type Severity = 'error' | 'warning';

export interface ValidationIssue {
  path: string;
  code: string;
  message: string;
  severity: Severity;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface CustomerFixture {
  id: string;
  email: string;
  fullName: string;
  age?: number;
  status: 'active' | 'inactive';
}
