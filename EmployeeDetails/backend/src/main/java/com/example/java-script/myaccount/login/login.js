function validateForm() {
    const form = document.getElementById("loginForm");
    const inputs = form.querySelectorAll("input");
    const errorDivs = document.querySelectorAll(".error");

    errorDivs.forEach(div=>{
        div.textContent = "";
    })
    let validate = true;
    inputs.forEach(input =>{
        if (!input.value.trim()) {
            //const errorDiv = document.querySelector(`#${input.name}Error`);
            const errorDiv = document.getElementById(input.name+"Error");
            errorDiv.textContent = `Please Enter ${input.name}`;
            validate = false;
        }else{
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
             if(input.name=="email"){
                if(input.value.length < 2){
                const errorDiv = document.getElementById("emailError");
                errorDiv.textContent = `Email must be at least 2 characters long`;
                validate = false;
                }else if(!emailPattern.test(input.value)){
                 const errorDiv = document.getElementById("emailError");
                errorDiv.textContent = `Please Enter Valid ${input.name}`;
                validate = false;
                }    
            }else if(input.name === "password" && input.value.length < 6){
                const errorDiv = document.getElementById("passwordError");
                errorDiv.textContent = `Password must be at least 6 characters long`;
                validate = false;
            }else if(input.name === "password" && !passwordPattern.test(input.value)){
                const errorDiv = document.getElementById("passwordError");
                errorDiv.textContent = `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character`;
                validate = false;
            }
        }
    })
    return validate;
}