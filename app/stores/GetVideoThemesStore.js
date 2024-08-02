import { runInAction , makeAutoObservable  } from "mobx";
import helper from '../helpers/helper';


class GetVideoThemesStore {

    videoThemes =  [] ;  


    constructor(){
        makeAutoObservable(this); 
    }

    getVideoThemes = async () => {
        try {
            let token  =  await helper.defineToken() ; 
            let lang  = await helper.defineLang(); 
            let response =  await helper.api(token,  {lang} ,  "/index.php?route=japi/order").get('/getThemes'); 
            console.log("respojse in themes " , response.data.result , response.data.themes); 

            if(response.data.result) {
                runInAction(()=>{
                    this.videoThemes =  response.data.themes ; 
                })
            }
        } catch (error) {
            
        }
    }




}


const getVideoThemesStore =  new GetVideoThemesStore() ; 
export default getVideoThemesStore;
