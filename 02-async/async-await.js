async function someAction() {
    return 'done';
}

// У слова async один простой смысл: эта функция всегда возвращает промис

someAction().then((res) => console.log(res));

// Альтернатива

async function someActionAlternate() {
    return Promise.resolve('done alternate');
}

someActionAlternate().then((res) => console.log(res));

// Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится

async function someActionAwait() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve(20), 1000);
	});

	let result = await promise;

	console.log(10 + result);

	return 10 + result;
}

//(async () => {
	//let promise = new Promise((resolve, reject) => {
		//setTimeout(() => resolve(20), 1000);
	//});

	//let result = await promise;

	//console.log(10 + result);
//})();
