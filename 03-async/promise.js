/**
 * 1. Функция, переданная в конструкцию new Promise, называется исполнитель (executor)
 * 2. Ее аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript
 * 3. Исполнитель должен вызвать что-то одно: resolve или reject
 */

let a = 10;

let promise = new Promise(function (resolve, reject) {
    setTimeout(() => { resolve(20) }, 1000);
});

console.log(a);

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
