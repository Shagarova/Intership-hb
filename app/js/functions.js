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

};

