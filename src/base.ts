import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

import * as echarts from 'echarts';

export class ChartBase extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      width: inherit;
      height: inherit;
    }
    #container {
      display: flex;
      flex: 1 1 auto;
    }
  `;

  get chartContainer() {
    return this.renderRoot.querySelector('#container') as HTMLDivElement;
  }

  chart: echarts.ECharts | null;
  resizeObserver: ResizeObserver | null;

  @property({ type: String, attribute: true })
  renderer: string = 'svg';

  @property({ type: Boolean, attribute: true, reflect: true })
  loading: boolean = false;

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.unobserve(this.parentElement);
    this.chart?.dispose();
  }

  override firstUpdated() {
    this.chart = echarts.init(this.chartContainer, {}, { renderer: this.renderer });
    this.resizeObserver = new ResizeObserver((_entries) => {
      this.chart.resize();
    });
    this.resizeObserver.observe(this.parentElement);
  }

  override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'loading') {
      this.loading = value != null;
      this.resetChart();
    }
  }

  override render() {
    return html` <div id="container"></div> `;
  }

  override updated(_p) {
    super.updated(_p);

    this.updateChart();
  }

  updateChart() {
    this.chart.setOption(this.options);
  }

  resetChart() {
    this.chart.setOption(this.options, true);
  }

  get options() {
    if (this.loading) {
      return this.loadingOptions;
    }
    return {};
  }

  get loadingOptions() {
    return {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((_val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: '#5470c6',
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    };
  }
}
