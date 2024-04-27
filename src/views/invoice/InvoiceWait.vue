<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH HÓA ĐƠN CHỜ SỬ LÝ (CHƯA GIAO)</strong>
        </CCardHeader>
        <CCardBody>
          <div class="text-body-secondary small">
            <input
              type="text"
              style="border-radius: 2px; margin-right: 5px"
              placeholder="nhập mã hóa đơn"
              v-model="textSearch"
            />
            <button @click="clickSearch"><v-icon>mdi-magnify</v-icon></button>
          </div>
          <br />
          <div style="width: 100%; overflow: scroll">
            <table style="width: max-content">
              <tr>
                <th>ID</th>
                <th>Mã giao dịch</th>
                <th>Số hóa đơn</th>
                <th>Tổng tiền</th>
                <th>Ngân hàng</th>
                <th>Nội dung</th>
                <th>Trạng thái</th>
                <th>Sản phẩm</th>
                <th>Giao hàng</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Tên người nhận</th>
                <th>Ngày tạo</th>
                <th>Chức năng</th>
              </tr>
              <tr
                v-for="(e, i) in data?.content"
                :key="i"
                :style="{
                  backgroundColor:
                    e.giaohang == 'succes'
                      ? 'rgb(221, 250, 218)'
                      : e.giaohang == 'false'
                      ? 'rgb(232, 171, 171)'
                      : 'rgb(239, 243, 173)',
                }"
              >
                <td>{{ e.id }}</td>
                <td>{{ e.magd }}</td>
                <td>{{ e.sohd }}</td>
                <td>{{ e.tongtien }}</td>
                <td>{{ e.nganhang }}</td>
                <td>{{ e.noidung }}</td>
                <td>{{ e.trangthai }}</td>
                <td>
                  <textarea name="" id="" v-model="e.sp" readonly cols="50" rows="5"></textarea>
                </td>
                <td>
                  {{
                    e.giaohang == 'wait'
                      ? 'chờ giao'
                      : e.giaohang == 'succes'
                      ? 'đã giao'
                      : 'đã hủy'
                  }}
                </td>
                <td>{{ e.diachi }}</td>
                <td>{{ e.gmail }}</td>
                <td>{{ e.sdt }}</td>
                <td>{{ e.tennguoinhan }}</td>
                <td>{{ e.ngaytao }}</td>
                <td>
                  <button
                    v-if="e.trangthai == 'succes' && e.giaohang == 'wait'"
                    style="background-color: rgb(51, 206, 108); padding: 5px; color: white"
                    @click="clickUpdateGiaohang(e.sohd, 'succes')"
                  >
                    xác nhận
                  </button>
                  <button
                    v-if="e.trangthai == 'succes' && e.giaohang == 'wait'"
                    style="background-color: rgb(216, 141, 100); padding: 5px; color: white"
                    @click="clickUpdateGiaohang(e.sohd, 'false')"
                  >
                    hủy
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <v-container>
            <v-pagination :length="totalPages" v-model="page"></v-pagination>
          </v-container>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
      
      <script>
import { ref, watch } from 'vue'
import { get_invoiceBySohd, get_invoiceWait, post_updategiaohang } from '../../api/ApiAdmin'

// import { fa } from 'vuetify/locale'

export default {
  name: 'InvoiCwait',
  setup() {
    const totalPages = ref(0)
    const page = ref(1)
    const data = ref([])
    const textSearch = ref('')
    const getInvoices = async (datap) => {
      const respon = await get_invoiceWait(datap)
      data.value = respon.data
      totalPages.value = respon.data.totalPages

      textSearch.value = ''
    }
    getInvoices({
      page: page.value,
      size: 5,
      sort: 'id,asc',
    })

    const clickSearch = async () => {
      if (textSearch.value == '') {
        getInvoices({
          page: page.value,
          size: 5,
          sort: 'id,asc',
        })
        return
      }
      const respon = await get_invoiceBySohd(textSearch.value)
      data.value = { content: [respon.data] }
    }
    const clickUpdateGiaohang = async (sohd, e) => {
      const check = confirm(
        ' bạn muốn ' + (e == 'succes' ? ' xác nhận ' : 'hủy') + ' hóa đơn ' + sohd,
      )
      if (!check) {
        return
      }
      await post_updategiaohang(sohd, e).then(() =>
        getInvoices({
          page: page.value,
          size: 5,
          sort: 'id,asc',
        }),
      )
    }

    watch(page, (newData, oldData) => {
      if (newData === oldData) {
        console.log('watch', newData, oldData)
      }
      getInvoices({
        page: page.value,
        size: 5,
        sort: 'id,asc',
      })
    })

    return {
      data,
      totalPages,
      page,
      clickSearch,
      textSearch,
      clickUpdateGiaohang,
    }
  },
}
</script>
      
    <style scoped>
td {
  padding: 5px;
}
</style>
    
    <style scoped>
.input-container {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  background-color: rgb(208, 208, 208);
}

.form-group {
  margin: 10px;
  /* margin-bottom: 1rem; */
  width: 30%;
  background-color: rgb(255, 255, 255);
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  box-sizing: border-box;
}

.form-group ul {
  padding-left: 1rem;
}

.form-group img {
  max-width: 100%;
  height: auto;
}

input,
select {
  padding: 4px;
  border: solid 1px rgb(139, 139, 139);
}
</style>
    
    <!-- imgs -->
    <style scoped>
.image-container {
  display: flex;
  overflow-x: auto;
  width: 100%; /* Chiều rộng cố định */
  height: 150px; /* Chiều cao cố định */
  border: solid 1px blue;
}

.image-box {
  width: 200px; /* Chiều rộng của thẻ div con */
  aspect-ratio: 2/2; /* Chiều cao bằng với thẻ div cha */
  position: relative;
  padding: 10px;
  display: flex;
}

.image {
  width: 100%;
  height: 80% !important;
}

.remove-button {
  position: absolute;
  bottom: 0;
  width: 90%;
  text-align: center;
  background-color: rgb(170, 22, 148);
  color: white;
  height: 20%;
}

.add-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-image-text {
  font-size: 2em;
}

td {
  font-size: 10px;
}
th {
  font-size: 10px;
  padding: 5px;
}
</style>
    