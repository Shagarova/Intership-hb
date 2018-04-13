(function(){
  App.init();
    // App.ProfilessControllerGet();

    $('body').on('click', '#buttonLogin', function() {
  App.login();

});

$('body').on('click', '#buttonRegistration', function() {
  $("#form>p.error").remove();
  if(Func.validateName()&&Func.validateEmail()&&Func.validatePassword()&&Func.validateRepeatPassword()){
    App.registration();
  }

});

$('body').on('click', '#newRegistration a', function(e) {
  e.preventDefault();
  console.log('reg');
  Render.registerPage();
});

$('body').on('click', 'ReturnLoginFromRegistration a', function(e) {
  e.preventDefault();
  console.log('return login from registration');
  Render.loginPage();
});

$('body').on('click', '#forgotPassword a', function(e) {
  e.preventDefault();
  console.log('forgot pas');
  Render.forgotPassword();
});

$('body').on('click', '#buttonReestablish', function() {
  App.resetPassword();
});

$('body').on('click', '.header__menu--item.profile', function(e) {
  e.preventDefault();
  Render.createProfile();
  App.ProfilesControllerGet();
});


$('body').on('click', '.user__edit', function(e) {
  e.preventDefault();
  Render.createProfile();
  App.ProfilesControllerGet();
});

$('body').on('click', '.user__edit.user__albums', function(e) {
  e.preventDefault();
  Render.createProfile('.nav-link__albums');
  App.ProfilesControllerGet();
  setTimeout(function(){
    var tabalbums = $('.nav-link__albums').data('tab');
    $('[data-content =  ' + tabalbums + ']').fadeIn();
  },1000)     
});

/*добавление аватарки*/
$('body').on('change','#profilePhoto', function(token){
    App.UploadController(Func.cookies());

  });

  /*обновление информации профиля*/ /*работает*/

  $('body').on('click','.button__submit', function(){
  App.ProfileControllerPut(Func.cookies());
});


/*поиск*/
$('body').on('submit', '.navbar-form', function(e){
  e.preventDefault();
  console.log($(this).serialize());
  App.Search(token);
  return false;
});


/*смотрим всех друзей*/
$('body').on('click', '.view-all-friends', function(e){
  e.preventDefault();
  console.log($(this).serialize());
  Func.allYourFriendsModal();
  App.UserFriendsId(token);
  return false;
});

/*смотрим всех друзей из левой части */
$('body').on('click', '.count__friends', function(e){
  e.preventDefault();
  console.log($(this).serialize());
  Func.allYourFriendsModal();
  App.UserFriendsId(token);
  return false;
});

/*смотрим всех врагов  из левой части*/
$('body').on('click', '.count__enemies', function(e){
  e.preventDefault();
  console.log($(this).serialize());
  Func.allYourEnemiesModal();
  App.UserEnemiesId(token);
  return false;
});

/*добавление в друзья*/

/*добавляем друга из центральной области, когда открыт поиск*/
$('body').on('click', '.found--item--follow', function(e){
  e.preventDefault();;
  var userID = $(this).closest('.found--item').attr('data-user-id');
  App.UserFriendsAddBlock(token, userID, 1);

  return false;
});

/*добавляем врвга из центральной области обратно в друзья, когда открыты враги*/
$('body').on('click', '.search__allEnemies--follow', function(e){
  e.preventDefault();;
  var userID = $(this).closest('.search__allEnemies').attr('data-user-id');
  App.UserFriendsAddBlock(token, userID, 1);
  return false;
});

/*добавление в блок*/

/*добавляем врага  из правой части*/
$('body').on('click', '.friends__block', function(e){
  e.preventDefault();
  var userID = $(this).closest('.followers').attr('data-user-id');
  App.UserFriendsAddBlock(token, userID, 2);
  return false;
});

/*добавляем врага из центральной области, если открыт список друзей*/
$('body').on('click', '.search__allFriends--block', function(e){
  e.preventDefault();
  var userID = $(this).closest('.search__allFriends').attr('data-user-id');
  App.UserFriendsAddBlock(token, userID, 2);
  return false;
});

/*добавляем врага из центральной области, когда открыт поиск*/
$('body').on('click', '.found--item--block', function(e){
  e.preventDefault();;
  var userID = $(this).closest('.found--item').attr('data-user-id');
  App.UserFriendsAddBlock(token, userID, 2);
  return false;
});

/*удаление*/

/*удаление друга из модальной области, если открыт список друзей*/
$('body').on('click', '.search__allFriends--unfollow', function(e){
  e.preventDefault();
  var userID = $(this).closest('.search__allFriends').attr('data-user-id');
  App.UserFriendsEnemiesDelete(token, userID);
  return false;

});

/*удаление врага из модальной области, если открыт список врагов*/
$('body').on('click', '.search__allEnemies--unfollow', function(e){
  e.preventDefault();
  var userID = $(this).closest('.search__allEnemies').attr('data-user-id'); 
  App.UserFriendsEnemiesDelete(token, userID);
  return false;
});


/*удаление друга из правой части*/
$('body').on('click', '.friends__unfollow', function(e){
  e.preventDefault();
  var userID = $(this).closest('.followers').attr('data-user-id');
  App.UserFriendsEnemiesDelete(token, userID);
  return false;
});


/*удаление друга из центральной области, когда открыт поиск*/
$('body').on('click', '.found--item--unfollow', function(e){
  e.preventDefault();;
  var userID = $(this).closest('.found--item').attr('data-user-id');
  App.UserFriendsEnemiesDelete(token, userID);
  return false;
});

/*Клик на Albums*/
$('body').on('click', '.nav-link__albums', function(e){
  e.preventDefault();;
  App.AlbumController(token);
  return false;
});

/*создаем новый альбом*/
$('body').on('click', '.nav-link__new-album', 
/*функция по созданию нового альбома из модального окна*/
function createAlbumModal(){
  $('body').append('<div class="modal">\
    <div class="modal-title">New album<a href="#" class="modal-close">x</a></div>\
    <div class="modal-newElem">Album name:<input class="modal-newElemInput" id="newElemInput">\
    <button class="modal-edit" style="background-color: blue; color: rgb(255, 255, 255);">Create</button>\
    </div>\
    </div>');
});


/*при нажатии на конкретный альбом*/

$('body').on('click', '.albums__name', function(e){

  $('.nav-link__new-album').css('display', 'none');
  $('.nav-link__photos').css('display', 'inline-block');
  $('.nav-link__new-photo').css('display', 'inline-block');
  $('.nav-link__remove-album').css('display', 'inline-block');
  $('.createProfile__header').css({
    'height' : '60px'
  });
  // $(this).addClass('activeAlbum');
  $('.user__information').fadeOut();

  $('.tab-panel').css({
    'marginLeft':'25%'
  })

  $('.nav-link__albums').removeClass('active');

  $('.nav-link__photos').addClass('active');

  $('[data-content]').fadeOut();
  var tab = $('.nav-link__photos').data('tab');
  setTimeout(function(){
    $('[data-content =  ' + tab + ']').fadeIn();
  },0);

  $('.active').siblings().css({
    'fontWeight' : 'normal',
    'fontSize' : '16px'
  })


/*ищем, есть ли пункты меню в фотографиях, если их нет, либо же они пустые,
то показываем пункт меню, в котором текст для пустого пункта*/
if($('#photos').find(".photo-item").is(':empty')||(!$('#photos').find(".photo-item"))){
  $('.photo-item-empty').css({
    'display' : 'block'
  })
}
else{
  $('.photo-item-empty').css({
    'display' : 'none'
  })
}

e.preventDefault();
$(this).closest('.albums__list__item').addClass('active-album');

var albumID = $(this).closest('.albums__list__item').attr('data-album-id');
console.log(albumID);
App.PhotoController(token, albumID);

return false;
});

    /*нажимаем на вкладку - создание нового альбома*/
    $('body').on('click', '.nav-link__new-album', function(){
      console.log('qq');
      var tabalbums = $('.nav-link__albums').data('tab');
      $('.new').remove();
      $(".breadcrumbs").append("<span class='new'> > </span><a href='#' class='new breadcrumbs-album' >Albums</a><span class='new'> > </span><a href='#' class='new breadcrumbs-newAlbum'>New album</a>");
      $('.nav-link__new-album').css('display', 'inline-block');
      $('[data-content =  ' + tabalbums + ']').fadeIn();
    });
    /**/

  /*клик на кнопку создания альбома*/ /*работает*/
  $('body').on('click', '.modal-edit', function(){
  var tabalbums = $('.nav-link__albums').data('tab');
  $('[data-content =  ' + tabalbums + ']').fadeIn();
  $('a').removeClass('active');
  $('label').removeClass('active');
  $('.nav-link__albums').addClass('active');
  console.log('создан новый альбом');
  App.AlbumControllerPost(token);
  App.AlbumController(token);
  $('.modal').remove();
  $('.modal-overlay').remove();
});

/*закрываем окно с созданием альбома*/ /*работает*/
$('body').on('click', '.modal-close', function(){
  $('.modal').fadeTo(200, 0, function() {
    $('.modal').remove();
  });
});


/*удаление альбома при нажатии на крестик*/ /*работает*/
$('body').on('click', '.albums__list__item--delete', function(e){
    e.preventDefault();
    console.log('Пытаемся удалить альбом');
    var albumID = $(this).closest('.albums__list__item').attr('data-album-id');
    App.AlbumControllerDelete(token, albumID);
    return false;
  });



  /*удаление альбома при нажатии на RemoveAlbum*/ /*работает*/
  $('body').on('click', '.nav-link__remove-album', function(e){
  e.preventDefault();
  console.log('Пытаемся удалить альбом');
  $('.nav-link__albums').addClass('active');
  $('.nav-link__remove-album').removeClass('active');
  var tabalb = $('.nav-link__albums').data('tab');
  $('[data-content =  ' + tabalb + ']').fadeIn();
  $('.nav-link__new-album').css('display', 'inline-block');
  var tab = $(this).siblings('.nav-link__albums').data('tab');
  var albumID = $('[data-content =  ' + tab + ']').find('.active-album').attr('data-album-id');
  console.log(albumID);
  App.AlbumControllerDelete(token, albumID);
  return false;
});





/*При клике на Upload photo - сначала происходит загрузка фото на сервер*/ /*работает*/
$('body').on('change', '#NewPhoto', function(token){
 App.UploadController(Func.cookies());

 /*А через 3 сек происходит подгрузка фото в альбом*/

 setTimeout(function() {
   var tab = $('.nav-link__albums').data('tab');
   console.log(tab);
   var albumID = $('[data-content =  ' + tab + ']').find('.active-album').attr('data-album-id');
   console.log(albumID);
   var url = NewPhoto;
   console.log(url);
   App.PhotoControllerPost(Func.cookies(), albumID, url);
   App.PhotoController(Func.cookies(), albumID);
 }, 3000);
});


/*фотографии ID*/ /*работает*/
$('body').on('click', '.photo__item', function(e){
  e.preventDefault();
  var photoID = $(this).attr('data-photo-id');
  console.log(photoID);
  App.PhotoControllerID(token, photoID);
  return false;
});


/*закрываем окно с увеличенной фотографией*/ /*не работает*/ /*отключила*/
$('body').on('click', '.modal-close.BigPhoto', function(){
  $('.overAll').remove();
});


/*удаление фотографий*/ /*работает*/
$('body').on('click', '.modal-close.PhotoDelete', function(e){
  e.preventDefault();
  var tab = $('.nav-link__albums').data('tab');
  var albumID = $('[data-content =  ' + tab + ']').find('.active-album').attr('data-album-id');
  var photoID = $(this).closest('.photo__item').attr('data-photo-id');
  App.PhotoControllerDelete(Func.cookies(), photoID);

  setTimeout(function(){
    App.PhotoController(Func.cookies(), albumID);
  },2000);


  return false;
});

$('body').on('click', '.header__menu--item', function(e){

  sessionStorage.removeItem('tabName');
  sessionStorage.removeItem('activeTab'); 

  if ($(this).hasClass('profile')){
    console.log($(this));
    $('.nav-link[data-tab="profile"]').trigger('click');
  
  }  
});

/* Клики на хлебные крошки */
$('body').on('click', '.breadcrumbs-main', function(e){

  sessionStorage.removeItem('tabName');
  sessionStorage.removeItem('activeTab'); 
 
});

$('body').on('click', '.breadcrumbs-profile', function(e){

  $('.nav-link[data-tab="profile"]').trigger('click');
 
});

$('body').on('click', '.breadcrumbs-album', function(e){

  $('.nav-link[data-tab="albums"]').trigger('click');
 
});

$('body').on('click', '.breadcrumbs-newAlbum', function(e){

  $('.nav-link[data-tab="new-album"]').trigger('click');
 
});


/*окончание хлебных крошек */

$('body').on('click', '.nav-link', function(e){

  var tab = $(this).data('tab');
  var activeTab = '.' + this.classList[1];

  sessionStorage.setItem('tabName', tab);
  sessionStorage.setItem('activeTab', activeTab);

  if(tab!=='new-album'){
    $('.modal').remove();
    $('.modal-overlay').remove();
    $('[data-content]').fadeOut();
    setTimeout(function(){
      $('[data-content =  ' + tab + ']').fadeIn();
    },500);
    sessionStorage.setItem('tabName', tab);
    sessionStorage.setItem('activeTab', activeTab);
  }

  if(tab=='profile'){
    $('.new').remove();
    $(".breadcrumbs").append("<span class='new'> > </span><a href='#' class='new'>Profile</a>");
    sessionStorage.setItem('tabName', tab);
    sessionStorage.setItem('activeTab', activeTab);
  }

  if(tab=='albums'){
    $('.modal').remove();
    $('.new').remove();
    sessionStorage.setItem('tabName', tab);
    sessionStorage.setItem('activeTab', activeTab);
    $(".breadcrumbs").append("<span class='new'> > </span><a href='#' class='new breadcrumbs-album'>Albums</a>");
  }


  if(tab=='new-photo'){
    e.stopPropagation();
    console.log('Новое фото загружать сейчас будем');
    $(".breadcrumbs").append("<span class='new'> > </span><a href='#' class='new breadcrumbs-album'>Albums</a><span class='new'> > </span><a href='#' class='new breadcrumbs-newAlbum'>New album</a>");        var tabNewPhoto = $('.nav-link__photos').data('tab');
    sessionStorage.setItem('tabName', tab);
    sessionStorage.setItem('activeTab', activeTab);
    $('[data-content =  ' + tabNewPhoto + ']').fadeIn();

    $('a').removeClass('active');
    $('label').removeClass('active');
    $(this).addClass('active');


    $('.active').siblings().css({
      'fontWeight' : 'normal',
      'fontSize' : '16px'
    });


    if($('.nav-link__albums').hasClass('active')){
      $('.nav-link__new-album').css('display', 'inline-block')
    };

  };


    if($(this).data('tab') !== 'albums' && $(this).data('tab') !== 'new-album'){
      $('.nav-link__new-album').css('display', 'none')
    };


    if((tab=='profile')||(tab=='albums')||(tab=='remove-album')){
      if($('.createProfile__header').css({
        'height' : '60px'
      })){
        $('.createProfile__header').css({
          'height' : '400px'
        });
        $('.user__information').fadeIn();
        $('.nav-link__new-album').css('display', 'inline-block');
        $('.nav-link__photos').css('display', 'none');
        $('.nav-link__new-photo').css('display', 'none');
        $('.nav-link__remove-album').css('display', 'none');

        $('.tab-panel').css({
          'marginLeft':'40%'
        });
        if(tab=='remove-album'){
          var tab = $('.nav-link__albums').data('tab');
          setTimeout(function(){
            $('[data-content =  ' + tab + ']').fadeIn();
          },100);
        }
      }

    };
  });


  /*конец*/


  /*посты*/

  $('body').on('click', '[href=remove-post]', function (e) {
  var postId = $(this).parent().parent().attr("data-id");
  e.preventDefault();
  App.removePost(postId);
  $(this).parent().parent().remove();
});

$('body').on('click', '.remove-post', function (e) {
  var postId = $(this).closest('.post-item').attr("data-id");
  e.preventDefault();
  App.removePost(postId);
  $(this).closest('.post-item').remove();
});


$('body').on('click', '.post-item a[href=comment-post]', function (e) {
  var postId = $(this).parent().parent().attr("data-id");
  e.preventDefault();
  $(this).parent().parent().find('.posts__input-comment').toggle();
});

$('body').on('click', '.post-item .add-comment', function (e) {
  var postId = $(this).parent().parent().attr("data-id"),
  text = $(this).parent().parent().find('.comments-field').val().length;
  e.preventDefault();
  if (text != 0) App.addComment($(this).parent().parent().find('.comments-field').val(), postId);
});

$('body').on('click', '.remove-comment', function (e) {
  var postId = $(this).closest('.posts__comments').attr("data-comment-id");
  e.preventDefault();
  App.removeComment(postId);
});

$('body').on('click', '.add-massege', function () {
  console.log('iwfesd');
  if ($('#massage').val().length != 0) {
    App.addPost();
        // App.addMedia();
      }
      $('#massage').val('');
      postAddPhoto=[];
      $('#mediaContentList').children().remove(); 
    });


    /*news*/
    $('body').on('click', '.glyphicon.glyphicon-bell', function(e) {
      e.preventDefault();
      console.log('dsjkcdcs kj');
      App.showNews();
    });



$('body').on('click', '.news .add-news-comment', function(e) {
  var postId = $(this).parent().parent().attr("data-id"),
  text = $(this).parent().parent().find('.comments-field').val().length;
  e.preventDefault();
  if (text != 0) App.addNewsComment($(this).parent().parent().find('.comments-field').val(), postId);
});

$('body').on('click', '[href=remove-news-post]', function (e) {
  var postId = $(this).parent().parent().attr("data-id");
  e.preventDefault();
  $(this).parent().parent().remove();
});


$('body').on('click', '.remove-comment', function (e) {
  var postId = $(this).closest('.posts__comments').attr("data-comment-id");
  e.preventDefault();
  App.removeNewsComment(postId);
});

/*logout*/
$('body').on('click', '.header__menu--link.logout', function (e) {

  e.preventDefault();
  App.logout();

});



/*При клике на камеру - сначала происходит загрузка фото на сервер*/ /*работает*/
$('body').on('change', '#postAddPhoto', function(token){
 App.UploadControllerMain(Func.cookies());

 /*А через 1.5 сек происходит подгрузка фото в пост*/
 setTimeout(function() {
  for(var i=0;i<postAddPhoto.length;i++){
   var url = postAddPhoto[i];
   console.log(url);
 }
 $('#mediaContentList').append('<li class="mediaContent__item" mediaContent-created="" data-photo-id="">\
 <img src="'+url+'">\
 </li>');
}, 1500);
});




/*чаты*/

$('body').on('click', '.message', function() {
  $('.chats').show();
  $('.posts').hide();
  $('.search').hide();
});

// открыть чат
$('body').on('click', '.chat', function() {
  var chat_id = $(this).data('chat-id');
  $('.valeuMessage').val(''); // очищаем input от сообщений

  $('.chats-list').slideUp(300, function() {
    $('.chat').remove();
    $('.chats-list').hide();
    $('.open-chat').slideDown(300);
  });

  localStorage.setItem('chat-id', chat_id);
  App.getChat(token, chat_id);
});

// закрыть чат и вернутся на список чатов
$('body').on('click', '.btn-back', function() {

    $('.open-chat').slideUp(300, function() {
      $('.chat-message').remove();
      $('.open-chat').hide();
      $('.chats-list').slideDown(300);
    });

    App.chats(token);
  });

// удалить чат
$('body').on('click', '.delete-chat', function(e) {
      e.stopPropagation();
      var chatId = $(this).parents('.chat').data('chat-id');
      var thisBlock = $(this).parents('.chat');


      thisBlock.fadeTo(300, 0, function() {
        setTimeout(function() {
          thisBlock.remove();
          App.deleteChat(token, chatId);
        },300);
      });
    });

// кнопка Start chat в списке друзей
$('body').on('click', '.search__allFriends--startChat', function() {
        var userId = $(this).parents('.search__allFriends').data('user-id');
        localStorage.setItem('chatUserId', userId);

        $('.modalFriends').remove();
        $('.modal-overlay').remove();
        Func.addModal();
      });

$('body').on('click', '.header__menu--item.profile>.header__menu--link', function (e) {

  e.preventDefault();
  $('.new').remove();
  $(".breadcrumbs").append("<span class='new'> > </span><a href='#' class='new breadcrumbs-profile'>Profile</a>");

});

// кнопка Start chat в списке врагов
$('body').on('click', '.search__allEnemies--startChat', function() {
  var userId = $(this).parents('.search__allFriends').data('user-id');
  localStorage.setItem('chatUserId', userId);

  $('.modalEnemies').remove();
  $('.modal-overlay').remove();
  Func.addModal();
});

// закрыть модальное окно
$('body').on('click', '.close', function() {
  $('.modal-overlay').fadeTo(200, 0, function() {
    $('.modal-overlay').remove();
  });
});

// Создать чат с сообщением
$('body').on('click', '.btn-primary', function() {
    var newMessage = $('.newMessage').val();
    var userId = localStorage.getItem('chatUserId');


  // создаем новое сообщение
  App.newMessage(token, userId, newMessage);
  localStorage.removeItem('chat-id');
  $('.chat').remove(); // удаляем чаты
  $('.modal-overlay').remove(); // удаляем модульное окно

  // через 1с обновляем список чатов
  setTimeout(function() {
    App.chats(token);
  }, 1000);
});

// Добавить сообщение в чат
$('body').on('click', '.addMessage', function() {
    var valueMessage = $('.valeuMessage').val();
    var chatId = localStorage.getItem('chat-id');

    App.sendMessage(token, valueMessage, chatId);
    $('.chat-message').remove();

    setTimeout(function() {
    $('.valeuMessage').val(''); // очищаем input от сообщений
    App.getChat(token, chatId);
  }, 500);
  });


 /* Когда пользователь обновляет страницу, чтобы оставаться на той же вкладке (табе), на которой он остановился*/ 
    function initCreateProfilePage() {
      var tokenTabName = sessionStorage.getItem('tabName');
      if (tokenTabName){
          Render.createProfile(sessionStorage.getItem('activeTab')? sessionStorage.getItem('activeTab'): undefined);
      }
      else {
        $('[data-tab="profile"]').trigger('click');
      }

      
      /* var activeNewAlbum = $('[data-tab="new-album"]')
      if (tokenTabName=='new-album') {
        $(activeNewAlbum).addClass('active');


      $('.active').siblings().css({
        'fontWeight' : 'normal',
        'fontSize' : '16px'
      })
      } */

    };
    
    $(function(){
      initCreateProfilePage();
    }); 

    /*окончание функции*/

// нажимаем на имя друга в списке друзей
$('body').on('click', '.friends__name', function() {
      var friendId = $(this).data('user-id');
      // localStorage.setItem('friendUserId', friendId);
      App.ProfileControllerGet(token, friendId);

      App.AlbumControllerID(token,albumID);
    });










  }());