/**
 * fetch() возвращает Promise. Перехват результата запроса производится
 * с помощью then.
 *
 * Обратите внимание, что response.json() также возвращает Promise.
 * Следовательно, итоговый результат достигается повторным вызовом метода then.
 */

const select = document.querySelector('select');

select.addEventListener('change', (e) => {
    console.log(e.target.value);
});

/**
 * GET-запрос
 */
fetch('/api/items')
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
fetch('/api/target', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        message: 'hello',
    })
});
