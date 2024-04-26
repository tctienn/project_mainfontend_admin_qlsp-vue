<template>
  <div v-if="!user"></div>
  <div v-else class="profile">
    <h1>{{ user.userName }}</h1>
    <p>ID: {{ user.id }}</p>
    <p>Email: {{ user.gmail }}</p>
    <p>Số điện thoại: {{ user.sdt }}</p>
    <p>Vai trò: {{ user.role }}</p>
    <p>Ngày tạo: {{ user.createTime }}</p>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>
  
  <script>
import { getCookie } from '@/api/CookieFuntion'
import { deleteCookie } from '../api/CookieFuntion'
export default {
  name: 'UserProfile',
  components: {},
  data() {
    return {
      user: getCookie('login_token_qlsp') ? getCookie('login_token_qlsp').user : null,
    }
  },
  methods: {
    logout() {
      deleteCookie('login_token_qlsp')
      window.location.reload('/')
    },
  },
}
</script>
  
  <style scoped>
.profile {
  width: 70%;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
}

.profile:hover {
  transform: scale(1.05);
}

.profile h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.profile p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
  text-align: left;
}

.logout-button {
  display: block;
  width: 100px;
  height: 30px;
  margin: 20px auto;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
  