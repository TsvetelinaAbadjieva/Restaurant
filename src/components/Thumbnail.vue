<template>
  <div class="thumbnail col-lg-4 col-md-12 col-sm-12 col-xs-12">
    <div>
      <img v-bind:src="props.url" alt="restaurant" @click="goToDishes">
    </div>
    <div>
      <div class="name">{{props.name}}</div>
      <div class="type">{{props.type}}</div>
      <div class="description">{{props.description}}</div>
    </div>
    <div>
      <button type="button" @click="goToDishes"><md-icon class="md-size-8x fa fa-thumbs-up"></md-icon></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thumbnail",
  props: ["props"],
  data() {
    console.log("thumb", this.props.url);
    return {
      url: this.props.url
    };
  },
  methods: {
    goToDishes() {
      // this.$router.replace("dishes");
      this.$router.push({name:'dishes',params:{id:this.props.id}})
    }
  }
};
</script>

<style scoped lang="scss">
.thumbnail {
  @include thumbnail;
}
img {
  @include img;
  cursor:pointer;
}
.name {
  @include name;
}
.type {
  @include type
}
.description {
  @include description;
}
button{
    width:50px;
    height: 50px;
    background: transparent;
}
md-icon{
    font-size:2rem;
    color:$router_link_active_color;
}
</style>
