/**
 * Promise - объект JavaScript, используемый для написания и обработки
 * асинхронного кода.
 *
 * 1. Функция, переданная в конструкцию new Promise, называется
 * исполнитель (executor)
 * 2. Ее аргументы resolve и reject – это колбэки, которые предоставляет
 * сам JavaScript
 * 3. Исполнитель должен вызвать что-то одно: resolve или reject
 */

let a = 10;

/**
 * Ждем 1 секунду и вызываем resolve с результатом 20
 */
let promise = new Promise(function (resolve, reject) {
    setTimeout(() => { resolve(20) }, 1000);
});

/**
 * Данный console.log() демонстрирует, что код выполняется асинхронно
 * (не дожидаясь получения результата из promise).
 */
console.log(a);

/**
 * then отрабатывает в случае вызова resolve. catch отрабатывает в случае
 * вызова reject. finally отрабатывает в любом случае.
 */
promise.then(
    (result) => {
        console.log(`result is ${a + result}`);
    }
).catch(
    (err) => {
        console.log(`error message: ${err}`);
    }
).finally(
    () => {
        console.log('process completed');
    }
);
