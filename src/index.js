function api(method, params) {
	return new Promise((resolve, reject) => {
		VK.api(method, params, data => {
			if (data.error) {
				reject(new Error(data.error.error_msg));
			} else {
				resolve(data.response);
			}
		});
	});
}

var promise = new Promise((resolve, reject) => {
	VK.init({
		apiId: 6197002
	});

	VK.Auth.login(data => {
		if (data.session) {
			resolve(data);
		} else {
			reject(new Error('Не удалось авторизоваться'));
		}
	}, 8);
});

promise
	.then(data => {
		return api('friends.get', { v: 5.68, fields: 'first_name, last_name, photo_50' })
	})

	.then(data => {
		const templateElement = document.querySelector('#user-template');
		const myFriends = document.querySelector('#my_friends');
		const source = templateElement.innerHTML,
		render = Handlebars.compile(source),
		template = render({ list: data.items });

		myFriends.innerHTML = template;
	})

	.then(function() {
		var myFriends = document.querySelector('#my_friends'),
			fl = document.querySelector('#friends_list'),
			inputLeft = document.querySelector('#name_left'),
			inputRight = document.querySelector('#name_right'),
			saveButton = document.querySelector('#button__save'),
			delAll = document.querySelector('#button__delete_all'),
			arrAdd = document.querySelectorAll('.add');

		for (var i = 0; i < arrAdd.length; i++) {
			arrAdd[i].addEventListener('click', function() {
				fl.appendChild(this.parentNode);
				this.innerText = '-';
				this.parentNode.classList.add('back');
			});
		};

		function isMatching(full, chunk) {
			full = full.toLowerCase();
			chunk = chunk.toLowerCase();
			if (~full.indexOf(chunk)) {
				return true;
			} else {
				return false;
			}
		};

		fl.addEventListener('click', function(e) {
			var target = e.target;
			if (target.tagName !== 'BUTTON') return;
			myFriends.insertBefore(target.parentNode, myFriends.firstChild);
			target.innerText = '+';
			target.parentNode.classList.remove('back');
		});

		inputLeft.addEventListener('keyup', function() {
			var names = myFriends.querySelectorAll('.my_friend__name'),
				mfWrap = myFriends.querySelectorAll('.mf_wrap'),
				inputName = inputLeft.value;

			for (var l = 0; l < names.length; l++) {
				if (!isMatching(names[l].innerText, inputName)) {
					mfWrap[l].style.display = 'none';
				} else {
					mfWrap[l].style.display = 'flex';
				}
			}
		});

		inputRight.addEventListener('keyup', function() {
			var targetNames = document.querySelectorAll('.back');

			for (var p = 0; p < targetNames.length; p++) {
				if (!isMatching(targetNames[p].innerText, inputRight.value)) {
					targetNames[p].style.display = 'none';
				} else {
					targetNames[p].style.display = 'flex';
				}
			}
		});

		delAll.addEventListener('click', function() {
			var arrBack = document.querySelectorAll('.back');
			for (var j = 0; j < arrBack.length; j++) {
				myFriends.appendChild(arrBack[j]);
			}
			for (var k = 0; k < arrAdd.length; k++) {
				arrAdd[k].innerText = '+';
			}

			localStorage.removeItem('saveFriends');
			localStorage.removeItem('saveTargetFriends');

		});

		saveButton.addEventListener('click', function() {
			localStorage.setItem('saveTargetFriends', fl.innerHTML);
			localStorage.setItem('saveFriends', myFriends.innerHTML);
			alert('Сохранено!');
		});

	})

	.then(function() {
		var fl = document.querySelector('#friends_list'),
			myFriends = document.querySelector('#my_friends');

		if(localStorage.saveTargetFriends) {
			fl.innerHTML = localStorage.getItem('saveTargetFriends');
			myFriends.innerHTML = localStorage.getItem('saveFriends');
		}
	})

	.then(function() {
/* --------------------Drag and Drop-------------------*/

		var fl = document.querySelector('#friends_list');

		function dragStart(event) {
			event.dataTransfer.setData('text/plain', event.target.class);
		}

		function dragOver(event) {
			event.preventDefault();
		}

		function drop(event) {
			event.preventDefault();
			var klas = event.dataTransfer.getData('text/plain');
			var drag = document.getElementsByClassName(klas);
			myFriends.appendChild(drag);
		}
	})

	.catch(function (e) {
		alert('Ошибка: ' + e.message);
	});
