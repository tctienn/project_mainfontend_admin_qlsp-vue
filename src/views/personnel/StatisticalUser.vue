<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Danh sách tài khoản nhân viên</strong>
          <CButton @click="exportFileExcel" style="border: none"
            >xuất hóa file thống kê lương toàn bộ nhân viên</CButton
          >
        </CCardHeader>
        <CCardBody>
          <!-- Bảng hiển thị danh sách người dùng -->
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>SCCCD</th>
                <th>Gmail</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in users" :key="e.id">
                <td>{{ e.id }}</td>
                <td>{{ e.name }}</td>
                <td>{{ e.sdt }}</td>
                <td>{{ e.address }}</td>
                <td>{{ e.gender }}</td>
                <td>{{ e.birth }}</td>
                <td>{{ e.scccd }}</td>
                <td>{{ e.gmail }}</td>
                <td>{{ e.status }}</td>
                <td>
                  <CButton @click="openDialog(e)">Xem chi tiết</CButton>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Phân trang -->
          <div class="pagination">
            <CButton @click="prevPage" :disabled="currentPage === 0">Trang trước</CButton>
            <span>Trang {{ currentPage }}</span>
            <CButton @click="nextPage" :disabled="currentPage > totalPages">Trang sau</CButton>
          </div>

          <!-- Dialog hiển thị thông tin chi tiết -->
          <v-dialog v-model="isDialogOpen" max-width="600">
            <v-card>
              <v-card-title class="headline">Thông tin chi tiết người dùng</v-card-title>
              <v-card-text>
                <div v-if="selectedUser">
                  <p><strong>Tên:</strong> {{ selectedUser.name }}</p>
                  <p><strong>SĐT:</strong> {{ selectedUser.sdt }}</p>
                  <p><strong>Địa chỉ:</strong> {{ selectedUser.address }}</p>
                  <p><strong>Giới tính:</strong> {{ selectedUser.gender }}</p>
                  <p><strong>Ngày sinh:</strong> {{ selectedUser.birth }}</p>
                  <p><strong>SCCCD:</strong> {{ selectedUser.scccd }}</p>
                  <p>
                    <strong>ảnh SCCCD:</strong> <img :src="selectedUser.imageCCCCD" />
                    <strong>ảnh mặt:</strong> <img :src="selectedUser.imageFace" />
                  </p>
                  <p><strong>Gmail:</strong> {{ selectedUser.gmail }}</p>
                  <p><strong>Trạng thái:</strong> {{ selectedUser.status }}</p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="exportFileByUser(selectedUser)"
                  >Xuất file excel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Đóng</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import { ref } from 'vue'
import {
  get_grapUsers_byStatus,
  get_groupInvce_byUserGrap,
  get_invoiceGrap_byIdGrap_andStatus,
  // update_status_userGrap,
} from '../../api/ApiRequest'
import { downloadExcel } from './ExpostExcelFile'

export default {
  name: 'StatisticalUser',
  setup() {
    // Dữ liệu tạm thời
    const users = ref([])

    const isDialogOpen = ref(false)
    const selectedUser = ref(null)

    // Phân trang
    const currentPage = ref(0)
    // let pageSize = ref(0)
    let totalPages = ref(0)

    const openDialog = (user) => {
      selectedUser.value = user
      isDialogOpen.value = true
    }

    const closeDialog = () => {
      isDialogOpen.value = false
      selectedUser.value = null
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        getData(currentPage.value)
      }
    }

    const prevPage = () => {
      if (currentPage.value > 0) {
        currentPage.value--
        getData(currentPage.value)
      }
    }

    const getData = async (page) => {
      const response = await get_grapUsers_byStatus('working', page)
      console.log('data', response.data.content)
      users.value = response.data.content
      totalPages.value = response.data.totalPages
    }
    getData(currentPage.value)

    // const dataTitileGroupFile = ref({
    //   id: '',
    //   sodon: '',
    //   idGrap: '',
    //   comment: '',
    //   time_get: '',
    //   time_done: '',
    //   imageAccess: '',
    //   priceForGrap: '',
    //   status: '',
    // })
    const dataTitileGroupFile = ref({
      idGrap: '', // ID grap
      tongHoaDon: 0, // Tổng số hóa đơn
      tongSoTien: 0, // Tổng số tiền
      trangThai: '', // Trạng thái
      chiTietHoaDon: '', // Chi tiết hóa đơn
    })
    const dataGroupFile = ref([])
    const exportFileExcel = async () => {
      if (confirm('Xác nhận xuất file thống kê lương nhân viên trong tháng này')) {
        //   update_status_userGrap(id, 'false').then((e) => downloadExcel(e,))
        const response = await get_groupInvce_byUserGrap()
        dataGroupFile.value = response.data
        console.log('tổng đơn ', response.data)
        dataGroupFile.value.unshift(dataTitileGroupFile.value)
        downloadExcel(
          dataGroupFile.value,
          'danh sách thống kê lương toàn bộ  hóa đơn nhân viên tháng này',
          'usergrapiinvoice',
        )
      }
    }
    const exportFileByUser = async (e) => {
      if (confirm('Xác nhận xuất file thống kê lương nhân viên trong tháng này')) {
        //   update_status_userGrap(id, 'false').then((e) => downloadExcel(e,))
        const response = await get_invoiceGrap_byIdGrap_andStatus(e.id, 'success')
        const responsefalse = await get_invoiceGrap_byIdGrap_andStatus(e.id, 'false')
        // console.log('datassss', e.id)
        // alert('ay' + e.id + response.data[0].name)
        downloadExcel(
          response.data,
          'danh sách thống kê đơn hàng của nhân viên ' + e.name + ' tháng này',
          'usergrapiinvoice',
        )
        downloadExcel(
          responsefalse.data,
          'danh sách thống kê đơn hàng nhân viên ' + e.name + ' đã hủy tháng này',
          'userfalseinvoice',
        )
      }
    }
    return {
      users,
      isDialogOpen,
      selectedUser,
      openDialog,
      closeDialog,
      currentPage,

      totalPages,
      nextPage,
      prevPage,
      exportFileExcel,
      exportFileByUser,
    }
  },
}
</script>
  
  <style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination span {
  margin: 0 10px;
}

img {
  width: 100px;
  aspect-ratio: 2/2;
}
</style>
  