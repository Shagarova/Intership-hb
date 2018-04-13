var Func = {

	cookies: function() {
		var cookies = document.cookie.split('; ');
		var i, sessionToken;

		for (i = 0; i < cookies.length; i++) {
			if(cookies[i].indexOf('session-token') !== -1) {
				sessionToken = cookies[i].split('=')[1];
				break;
			}
		}
		return sessionToken;
	}, 


	showMessage: function(message, isError) {

		var errorClass = isError ? 'error' : '';

		$('.main').append('<div class="modal ' + errorClass + '"></div>');
		$('.modal').append(message).fadeIn(1000);

		setTimeout(function(){
			$('.modal').fadeOut(1000, function(){
				$('.modal').remove();
			});
		}, 1500);
	},


	allYourFriendsModal: function allYourFriendsModal(){
		$('.modal-overlay').remove();
		$('.modalFriends').remove();
		var overlay = document.createElement('div');
		var modalContainer = document.createElement('div');
		var modalTitle = document.createElement('div');
		var modalClose = document.createElement('a');
		var modalItems = document.createElement('div');

		$(modalItems)
		.addClass('search__result--found--Friends');

		$(modalClose)
		.attr('href', '#')
		.text('x')
		.addClass('modal-close');

		$(modalTitle)
		.addClass('modal-title')
		.text('Your Friends')
		.append(modalClose);

		$(modalContainer)
		.addClass('modalFriends')
		.append(modalTitle, modalItems);

		$(overlay).addClass('modal-overlay')
		.append(modalContainer);

		$('script:last-of-type').after(overlay);

		$('.modal-close').click(function(){
			$('.modalFriends').remove();
			$('.modal-overlay').remove();
		});

	},

	allYourEnemiesModal: function allYourEnemiesModal(){
		$('.modal-overlay').remove();
		$('.modalEnemies').remove();
		var overlay = document.createElement('div');
		var modalContainer = document.createElement('div');
		var modalTitle = document.createElement('div');
		var modalClose = document.createElement('a');
		var modalItems = document.createElement('div');

		$(modalItems)
		.addClass('search__result--found--Enemies');

		$(modalClose)
		.attr('href', '#')
		.text('x')
		.addClass('modal-close');

		$(modalTitle)
		.addClass('modal-title')
		.text('Your Enemies')
		.append(modalClose);

		$(modalContainer)
		.addClass('modalEnemies')
		.append(modalTitle, modalItems);

		$(overlay).addClass('modal-overlay')
		.append(modalContainer);

		$('script:last-of-type').after(overlay);

		$('.modal-close').click(function(){
			$('.modalEnemies').remove();
			$('.modal-overlay').remove();
		});

	},
	validateName: function validateName(){
		if ($('#login').val() ===''){
			$(document.getElementById('login')).after('<p>Вы не ввели значение<p>');
			$('#form>p').addClass('error');
			return false;
		}
		else if($('#login').val().length<6){
			$(document.getElementById('login')).after('<p>Количество символов меньше допустимого<p>');
			$('#form>p').addClass('error');
			return false;
		}
		return true;
	},


	validateEmail: function validateEmail(){
		var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
		if($('#email').val() === ''){
			$(document.getElementById('email')).after('<p>Вы не ввели значение<p>');
			$('#form>p').addClass('error');
			return false;
		}
		else if($('#email').val().search(pattern) !== 0){
			$(document.getElementById('email')).after('<p>Ваш email не корректен!<p>');
			$('#form>p').addClass('error');
			return false;
		}
		return true;
	},



	validatePassword: function validatePassword(){
		if ($('#password').val() ===''){
			$(document.getElementById('password')).after('<p>Вы не ввели значение<p>');
			$('#form>p').addClass('error');
			return false;
		}
		else if($('#password').val().length<6){
			$(document.getElementById('password')).after('<p>Количество символов меньше допустимого<p>');
			$('#form>p').addClass('error');
			return false;
		}
		return true;
	},


	validateRepeatPassword: function validateRepeatPassword(){
		if ($('#repeatPassword').val() ===''){
			$(document.getElementById('repeatPassword')).after('<p>Вы не ввели значение<p>');
			$('#form>p').addClass('error');
			return false;
		}
		else if($('#repeatPassword').val()!==($('#password').val())){
			$(document.getElementById('repeatPassword')).after('<p>Ваши пароли не совпадают<p>');
			$('#form>p').addClass('error');
			return false;
		}
		else{
			return true;
		}
	},



	/*показывает ошибку, если было введено неверное значение в капчу*/
	showErrorValue: function showErrorValue(){
		$('body').append('<div class="modal ErrorValue">Wrong </div>');
	},

	/*регистрация прошла успешно*/
	showSuccess: function showSuccess(){
		$('body').append('<div class="modal Success">Регистрация прошла успешно </div>');
		$('.modal.Success').fadeIn(1000).delay(3000).fadeOut(1000, function(){$(this).remove()});
	},

	// создание блока с сообщением
	createMessageBlock: function createMessageBlock(data) {
		var user1 = data.chat.chat_users[0],
		user2 = data.chat.chat_users[1],
		messages = data.chat.messages,
		messageLength = messages.length;

  // цыкл вывода сообщений в чате
  for (var i = 0; i < messageLength; i++) {
  	var user,
  	message = data.chat.messages[i],
  	messageUserId = message.sender_id;

    // проверям какой пользователь написал сообщение и присваиваем его данные в user
    if (messageUserId == user1.user_id) {
    	user = user1;
    } else if (messageUserId == user2.user_id) {
    	user = user2;
    }

    $('.open-chat').append('\
    	<div class="chat-message" data-message-id="'+ message.chat_id +'">\
    	<div class="chat-date">'+ message.date +'</div>\
    	<div class="user-image"><img src="'+ user.photo +'" alt=""></div>\
    	<div class="user-name">'+ user.firstname +' '+ user.lastname +'</div>\
    	<div class="text-message">'+ message.message +'</div>\
    	</div>');
}
},


// Добавляет модальное окно для ввода сообщения
addModal: function addModal() {
	$('body').append('<div class="modal-overlay">\
		<div class="container-fluid">\
		<div class="row">\
		<div class="modal-container col-xs-4  col-xs-offset-4">\
		<div class="close"><span class="glyphicon glyphicon-remove"></span></div>\
		<div class="title-modal-NewChat">\
		<div class="tittle-text">New chat</div>\
		</div>\
		<hr>\
		<div class="contentModal col-xs-12">\
		<div class="container">\
		<div class="row">\
		<div class="input-group">\
		<input class="newMessage col-xs-12 col-md-12 col-lg-12" type="text" placeholder="Enter your message">\
		<button type="button" class="btn btn-primary col-xs-12 col-md-12 col-lg-12">Send</button>\
		</div>\
		</div>\
		</div>\
		</div>\
		</div>\
		</div>\
		</div>\
		</div>');
},

// создает блок с чатом
createChatBlock: function createChatBlock(data) {
	for (var i = data.chats.length - 1; i >= 0; i--) {
		var chat = data.chats[i];

		$('.chats-list').append('<div class="chat" data-chat-id="'+ chat.chat_id +'">\
			<div class="chat-date">'+ chat.last_mes.date +'</div>\
			<div class="user-image"><img src="'+ chat.chat_users[0].photo +'" alt=""></div>\
			<div class="user-name">'+ chat.chat_users[0].firstname +' '+ chat.chat_users[0].lastname +'</div>\
			<div class="text-message">'+ chat.last_mes.message +'</div>\
			<div class="delete-chat">delete chat</div>\
			</div>');
	}
}


};

