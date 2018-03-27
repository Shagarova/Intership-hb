
/*код для страницы header*/
$(document).ready(function getYear(){
	var today = new Date();
	var year = today.getFullYear();
	$('.footer__item--year').text(year);
});


$(document).ready(function(){
	var findBtn=$('.content').find($('.btn'));
	if(findBtn){
		if(findBtn.parent().next().children().hasClass('btn')){
			$(this).css({
				'borderRadius' : '0'
			})
  	// var btnNext=findBtn.parent().next().children();
  	// btnNext.css({
  	// 	'marginLeft':'-1px'
  	// })

  }
}
else{
	$(this).css({
		'borderRadius' : '0 3px 3px 0'
	})
}
});




// /*ищем, есть ли пункты меню в сообщениях стены, если их нет, либо же они пустые,
// то показываем сообщение, в котором текст для пустой стены*/



$(document).ready(function(){

	var wallItem=$('.wall__list__item');
	if (wallItem.length>0){
		// console.log('tattaa');
		$('.wall__list__item--empty').css({
			'display' : 'none'
		})
	}
	else{
		// console.log('tytytya');
		$('.wall__list__item--empty').css({
			'display' : 'block'
		})
	}



// var my_id=localStorage.getItem("user_id");
// var my_nikname=localStorage.getItem("lastname");
// console.log(my_id);
// console.log(my_nikname);



//   var myName = localStorage.getItem("username");
//  var myLastname =  localStorage.getItem("lastname");
// // var myFirstame =  localStorage.getItem("firstname");

//     console.log(myName);

//      $('#nikname').text(myName);
//  $('#lastname').text( myLastname);
//   // $('#firstname').text(myFirstame);


// console.log(myLastname);


});






/*нажимаем на Commented  открывается окно с комментарием, а это убирается*/
$('.set-comment-block.commented').click(function(){

	$('.post__commented').css({
		'display' :'block'
	});
	$('.post__controll.commented').css({
		'display' :'none'
	});				

});

$('.set-comment-block.closeComment').click(function(){

	$('.post__commented').css({
		'display' :'none'
	});
	$('.post__controll.commented').css({
		'display' :'block'
	});				

});

/**/





