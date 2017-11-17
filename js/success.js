$(function(){
	
	var img_bg = document.getElementById('img_bg');
	var img_hb = document.getElementById('img_hb');
	var img_hbdk = document.getElementById('img_hbdk');
	var share = document.getElementById('share');
	var open = document.getElementById('open');

	img_hbdk.style.display = "none";
	share.style.display = "none";

	// 上个页面抽奖结果接应
	if(window.localStorage){
		var bgcolor = localStorage.getItem("color");
		var awardName = localStorage.getItem("name");
		var con = document.getElementById("con");
		var word = document.getElementById("word");
			con.style.background = bgcolor;
			word.innerHTML = awardName;
			//console.log(bgcolor);
	}

	// 红包弹出
	setTimeout(function(){
		img_bg.style.display = "block";
	}, 2000)

	// 打开红包
	open.addEventListener('touchend',function(){
		img_hb.style.display = "none";
		img_hbdk.style.display = "block";	
	})

	$('.close').click(function(){
		img_bg.style.display = "none";
		img_hbdk.style.display = "none";
		share.style.display = "block";
	})
	// 点击分享页面消失
	var share = document.getElementById('share');
	share.addEventListener('touchend',function(){
		this.style.display = 'none';
	})

	$('#use_btn').click(function(){
		window.location.href = 'http://download.yihaojishi.com/find.html';
	})
	$('.btn').click(function(){
		window.location.href = 'http://download.yihaojishi.com/find.html';
	})
})	