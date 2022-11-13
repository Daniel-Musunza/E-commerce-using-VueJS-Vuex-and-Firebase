<template>
  <div class="pro-container">
    <div class="create-post">
      <ProductPhotoPreview v-show="this.$store.state.productPhotoPreview" style="margin-top:200px;"/>
      <TheLoader v-show="loading" />
      <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
          <p><span>Error:</span>{{ this.errorMsg }}</p>
        </div>
        <div class="blog-info">
          <div>
          <label for="title">Enter Product Name</label>
          <input type="text" v-model="productTitle" style="width:120px"/>
          </div>
          <div>
          <label for="brand">Enter Product Brand</label>
          <input type="text" v-model="productBrand" style="width:110px"/>
          </div>
          <div class="price" >
          <label for="price" >Price</label>
          <input type="number" v-model="productPrice" style="width: 100px; height:47px; padding-left: 10px; font-size: 16px; margin-right: 10px;"/>
          </div>
          <br>
          <div class="upload-file">
            <label for="product-photo">Upload Product Photo</label>
            <input type="file" ref="productPhoto" id="product-photo" @change="productFileChange" accept=".png, .jpg, .jpeg" style = "display: none;"/>
            <button @click="openProductPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.productPhotoFileURL }">
              Preview Photo
            </button>
            <span>File Chosen: {{ this.$store.state.productPhotoName }}</span>
          </div>
        </div>
        <div>
          <textarea name="" id="" cols="30" rows="2" plaaceholder="Enter Product Details"  v-model="productDetails"></textarea>
        </div>
        <div class="blog-actions">
          <button @click="updateProduct" style="background-color: green">Save Changes</button>
        </div>
      </div>
    </div>
    </div>
  </template>
  <script>
    import ProductPhotoPreview from "@/components/ProductPhotoPreview";
    import TheLoader from "@/components/TheLoader";
    import firebase from "firebase/app";
    import "firebase/storage";
    import db from "@/firebase/firebaseInit";
    export default {
      name: "EditProduct",
      data() {
        return {
          file: null,
          error: null,
          errorMsg: null,
          loading: null,
          routeID: null,
          currentProduct: null,
        };
      },
      components: {
        ProductPhotoPreview,
        TheLoader,
      },
      methods: {
        productFileChange() {
          this.file = this.$refs.productPhoto.files[0];
          const fileName = this.file.name;
          this.$store.commit("productFileNameChange", fileName);
          this.$store.commit("createProductFileURL", URL.createObjectURL(this.file));
        },
        openProductPreview() {
          this.$store.commit("openProductPhotoPreview");
        },
        async updateProduct() {
          const dataBase = await db.collection("productItems").doc(this.routeID)
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}`);
              docRef.put(this.file).on(
                "state_changed",
                (snapshot) => {
                  console.log(snapshot);
                },
                (err) => {
                  console.log(err);
                  this.loading = false;
                },
                async () => {
                  const downloadURL = await docRef.getDownloadURL();
                  const dataBase = await db.collection("productItems").doc();
                  await dataBase.update({
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                  });
                  await this.$store.dispatch("updateProductItems", this.routeID);
                  this.loading = false;
                  this.$router.push({ name: "shop", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.loading = true;
            await dataBase.update({
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
            });
            await this.$store.dispatch('updateProducts', this.routeID);
            this.loading = false;
            this.$router.push({ name: 'shop', params: { productid: dataBase.id}});
            return;
          }
        },
      },
      computed: {
        profileId() {
          return this.$store.state.profileId;
        },
        productCoverPhotoName() {
          return this.$store.state.productPhotoName;
        },
        productTitle: {
          get() {
            return this.$store.state.productTitle;
          },
          set(payload) {
            this.$store.commit("updateProductTitle", payload);
          },
        },
        productPrice: {
          get() {
            return this.$store.state.productPrice;
          },
          set(payload) {
            this.$store.commit("updateProductPrice", payload);
          },
        },
        productBrand: {
          get() {
            return this.$store.state.productBrand;
          },
          set(payload) {
            this.$store.commit("updateProductBrand", payload);
          },
        },
        productDetails: {
          get() {
            return this.$store.state.productDetails;
          },
          set(payload) {
            this.$store.commit("updateProductDetails", payload);
          },
        },
      },
      async mounted() {
      this.routeID = this.$route.params.productid;
      this.currentProduct = await this.$store.state.productItems.filter((productItem) => {
        return productItem.productID === this.routeID;
      })
      this.$store.commit('setProductState', this.currentProduct[0]);
      },
  }
    </script>

  <style scoped>
    h2 {
      text-align: center;
      color: #41b883;
      padding: 30px;
      padding-bottom: 0px;
      font-weight: bold;
    }
    input [type="text"] {
      flex: 10;
      padding: 10px;
      border:1px solid #41b884;
      outline:0;
    }
    input[type="text"] {
      margin-left: 10px;
      margin-right: 50px;
      margin-top: 30px;
    }
    input[type="submit"],button {
      flex: 2;
      background: #41b883;
      color: #fff;
      border: 1px #41b883 solid;
      cursor: pointer;
      margin-left: 10px;
      margin-top: 30px;
    }
    button {
      margin-top: 0;

    }
    .router-button {
      text-decoration: none;
      color: azure;
    }
    label,
    button,
    .router-button {
      transition: 0.5s ease-in-out all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #303030;
      text-decoration: none;
    }
    label,
    button,
    .router-button :hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
    .container {
        display:flex;
        justify-content: space-between;
        padding-top: 20px;
        flex-wrap: wrap;
        position: relative;
        height: 100%;
        background-color: rgb(127, 225, 255);
        /* padding: 10px 25px 60px; */
    }
    .container .create-post{

        width:100%;
        min-width:250px;
        padding: 10px 12px;
        border: 1px solid #cce7d0;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.02);
        margin: 10px 0;
        transition: 0.2s ease;
        position: relative;
        height: 100%;
    }
    /* error styling */
    .invisible {
      opacity: 0 !important;
    }

    .err-message {
      width: 100%;
      padding: 12px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;

    }
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
    .blog-info {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }
    input:nth-child(1) {
      min-width: 200px;

    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
    }
    input:focus {
      outline: none;
      box-shadow: 0 1px 0 0 #303030;
    }
    .upload-file {
      flex:1;
      margin-left: 0px;
      position: relative;
      display: flex;
      flex-direction: row;
    }
    .preview {
      margin-left: 16px;
      text-transform: initial;
    }
    span {
      font-size: 12px;
      margin-left: 16px;
      align-self: center;
    }
    .editor {
      height:60vh;
      display: flex;
      flex-direction: column;
    }
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .blog-actions {
      margin-top: 32px;
    }
    button {
      margin-right: 16px;
    }
    /* button{
     background-color: #41b883;
     height: 20px;
     } */
    </style>
