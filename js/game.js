$(".hidden").hide();

// 消息滚动
var news = ['133****4895 &nbsp; &nbsp; 获得一号集市自营矿泉水','136****7864 &nbsp; &nbsp; 获得海之言柠檬味500ml','158****6687 &nbsp; &nbsp; 获得统一冰红茶500ml','178****4321 &nbsp; &nbsp; 获得一瓶500ml百事可乐'];
for(var i=0;i<news.length;i++){
	node=document.createElement('li');
	node.innerHTML=news[i];
	$(".list").append(node);
}
function start(){
	var h=$("#marquee").height();
	$(".list").animate({marginTop:-h},500,function(){
		$(".list").css({marginTop:0});
		//$(".list li:last").after($('.list li:first'));//在最后一个追加第一个
		$(".list li:first").appendTo('.list');//把第一个放在后面一个
	});
}
setInterval(start,1000);


//游戏翻牌
// 位置
var position = ["0 0","1.82rem 0","3.64rem 0","0 1.22rem","1.82rem 1.22rem","3.64rem 1.22rem","0 2.44rem","1.82rem 2.44rem","3.64rem 2.44rem"];

// color
var color = ["#ff7475","#38b5ef","#a78dcc","#5994e0","#9f7eff","#7495ff","#54c9db","#3879ef","#c448d7"];

// 奖品参数
var award = ["海之言柠檬味","百事可乐","雪碧","小茗同学","自营纯净水","统一冰红茶","三得利乌龙茶","雀巢咖啡","阿萨姆奶茶"];
var award2 = ["500ml","600ml","300ml","480ml","330ml","500ml","500ml","180ml","500ml"];

// 分发位置
function slot(obj){
	obj.each(function(i){
		var arr = position[i].split(" ");
		$(this).css({backgroundColor:color[i],left:arr[0],top:arr[1]}).children("h3").html(award[i]);
		$(this).css({transition:"all 1s"}).children("span").html(award2[i]);
	})	
}

var con = $("#view li");

slot(con);

// 随机数
function random(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = Math.floor(Math.random()*n);
		var flag = true;
		for(var j = 0; j < arr.length; j++){
			if(arr[j]==num){
				flag = false;
				i--;
				break;
			}
		}
		if(flag){
			arr.push(num);
		}
	};
	return arr;
}

// 洗牌
var flag=true,flag2=false;
$("#btn").click(function(){
	flag2=true;
	if(flag){
		flag=false;
		$(this).css({backgroundImage:'url(images/djcjh.png)'});
		$('.heart').hide();
		// 合并
		con.each(function(i){
			var this_ = $(this);
			var t = setTimeout(function(){
				this_.css({transform:"rotateY(180deg)"})
				var T = setTimeout(function(){
					this_.children().hide();
					this_.css({backgroundImage:"url(images/111.png)"});
				},300);
				this_.css({left:"1.82rem",top:"1.22rem"});
			},50*i);
		});
		// 分发
		var A = setTimeout(function(){
			// 重新分发奖品位置
			var arr = random(9);
			var arr2 = random(9);
			for(var i = 0; i < arr.length; i++){
					var aaa = position[arr2[i]].split(" ");
					con.eq(i).css({left:aaa[0],top:aaa[1]}).children("h3").html(award[arr[i]]);
					con.eq(i).children("span").html(award2[arr[i]]);				
			}
		},1500);	
		
	}
});
// 翻牌
$("#view").click(function(e){
	if(flag2){
		var tar = e.target;
		var name = $(tar).children('h3').html();
		$('.hb').children('h3').html(name);
		if(tar.nodeName=="LI"){
			$(tar).css({transform:"rotateY(0deg)"});
			var bgcolor = $(tar).css("backgroundColor");
			var awardName = $(tar).children('h3').html();
			//console.log(awardName)
			if(window.localStorage){
				localStorage.setItem("color",bgcolor);
				localStorage.setItem("name",awardName);
				//console.log(localStorage);
			}
			//console.log(bgcolor)
			var t = setTimeout(function(){
				$(tar).children().show();
				$(".num span").html('0');
				$(tar).css({backgroundImage:"none"});
				setTimeout(function(){
					$(".hidden").show();
				}, 1000)
				
			},300)
		};		
		flag2=false;
	}
});		

// 点击领取
var click_btn = document.getElementById('click_btn');

click_btn.addEventListener('touchstart',function(){
	window.location="success.html";		
})

// 按钮动画
var css={marginTop: "5.7rem"}
$('.heart').animate(css,
	1000,callback);
function callback() {
	 if(css.marginTop==='6rem')  
            css.marginTop='5.7rem';  
        else if(css.marginTop==='5.7rem')  
            css.marginTop='6rem';
	$('.heart').animate(css,1000,callback); 
}