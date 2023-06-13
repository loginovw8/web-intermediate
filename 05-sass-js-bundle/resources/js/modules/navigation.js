function init() {

    const menuToggle = document.querySelector('.navigation__toggle');
    const menuItems = document.querySelector('.navigation__items');

    menuToggle.addEventListener('click', () => {
        menuItems.classList.toggle('hidden')
    });
}

export default { init }
