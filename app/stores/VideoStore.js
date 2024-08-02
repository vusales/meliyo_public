import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';
   
class VideoStore  {

    videoDetails = {} ; 

    constructor() {
        makeAutoObservable(this);
    }

    getVideo =  async (body) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ;  

            if( Object.keys(body).length <= 0 ) return ;  
          
            let response =  await helper.api(token,{lang},"/index.php?route=japi/video").post( "/getVideo",  body ) ;  
            console.log("response in getVideo" , response) ; 

            if(response.data.result) {
                runInAction(()=>{
                    this.videoDetails =  response.data.data ; 
                })
            }
            
        } catch (error) {
            if(error) {
                console.log("getVideo store error"  , error  ) ; 
            } 
        }
    }

    uploadVideo = async (body , order_id) => {
        try {
            let token = await helper.defineToken() ; 
            let lang =  await helper.defineLang() ;  
            let response =  await helper.api(token,{
                lang,
                'Content-Type': 'multipart/form-data',
            },"/index.php?route=japi/account").post( `/uploadVideo&video_order_id=${order_id}`,  body ) ; 
            console.log("response"  , response );  

            return response.data.result ; 
            
        } catch (error) {
            if(error) {
                console.log("uploadVideo store error"  , error  ) ;
                return false ;  
            } 
            
        }
    }



}

const videoStore  =  new VideoStore() ; 

export default videoStore ;
