<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Quản lý thông báo</strong>
        </CCardHeader>
        <CCardBody>
          <!-- Bảng hiển thị thông báo -->
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.body }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <button
                    @click="
                      () => {
                        hadnleDeleteNotification(item)
                      }
                    "
                  >
                    xóa thông báo
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { ref, watch } from 'vue'
import { notify } from '../../api/ApiLogin'
import { delete_notficatios, get_notficatios } from '../../api/ApiRequest'

export default {
  name: 'NotiFication',
  setup() {
    const data = ref([])
    const page = ref(1)
    const totalPages = ref(0)
    const dataInput = ref({
      priceBase: null,
      priceOnKM: null,
    })

    const getData = async () => {
      const respon = await get_notficatios(page.value - 1)
      console.log('data page ', page.value)
      data.value = respon.data.content
      totalPages.value = respon.data.totalPages
    }
    getData()

    const hadnleDeleteNotification = async (e) => {
      if (confirm('bạn có chắc muốn xóa thông báo này ?')) {
        await delete_notficatios(e)
        notify('xóa thành công thông báo', 'success')
        location.reload()
      }
    }

    watch(page, (newData, oldData) => {
      if (newData === oldData) {
        console.log('watch', newData, oldData)
      }

      getData()
    })

    return { data, dataInput, hadnleDeleteNotification, totalPages, page }
  },
}
</script>

<style scoped>
* {
  font-size: 15px;
  color: rgb(94, 94, 94);
}
input {
  font-size: 12px;
  padding: 5px;
  border: solid 1px rgb(112, 112, 112);
}
button {
  background-color: rgb(115, 100, 226);
  border: solid 1px rgb(152, 152, 152);
  padding: 2px 5px;
  color: white;
  border-radius: 2px;
}
.boxTex {
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: solid 1px black;
  padding: 5px;
  text-align: left;
}

th {
  background-color: rgb(230, 230, 230);
}
</style>
