var number
var message 

//Function to save the number typed by the player
function sendNumber(){
    number = document.getElementById('guess').value
    message = document.getElementById('message')
    message.textContent = `Chosen number: ${number}`
}

//Function to hide the number after being saved 
function hideNumber(){
    message.textContent = "?"
}