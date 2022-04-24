/**
 * @jest-environment jsdom
 */

import '../chart';

describe('chart-el element', () => {
  it('Expect <echarts-el /> element is defined', () => {
    expect(customElements.get('echarts-el')).toBeDefined();
  });
});
