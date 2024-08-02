import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';
   
class ProfileStore  {

    profileInfo = {} ; 
 
    constructor() {
        makeAutoObservable(this);
    }

    getCustomer =  async () => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ;  
          
            let response =  await helper.api(token,{lang},"/index.php?route=japi/account").get("/getCustomer" ) ;  
            console.log("response in getCustomer" , response) ; 
            if (response.data.result) {
                let userData  =  await helper.getdataFromAsyncStorage("@user_data");  
                userData = JSON.parse(userData); 

                userData = {
                    ...userData , 
                    ...response.data.customer , 
                }
                await helper.writeAsyncStroga("@user_data" , userData ) ;  

                runInAction(()=>{
                    this.profileInfo =  userData ; 
                }); 
            } 
        } catch (error) {
            if(error) {
                console.log("get customer error"  , error  ) ; 
            } 
        }
    }

    editProfile =  async (body) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ;  
          
            let response =  await helper.api(token,{lang},"/index.php?route=japi/account").post("/updateCustomerInfo", body ) ;  
            console.log("response in editProfile" , response) ; 
          
            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("editProfile error"  , error  ) ; 
                return false ; 
            } 
        }
    }

    changeProfileImage =  async (body) => {
        try {

            let token = await helper.defineToken(); 
            let lang =  await helper.defineLang();

            let response =  await helper.api(token , {
                lang,
                'Content-Type': 'multipart/form-data',
            } , "/index.php?route=japi/account" ).post("/updateProfilePicture" , body ); 

            console.log("response in chnage profile image" , response ); 

            
        } catch (error) {
            if(error) return console.log("error in change profile photo" , error );    
        }
    }
}

const profileStore  =  new ProfileStore() ; 

export default profileStore ;
