
export const validate = (email,password , name = null) => {
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isPasswordValid = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    const isNameValid = name ? /^[a-zA-Z ]{3,50}$/.test(name) : true;
  
    
    if(!isEmailValid) return "Please Enter Valid Email";
    if(!isPasswordValid) return "Please Enter Valid Password";
    if (!isNameValid) return "Name should contain only letters and be at least 3 characters long";
    return null;

}
