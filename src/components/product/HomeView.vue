<template>
 <div>
   <NotUser v-if="modalActive" :signInMessage="signInMessage" v-on:close-modal="closeModal"
  />
<div class="container-fluid">
   <section id="hero">
       <h4>Trade-in-offer</h4>
       <h2>Super Value Deals</h2>
       <h1>On all Products</h1>
       <p> Save more with coupons & up to 70% off!</p>
       <router-link @click="notUser()" to='/shop' class="btn">
       <button>Shop now</button>
       </router-link>
    </section>
    <div class="feature-heading">
        <h2> We care For you</h2>
        <p>Here are some of our best Services</p>
    </div>
    <section id="feature" class="section-p1">
        <div class="fe-box">
            <img src="@/assets/img/features/FreeShipping.jpg" alt="">
            <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/onlineOrder.jpg" alt="">
            <h6>Online Order</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/promotions.jpg" alt="">
            <h6>Promotions</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/happySale1.jpg" alt="">
            <h6>Happy Sale</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/saveMoney.jpg" alt="">
            <h6>Save Money</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/FSupport.jpg" alt="">
            <h6>F24/7 Support</h6>
        </div>
    </section>
    <section id ="product1" class="section-p1">
        <h2> Featured Products</h2>
        <p>Summer collection New Morden Design</p>
        <div class="pro-container" style="display:flex">
           <ProductListItem
           @click="notUser()"
           :productItem="productItem"
           v-for="(productItem, index) in featuredProducts"
           :key="index"
           />
        </div>
    </section>
    <section id="banner" class="section-m1">
        <h4>Repair Services </h4>
        <h2>Up to <span>70% off</span>-All t-shirts & Assessories</h2>
        <router-link @click="notUser()" to="/repair"><button class="normal"> Explore More</button> </router-link>

    </section>
    <section id="product1" class="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer collection New Morden Design</p>
        <div class="pro-container" style="display: flex;">
           <ProductListItem
           @click="notUser()"
           :productItem="productItem"
           v-for="(productItem, index) in productItems.slice(0, 8)"
           :key="index"
           />
        </div>
    </section>
<section id="sm-banner" class="section-p1">
    <div class="banner-box" style="width: 500px;">
    <h4>crazy deals</h4>
    <h2>Buy 1 get 1 Free</h2>
    <span> The  best classic dress is on sale at cara</span>
    <router-link @click="notUser()" to="/buy-one-free"><button class="white">Learn More</button> </router-link>
    </div>
    <div class="banner-box banner-box2"  style="width: 500px;">
    <!-- <h4>Spring/summer</h4> -->
    <h2>upcomming season</h2>
    <span> The best classic dress is on sale at cara</span>
    <router-link  @click="notUser()" to="/upcomming-season"><button class="white">Collection</button></router-link>
    </div>
</section>
<section id="banner3">
    <router-link @click="notUser()" to="/mega-season-sale">
        <div class="banner-box">
        <!-- <h3>winter collection</h3> -->
        </div>
    </router-link>

    <router-link @click="notUser()" to="/shoes">
        <div class="banner-box banner-box2">
        <!-- shoes -->
        <!-- <h3>Spring/Summer</h3> -->
        </div>
    </router-link>

    <router-link @click="notUser()" to="/t-shirts">
        <div class="banner-box banner-box3">
            <h2>T-Shirts</h2>
            <h3>New Trendy Prints</h3>
        </div>
    </router-link>
</section>
<section id="newsletter" class="section-p1 section-m1">
    <div class="newstext">
    <h4>Sign Up For Newsletters</h4>
    <p> Get E-mail Updates about our latest shop and <span>Special offers.</span>
    </p>
    </div>
    <div class="form">
        <input type="email" placeholder="example@gmail.com">
        <button class="normal">Sign Up</button>
    </div>
</section>
  </div>
  </div>
</template>
<script>
import Product_List_Item from './Product_List_Item'
import NotUser from "@/components/NotUser"
export default {
  name: "HomeView",
  data() {
         return {
            // user: null,
            signInMessage: "",
            modalActive: false,
         }
     },
  components: {
    ProductListItem:Product_List_Item,
    NotUser,
  },
  methods: {
    notUser() {
        if (!this.user){
        this.modalActive = true,
        this.signInMessage = "Please sign in to access Our Inventory";
        }
    },
    closeModal() {
        this.modalActive = !this.modalActive;
        this.email = "";
    }
  },
  computed: {
    productItems() {
       return this.$store.state.productItems;
    },
    featuredProducts() {
           return this.$store.state.featuredProducts;
        },
    editProducts: {
     get() {
        return this.$store.state.editProducts;
     },
     set(payload) {
       this.$store.commit("toggleEditProducts", payload);
     }
    },
    profileAdmin() {
     return this.$store.state.profileAdmin;
    },
    user() {
          return this.$store.state.user;
    },
},
beforeUnmount () {
    this.$store.commit("toggleEditProducts", false);
},
  created() {
    this.$store.dispatch('getProductItems');
    this.$store.dispatch('getFeaturedProducts');
  }

};
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
    .feature-heading{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button {
        border-radius: 15px;
    }

</style>
