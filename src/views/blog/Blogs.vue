<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>DANH SÁCH BLOG</strong>
        </CCardHeader>
        <CCardBody>
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
          <br />
          <div style="width: 100%">
            <table style="width: 100%">
              <tr>
                <th>Id</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Tác giả</th>
                <th>Thời gian tạo</th>
                <th>Ảnh chính</th>
                <th>Ảnh nền</th>
                <th>Chức năng</th>
              </tr>
              <tr
                v-for="(e, i) in data?.content"
                :key="i"
                :style="{
                  backgroundColor: 1 % 2 == 0 ? 'ưhite' : 'rgb(216, 216, 216)',
                  border: 'solid 1px rgb(129, 129, 129)',
                }"
              >
                <td>{{ e.id }}</td>
                <td>{{ e.title }}</td>
                <td>
                  <textarea name="" id="" v-model="e.conten" cols="30" readonly rows="4"></textarea>
                </td>
                <td>{{ e.nameCreateUser }}</td>
                <td>{{ e.createTime }}</td>
                <td>
                  <img
                    :src="e.imgMain"
                    alt="Main Image"
                    style="max-width: 100px; aspect-ratio: 2/2"
                  />
                </td>
                <td>
                  <img
                    :src="e.imgBackGround"
                    alt="Background Image"
                    style="max-width: 100px; aspect-ratio: 2/2"
                  />
                </td>
                <td style="display: flex">
                  <button class="action" @click="clickUpdate(e.id)">sửa</button>
                  <button class="action" @click="clickDeleteBlog(e.id)">xóa</button>
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
import { get_Blogs, get_Blogs_by_titleContaing, post_deleBlog } from '../../api/ApiAdmin'
import router from '@/router'
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

    const clickUpdate = (id) => {
      router.push('update/' + id)
    }
    const clickDeleteBlog = (idBlog) => {
      const check = confirm('bạn muốn xóa sản phẩm id ' + idBlog)
      if (!check) {
        return
      }
      post_deleBlog(idBlog).then(() =>
        getBlogs({
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
      clickUpdate,
      clickDeleteBlog,
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
    