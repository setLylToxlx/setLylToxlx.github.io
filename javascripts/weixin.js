define(function(require,exports,module){
	// alert(1);
	// var $ = require('jquery.min.js');
	console.log($('.container').html());
	wx.onMwnuShareTimeline:function(){
		title:'我的标题',
		link:"https://setlyltoxlx.github.io/818.html",
		imgUrl:'https://setlyltoxlx.github.io/setlyltoxlx.github.io/images/apple.png',
		success:function(){
			alert('分享成功！');
		},
		cancel:function(){
			alert('取消分享！');
		}
	}
})