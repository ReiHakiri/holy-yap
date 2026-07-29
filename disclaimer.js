const textBox = document.getElementById("type-disclaimer");
const submitButton = document.getElementById("submit-disclaimer");
const divForLink = document.getElementById("unsafe-link");

const correctText = "I understand the photosensitivity warning";

function addLink () {
    if (textBox.value == correctText) {
        divForLink.innerHTML = '<a href = main.html>Enter the website in unsafe mode</a>';
    } else {
        divForLink.innerHTML = '<p>Incorrect text. Please try again.</p>';
    }
}

submitButton.addEventListener("click", addLink)