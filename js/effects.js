(function(global,doc){
	// 一些实用方法
	var util = {
		error : function(msg) {
			console.log(msg);
		}
	}	
// 表示所有效果
	var effect = {};
	/* 展开一个div
	*  div  不解释
	*  wVal 横向展开幅度 ,为0表示不展开，默认为0，单位为px
	*  hVal 纵向展开幅度 ,为0表示不展开，默认为0，单位为px
	*  mode 展开方式，linear表示线性展开，damp表示阻尼展开，
	*  delay 延迟多久后触发,单位为毫秒
	*/
	effect.expandDiv = function(div, hVal, wVal, mode, delay){
		var isFinished = false, curHeight, curWidth, delta, seed = 6 /*每次移动 px 数*/,speed=1/*初始速度*/,duration=1000/*展开总时长*/, h, w, hDelta, wDelta, timer;
		if(!div){ 
			return;
		} ;
		h = hVal ? hVal : 0;
		w = wVal ? wVal : 0; 
		if(h === 0 && w === 0){ 
			return;
		};
		
		var m = mode ?  mode : 'damp';
		curHeight = parseInt(doc.defaultView.getComputedStyle(div,null).height);
		curWidth = parseInt(doc.defaultView.getComputedStyle(div,null).width);
		hDelta = h - curHeight;
		wDelta = w - curWidth;
		var max = hDelta > wDelta ? hDelta : wDelta;
		var times =  max  /  seed ; 
		if(m === 'damp'){ 
			var deltaS =  (2*(duration - times))/(times*(times-1)); /* 用等差数列求和公式反解出时间增量*/ 
			timer = setTimeout(function(){
				if(isFinished){
					clearTimeout(timer);
					return;
				}
				if(curWidth <= w ){
					curWidth = curWidth + seed;
				}
				else if(curHeight <= h ){
					curHeight = curHeight + seed; 
				}
				else{
					isFinished = true;
				}
				div.style.width =  Math.ceil(curWidth)+'px';
				div.style.height =  Math.ceil(curHeight)+'px';
				setTimeout(arguments.callee,speed+=deltaS); 
			},1);
		}
		else if (m === 'linear'){ 
			speed = duration / times;
			timer = setInterval(function(){
				if(isFinished){
					clearInterval(timer);
					return;
				}
				if(curWidth <= w ){
					curWidth = curWidth + seed;
				}	
				else if(curHeight <= h ){
					curHeight = curHeight + seed;
				}
				else{
					isFinished = true;
				}
				
				div.style.width =  Math.ceil(curWidth)+'px';
				div.style.height =  Math.ceil(curHeight)+'px';		
			},speed);
		}else {
			util.error('no mode like '+ m +'!');
		}
	};
	effect.movebg = function(ele){ //todo 
		var isFinished = false,speed=1;
		var style = doc.defaultView.getComputedStyle(ele,null);
		var curPos = parseInt(style.backgroundPosition.split(' ')[1]);
			speed = 1000 / 80;
		var timer = setInterval(function(){
			if(curPos>=0){
				isFinished = true;
				clearInterval(timer);
				return;
			}
			curPos += 2 ;
			ele.style.backgroundPosition ='0px '+  Math.ceil(curPos)+'px';
		},speed);
	}
	
	
	global.onload = function(){
		doc.getElementById("headerbg").onclick = function(){
			effect.expandDiv(this, 400, 0, 'damp', 1000 );
			effect.movebg(this);
			this.style.cursor = 'default';
			this.title = 'totoro!';
		}
	}
})(window,document);
