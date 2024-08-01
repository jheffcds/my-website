function toggleMenu() {
    const menu = document.getElementById('menu');
    const toggleButton = document.getElementById('toggle-button');

    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        toggleButton.innerHTML = '&#9776;'; // 3 horizontal lines
    } else {
        menu.style.display = 'flex';
        toggleButton.innerHTML = '&times;'; // X symbol
    }
}