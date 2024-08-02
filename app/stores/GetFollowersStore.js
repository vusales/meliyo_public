import {  makeAutoObservable, runInAction , autorun } from 'mobx';
import helper from '../helpers/helper';
   
class GetFollowersStore {
    followings=[] ; 
    subscribers = []; 
   
    constructor() {
        makeAutoObservable(this);
    }

    getSubscribers =  async (body = {}) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ;  
            let sendedBody =  {
                "star_id" : body.starId , 
            }
            let response =  await helper.api(token,{lang},"/index.php?route=japi/profile").post("/showProfileSubscribers" , sendedBody ) ;  
            console.log("response in getSubscribers" , response) ; 
            if (response.data.result) {
                let subscribers =  response.data.subscribers ; 
                runInAction(()=>{
                    this.subscribers = subscribers ; 
                }); 
            } 
        } catch (error) {
            if(error) {
                console.log("getSubscribers error"  , error  ) ; 
            } 
        }
    }

    getFollowers = async (body ) => {
        try {
            let token = await helper.defineToken() ;  
            let lang =  await helper.defineLang() ; 
            let sendedBody =  {
                start : body?.start ?? 1 , 
                limit:  body?.limit  ?? 20 , 
            }
            let response =  await helper.api(token,{lang},"/index.php?route=japi/account").post("/followings" , sendedBody ) ;  
            if (response.data.result) {
                runInAction(()=>{
                    this.followings = 
                    // this.followings.length > 0 ?  [
                    //     ...this.followings ,
                    //     response.data.stars , 
                    // ]:
                     response.data.stars ; 
                }); 
            } 
        } catch (error) {
            if(error) {
                console.log("getFollowers error"  , error  ) ; 
            } 
        }
    }

    follow = async (body={}) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ; 
            if(!body.star_id) return ; 
            let response =  await helper.api(token,{lang},"/index.php?route=japi/account").post("/follow" ,  body ) ;  
            this.getFollowers({starId: body.star_id });
            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("follow error"  , error  ) ; 
            } 
        }
    }

    unfollow =  async (body={}) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ; 
            if(!body.star_id) return ; 
            let response =  await helper.api(token,{lang},"/index.php?route=japi/account").post("/unfollow" ,  body ) ;  
            this.getFollowers({starId: body.star_id });
            return response.data.result ; 
        } catch (error) {
            if(error) {
                console.log("unfollow error"  , error  ) ; 
            } 
        }
    }
}

const getFollowersStore  =  new GetFollowersStore() ; 

export default getFollowersStore ;
