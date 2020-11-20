class Validators {
    static required(fieldName,value) {
        return value && value.toString().length == 0 ? {name:fieldName, required:true,message:fieldName +' is required'} :null;
    }
    static minLength(fieldName,value, limit) {
        return  value && value.toString().length < parseInt(limit) ? {
            minLength: true,
            name:fieldName,
            message:fieldName+' should be more than '+limit+' symbols'
        } : null
    }
    static email(fieldName,email){
        const  emailRegex=/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let hasError = !emailRegex.test(email);
        return  hasError? {name:fieldName, email:true, message:'Email is invalid'}:null;
    }
}

export default Validators