<template>
<div class="container">
    <div class="card-container">
        <div v-if="!back" class="front" >
            <img class="visa-logo" src="@/assets/img/pay/visa.png" alt="">
            <div class="image">
                <img src="@/assets/img/pay/chip.png" alt="">
            </div>
            <div class="card-number-box">{{cardNumber }}</div>
            <div class="flexbox">
                <div class="box">
                    <span>card holder</span>
                    <div class="card-holder-name">{{holderName}}</div>
                </div>
                <div class="box">
                    <span>expires</span>
                    <div class="expiration">
                        <span class="exp-month">{{month}}/</span>
                        <span class="exp-year">{{year}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="back" class="back">
            <div class="stripe"></div>
            <div class="box">
                <span>cvv</span>
                <div class="cvv-box">{{cvv}}</div>
                <img src="@/assets/img/pay/visa.png" alt="">
            </div>
        </div>
    </div>
    <form action="">
        <div  @click="cardFront()" class="inputBox">
            <span>card number</span>
            <input v-model="cardNumber" type="number" maxlength="16" class="card-number-input">
        </div>
        <div  @click="cardFront()" class="inputBox">
            <span>card holder</span>
            <input v-model="holderName" type="text" class="card-holder-input">
        </div>
        <div class="flexbox">
            <div  @click="cardFront()" class="inputBox">
                <span>expiration mm</span>
                <select v-model="month" name="" id="" class="month-input">
                    <option value="month" selected disabled>month</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div  @click="cardFront()" class="inputBox">
                <span>expiration yy</span>
                <select v-model="year" name="" id="" class="year-input">
                    <option value="year" selected disabled>year</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>
            <div class="inputBox">
                <span>cvv</span>
                <input @click="cardBack()" v-model="cvv" type="text" maxlength="4" class="cvv-input">
            </div>
        </div>
        <!-- <input type="submit"  @click='pay' :disabled='!complete' value="submit" class=""> -->
        <button @click='pay' :disabled='!complete' class="submit-btn">
         Pay
        </button>
    </form>
</div>
</template>
<script>
       export default {
        name: 'VisaCard',
        data() {
            return {
                cardNumber: "################",
                holderName: "FULL NAME ",
                month: "MM",
                year: "YY",
                cvv: "",
                back: false,
                transform: "",

            }
        },
        methods: {
            cardBack () {
                // this.transform = 'perspective(1000px) rotateY(-180deg)',
                // this.transform = 'perspective(1000px) rotateY(0deg)',
                this.back= true;
            },
            cardFront () {
                this.back= false;
            }
        }
       }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');

*{
    font-family: 'Poppins', sans-serif;
    margin:0; padding:0;
    box-sizing: border-box;
    outline: none; border: none;
    text-decoration: none;
    text-transform: uppercase;
}

.container{
    min-height: 100vh;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    padding-bottom: 60px;
    min-width: 300px;
}
@media (max-width:477px){
    .container{
    min-height: 40vh;
    width: 300px;
    }
    .container form{
    width: 350px;
}
}

.container form{
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 15px rgba(0,0,0,.1);
    padding: 20px;
    /* width: 600px; */
    padding-top: 160px;
}

.container form .inputBox{
    margin-top: 20px;
}

.container form .inputBox span{
    display: block;
    color:#999;
    padding-bottom: 5px;
}

.container form .inputBox input,
.container form .inputBox select{
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border:1px solid rgba(0,0,0,.3);
    color:#444;
}

.container form .flexbox{
    display: flex;
    gap:15px;
}

.container form .flexbox .inputBox{
    flex:1 1 150px;
}

.container form .submit-btn{
    width: 100%;
    background:linear-gradient(45deg, blueviolet, deeppink);
    margin-top: 20px;
    padding: 10px;
    font-size: 20px;
    color:#fff;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s linear;
}

.container form .submit-btn:hover{
    letter-spacing: 2px;
    opacity: .8;
}

.container .card-container{
    margin-bottom: -150px;
    position: relative;
    height: 250px;
    width: 400px;
}

.container .card-container .front{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0; left: 0;
    background:linear-gradient(45deg, blueviolet, deeppink);
    border-radius: 5px;
    backface-visibility: hidden;
    box-shadow: 0 15px 25px rgba(0,0,0,.2);
    padding:20px;
    transform:perspective(1000px) rotateY(0deg);
    transition:transform .4s ease-out;
}

.container .card-container .front .image{
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding-top: 10px;
    width: 20%;
}
.visa-logo {
    float: right;
    margin-top: 10px;
    height: 50px;
}
.container .card-container .front .image img {
    height: 50px;
}

.container .card-container .front .card-number-box{
    padding:20px 0;
    font-size: 22px;
    color:#fff;
}

.container .card-container .front .flexbox{
    display: flex;
}

.container .card-container .front .flexbox .box:nth-child(1){
    margin-right: auto;
}

.container .card-container .front .flexbox .box{
    background-color: inherit;
    font-size: 15px;
    color:#fff;
}

.container .card-container .back{
    position: absolute;
    top:0; left: 0;
    height: 100%;
    width: 100%;
    background:linear-gradient(45deg, blueviolet, deeppink);
    border-radius: 5px;
    padding: 20px 0;
    text-align: right;
    backface-visibility: true;
    box-shadow: 0 15px 25px rgba(0,0,0,.2);
    /* transform:perspective(1000px) rotateY(180deg);
    transition: transform .4s ease-out; */
}

.container .card-container .back .stripe{
    background: #000;
    width: 100%;
    margin: 10px 0;
    height: 50px;
}

.container .card-container .back .box{
    padding: 0 20px;
    background-color: inherit;
}

.container .card-container .back .box span{
    color:#fff;
    font-size: 15px;
}

.container .card-container .back .box .cvv-box{
    height: 50px;
    padding: 10px;
    margin-top: 5px;
    color:#333;
    background: #fff;
    border-radius: 5px;
    width: 100%;
}

.container .card-container .back .box img{
    margin-top: 30px;
    height: 30px;
}
</style>