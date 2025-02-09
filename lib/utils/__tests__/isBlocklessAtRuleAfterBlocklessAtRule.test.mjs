import isBlocklessAtRuleAfterBlocklessAtRule from '../isBlocklessAtRuleAfterBlocklessAtRule.js';
import postcss from 'postcss';

describe('isBlocklessAtRuleAfterBlocklessAtRule', () => {
	it('returns false with the first node', () => {
		const root = postcss.parse(`
      @import 'x.css'
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[0])).toBe(false);
	});

	it('returns false with a non-at-rule', () => {
		const root = postcss.parse(`
      foo {}
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[0])).toBe(false);
	});

	it('returns false when blockless-at-rule follows a non-at-rule', () => {
		const root = postcss.parse(`
      foo {}
      @import 'x.css';
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[1])).toBe(false);
	});

	it('returns false when blockless-at-rule follows a non-blockless-at-rule', () => {
		const root = postcss.parse(`
      @media {}
      @import 'x.css';
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[1])).toBe(false);
	});

	it('returns false when non-blockless-at-rule follows a blockless-at-rule', () => {
		const root = postcss.parse(`
      @import 'y.css';
      @media {}
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[1])).toBe(false);
	});

	it('returns true when blockless-at-rule follows a blockless-at-rule', () => {
		const root = postcss.parse(`
      @import 'y.css';
      @import 'x.css';
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[1])).toBe(true);
	});

	it('returns true when blockless-at-rule follows a blockless-at-rule with a shared-line comment', () => {
		const root = postcss.parse(`
      @import 'y.css'; /* comment */
      @import 'x.css';
    `);

		expect(isBlocklessAtRuleAfterBlocklessAtRule(root.nodes[2])).toBe(true);
	});
});
