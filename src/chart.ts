import { customElement } from 'lit/decorators.js';

import { ChartBase } from './base';

@customElement('echarts-el')
export class Chart extends ChartBase {
  observer: MutationObserver | null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  override firstUpdated() {
    super.firstUpdated();
    this.observer = new MutationObserver(() => {
      this.updateChart();
    });
    this.observer.observe(this, { subtree: true, childList: true, attributes: true });
  }

  override get options() {
    if (this.loading) {
      return this.loadingOptions;
    }
    const data = JSON.parse(this.textContent);
    return data;
  }
}
