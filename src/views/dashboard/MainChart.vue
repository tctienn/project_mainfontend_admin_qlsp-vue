<template>
  <CChart type="line" :data="data" :options="options" ref="mainChartRef" />
</template>

<script>
import { ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
// import { getStyle } from '@coreui/utils'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export default {
  name: 'MainChartExample',
  components: {
    CChart,
  },
  setup() {
    const mainChartRef = ref()
    const border = 'rgb(210, 210, 210)'
    const data = {
      labels: ['thứ 2', 'thứ 3', 'thú 4', 'thú 5', 'thứ 6', 'thứ 7', 'chủ nhật'],
      datasets: [
        {
          label: 'hóa đơn mua',
          backgroundColor: `rgba(12, 52, 230, 0.1)`,
          borderColor: 'rgb(24, 15, 184)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
          ],
          fill: true,
        },
        {
          label: 'hóa đơn đơn chờ sử lý',
          backgroundColor: `rgba(255, 235, 14, 0)`,
          borderColor: 'rgb(217, 255, 0)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
          ],
          fill: true,
        },
        {
          label: 'hóa đơn bị hủy/lỗi',
          backgroundColor: `rgba(255, 3, 3, 0.11)`,
          borderColor: 'rgb(255, 0, 0)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
          ],
          fill: true,
        },
        // {
        //   label: 'hóa đơn bị hủy/lỗi',
        //   backgroundColor: 'red',
        //   borderColor: 'rgb(237, 20, 230)',
        //   pointHoverBackgroundColor: 'rgb(26, 229, 239)',
        //   borderWidth: 4,
        //   data: [
        //     random(50, 200),
        //     random(50, 200),
        //     random(50, 200),
        //     random(50, 200),
        //     random(50, 200),
        //     random(50, 200),
        //     random(50, 200),
        //   ],
        // },
        // {
        //   label: 'My Third dataset',
        //   backgroundColor: 'transparent',
        //   borderColor: getStyle('--cui-danger'),
        //   pointHoverBackgroundColor: getStyle('--cui-danger'),
        //   borderWidth: 1,
        //   borderDash: [8, 5],
        //   data: [65, 65, 65, 65, 65, 65, 65],
        // },
      ],
    }

    const options = {
      maintainAspectRatio: false,
      tooltips: {
        titleFontSize: 16,
        titleFontColor: '#ff0000',
        titleAlign: 'center',
        titleSpacing: 2,
        titleMarginBottom: 10,
        // các thuộc tính khác...
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: border, //getStyle('--cui-border-color-translucent'),
            drawOnChartArea: false,
          },
          ticks: {
            color: border, //getStyle('--cui-body-color'),
          },
        },
        y: {
          beginAtZero: true,
          border: {
            color: border, //getStyle('--cui-border-color-translucent'),
          },
          grid: {
            color: border, //getStyle('--cui-border-color-translucent'),
          },
          max: 250,
          ticks: {
            color: border, //getStyle('--cui-body-color'),
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 10,
          hoverBorderWidth: 10,
        },
      },
    }

    // onMounted(() => {
    //   document.documentElement.addEventListener('ColorSchemeChange', () => {
    //     if (mainChartRef.value) {
    //       mainChartRef.value.chart,
    //         (options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent'))
    //       mainChartRef.value.chart,
    //         (options.scales.x.grid.color = getStyle('--cui-border-color-translucent'))
    //       mainChartRef.value.chart, (options.scales.x.ticks.color = getStyle('--cui-body-color'))
    //       mainChartRef.value.chart,
    //         (options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent'))
    //       mainChartRef.value.chart,
    //         (options.scales.y.grid.color = getStyle('--cui-border-color-translucent'))
    //       mainChartRef.value.chart, (options.scales.y.ticks.color = getStyle('--cui-body-color'))
    //       mainChartRef.value.chart.update()
    //     }
    //   })
    // })

    return {
      data,
      mainChartRef,
      options,
    }
  },
}
</script>
