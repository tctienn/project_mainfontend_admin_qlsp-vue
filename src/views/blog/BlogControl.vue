<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH BLOG</strong>
        </CCardHeader>
        <CCardBody style="display: flex; justify-content: space-between">
          <br />
          <!-- /// list blog -->
          <div style="width: 40%">
            <div class="text-body-secondary small">
              <div>
                <input
                  type="text"
                  style="padding: 2px"
                  v-model="textSearch"
                  placeholder=" nhập tiêu đề blog"
                />
                <button @click="clickSearch"><v-icon>mdi-magnify</v-icon></button>
              </div>
            </div>
            <table style="width: 100%">
              <tr>
                <th>Id</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Tác giả</th>
                <th>Thời gian tạo</th>
                <th>Ảnh chính</th>
                <th>Ảnh nền</th>
              </tr>
              <tr
                v-for="(e, i) in data?.content"
                :key="i"
                :style="{
                  backgroundColor: 1 % 2 == 0 ? 'ưhite' : 'rgb(216, 216, 216)',
                }"
                @click="clickgetDataBlog(e)"
              >
                <td>{{ e.id }}</td>
                <td>{{ e.title }}</td>
                <td>
                  <textarea name="" id="" v-model="e.conten" cols="10" readonly rows="2"></textarea>
                </td>
                <td>{{ e.nameCreateUser }}</td>
                <td>{{ e.createTime }}</td>
                <td>
                  <img
                    :src="e.imgMain"
                    alt="Main Image"
                    style="max-width: 20px; aspect-ratio: 2/2"
                  />
                </td>
                <td>
                  <img
                    :src="e.imgBackGround"
                    alt="Background Image"
                    style="max-width: 20px; aspect-ratio: 2/2"
                  />
                </td>
              </tr>
            </table>
            <v-container>
              <v-pagination :length="totalPages" v-model="page"></v-pagination>
            </v-container>
          </div>
          <!-- end listblog -->
          <div style="width: 50%; border: solid 1px black">
            <div
              style="display: flex; justify-content: space-between; flex-wrap: wrap; width: 100%"
            >
              <div style="width: 48%; aspect-ratio: 2/2; text-align: center">
                <img
                  src="https://storage.googleapis.com/staging.testupload-93817.appspot.com/1714228471008_%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-04-27_213357.png"
                  style="width: 100%; aspect-ratio: 2/2"
                />
                <div
                  style="
                    width: 100%;
                    height: 200px;
                    overflow: scroll;
                    border: solid 1px rgb(102, 136, 183);
                  "
                >
                  <h4>list mini</h4>
                  <table
                    style="
                      width: 100%;
                      border-collapse: collapse;
                      border: solid 1px rgb(168, 168, 168);
                    "
                  >
                    <tr style="border: solid 1px rgb(168, 168, 168)">
                      <th>id blog</th>
                      <th>tiêu đề</th>
                      <th>img main</th>
                      <th>loại</th>
                      <th>top</th>
                    </tr>
                    <tr v-for="(e, i) in dataBlogRenderType.type3" :key="i">
                      <td>{{ e.blog.id }}</td>
                      <td>
                        <textarea
                          name=""
                          id=""
                          v-model="e.blog.title"
                          cols="10"
                          rows="2"
                        ></textarea>
                      </td>
                      <td><img :src="e.blog.imgMain" style="width: 20px; aspect-ratio: 2/2" /></td>
                      <td>{{ e.type }}</td>
                      <td>{{ e.top }}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style="width: 48%; aspect-ratio: 2/2; text-align: center">
                <img
                  src="https://storage.googleapis.com/staging.testupload-93817.appspot.com/1714228471861_%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-04-27_202835.png"
                  style="width: 100%; aspect-ratio: 2/2"
                />
                <div
                  style="
                    width: 100%;
                    height: 200px;
                    overflow: scroll;
                    border: solid 1px rgb(102, 136, 183);
                  "
                >
                  <h4>silde</h4>
                  <table
                    style="
                      width: 100%;
                      border-collapse: collapse;
                      border: solid 1px rgb(168, 168, 168);
                    "
                  >
                    <tr style="border: solid 1px rgb(168, 168, 168)">
                      <th>id blog</th>
                      <th>tiêu đề</th>
                      <th>img back Ground</th>
                      <th>loại</th>
                      <th>top</th>
                    </tr>
                    <tr v-for="(e, i) in dataBlogRenderType.type2" :key="i">
                      <td>{{ e.blog.id }}</td>
                      <td>
                        <textarea
                          name=""
                          id=""
                          v-model="e.blog.title"
                          cols="10"
                          rows="2"
                        ></textarea>
                      </td>
                      <td>
                        <img :src="e.blog.imgBackGround" style="width: 20px; aspect-ratio: 2/2" />
                      </td>
                      <td>
                        {{ e.type }}
                      </td>
                      <td>{{ e.top }}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style="width: 100%">
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: solid 1px rgb(168, 168, 168);
                  "
                >
                  <tr style="border: solid 1px rgb(168, 168, 168)">
                    <th>id blog</th>
                    <th>tiêu đề</th>
                    <th>loại (1: slide , 2: list mini)</th>
                    <th>top</th>
                  </tr>
                  <tr>
                    <td>{{ dataB.blog.id }}</td>
                    <td>{{ dataB.blog.title }}</td>
                    <td>
                      <select v-model="dataB.type">
                        <option value="2">slide</option>
                        <option value="3">list mini</option>
                        <option value="-1">delete</option>
                      </select>
                    </td>
                    <td><input type="number" v-model="dataB.top" /></td>
                    <td>
                      <button @click="clickUppdateBlogRender">áp dụng</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
      
      <script>
