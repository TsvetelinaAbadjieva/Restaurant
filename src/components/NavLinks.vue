<template>
  <div class="row">
    <div class="wrapper">
      <div id="nav" :class="!loggedIn ? 'hidden':''" class="row nav-left col-lg-6 col-md-6">
        <router-link class="router-link" to="/restaurants">Restaurants</router-link>
      </div>
      <div :class="!loggedIn ? 'hidden':''" class="nav nav-right profile col-lg-6 col-md-6">
        <router-link class="router-link" to id="username">
          <i class="fa fa-user"></i>
          <span>{{user.username}}</span>
        </router-link>
        <router-link class="router-link" to="/logout" v-show="loggedIn">Logout</router-link>
        <div class="popover-content" v-if="user">
          <span class="arrow"></span>
          <span>{{user.username}}</span>
          <span>{{user.email}}</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "NavLinks",
  data() {
    this.$root.$on("shownavlinks", $event => {
      console.log("Accept event", $event);
      let userLogged = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).user
        : { username: "anonymous", email: "" };
      this.loggedIn = $event;
      this.user = userLogged;
    });
    return { loggedIn: false, user: { username: "anonymous", email: "" } };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
}
@media all and(max-width:780px) {
  .wrapper {
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .nav-left,
  .nav-right {
    flex-direction: column;
  }
}
.nav-left {
  // float: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.nav-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  // align-items: flex-end;
  float: right;
  max-width: 300px;
}
div.profile {
  align-self: flex-end;
  grid-gap: 15px;
  position: relative;
}
.profile:hover .popover-content {
  display: block;
}
.popover-content {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  max-width: 250px;
  position: absolute;
  top: 55px;
  left: 0;
  padding: 0.5rem;
  margin: 0.5rem;
  line-height: 30px;
  min-width: 200px;
  background: $popover_background_color;
  color: $color_;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  white-space: wrap;

  span {
    display: block;
    position: relative;
  }
  span.arrow {
    position: absolute;
    width: 15px;
    height: 15px;
    transform: rotateZ(45deg);
    background: $popover_background_color;
    opacity: 0.8;
    margin-top: -14px;
    left: 50px;
    margin-bottom: 5px;
    z-index: -2;
  }
}
i {
  font-size: 2rem;
  margin-right: 1rem;
}
#username span {
  vertical-align: text-bottom;
}
.router-link:hover {
  background: whitesmoke;
}
.router-link {
  // border: 1px solid grey;
  margin-top: 1rem;
}
</style>
