import { createResult, issue } from '../core/result';
import type { ValidationIssue, ValidationResult } from '../core/types';
import { validateCustomer } from './customer';

export function validateCustomerCollection(input: unknown): ValidationResult {
  if (!Array.isArray(input)) {
    return createResult([issue('$', 'ARRAY_REQUIRED', 'Expected an array of customer fixtures.')]);
  }

  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();
  const seenEmails = new Set<string>();

  input.forEach((item, index) => {
    const result = validateCustomer(item);
    result.issues.forEach((entry) => issues.push({ ...entry, path: `[${index}].${entry.path === '$' ? '' : entry.path}` }));

    if (item && typeof item === 'object' && !Array.isArray(item)) {
      const customer = item as Record<string, unknown>;
      if (typeof customer.id === 'string' && customer.id.trim()) {
        if (seenIds.has(customer.id)) issues.push(issue(`[${index}].id`, 'ID_DUPLICATE', `Duplicate customer id: ${customer.id}`));
        seenIds.add(customer.id);
      }
      if (typeof customer.email === 'string' && customer.email.trim()) {
        const normalized = customer.email.toLowerCase();
        if (seenEmails.has(normalized)) issues.push(issue(`[${index}].email`, 'EMAIL_DUPLICATE', `Duplicate customer email: ${customer.email}`));
        seenEmails.add(normalized);
      }
    }
  });

  return createResult(issues);
}
