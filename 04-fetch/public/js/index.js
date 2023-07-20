/**
 * fetch() возвращает Promise. Перехват результата запроса производится
 * с помощью then.
 *
 * Обратите внимание, что response.json() также возвращает Promise.
 * Следовательно, итоговый результат достигается повторным вызовом метода then.
 */

/**
 * GET-запрос
 */
fetch('/items')
    .then(
        (response) => {
            return response.json();
        }
    )
    .then(
        (result) => {
            console.log(result);
        }
    ).finally(
        () => {
            console.log('Items loaded.');
        }
    );

/**
 * POST-запрос с передачей параметров
 */
fetch('/target', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        message: 'hello',
    })
});
