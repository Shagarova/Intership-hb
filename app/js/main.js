var globalPhoto;
var NewPhoto;
var postAddPhoto = [];
var id = localStorage.getItem('user_id');
var token = Func.cookies();
var arr;
var App = {

	header: $('header'),
	wrapper: $('.main'),
	section: $('.content'),
	sectionLeftInfo: $('.user__info'),
	sectionLeftAbout: $('.user__about'),
	sectionLeftAlbums: $('.user__albums'),
	sectionRightFriends: $('.friends'),
	sectionRightSponsored: $('.sponsored'),
	sectionCenter: $('.center'),
	footer: $('.footer'),
	CreateProfile: $('.createProfile'),
	friendsList: $('.friends__list'),
	body:$('body'),
	overlay:$('overlay'),

	// mediaContentList: $('#mediaContentList'),

	init: function() {
		if(token) {
			$.ajax({
				url: 'http://restapi.fintegro.com/profiles', 
				method: 'GET',                
				dataType: 'json', 
				headers: {
					bearer: token
				},                               
				success: function(data) {
					console.log('tata');
					console.log(data);
					Render.profilePage(data);
					Render.navUser();
					App.ProfilesControllerGet(token);
				}
			});
		} else {
			Render.loginPage();
			// Render.navGuest();
		}
	},

	login: function login() {

		$.ajax({
			url: 'http://restapi.fintegro.com/login',
			method: 'POST',
			dataType: 'json',
			data: {
				username: $('#login').val(), 
				password: $('#password').val()
			},
			success: function (data) { 
				App.init();
				
				window.location.href = "index.html";
				console.log(data);
				console.log('login');
				var date = new Date(new Date().getTime() + 86400 * 1000);
				document.cookie = 'session-token=' + data.token + '; expires=' + date.toUTCString();
				localStorage.userID = data.profile.user_id;
				localStorage.setItem('user_id', data.profile.id);

			},
			error: function (xhr, status, error) {
				$('body').append('вашего логина не существует');
				console.log('вашего логина не существует', xhr, status, error);
			}
		});
	},

	registration: function() {
		$.ajax({
			url: 'http://restapi.fintegro.com/registration', 
			method: 'POST',                
			dataType: 'json',                
			data: {
				firstname: $('#firstname').val(),
				lastname:$('#lastname').val(),
				login:$('#login').val(),
				email:$('#email').val(),
				password:$('#password').val()
			},
			success: function(data) {
				Func.showMessage('Your account was created!');
				setTimeout(function(){
					App.init();
				}, 5000);
			}, 
			error: function(xhr, status, error) {
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},




	resetPassword: function() {
		$.ajax({
			url: 'http://restapi.fintegro.com/recovery',
			method: 'POST',
			dataType: 'json',
			data: {
				email:$('#email').val() 
			},
			success: function (data) { 
				$('body').append('<div class="ReestablishEmail">На Ваш email отправлен пароль </div>');
				$('.ReestablishEmail').fadeIn(600).delay(600).fadeOut(100, function(){$(this).remove()});
				document.getElementById("emailEmail").value = "";
			},
			error: function (xhr, status, error) {
				console.log('вашего логина не существует', xhr, status, error);
			}
		});
	},

	logout: function() {
		document.cookie = "session-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
		App.init();
	},



	ProfilesControllerGet: function(){
		

		$.ajax({
			url: 'http://restapi.fintegro.com/profiles',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function (data) {
				// localStorage.setItem('user_id', data.profile.id);
				$('.firstname').html(data.profile.firstname);
				$('.lastname').html(data.profile.lastname);
				$('.quote').html(data.profile.quote);
				$('.userPhotoMini').attr('src', data.profile.photo);
				$('.went').html( data.profile.went);
				$('.lived').html( data.profile.lived);
				$('.from').html(data.profile.from);
				$('.count__friends').html(data.friends_count);
				$('.count__enemies').html(data.enemies_count);

     // $('.user__albums__items').html()
     /*данные со страницы редактирования профиля*/
     $('.profile__firstname').html(data.profile.firstname);
     $('.profile__lastname').html(data.profile.lastname);
     $('input.firstname').val(data.profile.firstname);
     $('input.lastname').val(data.profile.lastname);
     $('.userPhotoMini').attr('src', data.profile.photo);
    // $('.userPhotoMini').html('<img src="' + data.profile.photo +'">');
    $('input.quote').val( data.profile.quote);
    $('input.went').val( data.profile.went);
    $('input.lived').val( data.profile.lived);
    $('input.from').val(data.profile.from);

     //  /*добавляем наших друзей справа сверху в список*/
     $('.friends__list').children().remove();
     $('.search__allFriends').children().remove();
     App.showPosts();
     App.AlbumController(token);
     App.chats(token); // получаем все чаты
     
     // setTimeout(function(){
     // 	App.ProfileControllerGet(id);
     // }, 500);


     /*если количество друзей не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
     if(data.friends_count!==0){
     	$('.friends__list__item.empty').css({
     		'display':'none'
     	});

     	/*проходим массивом по результатам поиска*/
     	for (var i=0; i<data.friends.length; i++) {
     		var friends = data.friends[i];

     		/*функция по выводу информации про друзей справа сверху*/
     		function yourFriends(id, lastname, firstname, quote, photo, lived, form, went, friend){
     			$('.friends__list').append('<li class="friends__list__item followers" data-user-id="' + id + '">\
     				<div class="container-fluid">\
     				<div class="row">\
     				<div class="friends__logo col-lg-3 col-md-3 col-sm-2 col-xs-2"> <img src=" ' + photo + ' "></div>\
     				<div class="col-lg-9 col-md-9 col-sm-10 col-xs-10">\
     				<div class="friends__list__item--info">\
     				<a href="#" class="friends__name" data-user-id="' + id + '">   <span class="friends__firstname">' + firstname + ' </span><span class="friends__lastname">' + lastname + ' </span></a>\
     				<div class="friends__buttons"> \
     				<button class="friends__unfollow"><i class="icon fa fa-user-times"></i>Unfollow</button> <button class="friends__block"><i class="icon fa fa-user-secret"></i>Block</button></div>\
     				</div>\
     				</div>\
     				</div>\
     				</div>\
     				</li>');
     		}


     		// function yourFriends(id, lastname, firstname, quote, photo, lived, form, went, friend){

     			// Render.friendsList();
     		// }
     		yourFriends(friends.id,friends.lastname,friends.firstname,friends.quote,friends.photo, friends.lived, friends.from, friends.went);


        // проверяем есть ли фото, если нету или формат не соответствует, то подгружаем стандартное фото
        if(typeof friends.photo == 'object'){
        	$('.friends__logo>img').attr('src', '../img/no-image-user.jpg')
        }
        else if(typeof friends.photo == ''){
        	$('friends__logo>img').attr('src', '../img/no-image-user.jpg')
        }
    };
}
/*если нет друзей, то показываем блок с информацией, что друзей  у нас нет*/
else if(data.friends.length==0){
	$('.friends__list__item.empty').css({
		'display':'block'
	});
	$('.friends__list__item.empty').html('У вас еще нет друзей');
};
},
error: function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});

},




ProfileControllerGet:  function(token, id){

	console.log(id);
	$.ajax({
		url: 'http://restapi.fintegro.com/profiles/' + id +' ',
		method: 'GET',
		dataType: 'json',
		headers: {
			bearer: token
		},
		success: function (data) {
			console.log(data);
			App.ProfilesControllerGet();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}
	});
},

/*Добавление файлов*/
UploadController:  function(token){
	var form = new FormData();
	form.append('UploadForm[imageFile]', ($('#profilePhoto')[0].files[0]));
	form.append('UploadForm[imageFile]', ($('#NewPhoto')[0].files[0]));
		// form.append('UploadForm[imageFile]', ($('#postAddPhoto')[0].files[0]));

		$.ajax({
			url: 'http://restapi.fintegro.com/upload',
			method: 'POST',
			crossDomain:true,
			cache:false,
			contentType:false,
			processData:false,
			headers: {
				bearer: token
			},
			data: form,
			success: function (data) {
				globalPhoto = data.link;
				NewPhoto = data.link;
				console.log($('#profilePhoto')[0].files[0]);
				console.log($('#NewPhoto')[0].files[0]);
				console.log(NewPhoto);
			},
			error: function (xhr, status, error) {
				console.log('ERROR!!!', [arguments]);
			}
		});
	},

	/*Добавление файлов на главной станице*/
	UploadControllerMain:  function(token){
		var form = new FormData();
		form.append('UploadForm[imageFile]', ($('#postAddPhoto')[0].files[0]));

		$.ajax({
			url: 'http://restapi.fintegro.com/upload',
			method: 'POST',
			crossDomain:true,
			cache:false,
			contentType:false,
			processData:false,
			headers: {
				bearer: token
			},
			data: form,
			success: function (data) {
				console.log(data.link);
				postAddPhoto.push(data.link);
				console.log(postAddPhoto);
				console.log($('#postAddPhoto')[0].files[0]);
			},
			error: function (xhr, status, error) {
				console.log('ERROR!!!', [arguments]);
			}
		});
	},


	/*обновление профайла*/
	ProfileControllerPut: function(token){

		$.ajax({
			url: 'http://restapi.fintegro.com/profiles/' + id +' ',
			method: 'PUT',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data: {
				lastname: $('#lastname').val(),
				firstname: $('#firstname').val(),
				photo:globalPhoto,
				quote: $('#quote').val(),
				lived: $('#lived').val(),
				from:  $('#from').val(),
				went: $('#went').val()
			},
			success: function (data) {
				console.log(data);
				console.log(data.link);
				console.log($('.userPhotoMini').attr('src'));
				App.ProfilesControllerGet(token);
				console.log(globalPhoto);
			},
			error: function (xhr, status, error) {
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},

	/*удаление профайла* /*не работает*/
	ProfileControllerDelete: function(token, id){

		$.ajax({
			url: 'http://restapi.fintegro.com/profiles/' + id +' ',
			method: 'DELETE',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function (data) {
				console.log(data);
				localStorage.clear();
    // delete window.localStorage.token;
    // delete window.localStorage.user_id;
    //  delete window.sessionStorage.sessionToken;
    // sessionStorage.clear();
    window.location.href = "index.html";
},
error: function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});

	},
	/*Друзья враги*/

	UserFriendsEnemies: function(token){
		$.ajax({
			url: 'http://restapi.fintegro.com/social-activities',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function(data){
				console.log(data);
			},
			error: function(data){
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},

	/*информация про друзей/врагов, которую мы выводим*/
	UserFriendsId: function(token){

		$.ajax({
			url: 'http://restapi.fintegro.com/social-activities/' + id + ' ',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function(data){
				console.log(data);
				/*удаляем другие результаты поиска*/
				$('.search__result--found--Friends').children().remove();

				/*если количество результатов поиска не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
				if(data.friends.length!==0){
    // $('.search__result--empty').css({
    //   'display':'none'
    // });

    // allYourFriendsEnemiesModal();
    /*проходим циклом по результатам поиска*/
    for (var i=0; i<data.friends.length; i++) {
    	var friends = data.friends[i];
    	/*функция по выводу информации про друзей*/
    	function allYourFriends(id,lastname,firstname,quote,photo, lived, form, went, friend){

    		$('.search__result--found--Friends').append('<div class="search__allFriends" data-user-id="' + id + '">\
    			<div class="search__allFriends--info">\
    			<span class="search__allFriends--avatar"><img src="' + photo + '"></span>\
    			<span class="search__allFriends--name" href="#">\
    			<span class="search__allFriends--firstname"> ' + firstname + '</span> \
    			<span class="search__allFriends--lastname"> ' + lastname + '</span>\
    			</div>\
    			<div class="search__allFriends--buttons">\
    			<button class="search__allFriends--startChat">  <i class="icon  fa fa-user-plus"></i>Start chat</button>\
    			<button class="search__allFriends--unfollow">  <i class="icon fa fa-user-times"></i>Unfollow</button>\
    			<button class="search__allFriends--block">  <i class="icon fa fa-user-secret"></i>Block</button>\
    			</div>\
    			</div>\
    			</div>\
    			');
    	};
    	allYourFriends(friends.id,friends.lastname,friends.firstname,friends.quote,friends.photo, friends.lived, friends.from, friends.went);
    	console.log(data.friends[i]);
    	/*проверяем есть ли фото, если нету или формат не соответствует, то подгружаем стандартное фото*/
    	if(typeof friends.photo == 'object'){
    		$('.search__allFriends--avatar>img').attr('src', '../img/no-image-user.jpg')
    	}
    	else if(typeof friends.photo == ''){
    		$('.search__allFriends--avatar>img').attr('src', '../img/no-image-user.jpg')
    	}
    };
}
/*если нет друзей, то показываем блок о том, что у нас нет друзей*/
else if(data.friends.length==0){
   // allYourFriendsModal();
   $('.search__result--found--Friends').text('У вас еще нет друзей');
   $('.search__result--found--Friends').css({
   	'padding' : '20px',
   	'fontSize' : '20px'
   })
}
},
error: function(data){
	console.log('ERROR!!!', xhr, status, error);
}
});
	},



	/*информация про друзей/врагов, которую мы выводим*/
	UserEnemiesId: function(token){

		$.ajax({
			url: 'http://restapi.fintegro.com/social-activities/' + id + ' ',
			method: 'GET',
			dataType: 'json',

			headers: {
				bearer: token
			},
			success: function(data){
				console.log(data);

				/*удаляем другие результаты поиска*/
				$('.search__result--found--Enemies').children().remove();

				/*если количество результатов поиска не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
				if(data.enemies.length!==0){
    // $('.search__result--empty').css({
    //   'display':'none'
    // });

    // allYourFriendsEnemiesModal();

    /*проходим циклом по результатам поиска*/
    for (var i=0; i<data.enemies.length; i++) {
    	var enemies = data.enemies[i];

    	/*функция по выводу информации про врагов*/
    	function allYourEnemies(id,lastname,firstname,quote,photo, lived, form, went, friend){

    		$('.search__result--found--Enemies').append('<div class="search__allEnemies" data-user-id="' + id + '">\
    			<div class="search__allEnemies--info">\
    			<span class="search__allEnemies--avatar"><img src="' + photo + '"></span>\
    			<span class="search__allEnemies--name" href="#">\
    			<span class="search__allEnemies--firstname"> ' + firstname + '</span> \
    			<span class="search__allEnemies--lastname"> ' + lastname + '</span>\
    			</span>\
    			</div>\
    			<div class="search__allEnemies--buttons">\
    			<button class="search__allEnemies--startChat">  <i class="icon  fa fa-user-plus"></i>Start chat</button>\
    			<button class="search__allEnemies--unfollow">  <i class="icon fa fa-user-times"></i>Unfollow</button>\
    			<button class="search__allEnemies--follow">  <i class="icon  fa fa-user-plus"></i>Follow</button>\
    			</div>\
    			</div>\
    			');
    	}

    	allYourEnemies(enemies.id,enemies.lastname,enemies.firstname,enemies.quote,enemies.photo, enemies.lived, enemies.from, enemies.went);
      // проверяем есть ли фото, если нету или формат не соответствует, то подгружаем стандартное фото
      if(typeof enemies.photo == 'object'){
      	$('.search__allEnemies--avatar>img').attr('src', '../img/no-image-user.jpg')
      }
      else if(typeof enemies.photo == ''){
      	$('.search__allEnemies--avatar>img').attr('src', '../img/no-image-user.jpg')
      }
  };
}

/*если нет друзей, то показываем блок о том, что у нас нет друзей*/
else if(data.enemies.length==0){
	$('.search__result--found--Enemies').text('У вас еще нет врагов');
	$('.search__result--found--Enemies').css({
		'padding' : '20px',
		'fontSize' : '20px'
	})
}
},
error: function(data){
	console.log('ERROR!!!', xhr, status, error);
}
});
	},


	/*Добавление в друзья либо же во враги*/
	UserFriendsAddBlock: function(token, userId, type){
		$.ajax({
			url: 'http://restapi.fintegro.com/social-activities',
			method: 'POST',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data: {
				user_id: userId,
				type: type
			},
			success: function(data){
				console.log(data);
    // $('.friends__list').children().remove();/*добавила*/
    App.ProfilesControllerGet(token);/*добавила*/
    setTimeout(function(){
    	App.UserFriendsId(token);
    	App.UserEnemiesId(token);
    },200);


    // App.Search(token);/*добавила*/
},
error: function(data){
	console.log('ERROR!!!', xhr, status, error);
}
});
	},

	UserFriendsEnemiesDelete: function(token, userID){
		$.ajax({
			url: 'http://restapi.fintegro.com/social-activities/' + userID,
			method: 'DELETE',
			dataType: 'json',

			headers: {
				bearer: token
			},

			success: function(data){
				console.log(data);
    // $('.search__result--found--Enemies').children().remove(); /*добавила*/
    App.ProfilesControllerGet(token); /*добавила*/
    setTimeout(function(){
    	App.UserFriendsId(token);
    	App.UserEnemiesId(token); 
    }, 200);

},
error: function(data){
	console.log('ERROR!!!', xhr, status, error);
}
});
	},


	/*поиск по пользователям*/
	Search: function(token){
		$.ajax({
			url: 'http://restapi.fintegro.com/search',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data:{
				search:$('.Search').val(),
				limit:1000,
				page:1,
			},

			success: function (data) {
				console.log(data);

				/*убираем блок, где пишется сообщение*/
				$('.wall__list__item.message').css({
					'display': 'none'
				});
				/*убираем блок, где вводится сообщение*/
				$('.input-group').css({
					'display': 'none'
				});
    // оказываем блок, в который будут вставляться результаты поиска
    $('.wall__list__item.search').css({
    	'display': 'block'
    });

    /*удаляем из поиска другие результаты поиска*/
    $('.search__result--found').children().remove();
    $('.posts').hide();
    $('.chats').hide();
    /*если количество результатов поиска не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
    if(data.profiles.length!==0){
    	$('.search__result--empty').css({
    		'display':'none'
    	});

    	/*проходим массивом по результатам поиска*/
    	for (var i=0; i<data.profiles.length; i++) {
        // for (var i=0; i<1; i++) {
        	var profile = data.profiles[i];


        	function newSearch(id,lastname,firstname,quote,photo, lived, form, went, buttons_block){
        		$('.search__result--found').append('<div class="found--item" data-user-id="' + id + '">\
        			<div class="found--item--bcg">\
        			</div>\
        			<div class="found--item--info">\
        			<div class="found--item--avatar"><img src="' + photo + '"></div>\
        			<div class="found--item--name" href="#">\
        			<span class="found--item--firstname"> ' + firstname + '</span> \
        			<span class="found--item--lastname"> ' + lastname + '</span>\
        			</div>\
        			<div class="found--item--quote"> ' + quote + '</div>\
        			<div class="found--item--buttons">' + buttons_block + '</div>\
        			</div>\
        			</div>\
        			');
        	}

        	if(profile.friend == true) {
        		var buttons_block = '<button class="found--item--unfollow">  <i class="icon  fa fa-user-times"></i>Unfollow</button>'+
        		'<button class="found--item--block">  <i class="icon fa fa-user-secret"></i>Block</button>';
        	} else {
        		var buttons_block = '<button class="found--item--follow">  <i class="icon  fa fa-user-plus"></i>Follow</button>'+
        		'<button class="found--item--unfollow">  <i class="icon  fa fa-user-times"></i>Unfollow</button>';
        	}
        	newSearch(profile.id,profile.lastname,profile.firstname,profile.quote,profile.photo, profile.lived, profile.from, profile.went, buttons_block);
        	



        	/*проверяем есть ли фото, если нету или формат не соответствует, то подгружаем стандартное фото*/
        	if(typeof profile.photo == 'object'){
        		$('.found--item--avatar>img').attr('src', '../img/no-image-user.jpg')
        	}
        	else if(typeof profile.photo == ''){
        		$('.found--item--avatar>img').attr('src', '../img/no-image-user.jpg')
        	};
        };
    }
    else if(data.profiles.length==0){
    	$('.search__result--empty').css({
    		'display':'block'
    	});
    };
},
error: function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},

	/*Task 8 Album controller*/

	AlbumController: function(token){
		$.ajax({
			url: 'http://restapi.fintegro.com/albums',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data:{
				user_id:id
			},
			success: function (data) {
				console.log(data);
				console.log(data.albums.length);
    // localStorage.setItem('albums_id', data.albums.id);
    $('#albums').children().remove();

    /*если количество альбомов не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
    if(data.albums.length!==0){
    	$('.album-item-empty').css({
    		'display':'none'
    	});

    	/*проходим массивом по результатам поиска*/
    	for(var i=0;i<data.albums.length;i++){
    		var albums = data.albums[i];
    		albums_id=data.albums[i].id;
    		/*функция по выводу информации про альбомы*/
    		function AllAlbums(id, name, created, photos){
    			$('#albums').append('<li class="albums__list__item" data-album-created="' + created + '" data-album-id="' + id + '">\
    				<a href="#" class="albums__list__item--delete">x</a>\
    				<div class="albums__list__item--info">\
    				<a href="#" class="albums__name">  ' + name + ' </a>\
    				</li>');
    		}


    		AllAlbums(albums.id,albums.name,albums.created,albums.photos);


        // проверяем есть ли фото, если нету или формат не соответствует, то подгружаем стандартное фото
        if(albums.photos.length!== 0){
        	console.log(albums.photos.length);
        	console.log(albums.photos[0].url);
        	$('.albums__list__item').eq(i).css({
        		'backgroundImage': 'url(' + albums.photos[0].url+ ')',
        		'backgroundSize': 'cover',
        		'background-repeat':'no-repeat'
        	});

        }

        else if(albums.photos.length === 0){
        	console.log(albums.photos.length);
        	$('.albums__list__item').eq(i).css({
        		'backgroundImage': 'url(../img/no-image.png)', 
        		'backgroundSize': 'cover',
        		'background-repeat':'no-repeat'
        	});
        }
    };
}



/*если нет альбомов, то показываем блок с информацией, что альбомов  у нас нет*/
else if(data.albums.length==0){
	console.log('У вас еще нет альбомов');
	var divEmptyAlbum = document.createElement('div');
	$('#albums').append(divEmptyAlbum);
	$(divEmptyAlbum).css({
		'textAlign' : 'center',
		'fontSize' : '20px'
	});
	$(divEmptyAlbum).text('У вас еще нет альбомов');
};

}, 
error:function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},

	AlbumControllerID: function(token, albumID){
		$.ajax({
			url: 'http://restapi.fintegro.com/albums/' + albumID,
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function (data) {
				console.log(data);
				App.AlbumController(token);
			}, 
			error:function (xhr, status, error) {
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},


	AlbumControllerPost: function(token){
		$.ajax({
			url: 'http://restapi.fintegro.com/albums',
			method: 'POST',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data: {
				name:$('#newElemInput').val()
			},
			success: function (data) {
				console.log(data);
				App.AlbumController(token);
			}, 
			error:function (xhr, status, error) {
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},

	AlbumControllerDelete: function(token, albumID){
		$.ajax({
			url: 'http://restapi.fintegro.com/albums/'+ albumID,
			method: 'DELETE',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function (data) {
				App.AlbumController(token);
 // console.log(data.albums[0].id);

}, 
error:function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},


	PhotoController: function(token, albumID){
		$.ajax({
			url: 'http://restapi.fintegro.com/photos',
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data: {
				album_id:albumID
			},
			success: function (data) {
				console.log(data);
				$('#photos').children().remove();
				/*если количество альбомов не 0, то убираем пустой элемент с текстом, что ничего не найдено*/
				if(data.photos.length!==0){
					$('.photo-item-empty').css({
						'display':'none'
					});

					/*проходим массивом по результатам поиска*/
					for(var i=0;i<data.photos.length;i++){
						var photos = data.photos[i];
						photos_id=data.photos[i].id;
        // console.log(albums_id);
        // 
        /*функция по выводу информации про фото*/
        function AllPhotos(id, url, created){
        	$('#photos').append('<li class="photo__item" data-photo-created="'+ created+'" data-photo-id="' + id + '">\
        		<div class="modal-title PhotoDelete"><a href="#" class="modal-close PhotoDelete">x</a></div>\
        		<img src=" ' + url + ' ">');
        }
        AllPhotos(photos.id,photos.url,photos.created);
        console.log('фото мои');
    };
}
/*если нет фотографий, то показываем блок с информацией, что фотографий  у нас нет*/
else if(data.photos.length==0){
	console.log('У вас еще нет фото');
	var divEmptyAlbum = document.createElement('div');
	$('#photos').append(divEmptyAlbum);
	$(divEmptyAlbum).css({
		'textAlign' : 'center',
		'fontSize' : '20px'
	});
	$(divEmptyAlbum).text('У вас еще нет фото');
};
}, 
error:function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},

	PhotoControllerID: function(token, photoID){
		$.ajax({
			url: 'http://restapi.fintegro.com/photos/' + photoID,
			method: 'GET',
			dataType: 'json',
			headers: {
				bearer: token
			},

			success: function (data) {
				console.log(data);
    // App.PhotoController(token);
    /*проходим массивом по результатам поиска*/

    BigPhotos(data.photo.id,data.photo.url,data.photo.created);

}, 
error:function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},




	PhotoControllerPost: function(token, albumID, url){
		$.ajax({
			url: 'http://restapi.fintegro.com/photos',
			method: 'POST',
			dataType: 'json',
			headers: {
				bearer: token
			},
			data: {
				album_id:albumID,
				url:NewPhoto
			},
			success: function (data) {
    // App.UploadController(token);
    console.log(data);
    // App.PhotoController(cookie());


}, 
error:function (xhr, status, error) {
	console.log('ERROR!!!', xhr, status, error);
}
});
	},


	PhotoControllerDelete: function(token, photoID){
		$.ajax({
			url: 'http://restapi.fintegro.com/photos/' + photoID,
			method: 'DELETE',
			dataType: 'json',
			headers: {
				bearer: token
			},
			success: function (data) {
				console.log('фото удалено');
			}, 
			error:function (xhr, status, error) {
				console.log('ERROR!!!', xhr, status, error);
			}
		});
	},




//Добавление поста
addPost: function addPost() {

	console.log(postAddPhoto);
	/*создаем массив, в котором перебираем элементы из массива, в который загружаются фотографии*/
	var media = [];

	for (var i = 0; i < postAddPhoto.length; i++) {
		media.push({
			url: postAddPhoto[i]
		});
	}

	$.ajax({
		url: 'http://restapi.fintegro.com/posts',
		method: 'POST',
		dataType: 'json',
		data: {
			text: $('#massage').val(),
			media: media
		},
		headers: {
			bearer: token
		},
		success: function (data) {

			// for(var i=0; i<postAddPhoto.length;i++){
				App.showPosts();
			// }

			console.log(data);
			// console.log(data.mediaList.url);
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}

	});

	// }
	

},
// addMedia: function addPost() {
// 	$.ajax({
// 		url: 'http://restapi.fintegro.com/posts',
// 		method: 'POST',
// 		dataType: 'json',
// 		data: {
// 			media:{
// 				// id:mediaId,
// 				url:postAddPhoto,
// 				// created:mediaCreated
// 			}
// 		},
// 		headers: {
// 			bearer: token
// 		},
// 		success: function (data) {
// 			console.log('addmedia');
// 			console.log(postAddPhoto);
// 			},
// 		error: function (xhr, status, error) {
// 			console.log('ERROR!!!', xhr, status, error);
// 		}

// 	});
// },


//Удаление поста
removePost: function removePost(id) {
	$.ajax({
		url: 'http://restapi.fintegro.com/posts/' + id,
		method: 'DELETE',
		dataType: 'json',
		data: {},
		headers: {
			bearer: token
		},
		success: function (data) {
			App.showPosts();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}
		
	});
},

//Добавление комментария
addComment: function addComment(text, id) {
	$.ajax({
		url: 'http://restapi.fintegro.com/comments',
		method: 'POST',
		dataType: 'json',
		data: {
			text: text,
			post_id: id
		},
		headers: {
			bearer: token
		},
		success: function () {
			App.showPosts();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}
		
	});
},


//Удаление коментария
removeComment: function removeComment(id) {
	console.log(id);
	$.ajax({
		url: 'http://restapi.fintegro.com/comments/' + id,
		method: 'DELETE',
		dataType: 'json',
		headers: {
			bearer: token
		},
		success: function () {
			App.showPosts();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}

	});
},

// ShowMedia: function ShowMedia(){
// 	$.ajax({
// 		url: 'http://restapi.fintegro.com/posts',
// 		method: 'GET',
// 		dataType: 'json',
// 		data: {
// 			limit: 100,
// 			page: 1
// 		},
// 		headers: {
// 			bearer: token
// 		},

// 		success: function (data) {
// 			console.log(data);

// 			for(var i=0;i<data.posts[i].mediaList.length;i++){
// 				var media = data.posts[i].mediaList;
// 				console.log(media);
// 				console.log('wiugfe');
// 				/*функция по выводу информации про фото*/
// 				function mediaPost(id, url, created){
// 					$('#mediaContent').append('<li class="photo__item" data-photo-created="'+ created+'" data-photo-id="' + id + '">\
// 						<div class="modal-title PhotoDelete"><a href="#" class="modal-close PhotoDelete">x</a></div>\
// 						<img src=" ' + url + ' ">');
// 				}
// 				mediaPost(media.id,media.url,media.created);

// 			};
// 		}, 
// 		error: function (xhr, status, error) {
// 			console.log('ERROR!!!', xhr, status, error);
// 		}

// 	});

// },
//Запрос на вывод постов
showPosts: function showPosts() {

	$.ajax({
		url: 'http://restapi.fintegro.com/posts',
		method: 'GET',
		dataType: 'json',
		data: {
			limit: 100,
			page: 1
		},
		headers: {
			bearer: token
		},

		success: function (data) {
			console.log(data);
			console.log(data.posts);


			$('.chats').hide();


			// /*добавила*/
			// for(var i=0;i<data.posts[i].mediaList.length;i++){
			// 	var media = data.posts[i].mediaList;

			// 	/*функция по выводу информации про фото*/
			// 	function mediaPost(id, url, created){
			// 		$('#mediaContent').append('<li class="photo__item" data-photo-created="'+ created+'" data-photo-id="' + id + '">\
			// 			<div class="modal-title PhotoDelete"><a href="#" class="modal-close PhotoDelete">x</a></div>\
			// 			<img src=" ' + url + ' ">');
			// 	}
			// 	mediaPost(media.id,media.url,media.created);

			// };
			// /**/





			if (data.posts.length == 0) {
				$('.posts .wall__empty-item').html('<div class="teal lighten-5 card"><p class="center card-content posts__message">This will be your wall</p></div>');
			} else {
				$('.posts .wall__empty-item').html($('#massage').val());
				var comments = '';
				for (var i = 0; i < data.posts.length; i++) {
					console.log(data.posts[i].mediaList.length);
						// data.posts[i].mediaList.url = postAddPhoto;
						// for (var t = 0; t<data.posts[i].mediaList.length; t++){
						// 	console.log(data.posts[i].mediaList[t]);
						// }
						
					// $('.photomedia').eq(i).attr('src', ''+ postAddPhoto + '');
					comments = '';
					for (var j = 0; j < data.posts[i].comments.length; j++) {
						
						comments += '<div class="row posts__comments" data-comment-id = "' + data.posts[i].comments[j].id + '">' +
						'<div class="container-fluid"> ' +   
						'<div class="row"> ' +   
						'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> ' +   
						'<img src="' + data.posts[i].comments[j].user.photo + '" alt="" class="postUserPhoto">' +
						'</div> ' +   
						'<div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"> ' + 
						'<div class="userCommentname"> ' +   
						'<span class="userCommentLastname"> ' + data.posts[i].user.lastname + ' </span>' +
						'<span class="userCommentFirstname"> ' + data.posts[i].user.firstname + ' </span>' + 
						'<i class="remove-comment">x</i>' + 
						' </div>' +
						'<p class="textComment">' + data.posts[i].comments[j].text +  
						'</p>' +
						' </div>' +
						' </div>' +
						' </div>' +
						'</div>';
					}
					photos = '';
					for (var p = 0; p < data.posts[i].mediaList.length; p++) {
						var emptyurl = data.posts[i].mediaList[p] == null ? '' : data.posts[i].mediaList[p].url;
						photos+= '<img src="' + emptyurl +'">';
					}
					// for (var t = 0; t<data.posts[i].mediaList.length; t++){
						var emptyurl = data.posts[i].mediaList[0] == null ? '' : data.posts[i].mediaList[0].url;
						$('.posts .wall__empty-item').append(
							'<div class="post-item card-panel" data-id="' + data.posts[i].id + '">' +
							'<div class="post-content">' +
							'<div class="container-fluid"> ' +   
							'<div class="row"> ' +   
							'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> ' + 
							'<img src="' + data.posts[i].user.photo + '" alt="" class="postUserPhoto">' +
							' </div>' +
							'<div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"> ' + 
							'<div class="userPostname"> ' +  
							'<a class="userPostname--link">' +
							'<span class="userPostLastname"> ' + data.posts[i].user.lastname + ' </span>' +
							'<span class="userPostFirstname"> ' + data.posts[i].user.firstname + ' </span>' + 
							'</a>' +
							'<span class="post-date">'+ data.posts[i].date +'</span>'+
							// '<i class="remove-post">x</i>' + 
							' </div>' +
							'<p class="textPost">' + data.posts[i].text + '</p>' +
							photos+
							// '<img src="' + emptyurl +'">' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							comments +
							'<div class="row posts__input-comment">' +
							'<input type="text" class="comments-field" placeholder="Enter your comment">' +
							'<button class="btn add-comment center" type="submit" name="">' +
							'<i class="fa fa-comment"> </i>' +
							'</button>' +
							'</div>' +
							'<p class="right-align posts__buttons">' +
							'<a href="comment-post">Сomment</a>' +
							'<a href="remove-post">Remove</a>' +
							'</p>' +
							'</div>'
							);
					// }
				}
			}
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}
	});
}, 

// чаты
chats: function(token) {
	$.ajax({
		url: 'http://restapi.fintegro.com/chats',
		method: 'GET',
		dataType: 'json',
		headers: {
			bearer: token
		},
		success: function(data) {
        // $('.chat').remove();
        Func.createChatBlock(data);
    },
    error: function(data) {
    	console.log(data);
    }
});
},

  // новое сообщение
  newMessage: function(token, user_id, message) {
  	$.ajax({
  		url: 'http://restapi.fintegro.com/chats',
  		method: 'POST',
  		dataType: 'json',
  		headers: {
  			bearer: token
  		},
  		data: {
  			user_id: user_id,
  			message: message
  		},
  		success: function(data) {
  			console.log('Новое сообщение: ', data.id);

  			localStorage.setItem('chat-id', data.id);
  		},
  		error: function(data) {
  			console.log(data);
  		}
  	});
  },

  // просмотр сообщений в чате
  getChat: function(token, chat_id) {
  	$.ajax({
  		url: 'http://restapi.fintegro.com/chats/'+ chat_id +'',
  		method: 'GET',
  		dataType: 'json',
  		headers: {
  			bearer: token
  		},
  		success: function(data) {
  			var chatUserId = data.chat.chat_users;

        // Выводим имя и фамилию пользователя с которым общаемся
        if (id == chatUserId[0].user_id) {
        	$('.chat-persone').html(chatUserId[1].firstname + ' ' + chatUserId[1].lastname);
        } else {
        	$('.chat-persone').html(chatUserId[0].firstname + ' ' + chatUserId[0].lastname);
        }

        // Создаем блоки с сообщениями
        Func.createMessageBlock(data);
    },
    error: function(data) {
    	console.log(data);
    }
});
  },

  // отправить сообщение в чат
  sendMessage: function(token, message, chat_id) {
  	$.ajax({
  		url: 'http://restapi.fintegro.com/chats/' + chat_id,
  		method: 'PUT',
  		dataType: 'json',
  		headers: {
  			bearer: token
  		},
  		data: {
  			message: message
  		},
  		success: function(data) {
  			console.log('Отправленное сообщение в чат: ', data);
  		},
  		error: function(data) {
  			console.log(data);
  		}
  	});
  },

  deleteChat: function(token, chat_id) {
  	$.ajax({
  		url: 'http://restapi.fintegro.com/chats/'+ chat_id +'',
  		method: 'DELETE',
  		dataType: 'json',
  		headers: {
  			bearer: token
  		},
  		success: function(data) {
  			console.log('Чат id="'+ chat_id +'" удалён');
  		}
  	});
  },

  //Добавление новостного комментария
addNewsComment: function addNewsComment(text, id) {
	$.ajax({
		url: 'http://restapi.fintegro.com/comments',
		method: 'POST',
		dataType: 'json',
		data: {
			text: text,
			post_id: id
		},
		headers: {
			bearer: token
		},
		success: function () {
			App.showNews();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}

	});
},


//Удаление новостного коментария
removeNewsComment: function removeNewsComment(id) {
	console.log(id);
	$.ajax({
		url: 'http://restapi.fintegro.com/comments/' + id,
		method: 'DELETE',
		dataType: 'json',
		headers: {
			bearer: token
		},
		success: function () {
			App.showNews();
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}

	});
},

//Запрос на вывод новостей
showNews: function () {
	$.ajax({
		url: 'http://restapi.fintegro.com/news',
		method: 'GET',
		dataType: 'json',
		data: {
			limit: 10,
			page: 1
		},
		headers: {
			bearer: token
		},
		success: function (data) {
			console.log(data);
			if (data.news.length == 0) {
				$('.posts .wall__empty-item').html('<div class="teal lighten-5 card"><p class="center card-content posts__message">You do not have news yet</p></div>');
			} else {
				$('.posts').html('<div class="wall__empty-item card-content news"></div>');
				var comments = '';
				for (var i = 0; i < data.news.length; i++) {
					if (data.news[i].post != null) {
						for (var j = 0; j < data.news[i].post.length; j++) {
							comments = '';
							for (var l = 0; l < data.news[i].post[j].comments.length; l++) {
								comments += '<div class="row posts__comments" data-comment-id = "' + data.news[i].post[j].comments[l].id + '">' +
									'<div class="container-fluid"> ' +
									'<div class="row"> ' +
									'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-4"> ' +
									'<img src="' + data.news[i].post[j].comments[l].user.photo + '" alt="" class="postUserPhoto">' +
									'</div> ' +
									'<div class="col-lg-9 col-md-9 col-sm-9 col-xs-8"> ' +
									'<div class="userCommentname"> ' +
									'<span class="userCommentLastname"> ' + data.news[i].post[j].comments[l].user.lastname + ' </span>' +
									'<span class="userCommentFirstname"> ' + data.news[i].post[j].comments[l].user.firstname + ' </span>' +
									' </div>' +
									'<p>' + data.news[i].post[j].comments[l].text +
									'<i class="remove-comment">x</i>' + '</p>' +
									' </div>' +
									' </div>' +
									' </div>' +
									'</div>';
							}

							photos = '';
							for (var p = 0; p < data.news[i].post[j].mediaList.length; p++) {
								var emptyurl = data.news[i].post[j].mediaList[p] == null ? '' : data.news[i].post[j].mediaList[p].url;
								photos+= '<img src="' + emptyurl +'">';
							}

						var emptyurl = data.news[i].post[j].mediaList[0] == null ? '' : data.news[i].post[j].mediaList[0].url;

						$('.posts .wall__empty-item').append(
							'<div class="post-item card-panel" data-id="' + data.news[i].post[j].id + '">' +
							'<div class="post-content">' +
							'<div class="container-fluid"> ' +   
							'<div class="row"> ' +   
							'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> ' + 
							'<img src="' + data.news[i].post[j].user.photo + '" alt="" class="postUserPhoto">' +
							' </div>' +
							'<div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"> ' + 
							'<div class="userPostname"> ' +  
							'<a class="userPostname--link">' +
							'<span class="userPostLastname"> ' + data.news[i].post[j].user.lastname + ' </span>' +
							'<span class="userPostFirstname"> ' + data.news[i].post[j].user.firstname + ' </span>' + 
							'</a>' +
							'<span class="post-date">'+ data.news[i].post[j].date +'</span>'+
							// '<i class="remove-post">x</i>' + 
							' </div>' +
							'<p class="textPost">' + data.news[i].post[j].text + '</p>' +
							photos+
							// '<img src="' + emptyurl +'">' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							comments +
							'<div class="row posts__input-comment">' +
							'<input type="text" class="comments-field" placeholder="Enter your comment">' +
							'<button class="btn add-comment center" type="submit" name="">' +
							'<i class="fa fa-comment"> </i>' +
							'</button>' +
							'</div>' +
							'<p class="right-align posts__buttons">' +
							'<a href="comment-post">Сomment</a>' +
							'<a href="remove-post">Remove</a>' +
							'</p>' +
							'</div>'
							);
						}
					}

				}
			}
		},
		error: function (xhr, status, error) {
			console.log('ERROR!!!', xhr, status, error);
		}

	});
},

};