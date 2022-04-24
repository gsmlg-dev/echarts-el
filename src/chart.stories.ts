import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import './chart';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'echarts-el/chart',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {},
} as Meta;

export interface ElementProps {
  width: string;
  height: string;
  loading: boolean;
  data: object;
}

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template: Story<ElementProps> = ({ width, height, loading, data }) =>
  html`<div style="width: ${width}; height: ${height};">
    <g-chart ?loading=${loading}>${JSON.stringify(data)}</g-chart>
  </div>`;

export const Top = Template.bind({});

Top.args = {
  width: '640px',
  height: '480px',
  loading: false,
  data: {
    tooltip: {
      show: true,
    },
    grid: {
      x: 0,
      y: 0,
      x2: 0,
      y2: 0,
    },
    xAxis: [
      {
        min: 0,
        scale: true,
        type: 'value',
      },
    ],
    yAxis: [
      {
        type: 'category',
        show: false,
        data: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06'],
      },
    ],
    series: [
      {
        type: 'bar',
        data: [2123, 3354, 4012, 2175, 5800, 2630],
      },
    ],
  },
};

export const Pie = Template.bind({});

Pie.args = {
  width: '640px',
  height: '480px',
  loading: false,
  data: {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: [],
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        sort: 'ascending',
        center: ['50%', '55%'],
        selectedMode: 'single',
        data: [{ name: 'NODATA', value: 1 }],
        itemStyle: { normal: { labelLine: { length: 30 } } },
      },
    ],
  },
};

export const Line = Template.bind({});

Line.args = {
  width: '100%',
  height: '480px',
  loading: false,
  data: {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a} : ${c}',
    },
    toolbox: {
      show: false,
    },
    grid: {
      x: 80,
      x2: 80,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'ETH Price',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [400, 500, 1000, 2000, 4000, 2000, 3000, 2000],
      },
    ],
  },
};

export const Radar = Template.bind({});

Radar.args = {
  width: '100%',
  height: '480px',
  loading: false,
  data: {
    title: {
      text: 'Basic Radar Chart',
    },
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending',
          },
        ],
      },
    ],
  },
};

export const Graph = Template.bind({});

Graph.args = {
  width: '100%',
  height: '480px',
  loading: false,
  data: {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: 'Best in the World!',
            fontSize: 80,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 3000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent',
                },
              },
              {
                percent: 1,
                style: {
                  fill: 'orange',
                },
              },
            ],
          },
        },
      ],
    },
  },
};
