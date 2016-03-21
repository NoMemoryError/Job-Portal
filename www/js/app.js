// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'config', 'starter.controllers']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      StatusBar.hide();
    }
  });
});

getRandomPoster = function () {
    return 'img/competitions/' + _.random(1, 6) + '.jpg';
};

getRandomCategory = function () {
    var categories = ['Computer Science', 'Telecommunication', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Business Studies'];

    return categories[_.random(0, 5)];
};

getRandomTitle = function () {
    var titles = ['iOS Developer', 'c# Developer', 'C++ HiWi Job', 'Office Administrator'];

    return titles[_.random(0, 3)];
};