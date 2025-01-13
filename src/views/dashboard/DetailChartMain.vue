<template>
  <canvas v-if="check" ref="chart"></canvas>

  <hr style="width: 90%; margin: auto; padding: 10px" />
  <div class="container">
    <div v-for="(e, i) in lable" :key="i" :class="i % 2 == 0 ? 'item' : 'item2'">
      <p
        @click="
          () => {
            openDialog(e)
          }
        "
      >
        {{ e }}
      </p>
    </div>
  </div>

  <v-dialog v-model="dialog" persistent>
    <!-- <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps"> Open Dialog </v-btn>
    </template> -->

    <v-card
      prepend-icon="mdi-map-marker"
      :text="load ? 'đang tính toán .... ' : dataDialog"
      title="Tên sản phẩm"
    >
      <div v-if="forecastData" style="margin: auto; width: 80%; height: max-content">
        <img :src="'data:image/png;base64,' + forecastData.image" style="width: 100%" />
        <!-- {{ forecastData.img }} -->
      </div>
      <template v-slot:actions>
        <v-btn @click="() => getForecast(dataDialog)"> Biểu đồ xu hướng </v-btn>

        <v-btn @click="dialog = false"> Bỏ qua </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js/auto' // Dùng 'auto' để tự động đăng ký tất cả các thành phần cần thiết
import { get_count_product_by_invoice, get_forecast_product_by_invoice } from '../../api/ApiAdmin'

export default {
  name: 'SimpleBarChart',
  setup() {
    const chart = ref(null)
    const check = ref(true)
    const data = ref([])
    const lable = ref([])
    const dialog = ref(false)
    const dataDialog = ref('')
    const load = ref(false)
    // const image = ref('')
    const forecastData = ref(null)
    const openDialog = (value) => {
      // image.value = ''
      forecastData.value = null
      dialog.value = !dialog.value
      dataDialog.value = value
    }
    // let mychar = null

    const getData = async () => {
      const response = await get_count_product_by_invoice()
      console.log('check count : ', response.data)
      data.value = response.data.data.map((e) => e.total_quantity)
      lable.value = response.data.data.map((e) => e.name)
      // mychar.update()
      console.log('data , lable : ', data.value, lable.value)
      // check.value = true
      myChar()
    }

    // dự đoán xu hướng sản phẩm
    const getForecast = async (name) => {
      load.value = true
      const response = await get_forecast_product_by_invoice(name)
      forecastData.value = response.data
      console.log('du doan : ', forecastData.value)
      load.value = false
    }

    const myChar = () => {
      new Chart(chart.value, {
        type: 'bar',
        data: {
          labels: lable.value,
          datasets: [
            {
              label: 'Sản phẩm',
              data: data.value,
              backgroundColor: 'gray', //['red', 'green', 'blue', 'orange', 'brown'],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Danh sách sản phẩm được mua trong tuần này',
            },
          },
        },
      })
    }
    onMounted(() => {
      getData()
    })

    return {
      chart,
      check,
      lable,
      dialog,
      openDialog,
      dataDialog,
      load,
      getForecast,

      forecastData,
    }
  },
}
</script>
<style scoped>
.container {
  height: 20vh;
  overflow: scroll;
}
.item {
  width: 90%;
  padding: 5px;
  cursor: pointer;
}
.item2 {
  width: 90%;
  padding: 5px;
  background-color: rgb(183, 183, 183);
  cursor: pointer;
}
</style>

