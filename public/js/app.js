const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const message01 = document.querySelector('#message-01');
const message02 = document.querySelector('#message-02');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchLocation.value;

    message01.textContent = 'Loading weather information. . .';
    message02.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message01.textContent = data.error;
            } else {
                message01.textContent = data.location;
                message02.textContent = data.forecast;
            }
        });
    });
});