<template>
    <div class="chekout">
          <div class="container mt-5 pt-5">
              <div class="row">
                  <div class="col-md-8">
                      <h4 class="py-4">Checkout page</h4>
                       <ul>
                          <li v-for="(productItem, index) in this.$store.state.cartItems" :key="index" class="media">
                          <img :src="productItem.productCoverPhoto" class="align-self-center mr-3" alt="" style="width: 80px">
                          <div class="media-body" style="flex-direction: column;">
                              <h5 class="mt-0">{{productItem.productTitle}}
                                  <span class='float-right' @click="$store.commit('removeFromCart',productItem)">X</span>
                              </h5>
                              <p class="mt-0">Size : {{productItem.productSize }}</p>
                              <p class="mt-0"> Ksh {{productItem.productPrice}}</p>
                              <p class="mt-0">Quantity : {{productItem.quantity }}</p>
                          </div>
                          </li>
                      </ul>
                  </div>
                  <br>
                  <div class="col-md-4">
                    <p>
                          Total Price : Ksh {{totalPrice}}
                    </p>
                    <br>
                    <label for="paymentMethod">Enter Payment Method .</label>
                    <select v-model="paymentMethod">
                      <option value="mpesa" style="color: green;">M-PESA</option>
                      <option value="visa" style=" background:linear-gradient(45deg, rgb(20, 51, 90), rgb(253, 249, 10));">VISA/MASTERCARD</option>
                    </select>
                    <div>
                      <div v-if="paymentMethod ==='mpesa'">
                        <img class="visa-logo" src="@/assets/img/pay/mpesa.png" alt="">
                        <div class="inputBox">
                        <span>Phone number</span>
                        <input v-model="phoneNumber" type="number" maxlength="16" class="card-number-input">
                        </div>
                        <button @click='pay' :disabled='!complete' class="submit-btn">
                           Pay
                        </button>
                      </div>
                      <div class="visa" v-if="paymentMethod ==='visa'">
                      <VisaCard />
                      </div>
                    </div>
                      <!-- </form> -->
                  </div>
              </div>
          </div>
    </div>
  </template>

  <script>
import VisaCard from "./VisaCard.vue"
  export default {
      data () {
      return {
        paymentMethod: "",
        // visa: false,
        complete: false,
        stripeOptions: {
          // see https://stripe.com/docs/stripe.js#element-options for details
        }
      }
    },
    components: { VisaCard },
    methods: {
      // payment(){
      //   if(this.paymentMethod === 'visa' ){
      //   this.visa = true;
      //   }
      //   return;
      // },
      pay () {
        // createToken returns a Promise which resolves in a result object with
        // either a token or an error key.
        // See https://stripe.com/docs/api#tokens for the token object.
        // See https://stripe.com/docs/api#errors for the error object.
        // More general https://stripe.com/docs/stripe.js#stripe-create-token.

        // createToken().then(data => console.log(data.token))
      }
    },
    computed: {
      totalPrice() {
      let total = 0;

      for (let productItem of this.$store.state.cartItems) {
        total += productItem.totalPrice;
      }
      total = total + 200;
      return total;
    },
    }
  }
  </script>



  <style scoped>
  @media (max-width:477px){
    .visa{
      width: 20px;
      margin-left: 20px;
    }
  }

    option {
      font-weight: 700;
    }
    .inputBox {
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 100px;
    }
    .submit-btn{
    width: 100%;
    background:linear-gradient(45deg, rgb(12, 247, 3), rgb(207, 34, 34));
    margin-top: 20px;
    padding: 10px;
    font-size: 20px;
    color:#fff;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s linear;
}

.submit-btn:hover{
    letter-spacing: 2px;
    opacity: .8;
}
  </style>