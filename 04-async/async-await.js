// У слова async один простой смысл: эта функция всегда возвращает промис.

async function calculation(a) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => { resolve(a + 20) }, 1000);
    });
}

calculation(5).then(
    (result) => {
        console.log(`result is ${result}`);
    }
);

/**
 * Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор,
 * пока промис справа от await не выполнится.
 *
 * Раскомментируйте и выполните код, представленный ниже для иллюстрации
 * работы async/await.
 */

// async function calculation() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve(20), 1000);
//     });

//     let result = await promise;

//     console.log(10 + result);
// }

// calculation();
