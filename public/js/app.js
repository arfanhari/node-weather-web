console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event) => {
    // preventDefault is going to prevent that default behavior which is to refresh the browser allowing the server to render a new page
    // instread it's going to do nothing, it's just going to allow us to do whatever we want by letting the function run.
    event.preventDefault()

    const location = search.value;

    
    messageOne.textContent = 'Loading... please wait for a moment';

    //console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            } 
        })
    })
})