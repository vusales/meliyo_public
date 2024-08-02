import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';



// !!!!!!!!!!!!!!! this store gets stars info by id 
   
class UserDetailsStore  {

    homepageBasecategories = [] ;  
    searchResult = [] ; 
    userInfo = {} ; 
    reviews = [] ;  
    videos =[] ; 
    mainProduct = {} ; 
    shareLink = "" ; 

    constructor() {
        makeAutoObservable(this);
    }

    getUserdetails = async(body) => {
        try {

            let token =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            let sendedData  =  { 
                "star_id" :  body.id , 
            }

            const response =  await helper.api(token,{lang},"/index.php?route=japi/profile").post("/show" , sendedData); 
            if(response.data.result) {

                let data  =  response.data.profile ; 
                let userInfo  = {
                    description : data.customer_description , 
                    addedtime: data.date_added , 
                    firstname:  data.firstname ,  
                    lastname:data.lastname , 
                    mainProductId: data.main_product_id ,
                    rating:  data.rating , 
                    reviewCount: data.review_count ,  
                    star_id: data.star_id ,  
                    subscriptionCount: data.subscription_count , 
                    viewed :data.viewed , 
                    image : data.image , 
                    categories: data.categories ?? [] , 
                } ; 

                let reviews  = data.reviews ; 
                let mainProduct  = {
                    ...data.main_product , 
                    main_pr_id : data.main_product_id , 
                } ; 
                let videos =  data.videos ; 
                let share = data.profile_link 

                runInAction(()=>{
                    this.userInfo = userInfo ; 
                    this.reviews = reviews ; 
                    this.mainProduct = mainProduct ; 
                    this.videos = videos ; 
                    this.shareLink = share ; 
                });
            }

        } catch (error) {
            if(error){
                console.log("error" , error );  
            }
        }
    }

    reportUser = async (id) => {
        try {

            let token  =  await helper.getdataFromAsyncStorage("@user_token") ; 
            let lang =  await helper.defineLang() ; 
            if(!token) return ; 

            let body = {
                "star_id": id ,
                "complain_text": "reported user!" ,
            }

            let result =  await helper.api(token,{lang},"/index.php?route=japi/profile").post('/complain', body ); 
           return result.data.result ; 
        } catch (error) {
            if(error) {
                console.log("error in reportUser store " , error); 
            }
            return false ; 
        }
    }


}

const userDetailsStore  =  new UserDetailsStore() ; 

export default userDetailsStore ;
