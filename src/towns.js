/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        req.onload = function() {
            if (this.status == 200) {
                var res = JSON.parse(this.responseText);
                res.sort(function(a,b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                resolve(res);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
    }
        req.send(null);
    });
}

var towns = [];

loadTowns().then(function(response) {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
    towns = response;

    function isMatching(full, chunk) {
        full = full.toLowerCase();
        chunk = chunk.toLowerCase();
        if (~full.indexOf(chunk)) {
            return true;
        } else {
            return false;
        }
    }
    divTowns = [];
    for (var i = 0; i < towns.length; i++) {
      divTowns[i] = '<div class="city">' + towns[i].name + '</div>';
    }

    for (var k = 0; k < divTowns.length; k++) {
      filterResult.innerHTML += divTowns[k];
    }

    var cityes = document.querySelectorAll('.city');


    filterInput.addEventListener('keyup', function() {
      for (var j = 0; j < cityes.length; j++) {
        if (!isMatching(cityes[j].innerText, filterInput.value)) {
            cityes[j].style.display = 'none';
        } else {
          cityes[j].style.display = 'block';
        }
      }
    });
});

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;


export {
    loadTowns,
    isMatching
};
