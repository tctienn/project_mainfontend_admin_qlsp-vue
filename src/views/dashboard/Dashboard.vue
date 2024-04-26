<template>
  <div>
    <!-- <WidgetsStatsA class="mb-4" /> -->
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">biểu đồ</h4>
                <div class="small text-body-secondary">biến động giao dịch trong tuần</div>
                <div>
                  <div style="display: flex">
                    <div
                      style="
                        width: 20px;
                        border-radius: 20px;
                        aspect-ratio: 2/2;
                        background-color: blue;
                      "
                    ></div>
                    hóa đơn mua
                  </div>
                  <div style="display: flex">
                    <div
                      style="
                        width: 20px;
                        border-radius: 20px;
                        aspect-ratio: 2/2;
                        background-color: yellow;
                      "
                    ></div>
                    hóa đơn chờ sử lý
                  </div>
                  <div style="display: flex">
                    <div
                      style="
                        width: 20px;
                        border-radius: 20px;
                        aspect-ratio: 2/2;
                        background-color: rgb(196, 55, 55);
                      "
                    ></div>
                    hóa đơn bị hỷ/ lỗi
                  </div>
                </div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton @click="exportExcel" color="primary" class="float-end">
                  <CIcon icon="cil-cloud-download" />
                </CButton>
                <CButtonGroup
                  class="float-end me-3"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">tuần</CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
            <div style="margin-bottom: 100px; width: 100%">
              <CRow style="z-index: 1">
                <MainChart style="height: 300px; max-height: 300px; margin-top: 40px" />
              </CRow>
              <div style="text-align: center">biến động giao dịch trong tuần</div>
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow
              :xs="{ cols: 1, gutter: 4 }"
              :sm="{ cols: 2 }"
              :lg="{ cols: 4 }"
              :xl="{ cols: 5 }"
              class="mb-2 text-center"
            >
              <CCol>
                <CWidgetStatsC
                  class="mb-3"
                  :value="coutAdmin"
                  :progress="{ color: 'info', value: 75 }"
                  style="background-color: rgb(36, 18, 227); color: white"
                  title="Visitors"
                >
                  <template #icon
                    ><CIcon icon="cil-people" height="36" style="color: white"
                  /></template>
                  <template #title><div style="color: white">admin</div></template>
                </CWidgetStatsC>
              </CCol>
              <CCol>
                <CWidgetStatsC
                  class="mb-3"
                  :value="coutUser"
                  style="background-color: rgb(12, 235, 90); color: white"
                  :progress="{ color: 'info', value: 75 }"
                  title="Visitors"
                >
                  <template #icon
                    ><CIcon icon="cil-people" height="36" style="color: white"
                  /></template>
                  <template #title><div style="color: white">user</div></template>
                </CWidgetStatsC>
              </CCol>
              <CCol>
                <CWidgetStatsC
                  class="mb-3"
                  :value="coutUserWait"
                  style="background-color: rgb(228, 49, 153); color: white"
                  :progress="{ color: 'info', value: 20 }"
                  title="Visitors"
                >
                  <template #icon
                    ><CIcon icon="cil-people" height="36" style="color: white"
                  /></template>
                  <template #title>Tài khoản chưa xác thực</template>
                </CWidgetStatsC>
              </CCol>
              <CCol>
                <CWidgetStatsC
                  class="mb-3"
                  inverse
                  style="background-color: red; font-size: 15px"
                  :value="diskFree"
                  :progress="{ value: 75 }"
                  :title="'bộ nhớ Server trống GB'"
                >
                  <template #icon>
                    <CIcon icon="cil-speedometer" height="36" />
                    <div style="font-size: 10px">sử dụng: {{ dislUser }} GB</div>
                  </template>
                </CWidgetStatsC>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <!-- <WidgetsStatsD class="mb-4" /> -->
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader> Thông tin gần dây </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                      <div class="text-body-secondary small">Người dùng mới đăng ký</div>
                      <div class="fs-5 fw-semibold">9,123</div>
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
              </CCol>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                      <div class="text-body-secondary small">Đơn đang chờ sử lý</div>
                      <div class="fs-5 fw-semibold">78,623</div>
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0" />

                <div class="mb-5"></div>
              </CCol>
            </CRow>
            <br />
            <h2>Top 3 sản phẩm thịnh hành trong tuần này</h2>
            <div style="width: 50%">
              <CChart type="doughnut" :data="dataFormTopProduct" />
            </div>
            <br />
            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary"> Tên người dùng </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center">
                    số điện thoại
                  </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary"> gmail </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center">
                    số đơn đã mua
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody v-if="topUser.length > 0">
                <CTableRow v-for="(e, i) in topUser" :key="i">
                  <CTableDataCell class="text-center"> {{ i }} </CTableDataCell>
                  <CTableDataCell>
                    <div>{{ e.name }}</div>
                  </CTableDataCell>

                  <CTableDataCell>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="fw-semibold">{{ e.sdt }}</div>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <div class="fw-semibold">{{ e.gmail }}</div>
                  </CTableDataCell>
                  <CTableDataCell style="text-align: center"> {{ e.coun }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
// import avatar1 from '@/assets/images/avatars/1.jpg'
// import avatar2 from '@/assets/images/avatars/2.jpg'
// import avatar3 from '@/assets/images/avatars/3.jpg'
// import avatar4 from '@/assets/images/avatars/4.jpg'
// import avatar5 from '@/assets/images/avatars/5.jpg'
// import avatar6 from '@/assets/images/avatars/6.jpg'
import MainChart from './MainChart'
import { CChart } from '@coreui/vue-chartjs'
import {
  get_countAdmin,
  get_countUser,
  get_countUserWait,
  get_freeDisk,
  get_invoiceByWeek,
  get_TopUser,
  get_userDisk,
} from '../../api/ApiAdmin'
import { getTopProducts } from './CheckData'
import { ref } from 'vue'
import { exportDataToExcel } from './ExportFileExce'
export default {
  name: 'DashboSrd',
  components: {
    MainChart,
    CChart,
  },
  setup() {
    const coutAdmin = ref(0)
    const coutUser = ref(0)
    const coutUserWait = ref(0)
    const diskFree = ref(0)
    const dislUser = ref(0)
    const topUser = ref([])
    const invoiceByWeek = ref([])
    const count = async () => {
      const admin = await get_countAdmin()
      const user = await get_countUser()
      const userWait = await get_countUserWait()
      const disk = await get_freeDisk()
      const respondisk = await get_userDisk()
      const top = await get_TopUser()
      const invoiWeek = await get_invoiceByWeek()
      coutAdmin.value = admin.data
      coutUser.value = user.data
      coutUserWait.value = userWait.data
      diskFree.value = (disk.data.measurements[0].value / 1e9).toFixed(3) // gb
      dislUser.value = (respondisk.data.measurements[0].value / 1e9).toFixed(3) //gb
      topUser.value = top.data
      invoiceByWeek.value = invoiWeek.data
      console.log('invoice', invoiceByWeek.value)
    }
    count()
    const dataTopProduct = ref([
      ['name1', 1],
      ['name2', 1],
      ['name3', 1],
      ['otherProduct', 1],
    ])
    var dataFormTopProduct = ref({
      labels: [
        dataTopProduct.value[0][0],
        dataTopProduct.value[1][0],
        dataTopProduct.value[2][0],
        dataTopProduct.value[3][0],
      ],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [0, 0, 0, 0],
        },
      ],
    })

    const getDataTopProduct = async () => {
      dataTopProduct.value = [
        ['name1', 2],
        ['name2', 2],
        ['name3', 2],
        ['otherProduct', 2],
      ]
      // dataFormTopProduct.value.datasets[0].data = [2, 2, 2, 2]
      const rspon = await get_invoiceByWeek()

      dataTopProduct.value = getTopProducts(rspon.data)
      dataFormTopProduct.value.labels = [
        dataTopProduct.value[0][0],
        dataTopProduct.value[1][0],
        dataTopProduct.value[2][0],
        dataTopProduct.value[3][0],
      ]

      dataFormTopProduct.value.datasets[0].data = [
        dataTopProduct.value[0][1],
        dataTopProduct.value[1][1],
        dataTopProduct.value[2][1],
        dataTopProduct.value[3][1],
      ]
      dataFormTopProduct.value = { ...dataFormTopProduct.value }

      coutAdmin.value = 1
    }

    getDataTopProduct()

    const exportExcel = () => {
      const s = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 20, city: 'Chicago' },
        // Thêm dữ liệu của bạn ở đây
      ]
      exportDataToExcel(s, 'myFilsse', 'xls')
      // exportDataToExcel(myData, 'myFile', 'xls');
    }
    return {
      dataFormTopProduct,
      coutAdmin,
      coutUser,
      coutUserWait,
      diskFree,
      dislUser,
      topUser,

      exportExcel,
    }
  },
}
</script>
