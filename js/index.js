// 功能要求：
// 1， 鼠标经过轮播模块， 左右按钮显示， 离开隐藏左右按钮
// 2， 点击邮件按钮一次图片播放一张， 以此类推， 左侧按钮依然
// 3， 图片播放的同时下面的小圆圈模块跟随一起变化
// 4， 点击小圆圈， 可以播放相应的图片
// 5， 鼠标不经过轮播图， 轮播图也会自动播放图片
// 6， 鼠标经过轮播图模块， 自动播放停止

//  getElement(s)Byxxxx 获取的是动态集合，querySelector 获取的是静态集合
// 动态就是选出的元素会随文档改变，静态的不会 取出来之后就和文档的改变无关了。
// querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素；
// querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素
// getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。
// getElementsByTagName() 方法可返回带有指定标签名的对象的集合；
// getElementsByClassName() 方法返回文档中所有指定类名的元素集合， 作为 NodeList 对象。

window.addEventListener('load', function() {

	var inside = document.querySelector('.inside');
	inside.addEventListener('click', function() {
		// window.scroll(x, y);
		// 里面的x和y 不跟单位的 直接写数字即可
		// 因为是窗口滚动 所以对象是window
		animate2(window, 0);
	})

	//获取元素
	var focus1 = document.querySelector('.focus:nth-child(1)');
	var focus2 = document.querySelector('.focus:nth-child(2)');
	var orign = document.querySelector('.orign');
	//鼠标经过focus，就显示隐藏左右按钮
	orign.addEventListener('mouseenter', function() {

		focus1.style.display = 'block';
		focus2.style.display = 'block';
		// 当鼠标经过时 轮播图停止 停止计时器
		clearInterval(timer);
	})
	orign.addEventListener('mouseleave', function() {

		focus1.style.display = 'none';
		focus2.style.display = 'none';
		// 当鼠标离开时 轮播图 继续 重启定时器
		timer = setInterval(function() {
			focus2.click();
		}, 2000);
	})



	// var content = document.querySelector('.content');
	// var contenttop = content.offsettop;
	// // 当页面滚动到top-nav盒子时,就显示inside模块
	// if (window.pageYOffset >= contenttop) {
	// 	inside.style.display = 'block';
	// } else {
	// 	inside.style.display = 'none';
	// }
	// 未成功生效

	var topnav = document.querySelector('.top-nav');
	var lunbo = topnav.querySelector('.lunbo');
	var ol = topnav.querySelector('.lunbo_ol');
	var orign = topnav.querySelector('.orign');
	var orignWidth = orign.offsetWidth;

	// 动态生成小圆圈
	var num = circle = 0;

	for (var i = 0; i < lunbo.children.length; i++) {
		// 创建li
		var li = document.createElement('li');
		// 记录当前小圆圈的索引号
		li.setAttribute('index', i);
		// 插入li到ol中
		ol.appendChild(li);
		// 排他思想 干掉所有人留下我自己 且生成每个li时绑定点击事件
		li.addEventListener('click', function() {
			for (var i = 0; i < ol.children.length; i++) {
				// 干掉所有人
				ol.children[i].className = '';
			}
			this.className = 'current';
			// 点击某个li就获得了li的索引号
			var index = this.getAttribute('index');
			num = circle = index;
			animate(lunbo, -index * orignWidth);
		})
	}
	ol.children[0].className = 'current';

	//克隆第一张图片li放在ul的后面 需要将克隆放在生成圆圈的后面这样不会被生成圆圈数量时被检测到克隆的li
	var first = lunbo.children[0].cloneNode(true);
	lunbo.appendChild(first);

	// 点击右侧按钮 图片滚动
	var flag = true; //flag为节流阀开关 防止连续点击按钮切换变快
	focus2.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num == lunbo.children.length - 1) {
				lunbo.style.left = 0;
				num = 0;
			}
			num++;
			animate(lunbo, -num * orignWidth, function() {
				flag = true;
			});

			// 点击右侧按钮，小圆圈跟随变化
			circle++;
			if (circle == ol.children.length) {
				circle = 0;
			}
			// 先干掉其他人
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			// 留下当前的小圆圈的current类名
			ol.children[circle].className = 'current';
		}
	})
	flag = true;
	// 左侧按钮
	focus1.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num == 0) {

				num = lunbo.children.length - 1;
				lunbo.style.left = -num * orignWidth + 'px';
			}

			num--;
			animate(lunbo, -num * orignWidth, function() {
				flag = true;
			});

			// 点击左侧按钮，小圆圈跟随变化
			circle--;
			if (circle < 0) {
				circle = ol.children.length - 1;
			}
			// 先干掉其他人
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			// 留下当前的小圆圈的current类名
			ol.children[circle].className = 'current';
		}
	})
	// 10. 自动播放轮播图
	// 1. 自动播放功能
	// 2. 添加一个定时器
	// 3. 自动播放轮播图, 实际就类似于点击了右侧按钮
	// 4. 此时我们使用手动调用右侧按钮点击事件 focus2.click
	// 5. 鼠标经过focus就停止定时器
	// 6. 鼠标离开focus就开启定时器
	var timer = setInterval(function() {
		focus2.click();
		// 手动调用点击事件
	}, 2000);

})
