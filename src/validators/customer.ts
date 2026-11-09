import type { CustomerFixture } from '../core/types';
import { createResult, issue } from '../core/result';
import type { ValidationResult } from '../core/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_STATUSES = new Set(['active', 'inactive']);

export function validateCustomer(input: unknown): ValidationResult {
  const issues = [];

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return createResult([issue('$', 'OBJECT_REQUIRED', 'Customer fixture must be an object.')]);
  }

  const customer = input as Partial<CustomerFixture>;
  if (typeof customer.id !== 'string' || customer.id.trim() === '') {
    issues.push(issue('id', 'ID_REQUIRED', 'Customer id must be a non-empty string.'));
  }
  if (typeof customer.email !== 'string' || !EMAIL_PATTERN.test(customer.email)) {
    issues.push(issue('email', 'EMAIL_INVALID', 'Email must be a valid email address.'));
  }
  if (typeof customer.fullName !== 'string' || customer.fullName.trim().length < 2) {
    issues.push(issue('fullName', 'NAME_TOO_SHORT', 'Full name must contain at least 2 characters.'));
  }
  if (customer.age !== undefined && (!Number.isInteger(customer.age) || customer.age < 0 || customer.age > 120)) {
    issues.push(issue('age', 'AGE_OUT_OF_RANGE', 'Age must be an integer between 0 and 120.'));
  }
  if (typeof customer.status !== 'string' || !ALLOWED_STATUSES.has(customer.status)) {
    issues.push(issue('status', 'STATUS_INVALID', 'Status must be active or inactive.'));
  }

  return createResult(issues);
}
