<template>
  <CRow>
    <CCol v-if="user" :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Tạo Blog mới</strong>
        </CCardHeader>
        <CCardBody>
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
              <h2>thông tin blog</h2>
              <!-- /////////////// -->
              <div>
                <div class="input-container">
                  <div class="form-group">
                    <label for="title">Tiêu đề:</label>
                    <input type="text" id="title" v-model="data.title" />
                  </div>
                  <div class="form-group">
                    <label for="content">Nội dung:</label>
                    <textarea id="content" v-model="data.conten"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="nameCreateUser">Tên người tạo:</label>
                    <input type="text" id="nameCreateUser" v-model="data.nameCreateUser" />
                  </div>
                  <div class="form-group">
                    <label for="imgMain">Hình ảnh chính:</label>
                    <img
                      :src="data.imgMain"
                      alt="Main Image"
                      style="width: 150px; aspect-ratio: 2/2"
                    />
                    <input
                      type="file"
                      @change="changeFileMainImage"
                      style="font-size: 10px; width: 200px"
                    />
                  </div>
                  <div class="form-group">
                    <label for="imgBackGround">Hình nền:</label>
                    <input type="file" id="imgBackGround" @change="changeBackGroundImg" />
                  </div>
                </div>

                <v-btn @click="clickAddBlog"> Tạo blog </v-btn>
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
import { ref } from 'vue'

import { getCookie } from '../../api/CookieFuntion'
import { post_addBlog, post_updateBlogImg } from '../../api/ApiAdmin'
import router from '@/router'

export default {
  name: 'AddBlog',
  setup() {
    const user = getCookie('login_token_qlsp')
    const data = ref({
      title: null,
      conten: null,
      nameCreateUser: user.user.userName,
      imgMain: null,
      imgBackGround: null,
    })

    const fileMainImage = ref(null)
    const changeFileMainImage = (e) => {
      fileMainImage.value = e.target.files[0]
    }
    const BackgroundImg = ref(null)
    const changeBackGroundImg = (e) => {
      BackgroundImg.value = e.target.files[0]
    }

    const clickAddBlog = () => {
      post_addBlog(data.value).then((respon) =>
        post_updateBlogImg(respon.data.id, fileMainImage.value, BackgroundImg.value).then(() =>
          router.push('list'),
        ),
      )
    }

    return { user, data, changeFileMainImage, changeBackGroundImg, clickAddBlog }
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
      