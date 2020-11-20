<template>
  <div class="container">
    <div>
      <p>Are you sure to logout?</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logout",
  data() {
    this.$root.$emit("shownavlinks", true);
    return {};
  },
  methods: {
    logout: function() {
      sessionStorage.removeItem("user");
      this.$router.replace("/login");
      this.$root.$emit("shownavlinks", false);
    }
  }
};
</script>
<style scoped lang="scss">
button {
  @include standard_button;
  // width: 180px;
  // height: 55px;
}
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  div {
    margin-top: 100px;
    font-size: 20px;
    padding: 1rem;
    border:1px solid grey;
  }
}
</style>

