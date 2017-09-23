/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');



function createCookie(name, value) {
	document.cookie = name + '=' + value;
}

function deleteCookie(name) {
    var cookieDate= new Date();
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = name + "=; expires=" + cookieDate.toGMTString();
}

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (~full.indexOf(chunk)) {
        return true;
    } else {
        return false;
    }
}

function ccit() {
	createCookie(addNameInput.value, addValueInput.value);
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	var delButton = document.createElement('button');

	td1.className = 'cookies';
	td2.className = 'cookies';
	tr.className = 'cookies';

	delButton.innerHTML = 'delete';
	td1.innerText = addNameInput.value;
	td2.innerText = addValueInput.value;

	listTable.appendChild(tr);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	td3.appendChild(delButton);

	delButton.addEventListener('click', function() {
		deleteCookie(td1.innerText);
		tr.innerHTML = '';
	});
}



filterNameInput.addEventListener('keyup', function() {
	var cookTr = document.querySelectorAll('tr.cookies');
	var cookStr = document.cookie;
	var cookArr = [];
	cookArr = cookStr.split('; ');
	listTable.innerHTML = '';

	for (var i = 0; i < cookArr.length; i++) {
		if (isMatching(cookArr[i], filterNameInput.value)) {
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerText = cookArr[i];

			listTable.appendChild(tr);
			tr.appendChild(td);
		}
	}
});


addButton.addEventListener('click', () => {
	var arrTd = document.querySelectorAll('td');
	for (var i = 0; i < arrTd.length; i++) {
	if (arrTd[i].innerText === addNameInput.value) {
		arrTd[i+1].innerText = addValueInput.value;
		return arrTd;
	}
}
	ccit();
});
