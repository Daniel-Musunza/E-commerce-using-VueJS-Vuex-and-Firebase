<template>
  <div class="pro-container">
    <AdministrationNav />
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
          <input type="number" v-model="productPrice" style="width: 100px; height:47px; padding-left: 10px; font-size: 16px; margin-left: 140px; border-radius: 10px;"/>
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
          <div class="price">
          <label>Add Product Details</label>
          <textarea name="" id="" min-cols="70" rows="2" plaaceholder="Enter Product Details"  v-model="productDetails"></textarea>
          </div>
       <!-- <div class="upload-file">
            <label  for="product-photos" >Upload Other Product Images</label>
            <input type="file" ref="productPhotos" id="product-photos" @change="uploadImage" accept=".png, .jpg, .jpeg" style = "display: none;"/>
       </div> 
       <div class="form-group d-flex">
        <label>Files Chosen:</label>
          <div class="p-1" v-for="(image, index) in images" :key="index">
            <div class="img-wrapp">
               <img :src="image" alt="" width="10px">
              </div>
          </div>
       </div> -->
      </div>
        <div class="blog-actions">
      <div id="items" class="uploadShoes">
        <input class="box" type="checkbox" v-model="shoes" />
        <label for="uploadShoes">Add Footware Collection</label>
      </div>
      <div id="items" class="uploadMegaSeasonSale">
        <input class="box" type="checkbox" v-model="megaSeasonSale" />
        <label for="uploadMegaSeasonSale">Add To Season Sale</label>
      </div>
      <div id="items" class="uploadRepair">
        <input class="box" type="checkbox" v-model="repair" />
        <label for="uploadRepair">Add To Repair</label>
      </div>
      <div id="items" class="uploadUpcommingSeason">
        <input class="box" type="checkbox" v-model="upcommingSeason" />
        <label for="uploadUpcommingSeason">Add To Upcomming Season</label>
      </div>
      <div id="items" class="uploadBuyOneFree">
        <input class="box" type="checkbox" v-model="buyOneFree" />
        <label for="uploadBuyOneFree">Add To Buy 1 get 1 Free</label>
      </div>
      <div id="items" class="uploadTshirt">
        <input class="box" type="checkbox" v-model="tshirt" />
        <label for="uploadTshirt">Add To T-Shirts</label>
      </div>
      <div id="items" class="uploadFeaturedProducts">
        <input class="box" type="checkbox" v-model="featuredProducts" />
        <label for="uploadFeaturedProducts"> Add To Featured Products</label>
      </div>
          <button @click="uploadProduct" style="background-color: green" >Add Inventoty</button>
        </div>
      </div>7
    </div>
    </div>
  </template>
  <script>
    import AdministrationNav from "@/components/core/AdministrationNav.vue";
    import ProductPhotoPreview from "@/components/ProductPhotoPreview";
    import TheLoader from "@/components/TheLoader";
    import firebase from "firebase/app";
    import "firebase/storage";
    import db from "@/firebase/firebaseInit";
    export default {
      name: "AdministrationPage",
      data() {
        return {
          file: null,
          error: null,
          errorMsg: null,
          loading: null,
          uploading: null,
          tshirt: null,
          buyOneFree: null,
          upcommmingSeason: null,
          repair: null,
          megaSeasonSale: null,
          shoes: null,
          featuredProducts: null,
            // images: [],
  

        };
      },
      components: {
        AdministrationNav,
        ProductPhotoPreview,
        TheLoader,
      },
      // firestore(){
      // return {
      //   products: db.collection('productItems'),
      // }
      // },
      methods: {
            productFileChange() {
              this.file = this.$refs.productPhoto.files[0];
              const fileName = this.file.name;
              this.$store.commit("productFileNameChange", fileName);
              this.$store.commit("createProductFileURL", URL.createObjectURL(this.file));
            },
            // uploadImages() {
            //   this.file = this.$refs.images.files[0];
            //   const fileName = this.file.name;
            //   this.$store.commit("uploadImagesNames", fileName);
            //   this.$store.commit("createProductFileURL", URL.createObjectURL(this.file));
            // },
        openProductPreview() {
          this.$store.commit("openProductPhotoPreview");
        },
        uploadTshirt() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("tshirts").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("tshirts");
                  this.loading = false;
                  this.$router.push({ name: "t-shirts", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadFeaturedProducts() {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("featuredProducts").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("featuredProducts");
                }
              );
              return;
            }
        },
        uploadBuyOneFree() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("buyOneFree").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("buyOneFree");
                  this.loading = false;
                  this.$router.push({ name: "buy-one-free", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadUpcommingSeason() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("upcommingSeason").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("upcommingSeason");
                  this.loading = false;
                  this.$router.push({ name: "upcomming-season", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadRepair() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("repair").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("repair");
                  this.loading = false;
                  this.$router.push({ name: "repair", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadMegaSeasonSale() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("megaSeasonSale").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("megaSeasonSale");
                  this.loading = false;
                  this.$router.push({ name: "mega-season-sale", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadShoes() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("shoes").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("shoes");
                  this.loading = false;
                  this.$router.push({ name: "shoes", params: { productid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },
        uploadProduct() {
          if (this.productTitle.length !== 0 || this.productPrice.length !== 0) {
            if (this.file) {
                   if(this.tshirt){
                      this.uploadTshirt();
                    }
                    if(this.buyOneFree){
                      this.uploadBuyOneFree();
                    }
                    if(this.upcommingSeason){
                      this.uploadUpcommingSeason();
                    }
                    if(this.repair){
                      this.uploadRepair();
                    }
                    if(this.megaSeasonSale){
                      this.uploadMegaSeasonSale();
                    }
                    if(this.shoes){
                      this.uploadShoes();
                    }
                    if(this.featuredProducts){
                      this.uploadFeaturedProducts();
                    }
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/ProductCoverPhotos/${this.$store.state.productPhotoName}` );
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
                  const timestamp = await Date.now();
                  let dataBase = await db.collection("productItems").doc();
                  await dataBase.set({
                    productID: dataBase.id,
                    productCoverPhoto: downloadURL,
                    productCoverPhotoName: this.productCoverPhotoName,
                    // productImagesNames: this.productImagesNames,
                    productTitle: this.productTitle,
                    productPrice: this.productPrice,
                    productBrand: this.productBrand,
                    productDetails: this.productDetails,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("getProductItems");
                  // await this.productItems.images.push(downloadURL),
                  this.loading = false;
                  this.$router.push({ name: "shop", params: { productid: dataBase.id } });
                  // this.reset();
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a product photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure product name has been filled!";
          setTimeout( () => {
            this.error = false;
          }, 5000);
          return;
        },

//         uploadImageAsPromise (file) {
//     const self = this;

//         return new Promise(function () {
//             var storageRef = firebase.storage().ref("documents/ProductPhotos/"+file.name);

//             //Upload file
//             var task = storageRef.put(file);


//             //Update progress bar
//             task.on('state_changed',
//                 function progress(snapshot){

//                     var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//                     console.log("percentage" + percentage)
//                     self.progressUpload = percentage;
//                 },
//                 function error(err){
//                     console.log(err)
//                 },
//                 function complete(){
//                     console.log("done")
//                     // var downloadURL = task.snapshot.downloadURL;
//                     task.snapshot.ref.getDownloadURL().then((downloadURL) => {
//               this.product.images.push(downloadURL);
//             }
//             )}
//             );
//         });
// },

//     uploadImage(){

//             for (var i = 0; i < this.images.length; i++) {
//               this.uploadImageAsPromise ();          
//             }
      // if(e.target.files[0]){
        
      //     let file = e.target.files[0];
    
      //     var storageRef = firebase.storage().ref('documents/ProductPhotos/'+ 'photo' + 1++ );
    
      //     let uploadTask  = storageRef.put(file);
    
      //     uploadTask.on('state_changed', (snapshot) => {
      //       console.log(snapshot);
      //     }, (err) => {
      //       console.log(err);
      //       // Handle unsuccessful uploads
      //     }, (snapshot) => {
      //       console.log(snapshot);
      //       // Handle successful uploads on complete
      //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
      //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //         this.product.images.push(downloadURL);
      //       });
      //     });
      // }
    // },
    // reset(){
    //   this.product = {
    //       images:[]
    //   }
    // },
 },
      computed: {
        profileId() {
          return this.$store.state.profileId;
        },
        productCoverPhotoName() {
          return this.$store.state.productPhotoName;
        },
            // productImagesNames() {
            //   return this.$store.state.productImages;
            // },
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
        productDetails: {
          get() {
            return this.$store.state.productDetails;
          },
          set(payload) {
            this.$store.commit("updateProductDetails", payload);
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
    .box {
      height: 30px;
    }
    input[type="text"] {
      margin-left: 25px;
      margin-right: 50px;
      margin-top: 30px;
      border-radius: 10px;
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
      flex-wrap: wrap;
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
      display: block;
    }
    button {
      margin-right: 16px;
    }
    #items{
      display:  flex;
      flex-direction: row;
    }
    /* button{
     background-color: #41b883;
     height: 20px;
     } */
    </style>
