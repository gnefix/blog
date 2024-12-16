<script setup lang="ts">

import {defineProps, onMounted, reactive, ref} from 'vue'
import {getFilenamesInDirectory} from '../../public/js/utils'
import {Star} from "@icon-park/svg"
import {type Bangumi} from '../../public/data/bangumi_data.ts'

const props = defineProps<{bangumiData:Bangumi}>()
let bangumiData = reactive(props.bangumiData)
let imagesPath  = './public/images/' + bangumiData.name
let image_files = getFilenamesInDirectory(imagesPath)
let isLoading = ref(false)

let cardImage = ref('')
for (let imageFile of image_files) {
  if (!imageFile.includes("logo")) {
    cardImage.value = imageFile
    break
  }
}

function loadend(){
  isLoading.value = false
}

const navIcon = ref(['animate__animated animate__fadeOut', 'animate__animated animate__fadeIn'])
function get_badge_and_color(status:number){
  let our_text = ""
  let badge_color = ""
  switch (Number(status)){
    case 0:
      our_text = "未放送"
      badge_color = "badge-secondary"
      break
    case 1:
      our_text = "绝赞放送中"
      badge_color = "badge-accent"
      break
    case 2:
      our_text = "放送终了"
      badge_color = "badge-primary"
      break
    default:
      our_text = "不定"
      badge_color = "badge-primary"
      break

  }
  return [our_text,badge_color]
}

onMounted(()=>{
  document.documentElement.style.setProperty('--animate-duration', '0.5s');
})

</script>

<template>

  <a  :href="'/bangumi/'+bangumiData.name"  :id="bangumiData.name"  style="transition-duration:500ms"
     class="mt-0 pt-0 p-6 bangumi_card rounded-sm m-3 card-hover min-w-88 max-h-max md:w-2/3 card md:m-10">
    <div >

      <div class="card-title justify mt-3 mb-2" style="color: #703331;">
        <star theme="filled" size="24" fill="#7ECEF4" strokeLinejoin="bevel"/>
        {{bangumiData.name}}
      </div>
    </div>
    <figure :class="{'skeleton': isLoading, 'rounded-sm': true}" style="object-fit:cover;width: 100%;height: 100%">
      <img @load="loadend" style="object-fit:cover;height: inherit" :src="cardImage" :alt="bangumiData.name" />
    </figure>
  </a>

</template>

<style scoped lang="css">
.watchtime-text {
  display: block; /* 将日期元素设置为块级元素 */
  width: 100%; /* 设置宽度为100% */
  text-align: center; /* 文本居中 */
  font-family: 'Comic Sans MS', cursive; /* 使用日漫风格的字体，你可以根据需要修改 */
  font-size: 1.5rem; /* 调整字体大小 */
  color: #ff69b4; /* 设置字体颜色为粉红色，你可以根据需要修改 */
  text-shadow: 1px 1px 2px #000; /* 添加字体阴影，增强日漫效果 */
  margin: 10px auto; /* 设置外边距以居中元素 */
}
.card-hover:hover {
  transform: rotate(5deg)
}
.card-hover {
  transition: transform 0.2s;
}
@media screen and (min-width: 1024px) {
  .card-hover {
  max-width:  calc(34.33% - 20px)
  }
}

.card-body{
  padding: var(--padding-card, 1rem);
}
.bangumi_card{
  border-image-source: url(../../public/images/bangumi_border.png);
  border-image-slice: 80 80 fill;
  border-image-width: 52px 50px;
  border-image-repeat: repeat;
}
</style>