
/*При клике на фотографии. если нет фотографий, то должно показать надпись о том, 
что фотографий нет*/
$('body').on('click','.album-item', checkPhotoItem);
$('body').on('click','.nav-link__new-photo', checkPhotoItem);

function checkPhotoItem(){
	var photoItem=$('.photo-item');
	if (photoItem.length>0){

		$('.photo-item-empty').css({
			'display' : 'none'
		})
	}
	else{
		$('.photo-item-empty').css({
			'display' : 'block'
		})
	}
};

