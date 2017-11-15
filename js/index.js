$('#tel').focus();//打开页面手机输入框自动获取焦点
var clear = document.getElementById('clear');
var tel = document.getElementById('tel');
var send = document.getElementById('send');
var receive = document.getElementById('receive');

// 判断手机号是否合法
var flag = true;
var patt = /^1[34578]\d{9}$/;
window.onkeyup =  function(){
	if(tel.value==''){
		clear.style.display='none';
	}else{
		clear.style.display='block';
	};
	//console.log(patt.test(tel.value))
	if(patt.test(tel.value)){
		flag = true;
		send.style.color = '#1a1a1a';
		send.style.borderColor = "#000";		
	}else{
		flag = false;
		send.style.background = '#fff';
		send.style.color = '#999';
		send.style.borderColor= '#999';
	}
}
// 失去焦点的时候一键清除键显示
tel.onblur = function(){
	if(tel.value==''){
		clear.style.display='none';
	}else{
		clear.style.display='block';
	}
	if(patt.test(tel.value)){
		flag = true;
		send.style.color = '#1a1a1a';
		send.style.borderColor = "#000";		
	}else{
		flag = false;
		send.style.background = '#fff';
		send.style.color = '#999';
		send.style.borderColor= '#999';
	}
}

// 点击获取验证码
send.addEventListener('touchend', function(){
	$('#check').focus();
	var value = tel.value;
	var code = $('#send').html();
	// 时间戳
	var timestamp = new Date().getTime();
	// 随机数
	var Num="";
	for(var i=0;i<10;i++){
		Num+=Math.floor(Math.random()*10);
	}
	// md5加密
	var sign = timestamp+Num+'apiSendSms';
		end_sign = md5(sign);
	if(code=='验证码'&&tel.value!==''){
		if(flag){
			// 请求验证码
			$.ajax({
				url: 'http://test.php.yihaojishi.com:8082/yhjs-tech/api/client/api.php',
				type:'POST',
				async:true,
				data: {
					Action:'apiSendSms',
					phone:value,
					timestamp:timestamp,
					uniquestr:Num,
					sign:end_sign
				},
				success:function (data){
					var res = JSON.parse(data);
					if (res.code == '0') {
						$('.right_num').html(res.msg);
						$('.right_num').show();
						setTimeout(function(){
							$('.right_num').hide();
						}, 1000)
					}else{
						$('.error_system').html(res.msg);
						$('.error_system').show();
						setTimeout(function(){
							$('.error_system').hide();
						}, 1000)
					}
				}
			})
			// 倒计时
		    i = 60;
			$('#send').html(i+'s');
		    end = setInterval(function(){
		        i--;
		        if(i==0){
		        	clearInterval(end);
		        	$('#send').html('验证码');
		        }else{
		        	$('#send').html(i+'s');
		        }
			}, 1000)
			
		}

	}else if(!flag){
		clearInterval(end);
		$('#send').html('验证码');
		$('.error_num').show();
		setTimeout(function(){
			$('.error_num').hide();
		}, 1000)
	}
})
// 一键清除
clear.addEventListener("touchstart",function(){
	tel.value = '';
	this.style.display = 'none';
	clearInterval(end);
	$('#send').html('验证码');
})

// 点击领取
var check = document.getElementById('check');
receive.addEventListener('touchstart', function(){
	var code = check.value;
	var value = tel.value;
	// 时间戳
	var timestamp2 = new Date().getTime();
	// console.log(timestamp2);
	var Num2="";
	for(var i=0;i<10;i++){
		Num2+=Math.floor(Math.random()*10);
	}
	// console.log(Num2);
	var sign2 = timestamp2+Num2+'apiCheckCode';
		end_sign2 = md5(sign2);
	// console.log(end_sign2);
	var machine_id = document.getElementById('machine_id').value;
	if(tel.value!==''&&check.value!==''){
		$.ajax({	
			url: 'http://test.php.yihaojishi.com:8082/yhjs-tech/api/client/api.php',
			type: 'POST',
			data: {
				Action:'apiCheckCode',
				phone:value,
				code:code,
				timestamp:timestamp2,
				uniquestr:Num2,
				sign:end_sign2
			},
			success:function (data){
				var res = JSON.parse(data);
				// console.log(res.code)
				if (res.code == '0') {
					window.location="http://test.php.yihaojishi.com:8082/yhjs-tech/api/client/api.php?Action=apiGetGood&machine_id="+machine_id+"&phone="+value;
				}else{
					$('.error_code').html(res.msg);
					$('.error_code').show();
					setTimeout(function(){
						$('.error_code').hide();
					}, 1000)
				}
			}
		})
	}else{
		$('.emptyParam').show();
		setTimeout(function(){
			$('.emptyParam').hide();
		}, 1000)
	}	
})
// 小山动画
$(function(){
	var css={marginTop: "1.3rem"}
	$('.szs').animate(css,
		4000,callback);
	function callback() {
		 if(css.marginTop==='1.8rem')  
            css.marginTop='1.3rem';  
        else if(css.marginTop==='1.3rem')  
            css.marginTop='1.8rem';
		$('.szs').animate(css,4000,callback); 
	}
	
	var css2={marginTop: "3rem"}
	$('.szx').animate(css2,
		2000,callback2);
	function callback2() {
		 if(css2.marginTop==='3.3rem')  
            css2.marginTop='3rem';  
        else if(css2.marginTop==='3rem')  
            css2.marginTop='3.3rem';
		$('.szx').animate(css2,2000,callback2); 
	}
	var css3={marginTop: "3.2rem"}
	$('.sy').animate(css3,
		3000,callback3);
	function callback3() {
		 if(css3.marginTop==='3.6rem')  
            css3.marginTop='3.2rem';  
        else if(css3.marginTop==='3.2rem')  
            css3.marginTop='3.6rem';
		$('.sy').animate(css3,3000,callback3); 
	}
})
