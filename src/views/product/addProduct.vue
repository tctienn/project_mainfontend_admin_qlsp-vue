<template>
  <CRow>
    <CCol v-if="user" :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Tạo sản phẩm mới</strong>
        </CCardHeader>
        <CCardBody>
          <p class="text-body-secondary small">
            click vào tên sản phầm để xem thông tin chi tiết và cập nhật nội dung
          </p>
          <div v-if="data" style="width: 100%">
            <div
              style="
                width: 100%;
                height: 90vh;
                overflow: scroll;
                background-color: white;
                padding: 10px;
              "
            >
              <h2>thông tin sản phẩm</h2>
              <!-- /////////////// -->
              <div>
                <div class="input-container">
                  <div class="form-group">
                    <label for="alias">Bí danh:</label>
                    <input type="text" id="alias" v-model="data.alias" />
                  </div>
                  <div class="form-group">
                    <label for="name">Tên:</label>
                    <input type="text" id="name" v-model="data.name" />
                  </div>
                  <div class="form-group">
                    <label for="mota">Mô tả:</label>
                    <textarea id="mota" v-model="data.mota"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="motaNgan">Mô tả ngắn:</label>
                    <input type="text" id="motaNgan" v-model="data.motaNgan" />
                  </div>
                  <div class="form-group">
                    <label for="motaNgan">Thương hiệu</label>
                    <v-select
                      chips
                      label="brand"
                      :items="diss.brands"
                      v-model="data.brand"
                      item-title="name"
                      return-object
                      variant="outlined"
                    ></v-select>
                  </div>
                  <div class="form-group">
                    <label for="motaNgan">Nhãn:</label>
                    <v-select
                      chips
                      label="tag"
                      :items="diss.tags"
                      v-model="data.tag"
                      item-title="name"
                      return-object
                      variant="outlined"
                    ></v-select>
                  </div>
                  <div class="form-group">
                    <label for="catergories">Danh mục:</label>
                    <div>
                      <v-select
                        chips
                        label="catergory"
                        :items="diss.catergorys"
                        v-model="data.catergorys"
                        item-title="name"
                        return-object
                        multiple
                        variant="outlined"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="motaNgan">Kích thước:</label>
                    <v-select
                      chips
                      label="size"
                      :items="diss.sizes"
                      v-model="data.sizes"
                      item-title="name"
                      return-object
                      multiple
                      variant="outlined"
                    ></v-select>
                  </div>
                  <div class="form-group">
                    <label for="cost">Giá:</label>
                    <input type="number" id="cost" v-model="data.cost" />
                  </div>
                  <div class="form-group">
                    <label for="gia">Giá bán:</label>
                    <input type="number" id="gia" v-model="data.gia" />
                  </div>
                  <div class="form-group">
                    <label for="mainImg">Hình ảnh chính:</label>
                    <img
                      :src="data.mainImg"
                      alt="Main Image"
                      style="width: 150px; aspect-ratio: 2/2"
                    />
                    <input
                      type="file"
                      s
                      @change="changeFileMainImage"
                      style="font-size: 10px; width: 200px"
                    />
                  </div>
                  <div class="form-group">
                    <label for="start">Start:</label>
                    <input type="number" id="start" v-model="data.start" />
                  </div>

                  <div class="form-group">
                    <label for="enable">Trạng thái:</label>
                    <input type="number" id="enable" v-model="data.enable" />
                  </div>
                  <div class="form-group">
                    <label for="inStock">Số lượng trong kho:</label>
                    <input type="number" id="inStock" v-model="data.inStock" />
                  </div>
                </div>

                <v-btn @click="clickAddProduct"> Tạo sản phẩm </v-btn>
              </div>
              <!-- ////////////// -->
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <div v-else>
      <h2>người dùng đã hết phiên đăng nhập</h2>
    </div>
  </CRow>
</template>
    
    <script>
import { onMounted, ref } from 'vue'
import { get_brands, get_catergorys, get_sizes, get_tags } from '../../api/ApiRequest'
// import {} from '../../api/ApiAdmin'
import { getCookie } from '../../api/CookieFuntion'
import { post_addProduct, post_updateMainImg } from '../../api/ApiAdmin'
import router from '@/router'

export default {
  name: 'addProduct',
  setup() {
    const user = getCookie('login_token_qlsp')
    const data = ref({
      alias: '',
      name: '',
      mota: '',
      motaNgan: '',
      brand: {},
      tag: {},
      catergorys: [
        // {
        //     id: 1,
        //     name: catergory 1,
        //     img: null
        // }
      ],
      images: [],
      sizes: [],
      cost: 0,
      gia: 0,
      mainImg: '',
      start: 0,
      enable: 1,
      inStock: 0,
    })

    const diss = ref({
      tags: [],
      brands: [],
      catergorys: [],
      sizes: [],
    })
    const dataSeleced = ref({
      tags: {},
      brands: {},
      catergory: {},
      sizes: {},
    })
    const getDataForSelect = async () => {
      const tags = await get_tags()
      const brands = await get_brands()
      const catergorys = await get_catergorys()
      const sizes = await get_sizes()
      diss.value = {
        tags: tags.data,
        brands: brands.data,
        catergorys: catergorys.data,
        sizes: sizes.data,
      }
    }

    const fileMainImage = ref()
    const changeFileMainImage = (e) => {
      fileMainImage.value = e.target.files[0]
    }

    const clickAddProduct = () => {
      if (Reflect.ownKeys(data.value.brand).length === 0) {
        alert('brand bị null')
        return
      }
      if (Reflect.ownKeys(data.value.tag).length === 0) {
        alert('tag bị null')
        return
      }

      post_addProduct(data.value).then(
        (data) => (post_updateMainImg(data.data.id, fileMainImage.value), router.push('list')),
      )
    }
    onMounted(() => {
      getDataForSelect()
    })
    return { user, data, dataSeleced, diss, changeFileMainImage, clickAddProduct }
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
  font-size: 15px;
}
th {
  font-size: 15px;
}
</style>
  