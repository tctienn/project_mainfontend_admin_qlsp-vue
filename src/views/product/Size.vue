<template>
  <CRow>
    <CCol :xs="5">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH KÍCH THƯỚC</strong>
        </CCardHeader>
        <CCardBody>
          <div v-if="!dataInput.id" class="boxTex">
            <button @click="clickAdd">Thêm</button>
            <br />
            <label>Tên kích thước</label>
            <br />
            <input type="text" v-model="dataInput.name" placeholder="nhập tên danh mục " />
          </div>
          <div v-else class="boxTex">
            <button @click="clickUpdate">Cập nhật</button>
            <button @click="clickDataItem(null)">bỏ qua</button>
            <br />
            <label>Tên kích thước</label>
            id : {{ dataInput.id }}
            <br />
            <input type="text" v-model="dataInput.name" placeholder="nhập tên danh mục " />
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="5">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>LIST KÍCH THƯỚC</strong>
        </CCardHeader>
        <CCardBody>
          <p class="text-body-secondary small">click vào tên để cập nhật nội dung</p>
          <table style="width: 100%; border: solid 1px black">
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
            <tr v-for="(e, i) in data" :key="i">
              <td>{{ e.id }}</td>
              <td style="cursor: pointer" @click="clickDataItem(e)">{{ e.name }}</td>

              <td><button @click="clickDeleteCatergory(e.id)">xóa</button></td>
            </tr>
          </table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- dialog update product -->
</template>
        
    <script>
import { ref } from 'vue'
import { get_sizes } from '../../api/ApiRequest'
import { post_addSize, post_deleteSize, post_updateSize } from '../../api/ApiAdmin'

export default {
  name: 'SizeS',
  setup() {
    const data = ref([])

    const dataInput = ref({
      id: null,
      name: null,
    })
    const getData = async () => {
      const respon = await get_sizes()
      data.value = respon.data
      dataInput.value = {
        id: null,
        name: null,
      }
    }
    getData()

    const clickDataItem = (e) => {
      //   dataInput.value = e
      dataInput.value = { ...e }
    }

    const clickAdd = () => {
      if (dataInput.value.name == null) {
        alert('chưa nhập giá trị')
        return
      }
      post_addSize(dataInput.value).then(() => getData())
    }
    const clickUpdate = () => {
      if (dataInput.value.name == null) {
        alert('chưa nhập giá trị')
        return
      }
      if (dataInput.value.id == null) {
        alert('chưa có id')
        return
      }
      post_updateSize(dataInput.value).then(() => getData())
    }
    const clickDeleteCatergory = (idSize) => {
      const check = confirm('bạn muốn xóa size này id ' + idSize)
      if (!check) {
        return
      }
      post_deleteSize(idSize).then(() => getData())
    }
    return {
      data,
      dataInput,
      clickDataItem,
      clickAdd,
      clickUpdate,
      clickDeleteCatergory,
    }
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

tr,
td,
th {
  border: solid 1px black;
  padding: 5px;
}
</style>
    