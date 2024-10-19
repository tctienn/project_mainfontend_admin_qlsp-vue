<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader class="header">
          <strong>Quản lý thông báo</strong>
        </CCardHeader>

        <div class="form-container">
          <CRow>
            <CCol :md="6">
              <div class="form-group">
                <label for="notificationLevel">Chọn cấp thông báo</label>
                <v-select
                  id="notificationLevel"
                  :items="dataUserGrap"
                  v-model="dataselect"
                  item-title="name"
                  persistent-hint
                  return-object
                  single-line
                  variant="outlined"
                  placeholder="Chọn cấp"
                />
              </div>
            </CCol>
            <CCol :md="6">
              <div class="form-group">
                <label for="title">Tiêu đề thông báo</label>
                <input
                  id="title"
                  v-model="dataInput.title"
                  type="text"
                  placeholder="Nhập tiêu đề"
                />
              </div>
            </CCol>
          </CRow>

          <div class="form-group">
            <label for="content">Nội dung thông báo</label>
            <textarea
              id="content"
              v-model="dataInput.body"
              rows="5"
              placeholder="Nhập nội dung"
            ></textarea>
          </div>

          <div class="button-container">
            <button @click="createNotification">Gửi thông báo</button>
          </div>
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { ref } from 'vue'
import { create_notficatio, get_grapUsers } from '../../api/ApiRequest'
import { notify } from '../../api/ApiLogin'

export default {
  name: 'NotiFicationCreate',
  setup() {
    const dataInput = ref({
      title: '',
      body: '',
      user: null,
      gmail: null,
    })
    const dataselect = ref(null)
    const dataUserGrap = ref([])
    const getData = async () => {
      const responseUserGrap = await get_grapUsers()
      dataUserGrap.value = responseUserGrap.data
      dataUserGrap.value.unshift({ id: 0, name: 'tất cả nhân viên' })
    }
    // const itemProps = (e) => {
    //   dataInput.value.user = e.id
    // }

    const createNotification = async () => {
      if (
        dataInput.value.title.trim() == '' ||
        dataInput.value.body.trim() == '' ||
        dataselect.value == null
      ) {
        alert('không được để trống')
        return
      }
      dataInput.value = {
        ...dataInput.value,
        user: dataselect.value.id,
        gmail: dataselect.value.gmail,
      }
      console.log('reate notifiactaionn', dataInput.value)

      try {
        await create_notficatio(dataInput.value)
        alert('tạo thông báo thành công')
        notify(
          'thông báo tạo thành công có thể mất vài giây để dữ liệu cập nật lên hệ thống',
          'success',
        )
        dataInput.value = {
          title: '',
          body: '',
          user: null,
          gmail: null,
        }
      } catch (error) {
        notify('tạo thông báo thất bại lỗi :' + error, 'error')
      }
    }
    getData()
    return { createNotification, dataselect, dataInput, dataUserGrap }
  },
}
</script>

<style scoped>
.header {
  text-align: center;
  background-color: #f5f5f5;
  padding: 10px;
}

.form-container {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

input,
textarea,
v-select {
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  background-color: #7364e2;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6153c5;
}
</style>
