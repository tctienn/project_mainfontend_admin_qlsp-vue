<template>
  <CRow>
    <CCol :xs="5">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Giá hóa đơn đang sử dụng</strong>
        </CCardHeader>
        <CCardBody>
          <br />
          <label>giá cơ bản của 1 hóa đơn</label>
          <div>
            <b style="color: rgb(81, 243, 92)">
              {{ data.priceBase?.toLocaleString('vi-VN') }} VND
            </b>
          </div>
          <br />
          <br />
          <label>giá hóa đơn trên mỗi km cộng thêm </label>
          <div>
            <b style="color: rgb(81, 243, 92)">
              {{ data.priceOnKM?.toLocaleString('vi-VN') }} VND
            </b>
          </div>
          <br />
        </CCardBody>
        <CCardHeader>
          <strong>Cập nhật giá</strong>
        </CCardHeader>
        <CCardBody>
          <br />
          <label>Tên danh mục</label>
          <br />
          <input type="number" v-model="dataInput.priceBase" placeholder="nhập giá cơ bản" />
          <br />
          <input type="number" v-model="dataInput.priceOnKM" placeholder="nhập giá trên km" />
          <br />
          <button @click="clickUpdate">Cập nhật</button>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- dialog update product -->
</template>
      
  <script>
import { ref } from 'vue'
import { post_updatePriceList_grapManage } from '../../api/ApiAdmin'
import { notify } from '../../api/ApiLogin'
import { get_ListPrice } from '../../api/ApiRequest'
// import { da } from 'vuetify/locale'
// import { get_tags } from '../../api/ApiRequest'
// import { post_addTag, post_deleteTag, post_updateTag } from '../../api/ApiAdmin'
export default {
  name: 'PriceList',
  setup() {
    const data = ref({})
    const dataInput = ref({
      priceBase: null,
      priceOnKM: null,
    })
    const getData = async () => {
      const respon = await get_ListPrice()
      data.value = respon.data

      dataInput.value = {
        priceBase: null,
        priceOnKM: null,
      }
    }
    getData()

    const clickUpdate = () => {
      if (dataInput.value.priceBase == null || dataInput.value.priceOnKM == null) {
        alert('chưa nhập giá trị')
        return
      }
      if (dataInput.value.priceBase < 1 || dataInput.value.priceBase < 1) {
        alert('giá không được nhỏ hơn hoặc bằng 0')
        return
      }
      post_updatePriceList_grapManage(dataInput.value).then(
        () => getData(),
        notify('cập nhật giá thành công', 'success'),
      )
    }

    return { data, dataInput, clickUpdate }
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
  