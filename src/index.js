/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    var miliseconds = seconds * 1000;
    return new Promise(function(resolve, reject) {
        setTimeout(function() { 
            resolve();
        }, miliseconds);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        req.onload = function() {
            if (this.status == 200) {
                var res = JSON.parse(this.responseText);
                var arr = [];
                for (var i = 0; i < res.length; i++) {
                    arr.push(res[i].name);
                }
                arr = arr.sort();
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    newArr[i] = {name: arr[i]};
                }
                resolve(newArr);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
    }
        req.send(null);
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
