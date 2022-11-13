<template>
    <div class="container-fluid">
        <section id="page-header" class="blog-header">
            <h2>/readmore</h2>
            <p> Read all case studies about our products!</p>
        </section>
        <section id="blog">
            <div v-if="profileAdmin" class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
           <div class="pro-container">
            <BlogCard
            :post="post"
            v-for="(post, index) in blogPosts.slice(0,5)"
            :key="index"
            />
           </div>
        </section>
        <section id="pagination" class="section-p1">
            <router-view class="pro">
             <router-link to="/blog/readmore">Load More</router-link>
            </router-view>
        </section>
        <section id="newsletter" class="section-p1 section-m1">
            <div class="newstext">
                <h4>Sign Up For Newsletters</h4>
                <p> Get E-mail Updates about our latest shop and <span>Special offers.</span></p>
            </div>
            <div class="form">
                <input type="email" placeholder="example@gmail.com">
                <button class="normal">Sign Up</button>
            </div>
        </section>
    </div>
</template>
<script>
import BlogCard from "../components/blogs/BlogCard.vue";
// import items from '../cart.json'
// import ReadMore from '@/components/ReadMore.vue'
// @ is an alias to /src
export default {
  name: 'BlogView',
  components: {
    BlogCard
},
// data () {
//     return {
//         sampleBlogCards: [
//         {
//             id: 1,
//             image: "b1.png",
//             title: "Short elegant dresses: where to find the best party dresses?",
//             blogHTML: "Short elegant dresses: where to find the best party dresses? Here we are girls, finally the moment we have been waiting for more than a year is coming: the @.",
//             blogDate: "7/7/2022"
//         },
//         {
//             id: 2,
//             image: "b2.png",
//             title: "What to choose for a perfect mountain clothing",
//             blogHTML: "What to choose for a perfect mountain clothing Hello Zagulini we are getting closer and closer to Christmas and in this period I am thinking of the snow, of the walks @.",
//             blogDate: "7/7/2022"
//         },
//         {
//             id: 3,
//             image: "b3.jpg",
//             title: "Women's T-shirt for a super trendy look with Replay",
//             blogHTML: "Women's T-shirt for a super trendy look with Replay Good morning zaguline, today I will answer one of the questions you are asking me in this period !!! Trends for @.",
//             blogDate: "7/7/2022"
//         },
//         {
//             id: 4,
//             image: "b4.jpg",
//             title: "What will be the new trends for MFW? Advances and program",
//             blogHTML: "What will be the new trends for MFW? Anticipations and program There are only a few days left until the beginning of Milan Fashion Week, and the time has come to find out what they will be @.",
//             blogDate: "7/7/2022",
//         },
//         {
//             id: 5,
//             image: "b5.jpg",
//             title: "Here is Crepetray TM the ultra light sneakers",
//             blogHTML: "Here is Crepetray TM the ultra light sneakers My dearest Zaguline, Spring is now here, even if you don't feel very much because, I must admit, that this cold Milanese @.",
//             blogDate: "7/7/2022",
//         }
//     ]
//     }
// },
computed: {
    blogPosts() {
       return this.$store.state.blogPosts;
    },
    editPost: {
     get() {
        return this.$store.state.editPost;
     },
     set(payload) {
       this.$store.commit("toggleEditPost", payload);
     }
    },
    profileAdmin() {
     return this.$store.state.profileAdmin;
 }
},
beforeUnmount () {
    this.$store.commit("toggleEditPost", false);
},
}
</script>
<style scoped>

    #blog {
        position: relative;
    }
    .toggle-edit {
            display:flex;
            align-items: center;
            position: absolute;
            top: 50px;
            right:0;
    }
    span {
            margin-right: 16px;
        }
     input[type="checkbox"] {
        position: relative;
        border: none;
        /* -webkit-appearance: none; */
        outline: none;
        width: 80px;
        height: 30px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    }
    input[type="checkbox"]:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #303030;
        transform: scale(1,1);
        transition: 750ms ease all;
        box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    }
    input:checked[type="checkbox"]:before {
        left: 52px;
        background: #fff;
    }
</style>
