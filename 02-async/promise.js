/**
 * 1. Функция, переданная в конструкцию new Promise, называется исполнитель (executor)
 * 2. Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript
 * 3. Исполнитель должен вызвать что-то одно: resolve или reject
 */

let promise = new Promise(function(resolve, reject) {
    setTimeout(() => { console.log('done'); resolve("done") }, 1000);
});

// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error('error')), 1000);
// });

// Функция-потребитель
new Promise(function(resolve, reject) {
    setTimeout(() => resolve('inter'), 1000);
}).then(function(result) {console.log('then ' + result)}, function(error) {});

// Отслеживаем только ошибку
new Promise(function(resolve, reject) {
    setTimeout(() => reject('error'), 1000);
}).catch((err) => console.log(err))

// finally - обработчик для выполнения очистки/доведения после завершения предыдущих операций
new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 1000); 
}).finally(() => console.log('disable preloader'));
