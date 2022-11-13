<template>
<div class="container">
<section  v-if="currentProduct"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentProduct[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentProduct[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentProduct[0].images}}</div>
        <!-- <div class="small-img-group">
          <div class="small-img-col">
              <img :src="this.currentProduct[0].productCoverPhoto" alt="" id="MainImg" />
          </div>
          <div class="small-img-col">
              <img src="@/assets/img/products/cartoonTshirt2.jpg" width="100%" id="small-img" alt="">
          </div>
          <div class="small-img-col">
              <img src="@/assets/img/products/cartoonTshirt3.jpg" width="100%" id="small-img" alt="">
          </div>
          <div class="small-img-col">
              <img src="@/assets/img/products/cartoonTshirt4.jpg" width="100%" id="small-img" alt="">
          </div>
        </div> -->
    </div>
    <div class="single-pro-details">
        <!-- <h6>Home / T-Shirt</h6> -->
        <h4>{{this.currentProduct[0].productTitle}}</h4>
        <h2>Ksh {{this.currentProduct[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
            <option value="twenty">20</option>
            <option value="twenty8">28</option>
            <option value="thirty">30</option>
            <option value="thirty2">32</option>
            <option value="thirty4">34</option>
            <option value="thirty6">36</option>
            <option value="thirty8">38</option>
            <option value="forty">40</option>
            <option value="forty1">41</option>
            <option value="forty2">42</option>
            <option value="forty3">43</option>
            <option value="forty4">44</option>
        </select>
        <!-- <input type="number" v-model.number="product.id"> -->
        <input type="number">
        <button
        @click="addToCart(currentProduct[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentProduct[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentBuyOneFree"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentBuyOneFree[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentBuyOneFree[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentBuyOneFree[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentBuyOneFree[0].productTitle}}</h4>
        <h2>Ksh {{this.currentBuyOneFree[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentBuyOneFree[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentBuyOneFree[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentMegaSeasonSale"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentMegaSeasonSale[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentMegaSeasonSale[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentMegaSeasonSale[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentMegaSeasonSale[0].productTitle}}</h4>
        <h2>Ksh {{this.currentMegaSeasonSale[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentMegaSeasonSale[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentMegaSeasonSale[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentRepair"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentRepair[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentRepair[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentRepair[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentRepair[0].productTitle}}</h4>
        <h2>Ksh {{this.currentRepair[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentRepair[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentRepair[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentShoe"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentShoe[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentShoe[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentShoe[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentShoe[0].productTitle}}</h4>
        <h2>Ksh {{this.currentShoe[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentShoe[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentShoe[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentTshirt"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentTshirt[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentTshirt[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentTshirt[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentTshirt[0].productTitle}}</h4>
        <h2>Ksh {{this.currentTshirt[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentTshirt[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentTshirt[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentUpcommingSeason"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentUpcommingSeason[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentUpcommingSeason[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentUpcommingSeason[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentUpcommingSeason[0].productTitle}}</h4>
        <h2>Ksh {{this.currentUpcommingSeason[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentUpcommingSeason[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentUpcommingSeason[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentFeaturedProduct"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentFeaturedProduct[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentFeaturedProduct[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentFeaturedProduct[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentFeaturedProduct[0].productTitle}}</h4>
        <h2>Ksh {{this.currentFeaturedProduct[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentFeaturedProduct[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentFeaturedProduct[0].productDetails}}</span>
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
</template>
<script>
import Product_List_Item from '@/components/product/Product_List_Item'
export default {
  name: 'SingleProduct',
  data () {
    return {
        currentProduct: null,
        currentBuyOneFree: null,
        currentMegaSeasonSale: null,
        currentRepair: null,
        currentShoe: null,
        currentTshirt: null,
        currentUpcommingSeason: null,
        currentFeaturedProduct: null,
        productSize: "",
    }
  },
  components: {
    ProductListItem:Product_List_Item,
  },
  computed: {
    featuredProducts() {
           return this.$store.state.featuredProducts;
        },
  },
  methods: {
    addToCart(productItem) {
      productItem.quantity = 1;
      productItem.productSize = this.productSize;
      productItem.totalPrice = productItem.productPrice;
      this.$store.commit("addToCart", productItem);
    }
  },
  async mounted() {
    this.currentProduct = await this.$store.state.productItems.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentBuyOneFree = await this.$store.state.buyOneFree.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentMegaSeasonSale = await this.$store.state.megaSeasonSale.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentRepair = await this.$store.state.repair.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentShoe = await this.$store.state.shoes.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentTshirt = await this.$store.state.tshirts.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentUpcommingSeason = await this.$store.state.upcommingSeason.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentFeaturedProduct= await this.$store.state.featuredProducts.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    })
  },
  created() {
    this.$store.dispatch('getFeaturedProducts');
  }
}
</script>
