<template>
  <div>
    <h1>My Wish List</h1>
     <div class="pro-container">
        <div v-for="(productItem, index) in this.$store.state.wishList" :key="index">
             <div class="pro">
                      <div @click="deleteFromWishList(productItem)" class="icon">
                      <div><i class="fa-solid fa-trash"></i></div>
                      </div>
                      <img :src="productItem.productCoverPhoto" width="200">
                      <div class="des">
                          <span>{{productItem.productBrand }}</span>
                          <h5>{{productItem.productTitle }}</h5>
                          <div class="star">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                          </div>
                          <h4>Ksh {{productItem.productPrice}}</h4>
                      </div>
                  <button
                    @click="
                    addToCart(productItem)
                    "
                    class="normal"
                  >
                    Add To Cart
                  </button>
                  <h6>Posted on: <span>{{ new Date(productItem.productDate).toLocaleString("en-us", {dateStyle: "medium"}) }}</span></h6>
          </div>
        </div>
    </div>
  </div>
    </template>
    <script>
import { mapGetters } from "vuex";
    export default {
      name: "ProductListItem",
      props: ["productItem"],
      methods: {
        deleteFromWishList(productItem) {
         this.$store.commit("deleteFromWishList", productItem);
        },
        addToCart(productItem) {
          productItem.quantity = 1;
          this.$store.commit("addToCart", productItem);
        }
      },
      computed: {
        ...mapGetters(["wishList"]),
      }
    };
    </script>
    <style scoped>
      .icon {
          position: relative;
          top: 25px;
          left: 10px;
          z-index: 90;
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
      background-color: #fd0707;
      }
      span {
          color: rgb(60, 255, 0);
      }
      .normal {
        background-color: #088178;
        color: #fff;
        margin-bottom: 15px;
        padding-block: 8px;
      }
      .pro-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          /* background-color: #088178; */
        }
        .pro {
          border-radius: 10px;
        }
        h1 {
          font-weight: 600;
          text-align: center;
        }
      @media (max-width:477px){
        .pro-container {
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          /* background-color: #088178; */
        }
      }
      </style>
