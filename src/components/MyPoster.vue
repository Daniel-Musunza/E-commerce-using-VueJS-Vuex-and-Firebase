<template>
<div>
  <div>
  <section class="container">
    <header>
      <img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvL6ipMw4mjNX5NPt_r485rhYy7vCC93F_Q&usqp=CAU" width="100px" alt="">
      <div  class="photo">
<!--                <span> By 👇🏾😄</span> -->
      <img src="http://localhost:8080/img/BuyoneFree_65.04514c9a.jpg" width="100px" alt="">
      </div>
            <!-- <h1 class="fw700"> Project:   The Online Boutique</h1> -->
     </header>
    <div class="separator1"></div>
<!--     <div class="H1"> 
             <span> Musunza Festus </span>
      <h1 class="fw700" style="font-weight: 500px">Web Developer </h1>
      <p> 0794711950 </p>
   </div> -->
<!--          <p> Theme: Promoting Invovation and Technology in Agriculture and technology</p> -->
    <div class="separator"></div>
    <footer>

    </footer>
  </section>
</div>
</template>
<style scoped>
:root {
  --width: 800px;
  --height: 150px;
  --top-color: #fff;
  --bottom-color: #126209;
}
header{
  padding : 10px 10px;
}
.logo {
  margin-left: 30px;
  margin-top: 30px;
}
.photo {
  float: right;
  margin-right: 30px;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  color: #101010;
}
.photo img {
  border-radius: 45px;
}
.H1{
   background-color: #de9a06;
  margin: 0px;
}
p{
  text-align: center;
   color: #101010;
}
h1{
  color: #101010;
  text-align: center;
  font-family: 'Open Sans', sans-serif,
    &.fw700 {
    font-weight: 900;
  }
}
.container{
  background-color: #de9a06;
}
.separator {
  position: relative;
  width: var(--width);
  height: var(--height);
}
.separator1 {
  position: relative;
  width: var(--width);
  height: var(--height);
  background-color: #de9a06;
}
.separator1::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: var(--top-color);
  clip-path: polygon(100% 0, 0 0, 0 100%);
}
.separator1::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
/*   background-color: */
/*     var(--bottom-color); */
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
}

.separator1.reverse {
  transform: rotateY(180deg);
}

.vertical .separator1.reverse {
  transform: rotateX(180deg);
}
.separator::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #de9a06;
  clip-path: polygon(100% 0, 0 0, 0 100%);
}

.separator::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color:
    var(--bottom-color);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
}

.separator.reverse {
  transform: rotateY(180deg);
}

.vertical .separator.reverse {
  transform: rotateX(180deg);
}
</style>