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

// рекурсия!

// fetch('/items', {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         message: 'hello'
//     })
// })
