/**
 * Created by bqxu on 15/12/10.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var tools = require('./tools');
var auth = require('./auth');

//layout
Vue.use(VueRouter);
Vue.use(VueResource);
//component

//main
var App = Vue.extend({
  events: {
    link: function (pathName, params) {
      router.go({
        name: pathName,
        params: params || {}
      })
    }
  }
});

var router = new VueRouter();
router.map({
  '/': {
    name: "root",
    component: require("./layouts/root.vue"),
    subRoutes: {
      "login": {
        name: "login",
        component: require("./layouts/login.vue")
      },
      "home": {
        name: "home",
        component: require("./pages/home.vue")
      },
      "view": {
        name: "view",
        component: require("./pages/view.vue")
      },
      "help": {
        name: "help",
        component: require("./pages/help.vue")
      },
      "book": {
        name: "book",
        component: require("./pages/book.vue")
      },
      "account": {
        name: "account",
        component: require("./pages/account.vue")
      },
      "need": {
        name: "need",
        component: require("./pages/need.vue")
      }
    },
    "*": {
      "name": "40x",
      component: require("./layouts/40x.vue")
    }
  }
});

router.redirect({
  '/': '/home'
})

router.beforeEach(function (transition) {
  if (tools.config.auth.ignoreAll) {
    transition.next()
  } else if (tools.inArray(tools.config.auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    auth.valid(transition.to.router.app, function () {
      transition.next();
    }, function () {
      transition.redirect("/login")
    });
  }
});

router.start(App, 'body');
