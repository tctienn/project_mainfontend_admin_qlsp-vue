<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH SẢN PHẨM</strong>
        </CCardHeader>
        <CCardBody>
          <p class="text-body-secondary small">
            click vào tên sản phầm để xem thông tin chi tiết và cập nhật nội dung
          </p>
          <div style="width: 100%">
            <table>
              <tr>
                <th>Id</th>
                <th>Tên ngắn</th>
                <th>Tên</th>
                <th>mô tả ngắn</th>
                <th>nhãn hiệu(brand)</th>
                <th>tag</th>
                <th>catergory</th>
                <th>kho</th>
                <th>Ảnh sản phẩm</th>
                <th>size</th>
                <th>giá gốc</th>
                <th>giá bán</th>
                <th>Thời gian tạo</th>
                <th>Thời gian cập nhật</th>
                <th>Trạng thái</th>
              </tr>
              <tr
                v-for="(e, i) in data.content"
                :key="i"
                :style="{
                  backgroundColor:
                    e.enable == 1
                      ? i % 2 == 0
                        ? 'rgb(189, 189, 189)'
                        : 'white'
                      : 'rgba(241, 59, 59, 0.38)',
                }"
              >
                <td>{{ e.id }}</td>
                <td>{{ e.alias }}</td>
                <td @click="getDataProdut(e)" style="text-decoration: underline; cursor: pointer">
                  {{ e.name }}
                </td>
                <td>
                  <textarea readonly v-model="e.motaNgan"></textarea>
                </td>
                <td>{{ e.brand.name }} <img :src="e.brand.img" /></td>
                <td>{{ e.tag.name }}</td>
                <td>
                  <small v-for="(e2, i2) in e.catergorys" :key="i2">{{ e2.name }}</small>
                </td>
                <td>{{ e.inStock }}</td>
                <td><img :src="e.mainImg" style="width: 100px; aspect-ratio: 2/2" /></td>
                <td>
                  <small v-for="(e2, i2) in e.sizes" :key="i2">{{ e2.name }}</small>
                </td>
                <td>{{ e.cost }}</td>
                <td>{{ e.gia }}</td>
                <td>{{ e.createAt }}</td>
                <td>{{ e.updateAt }}</td>
                <td>{{ e.enable == 1 ? 'hoạt động' : 'ngừng hoạt động' }}</td>
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

  <!-- dialog update product -->
  <div>
    <v-dialog v-model="dialog" persistent>
      <div
        style="width: 100%; height: 90vh; overflow: scroll; background-color: white; padding: 10px"
      >
        <h2>thông tin sản phẩm</h2>
        <div>
          <div class="input-container">
            <div class="form-group">
              <label for="alias">Bí danh:</label>
              <input type="text" id="alias" v-model="dataDialog.alias" />
            </div>
            <div class="form-group">
              <label for="name">Tên:</label>
              <input type="text" id="name" v-model="dataDialog.name" />
            </div>
            <div class="form-group">
              <label for="mota">Mô tả:</label>
              <textarea id="mota" v-model="dataDialog.mota"></textarea>
            </div>
            <div class="form-group">
              <label for="motaNgan">Mô tả ngắn:</label>
              <input type="text" id="motaNgan" v-model="dataDialog.motaNgan" />
            </div>
            <div class="form-group">
              <label for="motaNgan">Thương hiệu</label>
              <v-select
                chips
                label="brand"
                :items="diss.brands"
                v-model="dataDialog.brand"
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
                v-model="dataDialog.tag"
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
                  v-model="dataDialog.catergorys"
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
                v-model="dataDialog.sizes"
                item-title="name"
                return-object
                multiple
                variant="outlined"
              ></v-select>
            </div>
            <div class="form-group">
              <label for="cost">Giá:</label>
              <input type="number" id="cost" v-model="dataDialog.cost" />
            </div>
            <div class="form-group">
              <label for="gia">Giá bán:</label>
              <input type="number" id="gia" v-model="dataDialog.gia" />
            </div>
            <div class="form-group">
              <label for="mainImg">Hình ảnh chính:</label>
              <img
                :src="dataDialog.mainImg"
                alt="Main Image"
                style="width: 150px; aspect-ratio: 2/2"
              />
              <div style="display: flex">
                <input
                  type="file"
                  s
                  @change="changeFileMainImage"
                  style="font-size: 10px; width: 200px"
                />
                <button
                  style="padding: 5px; color: white; background-color: rgb(172, 16, 156)"
                  @click="clickUpdateMainImage(dataDialog.id)"
                >
                  update img
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="mainImg">Danh sách ảnh phụ</label>

              <div class="image-container">
                <div class="image-box" v-for="(image, index) in dataDialog.images" :key="index">
                  <img :src="image.url" alt="Image" class="image" />
                  <button
                    class="remove-button"
                    @click="clickDeleteImages(dataDialog.id, image.url)"
                  >
                    Xóa
                  </button>
                </div>
                <div
                  class="image-box add-image"
                  style="display: flex; flex-direction: column"
                  @click="addImage"
                >
                  <input type="file" @change="changeFile" style="font-size: 10px" />
                  <button class="remove-button" @click="clickAddImages(dataDialog.id)">
                    upload
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="start">Start:</label>
              <input type="number" id="start" v-model="dataDialog.start" />
            </div>

            <div class="form-group">
              <label for="enable">Trạng thái:</label>
              <input type="number" id="enable" v-model="dataDialog.enable" />
            </div>
            <div class="form-group">
              <label for="inStock">Số lượng trong kho:</label>
              <input type="number" id="inStock" v-model="dataDialog.inStock" />
            </div>
          </div>
          <v-btn @click="dialog = false"> Thoát </v-btn>
          <v-btn @click="clickUpdataProduct(dataDialog)"> Cập nhật </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
  
  <script>
