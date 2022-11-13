<template>
    <div class="blog-box">
        <div v-show="editPost" class="icons">
            <div @click="editBlog" class="icon">
                <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
            </div>
            <div @click="deletePost" class="icon">
                <div class="delete"><i class="fa-solid fa-trash"></i></div>
            </div>
        </div>
        <div class="blog-img">
            <img :src="post.blogCoverPhoto">
        </div>
        <div class="blog-details">
          <h4>{{ post.blogTitle }}</h4>
          <br>
          <h6>Posted on: <span>{{ new Date(post.blogDate).toLocaleString("en-us", {dateStyle: "long"}) }}</span></h6>
          <br>
          <p>{{ post.blogIntro }}</p>
          <br>
          <router-view class="pro">
          <router-link :to="{ name: 'ViewBlog', params: {blogid: this.post.blogID}}">CONTINUE READING</router-link>
          </router-view>
         </div>
       <h1> 09/01</h1>
     </div>
</template>
<script>
    export default {
        name: "BlogCard",
        props: ["post"],
        methods: {
            deletePost() {
                this.$store.dispatch("deletePost", this.post.blogID);
            },
            editBlog() {
                this.$router.push({name: 'EditBlog', params: {blogid: this.post.blogID}})
            }
        },
        computed: {
            editPost () {
                return this.$store.state.editPost;
            }
        }
    }
</script>
<style scoped>
.icons {
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 90;
}
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
   }
   .icon:hover{
color: #fff;
background-color: #088178;
}
.delete:hover{
color: rgb(0, 0, 0);
background-color: #fd0707;
}
span {
    color: rgb(60, 255, 0);
}
    /* .edit,
    .delete {
        path {
            fill: #fff;
        }
    } */
</style>
