
<template>
<div class="container-fluid">
 <section id="page-header" class="about-header">
    <h2>#Know us</h2>
    <p> whoever said that money doesn’t buy happiness simply doesn’t know where to shop! </p>
 </section>
 <section id="about-head" class="section-p1">
    <img src="@/assets/img/about/aboutimg.jpg" alt="">
    <div>
        <h2>who we Are?</h2>
        <p>Boutique shopping is a unique experience that allows you to find original pieces that you wouldn't find if you were walking round a large shopping centre. But why shop boutique instead of hitting the usual high street shops? Today we take a look at exactly why it's so important that savvy shoppers support our boutique stores, so that YOU can learn exactly why it is that we do what we do. Read on to find out more!</p>
        <br>
        <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">To Know more about us contact us or visit our shop</marquee>
    </div>
 </section>
 <section id="about-app" class="section-p1">
    <h3>We are happy for You. we can dance together</h3>
    <div class="video">
    <video autoplay loop muted src="@/assets/img/about/tutakusifu.mp4" alt=""></video>
    <!-- <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">mahali uliona twendee...chini chini chini hata juu watu unawainua, sifa na utukufu ni zako milelee. na tutakusifu, twasifu jina lako, milele tutakusifu, daima u mwema tutaishi kwakooo. ... oona oona oonaa</marquee> -->
    </div>
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
<!-- <MyPoster /> -->
 </div>
</template>
<!-- <script>
import MyPoster from "@/components/MyPoster.vue"
export default {
    components: {
        MyPoster,
    }
}
</script> -->
<style scoped>
   .feature-heading{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>