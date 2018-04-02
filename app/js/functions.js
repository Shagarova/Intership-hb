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

};