import { ref, watch } from 'vue'
import { get_Blogs, get_Blogs_by_titleContaing, post_addBlogByRender } from '../../api/ApiAdmin'
import { get_blog_byrender_by_type } from '../../api/ApiRequest'
// import router from '@/router'
// import { id } from 'vuetify/locale'

export default {
  name: 'BlogS',
  setup() {
    const totalPages = ref(0)
    const page = ref(1)
    const data = ref([])
    const textSearch = ref('')
    const getBlogs = async (datap) => {
      const respon = await get_Blogs(datap)
      data.value = respon.data
      totalPages.value = respon.data.totalPages

      textSearch.value = ''
    }
    getBlogs({
      page: page.value,
      size: 5,
      sort: 'id,asc',
    })

    const clickSearch = async () => {
      if (textSearch.value == '') {
        getBlogs({
          page: page.value,
          size: 5,
          sort: 'id,asc',
        })
        return
      }
      const respon = await get_Blogs_by_titleContaing({
        title: textSearch.value,
        page: page.value,
        size: 5,
        sort: 'id,asc',
      })

      data.value = respon.data
    }

    const dataBlogRenderType = ref({
      type2: [],
      type3: [],
    })
    const getblogrender_type = async () => {
      const ty2 = await get_blog_byrender_by_type(2, 10)
      const ty3 = await get_blog_byrender_by_type(3, 10)

      dataBlogRenderType.value.type2 = ty2.data.content
      dataBlogRenderType.value.type3 = ty3.data.content
    }
    getblogrender_type()
    const dataB = ref({
      blog: {
        id: null,
      },
      type: 2,
      top: 0,
    })
    const clickgetDataBlog = (bldata) => {
      dataB.value.blog = bldata
      console.log('s', dataB.value)
    }
    const clickUppdateBlogRender = () => {
      post_addBlogByRender(dataB.value).then(
        () => getblogrender_type(),
        (dataB.value = {
          blog: {
            id: null,
          },
          type: 2,
          top: 0,
        }),
      )
    }
    watch(page, (newData, oldData) => {
      if (newData === oldData) {
        console.log('watch', newData, oldData)
      }
      getBlogs({
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
      clickUppdateBlogRender,
      dataBlogRenderType,
      clickgetDataBlog,
      dataB,
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
.action {
  margin: 5px;
  border: solid 1px rgb(152, 152, 152);
  background-color: rgb(183, 172, 131);
  padding: 5px;
  color: white;
}
</style>
    