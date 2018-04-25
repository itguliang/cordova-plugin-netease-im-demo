angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.NimLogin = function() {
    NIMPlugin.login("test", "a123456", onSuccess, onError);
    function onSuccess(){
      alert("登录成功!");
    }
    function onError(code){
      alert("登录失败!错误码:" + code);
    }
  };
  $scope.NimLogout = function() {
    NIMPlugin.logout();
  };
  $scope.getStatus = function() {
    NIMPlugin.getStatus(onSuccess, onError);
    function onSuccess(res){
      alert(res);
    }
    function onError(err){
      alert(err);
    }
  };
  $scope.queryRecentContacts = function() {
    NIMPlugin.queryRecentContacts(onSuccess, onError);
    function onSuccess(res){
      alert(JSON.stringify(res));
    }
    function onError(err){
      alert(err);
    }
  };

  $scope.pullMessageHistory = function() {
    NIMPlugin.pullMessageHistory("zhangxuan","P2P", 10,false,onSuccess, onError);
    function onSuccess(res){
      alert(JSON.stringify(res));
    }
    function onError(err){
      alert(err);
    }
  };
  $scope.sendTextMsg = function() {
    NIMPlugin.sendTextMsg("zhangxuan", "P2P","P2P文本消息发送", onSuccess, onError);
    function onSuccess(res){
      alert("发送文本成功!"+res);
    }
    function onError(code){
      alert("发送失败!错误码:" + code);
    }
  };

  $scope.sendImageMessage = function() {

    var options = {
      quality: 50,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    };

    navigator.camera.getPicture(function(imageURI) {
      imageURI = imageURI.substring(0, imageURI.indexOf('?')).replace('file://','');
      console.log("getPicture:" + imageURI);

      NIMPlugin.sendImageMessage("zhangxuan", "P2P",imageURI, function onSuccess(res){
        console.log(res)
        alert("发送图片成功!");
      }, function onError(code){
        alert("发送失败!错误码:" + code);
      });
    }, function(err) {
      console.error(err);
    },options);
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
