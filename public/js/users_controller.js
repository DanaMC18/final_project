angular.module('Napstr').controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){

  var ctrl = this;

  ctrl.all = [];

  ctrl.fetch = function(){
    $http.get('/users').then(function (response){
      ctrl.all = response.data;
    })
  }

  ctrl.request = function(napstr) {
    $http.post('/requests/' + napstr._id + '/create', napstr).then(function (response){
    })
  }
  

  ctrl.fetch();

}