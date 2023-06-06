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
