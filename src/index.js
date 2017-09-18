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

export {
    delayPromise,
    loadAndSortTowns
};
