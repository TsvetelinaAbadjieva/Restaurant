<template>
  <div></div>
</template>

<script>
export default {
  name: "Start",
  data() {
    let user = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user")).user
      : {username:'',email:''};
    let loggedIn = user ? true : false;
    console.log('USER',user)
    this.$emit("userloggedin", { user, loggedIn });
    return {
      loggedIn: loggedIn,
      user: user
    };
  }
};
</script>

<style>
</style>

