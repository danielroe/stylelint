import blockNoEmpty from '../rules/block-no-empty/index.js';
import maxLineLength from '../rules/max-line-length/index.js';
import selectorCombinatorSpaceBefore from '../rules/selector-combinator-space-before/index.js';
import stringQuotes from '../rules/string-quotes/index.js';

// disabling all rules
testRule({
	ruleName: blockNoEmpty.ruleName,
	config: [true],

	accept: [
		{
			code: '/* stylelint-disable */\na {}',
		},
		{
			code: '/* stylelint-disable-line */ a {}',
		},
		{
			code: 'a {} /* stylelint-disable-line */ ',
		},
		{
			code: '/* stylelint-disable-next-line */\na {}',
		},
		{
			code: 'b { color: pink;}\n/* stylelint-disable */\na {}',
		},
		// Command comment descriptions.
		{
			code: '/* stylelint-disable -- Description */\na {}',
		},
		{
			code: '/* stylelint-disable-line -- Description */ a {}',
		},
		{
			code: 'a {} /* stylelint-disable-line -- Description */ ',
		},
		{
			code: '/* stylelint-disable-next-line -- Description */\na {}',
		},
		{
			code: 'b { color: pink;}\n/* stylelint-disable -- Description */\na {}',
		},
	],

	reject: [
		{
			code: 'a {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: 'a {}\n/* stylelint-disable */',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: 'a {}\n/* stylelint-disable-line */',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable-line */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable-next-line */\na{}\nb {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable-next-line */ a{}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: 'a {}\n/* stylelint-disable-next-line */',
			message: blockNoEmpty.messages.rejected,
		},
		// Command comment descriptions.
		{
			code: '/* stylelint-disable--Description */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable-- Description */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable --Description */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable - - Description */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
	],
});

testRule({
	ruleName: selectorCombinatorSpaceBefore.ruleName,
	config: ['always'],

	reject: [
		{
			code: 'a> b {}',
			message: selectorCombinatorSpaceBefore.messages.expectedBefore('>'),
		},
	],
});

testRule({
	ruleName: blockNoEmpty.ruleName,
	config: [true],

	accept: [
		{
			code: `/* stylelint-disable ${blockNoEmpty.ruleName} */\na {}`,
		},
		{
			code: `/* stylelint-disable-line ${blockNoEmpty.ruleName} */ a {}`,
		},
		{
			code: `a {} /* stylelint-disable-line ${blockNoEmpty.ruleName} */`,
		},
		{
			code: `/* stylelint-disable-next-line ${blockNoEmpty.ruleName} */\na {}`,
		},
	],

	reject: [
		{
			code: '/* stylelint-disable declaration-no-important */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: '/* stylelint-disable-line declaration-no-important */\na {}',
			message: blockNoEmpty.messages.rejected,
		},
		{
			code: `/* stylelint-disable-line ${blockNoEmpty.ruleName} */ a {}\nb {}`,
			message: blockNoEmpty.messages.rejected,
			line: 2,
			column: 3,
		},
	],
});

testRule({
	ruleName: selectorCombinatorSpaceBefore.ruleName,
	config: ['always'],

	accept: [
		{
			code: '/* stylelint-disable declaration-no-important, selector-combinator-space-before */ a> b {}',
		},
		{
			code: '/* stylelint-disable-line declaration-no-important, selector-combinator-space-before */ a> b {}',
		},
		{
			code: 'a> b {} /* stylelint-disable-line declaration-no-important, selector-combinator-space-before */',
		},
	],

	reject: [
		{
			code: '/* stylelint-disable declaration-no-important */ a> b {}',
			message: selectorCombinatorSpaceBefore.messages.expectedBefore('>'),
		},
		{
			code: '/* stylelint-disable-line declaration-no-important */\na> b {}',
			message: selectorCombinatorSpaceBefore.messages.expectedBefore('>'),
		},
	],
});

testRule({
	ruleName: blockNoEmpty.ruleName,
	config: [true],

	accept: [
		{
			code: `
      /* stylelint-disable */
      a {}
      /* stylelint-enable */
      /* stylelint-disable */
      a {}
    `,
		},
	],

	reject: [
		{
			code: `
      /* stylelint-disable */
      a {}
      /* stylelint-enable */
      a {}
    `,

			message: blockNoEmpty.messages.rejected,
		},
	],
});

testRule({
	ruleName: maxLineLength.ruleName,
	config: [80],

	accept: [
		{
			code: `
      /* stylelint-disable */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      /* stylelint-enable */
    `,
		},
		{
			code: `
      /* stylelint-disable-line */ .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
    `,
		},
		{
			code: `
      /* stylelint-disable max-line-length */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      /* stylelint-enable max-line-length */
    `,
		},
		{
			code: `
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); } /* stylelint-disable-line max-line-length */
    `,
		},
		{
			code: `
      /* stylelint-disable-next-line max-line-length */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
    `,
		},
	],

	reject: [
		{
			code: `
      /* stylelint-disable block-no-empty */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      /* stylelint-enable block-no-empty */
    `,

			message: maxLineLength.messages.expected(80),
		},
		{
			code: `
      /* stylelint-disable-line */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
    `,

			message: maxLineLength.messages.expected(80),
		},
		{
			code: `
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      /* stylelint-disable-line */
    `,

			message: maxLineLength.messages.expected(80),
		},
		{
			code: `
      /* stylelint-disable max-line-length */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      /* stylelint-enable max-line-length */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
    `,

			message: maxLineLength.messages.expected(80),
		},
		{
			code: `
      /* stylelint-disable-next-line max-line-length */
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
      .abracadabracadabra { background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba (255, 255, 255, 1)); }
    `,

			message: maxLineLength.messages.expected(80),
		},
	],
});

testRule({
	ruleName: stringQuotes.ruleName,
	config: ['single'],

	accept: [
		{
			code: `
      /* stylelint-disable */
      .foo { content: "horse"; }
      /* stylelint-enable */
    `,
		},
		{
			code: `
      /* stylelint-disable string-quotes */
      .foo { content: "horse"; }
      /* stylelint-enable string-quotes */
    `,
		},
	],

	reject: [
		{
			code: `
      /* stylelint-disable block-no-empty */
      .foo { content: "horse"; }
      /* stylelint-enable block-no-empty */
    `,

			message: stringQuotes.messages.expected('single'),
		},
		{
			code: `
      /* stylelint-disable string-quotes */
      .foo { content: "horse"; }
      /* stylelint-enable string-quotes */
      .foo { content: "horse"; }
    `,

			message: stringQuotes.messages.expected('single'),
		},
	],
});
