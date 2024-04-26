<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <v-icon>mdi-face-man</v-icon>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Tài khoản
      </CDropdownHeader>

      <CDropdownItem>
        <CIcon icon="cil-task" /> hóa đơn chờ
        <CBadge color="danger" class="ms-auto">{{ coutInvoiceWait }}</CBadge>
      </CDropdownItem>

      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem style="cursor: pointer" @click="profile">
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <!-- <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <CDropdownDivider />
      <CDropdownItem v-if="!user"
        ><router-link to="/login"> <CIcon icon="cil-shield-alt" /> Login</router-link>
      </CDropdownItem>
      <CDropdownItem v-else @click="clickLogout" style="cursor: pointer">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import { ref } from 'vue'
import { get_coutInvoiceWait } from '../api/ApiAdmin'
import { deleteCookie, getCookie } from '../api/CookieFuntion'
import router from '../router'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    const coutInvoiceWait = ref(0)
    const user = getCookie('login_token_qlsp')
    const cout = async () => {
      if (user == null) {
        coutInvoiceWait.value = 0
        return
      }
      const respon = await get_coutInvoiceWait()
      coutInvoiceWait.value = respon.data
    }
    cout()
    const clickLogout = () => {
      deleteCookie('login_token_qlsp')
      window.location.reload('/')
    }
    const profile = () => {
      router.push('/profile')
    }
    return {
      avatar: avatar,
      itemsCount: -1,
      coutInvoiceWait,
      user,
      clickLogout,
      profile,
    }
  },
}
</script>
