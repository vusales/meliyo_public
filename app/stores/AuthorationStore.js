import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';

   

class AuthorationStore  {
    constructor() {
        makeAutoObservable(this);
    }

    login = async (data = {} ) => {
        try {

            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            // check phone is registered or not
            let isphoneRegistered =  await this.isPhoneRegistered(data); 

            if(!isphoneRegistered){
                return {
                    error:  "not_registered" , 
                    success : false , 
                    notRegistered:  true , 
                }; 
            }

            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/account" , 
                                            ).post("/login" , data ) ; 

            console.log("response login" ,  response ) ; 

            if(!response.data.result) {
                return {
                    error:  response.data.error , 
                    success : false , 
                }; 
            }else {

                let customer_id = response.data.user_data.customer_id ;  
                let user_token  =  response.data.token ;
                let user_data = response.data.user_data ;  

                console.log("customer_id"  ,  customer_id ); 
                console.log("user_token"  ,  user_token ); 
                console.log("user_data"  ,  user_data ); 

                await helper.writeAsyncStroga("@user_token" , user_token  );  
                await helper.writeAsyncStroga("@customer_id" , customer_id  );  
                await helper.writeAsyncStroga("@user_data" , user_data  );  
    
                return {
                    error: false , 
                    success : true , 
                };   
            }

        } catch (error) {
            if(error) {
                console.log("login store error"  , {error}); 
            }
            return false ;
        }
    }

    register = async (data = {} ) => {
        try {

            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/account" , 
                                            ).post("/register" , data ) ; 

            console.log("response" ,  response ) ; 

            let register_request_id  = "" ; 

            if(response.data.result) {
                register_request_id = response.data.register_request_id ;  

                return {
                    error: false , 
                    success : true , 
                    register_request_id ,   
                };  
            }else if(response.data.error) {
                return {
                    error: response.data.error , 
                    success : false  ,   
                } ; 
            }
            
        } catch (error) {
            if(error) {
                console.log("register store error"  , {error}); 
            }
            return false ;
        }
    }

    confirmRegister =  async (userInfo={}) => {
        try {
            let device_id =  await helper.getdataFromAsyncStorage("@device_id");  
            let data = {
                "device_id": JSON.parse(device_id),
                "register_request_id": userInfo.register_request_id ,
                "phone": userInfo.phone ,
                "email": userInfo.email ,
                "code":userInfo.code , 
            }
            console.log("body in confreg" ,  data); 
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 
            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/account" , 
                                            ).post("/registerConfirm" , data ) ; 

            console.log("response" ,  response ) ; 

            if(response.data.result) {
                let customer_id = response.data.customer_id ;  
                let user_token  =  response.data.token ;

                console.log("customer_id"  ,  customer_id ); 
                console.log("user_token"  ,  user_token ); 

                await helper.writeAsyncStroga("@user_token" , user_token  );  
                await helper.writeAsyncStroga("@customer_id" , customer_id  );  

            }

            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("confirm register error store"  , {error}); 
            }
            return false ;
        }

    }

    isPhoneRegistered  =  async (userInfo) => {
        try {
            let device_id =  await helper.getdataFromAsyncStorage("@device_id");  
            let data = {
                "phone": userInfo.phone ,
            }
           
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 
            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/account" , 
                                            ).post("/isRegisteredPhone" , data ) ; 

            console.log("isRegisteredPhone response" ,  response ) ; 

            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("isPhoneregistered store error"  , {error}); 
            }
            return false ;
        }

    }

    logout  =  async (data) => {
        try {
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 
            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/account" , 
                                            ).get("/logout"); 

            console.log("logout response" ,  response ) ;   
         
                await helper.removeFromAsyncStorage([
                    "@user_token" , 
                    "@customer_id" , 
                    "@user_data"
                ]);
            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("logout store error"  , {error}); 
            }
            return false ;
        }

    }

    changePassword =  async (password) => {
        try {

            let token = await helper.defineToken(); 
            let lang  =  await helper.defineLang(); 

            let body = {
                "password": password ,
            }

            let response =  await helper.api(token,  {lang} , '/index.php?route=japi/account').post("/changePassword" , body ); 
            console.log("response"  , response ) ; 

            return response.data.result ;  

        } catch (error) {
            if(error) {
                console.log("change password error" , error ) ; 
            }
            
        }
    }

    disableProfile = async () => {
        try {

            let token = await helper.defineToken(); 
            let lang  =  await helper.defineLang(); 

            let response = await helper.api(token,  {lang}, '/index.php?route=japi/account').get("/deleteProfile"); 
            console.log("response in disableProfile"  , response ) ; 

            return response.data.result ;  

        } catch (error) {
            if(error) {
                console.log("disableProfile error" , error ) ; 
            }
            
        }

    }

}


const authorationStore  =  new AuthorationStore() ; 

export default authorationStore ;
