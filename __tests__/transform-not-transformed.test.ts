/* eslint-disable no-magic-numbers */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { transform } from '../src';

describe('transform', () => {
  it('update only', () => {
    const content = readFileSync(resolve(__dirname, 'fixtures/readme-update-only.md'), 'utf8');
    const headers = transform(content, { updateOnly: true });

    expect(headers.transformed).toBe(false);
    expect(headers.reason).toBe('update only');
  });

  it('not updated', () => {
    const content = readFileSync(resolve(__dirname, 'fixtures/readme-not-updated.md'), 'utf8');
    const headers = transform(content);

    expect(headers.transformed).toBe(false);
    expect(headers.reason).toBe('not updated');
  });
});
