(function(){
  App.init();
    // App.ProfilessControllerGet();

    $('body').on('click', '#buttonLogin', function() {
      App.login();
    });

    $('body').on('click', '#buttonRegistration', function() {
      App.registration();
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

    /*добавление аватарки*/
    $('body').on('change','#profilePhoto', function(token){
      App.UploadController(Func.cookies());

    });

    /*обновление информации профиля*/ /*работает*/

    $('body').on('click','.button__submit', function(){
      App.ProfileControllerPut(token);
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
      var tabalbums = $('.nav-link__albums').data('tab');
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
      $('.modal').remove();
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




    /*При клике на Upload photo - сначала происходит загрузка фото на сервер*/ /*не работает*/
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


    /*фотографии ID*/ /*не работает*/
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


    /*удаление фотографий*/ /*не работает*/
    $('body').on('click', '.modal-close.PhotoDelete', function(e){
      e.preventDefault();
      var tab = $('.nav-link__albums').data('tab');
      var albumID = $('[data-content =  ' + tab + ']').find('.active-album').attr('data-album-id');
      var photoID = $(this).closest('.photo__item').attr('data-photo-id');
      App.PhotoControllerDelete(Func.cookies(), photoID);

      setTimeout(function(){
        App.PhotoController(Func.cookies(), 254);
      },2000);


      return false;
    });



    $('body').on('click', '.nav-link', function(e){

      var tab = $(this).data('tab');

      if(tab!=='new-album'){
        $('[data-content]').fadeOut();
        setTimeout(function(){
          $('[data-content =  ' + tab + ']').fadeIn();
        },500);
      }


      if(tab=='new-photo'){
        e.stopPropagation();
        console.log('Новое фото загружать сейчас будем');
        var tabNewPhoto = $('.nav-link__photos').data('tab');
        $('[data-content =  ' + tabNewPhoto + ']').fadeIn();


      }
      /**/

      $('a').removeClass('active');
      $('label').removeClass('active');
      $(this).addClass('active');


      $('.active').siblings().css({
        'fontWeight' : 'normal',
        'fontSize' : '16px'
      })


      if($('.nav-link__albums').hasClass('active')){
        $('.nav-link__new-album').css('display', 'inline-block')
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
      var postId = $(this).parent().attr("data-comment-id");
      e.preventDefault();
      App.removeComment(postId);
    });

    $('body').on('click', '.add-massege', function () {
      console.log('iwfesd');
      if ($('#massage').val().length != 0) App.addPost();
      $('#massage').val('');
    });

  }());