# QA API Fixture Toolkit

A small TypeScript project for validating API test fixtures and reporting data-quality issues. It is designed as a compact, testable codebase for QA automation exercises.

## Requirements
- Node.js 20+
- npm

## Setup
```bash
npm install
npm test
npm run typecheck
```

## Features
- Validates customer fixture shape and field rules.
- Validates collections and detects duplicate IDs and case-insensitive emails.
- Produces a summary of errors, warnings, and issue codes.
- Uses strict TypeScript and Vitest.

## Project structure
```text
src/
  core/            Shared issue/result types and helpers
  validators/      Customer and collection validators
  reporting/       Validation summary
  index.ts         Public exports
tests/             Unit tests
```

## Suggested evaluation task (do not include the solution in your prompt)
Improve collection validation so duplicate IDs and emails are detected consistently when values contain leading/trailing whitespace, while preserving the original values in human-readable messages. Add tests for whitespace normalization, and ensure the existing tests and typecheck pass.

## Licence
MIT. See `LICENSE`.
