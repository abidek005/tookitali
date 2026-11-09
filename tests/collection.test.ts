declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (value: any) => {
  toBe(expected: any): any;
  toContain(expected: any): any;
  not: {
    toBe(expected: any): any;
    toContain(expected: any): any;
  };
};
import { summarize, validateCustomerCollection } from '../src';

const fixture = (id: string, email: string) => ({ id, email, fullName: 'Taylor Reed', status: 'active' });

describe('validateCustomerCollection', () => {
  it('rejects duplicate ids and case-insensitive emails', () => {
    const result = validateCustomerCollection([fixture('1', 'A@example.com'), fixture('1', 'a@example.com')]);
    expect(result.valid).toBe(false);
    expect(result.issues.map((entry) => entry.code)).toContain('ID_DUPLICATE');
    expect(result.issues.map((entry) => entry.code)).toContain('EMAIL_DUPLICATE');
  });

  it('returns an error for non-array input', () => {
    expect(validateCustomerCollection({}).issues[0]?.code).toBe('ARRAY_REQUIRED');
  });

  it('summarizes validation issue counts by code', () => {
    const result = validateCustomerCollection([fixture('1', 'bad'), fixture('1', 'bad')]);
    const summary = summarize(result);
    expect(summary.valid).toBe(false);
    expect(summary.errors).toBe(result.issues.length);
    expect(summary.byCode.EMAIL_INVALID).toBe(2);
  });
});
