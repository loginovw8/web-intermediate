function init() {
    const btnAdd = document.querySelector('#add');
    btnAdd.addEventListener('click', () => {
        const popup = document.querySelector('.popup');
        popup.classList.toggle('popup--hidden');
    });

    const btnMenu = document.querySelector('#menu');
    btnMenu.addEventListener('click', () => {
        const menu = document.querySelector('.menu');
        menu.classList.remove('hidden');

        const menuClose = document.querySelector('.menu__actions--close');
        menuClose.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

export default { init }
