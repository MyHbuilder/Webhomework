// 动画实现原理
//核心原理：通过定时器setlnterval()不断移动盒子位置
// 获得盒子当前位置 让盒子在当前位置加上1个移动距离 利用定时器不断重复这个操作 加一个定时器的条件 注意此元素需要添加定位，才能使用element.style.left

// var obj={};
// obj.name='andy'
// 简单动画函数封装obj目标对象 target目标位置
// 给不同元素指定了不同的定时器
// offsetLeft代表获取当前元素的左偏移量
// setInterval() 为定时器函数
// 简单的动画函数obj目标对象target目标位置
function animate(obj, target, callback) {
	//callback回调函数是指当函数体的其他参数和事件执行完了最后再执行回调函数

	//当我们不断的点击按钮，这个元素的速度会越来越快
	// 解决方案就是 让元素只有一个定时器执行
	// 先清除以前的定时器 ，只保留当前的一个定时器执行
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var step = (target - obj.offsetLeft) / 10;
		// 把步长值向上取为整数  负数向下取整 整数向上取整
		step = step > 0 ? Math.ceil(step) : Math.floor(step);

		if (obj.offsetLeft == target) {
			//停止动画 本质是停止定时器
			clearInterval(obj.timer);
			// 回调函数写到定时器结束里面
			if (callback) {
				//调用函数
				callback();
			}
			// callback && callback();  利用逻辑与的短路性等同于if 
			// 当callback为空参数 则不会执行后续的
		} else {
			obj.style.left = obj.offsetLeft + step + 'px';
			// 把每次加3 这个步长值够味一个慢慢变小的值，核心算法： 目标值 - 现在的位置） / 10 做为每次移动的距离步长
		}

	}, 15)
}
// var div = document.querySelector('div');
// var span = document.querySelector('span');
// var but300 = document.querySelector('.button300');
// var but800 = document.querySelector('.button800');
// 调用函数
// animate(div, 300);
// but300.addEventListener('click', function() {
// 	animate(span, 300);
// })
// but800.addEventListener('click', function() {
// 	animate(span, 800, function() {
// 		 alert('你好吗');
// 		span.style.backgroundColor = 'yellow'
// 	});
//callback回调函数是指当函数体的其他参数和事件执行完了最后再执行回调函数
// 可以将函数以一个参数的形式传递过去  callback = function() {} 调用时callback()
// })

// 缓动动画 核心算法：（ 目标值 - 现在的位置） / 10 做为每次移动的距离步长
function animate2(obj, target, callback) {
	//callback回调函数是指当函数体的其他参数和事件执行完了最后再执行回调函数

	//当我们不断的点击按钮，这个元素的速度会越来越快
	// 解决方案就是 让元素只有一个定时器执行
	// 先清除以前的定时器 ，只保留当前的一个定时器执行
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var step = (target - window.pageYOffset) / 10;
		//  这个步长值改为一个慢慢变小的值，核心算法： (目标值 - 现在的位置） / 10 做为每次移动的距离步长
		// 把步长值向上取为整数  负数向下取整 整数向上取整
		step = step > 0 ? Math.ceil(step) : Math.floor(step);

		if (window.pageYOffset == target) {
			//停止动画 本质是停止定时器
			clearInterval(obj.timer);
			// 回调函数写到定时器结束里面
			if (callback) {
				//调用函数
				callback();
			}
			// callback && callback();  利用逻辑与的短路性等同于if 
			// 当callback为空参数 则不会执行后续的
		} else {
			window.scroll(0, window.pageYOffset + step);
			// window.scroll(x, y); 窗口移动函数
			// 里面的x和y 不跟单位的 直接写数字即可
		}

	}, 10)
}
