<template>
  <div style="z-index: 100" class="navbar bg-base-100 max-w-5xl m-auto">
    <div class="flex-1">
      <a href="/about" class="btn btn-ghost text-xl">XI's Blog</a>
    </div>
    <div class="flex-none " >
      <template v-for="(item,index) in navContext" :key="index">
        <a :href="item.path" style="height: auto;width: 80px;"  @mouseenter="item.showContext=true" @mouseleave="item.showContext=(item.path===urlRef)">
          <div  class="menu menu-horizontal simple-blog-navbar-context">
              <transition :enter-active-class="navTextAnimate[1]" :leave-active-class="navTextAnimate[0]">
                <p v-show="item.showContext" class="simple-blog-navbar-item-text ">{{ item.name }}</p>
              </transition>
              <transition :enter-active-class="navIconAnimate[1]" :leave-active-class="navIconAnimate[0]">
                <div class="base-content" style="position: absolute" v-show="!item.showContext"  v-html="item.icon!({size:24})"  ></div>
              </transition>
              <transition :enter-active-class="navPointAnimate[1]" :leave-active-class="navPointAnimate[0]">
                <p v-show="item.showContext" class="simple-blog-navbar-item-dot"></p>
              </transition>
          </div>
        </a>
      </template>
      <div  class="menu menu-horizontal ml-[20px]">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" @click="changeTheme()" />
          <!-- sun icon -->
          <svg
              class="swap-on h-[24px] fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
            <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <!-- moon icon -->
          <svg
              class="swap-off h-[24px] fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
            <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {markRaw, onMounted, reactive, ref} from "vue";
import 'animate.css';
import navContext from "./Navbar.ts";

const urlRef = ref(window.location.pathname)
const documentRef = reactive(document.documentElement)
document.documentElement.style.setProperty('--animate-duration', '0.5s');

const navTextAnimate = markRaw(['animate__animated animate__fadeOutUp', 'animate__animated animate__fadeInDown'])
const navIconAnimate = markRaw(['animate__animated animate__fadeOut ', 'animate__animated animate__fadeIn'])
const navPointAnimate= markRaw(['animate__animated animate__fadeOutDown ', 'animate__animated animate__fadeInUp'])
const themeSwap = ref()


onMounted(()=>{

  let theme = window.localStorage.getItem('theme');
  if(theme ==='dark'){
    window.localStorage.setItem('theme','dark');
    document.documentElement.dataset.theme='sunset'
  }else if(theme === 'light'){
    window.localStorage.setItem('theme','light');
    document.documentElement.dataset.theme='wireframe'
  }else {
    window.localStorage.setItem('theme','light');
    document.documentElement.dataset.theme='wireframe'
  }

  navContext.forEach(item=>{
    item.showContext=(item.path===urlRef.value)})
})
function changeTheme() {
  let theme = window.localStorage.getItem('theme');
  if(theme == 'light'){
    window.localStorage.setItem('theme','dark');
    documentRef.dataset.theme='sunset'
    themeSwap.value = false
  }else if(theme == 'dark') {
    window.localStorage.setItem('theme','light');
    documentRef.dataset.theme='wireframe'
    themeSwap.value = true
  }else {
    window.localStorage.setItem('theme','dark');
    documentRef.dataset.theme='sunset'
    themeSwap.value = false
  }
}

</script>

<style scoped lang="css">
.navItem {
  justify-content: center;
  display: flex;
  z-index: 150;
  width: 100%;
  text-align: center;
  height: 7vh;
  color: black;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.simple-blog-navbar-item-dot {
  display: inline-block;
  position: absolute;
  margin-top: 38px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: oklch(var(--nc));
}

.simple-blog-navbar-context {
  flex-direction: column;
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  z-index: 50;
  justify-content: center;
}

.animate__animated .animate__fadeOutUp,
.animate__fadeOutDown .animate__fadeInUp {
  --animate-duration: 0.5s;
}

.simple-blog-navbar-item-text{
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color:oklch(var(--nc));
}

.simple-blog-navbar-line {
  transition: all .25s;
  border-radius: 5px;
  background-color: red;
  width: 3px;
  position: absolute;
  top: 0;
  z-index: 10;
  right: 0;
}

.simple-blog-navbar-avatar {
  transform: translateY(-100px)
}
.simple-blog-navbar-avatar-text{
  font-weight: bolder;
  font-size: 8px;
  color: black;
}
@media screen and (min-width: 500px) {
  .simple-blog-navbar-avatar-text{
    font-size: 1vw !important;
  }
}
.nav-bar-box{
  position: relative;
  min-width: 50px;
  max-width: 200px
}
.bg-base-100{
  background: none;
}
</style>
