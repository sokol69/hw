/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArr = [];

    for (var i = 0; i < array.length; i++) {
        newArr[i] = fn(array[i], i, array);
    }

    return newArr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    if (initial === undefined) {
        var res = fn(array[0], array[1], 1, array);
        var i = 2;
    } else {
        res = fn(initial, array[0], 0, array);
        i = 1;
    }

    for (i; i < array.length; i++) {
        res = fn(res, array[i], i, array);
    }

    return res;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходимо удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    for (var p in obj) {
        if (p === prop) {
            delete obj[prop];
        }
    }

    return obj;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    for (var p in obj) {
        if (p === prop) {
            return true;
        } else {
            return false;
        }
    }
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var arr = [];

    for (var p in obj) {
        arr.push(p);
    }

    return arr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var arr = [];

    for (var p in obj) {
        arr.push(p.toLocaleUpperCase());
    }

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    from = from || 0;
    while (from < 0) {
        from = array.length + from;
    }

    to = to || array.length;

    if (to > array.length) {
        to = array.length;
    }

    while (to < 0) {
        to = array.length + to;
    }

    var newArr = [];

    for (var i = from; i < to; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
