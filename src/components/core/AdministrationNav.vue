<template>
  <div class="container">
  <section id="header">
    <div class="admin-badge">
             <span> <i class="fa-solid fa-user"></i> Admin</span>
    </div>
        <div>
            <ul id="navbar">
                <li><router-link to="/administration">Add New Products</router-link></li>
                <li><router-link to="/createblog">Publish New Blogs</router-link></li>
                <li><router-link to="/administrator">Add New Adminstrators</router-link></li>
                <li><router-link to="/messages">Messages</router-link></li>
            </ul>
        </div>
        <div id="mobile">
        <ul style="display: flex; flex-direction: column; font-size: small; margin-left: 20px;">
                <li><router-link to="/administration">Add New Products</router-link></li>
                <li><router-link to="/createblog">Publish New Blogs</router-link></li>
                <li><router-link to="/administrator">Add New Adminstrators</router-link></li>
                <li><router-link to="/messages">Messages</router-link></li>
         </ul>
         </div>
  </section>
  </div>
</template>
<script>
export default {
    name: "AdministrationNav",
}
</script>
<style scoped>
#header {
    background-color: rgb(33, 206, 59);
}
</style>
