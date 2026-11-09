// @ts-expect-error Node.js type definitions are not available in this project.
import { describe, it } from 'node:test';
// @ts-expect-error Node.js type definitions are not available in this project.
import assert from 'node:assert/strict';
import { validateCustomer } from '../src';

const validCustomer = { id: 'c-101', email: 'qa@example.com', fullName: 'Alex Morgan', age: 34, status: 'active' };

describe('validateCustomer', () => {
  it('accepts a valid customer fixture', () => {
    assert.deepEqual(validateCustomer(validCustomer), { valid: true, issues: [] });
  });

  it('rejects a non-object input', () => {
    const result = validateCustomer(null);
    assert.equal(result.valid, false);
    assert.equal(result.issues[0]?.code, 'OBJECT_REQUIRED');
  });

  it('reports invalid email and short name', () => {
    const result = validateCustomer({ ...validCustomer, email: 'bad-email', fullName: 'A' });
    assert.ok(result.issues.map((entry) => entry.code).includes('EMAIL_INVALID'));
    assert.ok(result.issues.map((entry) => entry.code).includes('NAME_TOO_SHORT'));
  });

  it('allows age to be omitted', () => {
    const { age: _age, ...withoutAge } = validCustomer;
    assert.equal(validateCustomer(withoutAge).valid, true);
  });
});