import { ref, watch } from 'vue'
import { get_brands, get_catergorys, get_products, get_sizes, get_tags } from '../../api/ApiRequest'
import { addImages, deleteImages, post_updateMainImg, post_updateProduct } from '../../api/ApiAdmin'
// import { fa } from 'vuetify/locale'

export default {
  name: 'ProducTs',
  setup() {
    const data = ref({})
    const dialog = ref(false)
    const totalPages = ref(0)
    const page = ref(1)
    const dataDialog = ref({})
    const getDataProdut = (data) => {
      dataDialog.value = data

      getDataForSelect().then(() => (dialog.value = !dialog.value))
    }
    const products = async (page) => {
      const respon = await get_products(page)
      data.value = respon.data
      totalPages.value = respon.data.totalPages
    }
    products({
      page: page.value - 1,
      size: 5,
      sort: 'id,asc',
    })
    const diss = ref({
      tags: {},
      brands: {},
      catergory: {},
      sizes: {},
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
      console.log('data', diss.value)
    }
    const file = ref()
    const changeFile = (e) => {
      file.value = e.target.files[0]
    }
    const fileMainImage = ref()
    const changeFileMainImage = (e) => {
      fileMainImage.value = e.target.files[0]
    }
    const clickUpdateMainImage = (idProduct) => {
      post_updateMainImg(idProduct, fileMainImage.value).then((ay) => (dataDialog.value = ay.data))
    }
    const clickAddImages = (idProduct) => {
      if (file.value == null) {
        alert('chưa có ảnh')
      }
      addImages(file.value, idProduct).then((ay) => (dataDialog.value = ay.data))
    }
    const clickDeleteImages = (idProduct, url) => {
      deleteImages(idProduct, url).then((ay) => (dataDialog.value = ay.data))
    }
    const clickUpdataProduct = (pro) => {
      post_updateProduct(pro).then(
        () =>
          products({
            page: page.value - 1,
            size: 5,
            sort: 'id,asc',
          }),
        (dialog.value = false),
      )
    }
    watch(page, (newData, oldData) => {
      if (newData === oldData) {
        console.log('watch', newData, oldData)
      }
      products({
        page: page.value - 1,
        size: 5,
        sort: 'id,asc',
      })
    })

    return {
      data,
      totalPages,
      page,
      dialog,
      getDataProdut,
      dataDialog,
      diss,
      dataSeleced,
      changeFile,
      file,
      clickAddImages,
      clickDeleteImages,
      changeFileMainImage,
      clickUpdateMainImage,
      clickUpdataProduct,
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
  font-size: 15px;
}
th {
  font-size: 15px;
}
</style>
