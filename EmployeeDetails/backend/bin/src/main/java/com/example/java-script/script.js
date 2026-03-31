
function wishMessage(){
    return "Welcome to Java Script.."
}

const submitButton = document.getElementById("subscribe");

submitButton.addEventListener("click", function(){
    document.querySelector(".message").textContent = "Subscribed Successfully!";
    submitButton.classList.add("disable");
});
