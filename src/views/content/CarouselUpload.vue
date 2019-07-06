<template>
  <div>
    <h2 style="text-align: center">上传轮播图</h2>
    <cropper />
  </div>
</template>

<script>
import Cropper from '@/components/Cropper'
export default {
  name: 'CarouselUpload',
  components: {
    'cropper': Cropper
  }
}
</script>

<style scoped>

</style>
