function Validation (values) {
    let error = {}

    if(values.user_name === "") {
        error.user_name = "Name should not be empty"
    } else {
        error.user_email = ""
    }

    if(values.user_email === "") {
        error.user_email = "Email should not be empty"
    } else {
        error.user_email = ""
    }

    if(values.user_password === "") {
        error.user_password = "Password should not be empty"
    } else {
        error.user_password = ""
    }
    return error;
}

export default Validation;