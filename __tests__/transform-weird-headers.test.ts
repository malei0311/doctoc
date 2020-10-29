/* eslint-disable no-magic-numbers */
import {resolve} from 'path';
import {readFileSync} from 'fs';
import {transform} from '../src';

describe('transform', () => {
  it('given a file with edge-case header names', () => {
    const content = readFileSync(resolve(__dirname, 'fixtures/readme-with-weird-headers.md'), 'utf8');
    const headers = transform(content);

    expect(headers.toc.split('\n')).toEqual(
      ['## Table of Contents',
        '',
        '- [hasOwnProperty](#hasownproperty)',
        '- [something else](#something-else)',
        ''],
    );
  });

  it('nameless table headers', () => {
    const content = readFileSync(resolve(__dirname, 'fixtures/readme-nameless-table-headers.md'), 'utf8');
    const headers = transform(content);

    expect(headers.toc.split('\n')).toEqual(
      ['**Table of Contents**  *generated with [DocToc](https://github.com/technote-space/doctoc)*',
        '',
        '- [Heading One](#heading-one)',
        '  - [Subheading 2](#subheading-2)',
        ''],
    );
  });

  it('change check toc comment', () => {
    const content = readFileSync(resolve(__dirname, 'fixtures/readme-with-weird-headers.md'), 'utf8');
    const headers = transform(content, {
      checkOpeningComment: '<!-- toc ',
      checkClosingComment: '<!-- tocstop ',
      openingComment: '<!-- toc -->',
      closingComment: '<!-- tocstop -->',
      isNotitle: true,
    });

    expect(headers.transformed).toBe(false);
    expect(headers.reason).toBe('not updated');
  });
});
