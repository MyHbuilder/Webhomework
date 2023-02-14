window.addEventListener('load', function() {


	var div = document.querySelector('.nav-inside-content');
	var div2 = document.querySelector('.nav-inside');
	div.addEventListener('mouseenter', function() {
		div2.style.display = 'block';
	})
	div.addEventListener('mouseleave', function() {
		div2.style.display = 'none';
	})
	div2.addEventListener('mouseenter', function() {
		div2.style.display = 'block';
	})
	div2.addEventListener('mouseleave', function() {
		div2.style.display = 'none';
	})


	var ul = document.querySelector('.ulsp');
	var li = ul.querySelector('li');
	ul.children[0].className = 'current';
	for (var i = 0; i < ul.children.length; i++) {
		ul.children[i].addEventListener('click', function() {
			for (var i = 0; i < ul.children.length; i++) {
				ul.children[i].className = '';
			}
			this.className = 'current';
		})
	}
})
