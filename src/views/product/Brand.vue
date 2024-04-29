<template>
  <CRow>
    <CCol :xs="5">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH THƯƠNG HIỆU</strong>
        </CCardHeader>
        <CCardBody>
          <div v-if="!dataInput.id" class="boxTex">
            <button @click="clickAdd">Thêm</button>
            <br />
            <label>Tên thơng hiệu</label>
            <br />
            <input type="text" v-model="dataInput.name" placeholder="nhập tên danh mục " />
            <img style="width: 20px; aspect-ratio: 2/2" :src="dataInput.img" />
            <input type="file" @change="changFileImg" />
          </div>
          <div v-else class="boxTex">
            <button @click="clickUpdate">Cập nhật</button>
            <button @click="clickDataItem(null)">bỏ qua</button>
            <br />
            <label>Tên thương hiệu</label>
            id : {{ dataInput.id }}
            <br />
            <input type="text" v-model="dataInput.name" placeholder="nhập tên danh mục " />
            <img style="width: 20px; aspect-ratio: 2/2" :src="dataInput.img" />
            <input type="file" @change="changFileImg" />
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="5">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>LIST NHÃN</strong>
        </CCardHeader>
        <CCardBody>
          <p class="text-body-secondary small">click vào tên để cập nhật nội dung</p>
          <table style="width: 100%; border: solid 1px black">
            <tr>
              <th>id</th>
              <th>name</th>
              <th>ảnh thương thiệu</th>
            </tr>
            <tr v-for="(e, i) in data" :key="i">
              <td>{{ e.id }}</td>
              <td style="cursor: pointer" @click="clickDataItem(e)">{{ e.name }}</td>
              <td>
                <img style="width: 20px; aspect-ratio: 2/2" :src="e.img" />
              </td>
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
import { get_brands } from '../../api/ApiRequest'
import {
  post_addBrand,
  post_deleteBrand,
  post_updateBrand,
  post_updateImgBrand,
} from '../../api/ApiAdmin'

export default {
  name: 'BnraA',
  setup() {
    const data = ref([])
    const fileImg = ref(null)
    const changFileImg = (e) => {
      fileImg.value = e.target.files[0]
    }
    const dataInput = ref({
      id: null,
      name: null,
      img: null,
    })
    const getData = async () => {
      const respon = await get_brands()
      data.value = respon.data
      dataInput.value = {
        id: null,
        name: null,
        img: null,
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
      post_addBrand(dataInput.value).then((data) =>
        post_updateImgBrand(data.data.id, fileImg.value).then(() => getData()),
      )
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
      post_updateBrand(dataInput.value).then((data) =>
        post_updateImgBrand(data.data.id, fileImg.value).then(() => getData()),
      )
    }
    const clickDeleteCatergory = (idTag) => {
      const check = confirm('bạn muốn xóa brand này id ' + idTag)
      if (!check) {
        return
      }
      post_deleteBrand(idTag).then(() => getData())
    }
    return {
      data,
      dataInput,
      clickDataItem,
      clickAdd,
      clickUpdate,
      clickDeleteCatergory,
      changFileImg,
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
  