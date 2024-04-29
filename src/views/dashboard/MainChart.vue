<template>
  <CChart v-if="checkload" type="line" :data="data" :options="options" ref="mainChartRef" />
</template>

<script>
import { onMounted, ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { get_invoiceByWeek } from '../../api/ApiAdmin'
import { processInvoiceData } from './CheckData'
// import { getStyle } from '@coreui/utils'

// const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export default {
  name: 'MainChartExample',
  components: {
    CChart,
  },
  setup() {
    const checkload = ref(false)
    const mainChartRef = ref()
    const border = 'rgb(210, 210, 210)'

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
          max: 10000000,
          ticks: {
            color: border, //getStyle('--cui-body-color'),
            maxTicksLimit: 5,
            // stepSize: Math.ceil(250 / 5),
            stepSize: Math.ceil(10000000 / 4),
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

    onMounted(() => {
      document.documentElement.addEventListener('ColorSchemeChange', () => {
        // data.value.datasets[1].data = [0, 0, 200, 0, 0, 0]
        // alert('ay')
        // mainChartRef.value.update()
        // if (mainChartRef.value) {
        //   mainChartRef.value.chart,
        //     (options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent'))
        //   mainChartRef.value.chart,
        //     (options.scales.x.grid.color = getStyle('--cui-border-color-translucent'))
        //   mainChartRef.value.chart, (options.scales.x.ticks.color = getStyle('--cui-body-color'))
        //   mainChartRef.value.chart,
        //     (options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent'))
        //   mainChartRef.value.chart,
        //     (options.scales.y.grid.color = getStyle('--cui-border-color-translucent'))
        //   mainChartRef.value.chart, (options.scales.y.ticks.color = getStyle('--cui-body-color'))
        //   mainChartRef.value.chart.update()
        // }
      })
    })
    // const weekData = {
    //   Monday: [],
    //   Tuesday: [],
    //   Wednesday: [],
    //   Thursday: [],
    //   Friday: [],
    //   Saturday: [],
    //   Sunday: [],
    // }

    // data.value.datasets[2].data = [0, 100, 0, 0, 0, 0]

    // const a = () => {
    //   return 1000
    // }

    /////////////////////////////
    const data = ref({
      labels: ['thứ 2', 'thứ 3', 'thú 4', 'thú 5', 'thứ 6', 'thứ 7', 'chủ nhật'],
      datasets: [
        {
          label: 'hóa đơn mua',
          backgroundColor: `rgba(12, 52, 230, 0.1)`,
          borderColor: 'rgb(24, 15, 184)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: true,
        },
        {
          label: 'hóa đơn đơn chờ sử lý',
          backgroundColor: `rgba(255, 235, 14, 0)`,
          borderColor: 'rgb(217, 255, 0)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [0, 0, 0, 0, 0, 0, 0],
          fill: true,
        },
        {
          label: 'hóa đơn bị hủy/lỗi',
          backgroundColor: `rgba(255, 3, 3, 0.11)`,
          borderColor: 'rgb(255, 0, 0)',
          // pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [0, 0, 0, 0, 0, 0],
          fill: true,
        },
      ],
    })
    /////////////
    const findterdata = (e) => {
      // return 1000
      let findter = ref({
        cussces: [],
        wait: [],
        false: [],
      })
      const datadind = processInvoiceData(e)
      let cusses = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      }
      for (let day in datadind) {
        cusses[day] = datadind[day].filter((item) => item.trangthai === 'succes')
      }
      findter.value.cussces = [
        cusses.Monday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Tuesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Wednesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Thursday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Friday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Saturday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Sunday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
      ]

      // console.log('ay', findter.value)
      data.value.datasets[0].data = findter.value.cussces
      data.value = { ...data.value }
      // wait
      for (let day in datadind) {
        cusses[day] = datadind[day].filter((item) => item.trangthai === 'wait')
      }
      findter.value.wait = [
        cusses.Monday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Tuesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Wednesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Thursday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Friday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Saturday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Sunday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
      ]
      data.value.datasets[2].data = findter.value.wait
      data.value = { ...data.value }
      /////////////false
      for (let day in datadind) {
        cusses[day] = datadind[day].filter((item) => item.trangthai === 'false')
      }
      findter.value.false = [
        cusses.Monday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Tuesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Wednesday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Thursday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Friday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
        cusses.Saturday.reduce(
          (accumulator, currentValue) => accumulator + currentValue.tongtien,
          0,
        ),
        cusses.Sunday.reduce((accumulator, currentValue) => accumulator + currentValue.tongtien, 0),
      ]
      data.value.datasets[2].data = findter.value.false
      data.value = { ...data.value }
      checkload.value = true // load cho biểu đồ hoạt động
      console.log('ay', datadind)
      // data.value.datasets[1].data = [0, 100, 0, 0, 0, 0]
      // console.log('mainnchar', findter.value)
    }
    const getDatachar = async () => {
      await get_invoiceByWeek().then((e) => findterdata(e.data))
    }
    getDatachar()

    // const ay = () => {
    //   console.log('ay')
    //   data.value.datasets[1].data = [0, 0, 100, 0, 0, 0]
    //   this.$refs.mainChartRef.update()
    // }

    // onMounted(() => {
    //   data.value.datasets[1].data = [0, 0, 200, 0, 0, 0]
    // })
    /////////////////////
    return {
      data,
      mainChartRef,
      options,
      checkload,
    }
  },
}
</script>
