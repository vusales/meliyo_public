import * as yup from "yup" ; 

let passwordregex  =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ; 
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ ;

let editProfileValidationSchema  =  yup.object().shape({
    email: yup
            .string()
            .email("E-poçt düzgün daxil edilməyib !")
           ,  

    password: yup.
            string()
            .matches(passwordregex , "Şifrə biri böyük hərf olmaqla , minimum 8 hərf və rəqəmdən ibarət olmalıdır !")
             ,
    
    phone: yup
            .string()
            .matches( phoneRegExp , "Əlaqə nömrəsi düzgün daxil edilməyib!")
            ,

    name : yup.string().required() , 
    surname :  yup.string().required() ,
    instagram :  yup.string() ,
    tiktok:  yup.string() ,
    youtube:  yup.string() ,
    facebook :  yup.string() ,
    description :  yup.string() ,
});

export default   editProfileValidationSchema ;  