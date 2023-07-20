/**
 * Функция для вычисления факториала числа.
*/
function fact(n) {
    let res = 1;

    for (let i = 1; i <= n; i++) {
        res *= i;
    }

    return res;
}

console.log(fact(4));

/**
 * Функция для вычисления факториала числа.
 * Рекурсивный способ выполнения.
 */
function factRec(n) {
    if (n == 1) {
        return n;
    }

    return n * factRec(n - 1);
}

console.log(factRec(4));
