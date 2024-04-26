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
                    <div style="width: 15px; aspect-ratio: 2/2; background-color: blue"></div>
                    hóa đơn mua
                  </div>
                  <div style="display: flex">
                    <div style="width: 15px; aspect-ratio: 2/2; background-color: yellow"></div>
                    hóa đơn chờ sử lý
                  </div>
                  <div style="display: flex">
                    <div
                      style="width: 15px; aspect-ratio: 2/2; background-color: rgb(196, 55, 55)"
                    ></div>
                    hóa đơn bị hỷ/ lỗi
                  </div>
                </div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton color="primary" class="float-end">
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
                  value="87.500"
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
                  value="87.500"
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
                  style="background-color: red"
                  value="385"
                  :progress="{ value: 75 }"
                  :title="'bộ nhớ Server trống '"
                >
                  <template #icon
                    ><CIcon icon="cil-speedometer" height="36" />
                    <div>sử dụng:</div></template
                  >
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
                  <CTableHeaderCell class="bg-body-secondary"> Activity </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in tableExample" :key="item.name">
                  <CTableDataCell class="text-center">
                    <CAvatar size="md" :src="item.avatar.src" :status="item.avatar.status" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{{ item.user.name }}ssssssss</div>
                    <div class="small text-body-secondary text-nowrap">
                      <span>{{ item.user.new ? 'New' : 'Recurring' }}</span> |
                      {{ item.user.registered }}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon size="xl" :name="item.country.flag" :title="item.country.name" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="fw-semibold">{{ item.usage.value }}%</div>
                      <div class="text-nowrap text-body-secondary small ms-3">
                        {{ item.usage.period }}
                      </div>
                    </div>
                    <CProgress thin :color="item.usage.color" :value="item.usage.value" />
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon size="xl" :name="item.payment.icon" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="small text-body-secondary">Last login</div>
                    <div class="fw-semibold text-nowrap">
                      {{ item.activity }}
                    </div>
                  </CTableDataCell>
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
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import MainChart from './MainChart'
import { CChart } from '@coreui/vue-chartjs'
import { get_invoiceByWeek } from '../../api/ApiAdmin'
import { getTopProducts } from './CheckData'
import { ref } from 'vue'
export default {
  name: 'DashboSrd',
  components: {
    MainChart,
    CChart,
  },
  setup() {
    const coutAdmin = ref(0)
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

    const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'USA', flag: 'cif-us' },
        usage: {
          value: 50,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
        activity: '10 sec ago',
      },
      {
        avatar: { src: avatar2, status: 'danger' },
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Brazil', flag: 'cif-br' },
        usage: {
          value: 22,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'info',
        },
        payment: { name: 'Visa', icon: 'cib-cc-visa' },
        activity: '5 minutes ago',
      },
      {
        avatar: { src: avatar3, status: 'warning' },
        user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
        country: { name: 'India', flag: 'cif-in' },
        usage: {
          value: 74,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'warning',
        },
        payment: { name: 'Stripe', icon: 'cib-cc-stripe' },
        activity: '1 hour ago',
      },
      {
        avatar: { src: avatar4, status: 'secondary' },
        user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
        country: { name: 'France', flag: 'cif-fr' },
        usage: {
          value: 98,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'danger',
        },
        payment: { name: 'PayPal', icon: 'cib-cc-paypal' },
        activity: 'Last month',
      },
      {
        avatar: { src: avatar5, status: 'success' },
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Spain', flag: 'cif-es' },
        usage: {
          value: 22,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'primary',
        },
        payment: { name: 'Google Wallet', icon: 'cib-cc-apple-pay' },
        activity: 'Last week',
      },
      {
        avatar: { src: avatar6, status: 'danger' },
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Poland', flag: 'cif-pl' },
        usage: {
          value: 43,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Amex', icon: 'cib-cc-amex' },
        activity: 'Last week',
      },
    ]

    return {
      tableExample,

      dataFormTopProduct,
      coutAdmin,
    }
  },
}
</script>
