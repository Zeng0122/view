<template>
  <header class="am-topbar" >
    <div class="am-container">
      <h1 class="am-topbar-brand">
        <a href="#">Point-view</a>
      </h1>
      <ge_header
        v-bind:user-info="userInfo">
      </ge_header>
    </div>
  </header>
  <section>
    <router-view></router-view>
  </section>
  <footer style="background-color: #eee">
    <div class="am-container am-padding-top">
      <ge_footer></ge_footer>
    </div>
  </footer>
</template>
<script>
  var tools = require("../tools");
  module.exports = {
    components: {
      "ge_header": require("./header.vue"),
      "ge_footer": require("./footer.vue")
    },
    data: function () {
      return {
        userInfo: this.userInfo
      }
    },
    route: {
      data: function (transition) {
        this.userInfo = tools.getUserInfo();
      }
    }
  }
</script>
