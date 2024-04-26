<template>
  <CFooter class="px-4">
    <div>
      <a href="https://coreui.io" target="_blank">Trang admin</a>
      <span class="ms-1">&copy; {{ new Date().getFullYear() }} trang quản lý sản phẩm</span>
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="#">data</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
