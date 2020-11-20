<template>
  <div v-if="show" class="error-message-block" :class="{'success':success,'error':!success}">
    <div>{{success ? 'Success' :'Error'}}</div>
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    this.$root.$on("api-status", data => {
      this.show = true;
      let { message, status } = { ...data };
      this.message = message;
      this.success = status;
      setTimeout(() => {
        this.show = false;
      }, 4000);
    });
    return { message: "Err", show: false, success: false };
  }
};
</script>

<style scoped lang="scss">
.error-message-block {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 120px;
  border: 1px solid grey;
  top: 10px;
  left: 20px;
  padding: 1rem;
  color:$color_lighten;
  z-index: 2;
  opacity: 0;
  transition: opacity 4s ease-in-out;
  animation:animate_opacity 4s linear 1 ;
  @keyframes animate_opacity {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    75%{
        opacity:1;
    }
    100%{
        opacity:0.7
    }
  }
  &.success {
    background-color: $router_link_active_color;
  }
  &.error {
    background-color: $error_background_color;
  }
  & div:first-child{
      font-size:$font_size_bigger;
      font-weight: bolder;
      margin-bottom:1rem;
  }
}
</style>
