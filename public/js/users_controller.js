angular.module('Napstr').controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){

  var ctrl = this;

  ctrl.all = [];

  ctrl.fetch = function(){
    $http.get('/users').then(function (response){
      // console.log(response.data);
      ctrl.all = response.data;
    })
  }
  
  ctrl.fetch();

}