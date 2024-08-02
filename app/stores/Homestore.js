import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';
   
class Homestore  {

    homepageBasecategories = [] ;  
    searchResult = [] ; 

    constructor() {
        makeAutoObservable(this);
    }

    getHomePageData = async () => {
        try {
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            let response = await helper.api(  token ,  {lang} , "/index.php?route=japi").get("/homepage") ;  
            

            if(response.data.result) {

                runInAction(()=> {
                    this.homepageBasecategories = response.data.homepage.categories;
                });  
            }
 
        } catch (error) {
            if(error) {
                console.log("getHomePageData store error"  , {error}); 
            }
            return false ;
            
        }
    }

    searchProducts = async (data) => {
        try {

            let sendeddata = {
                "search": data.searchText ?? ""  , 
                "filter_category_id" :  data.category_id ?? "" , 
                "sort": data.sort ?? ""  , 
                "order": data.order ?? "" ,
                "limit": data.limit ?? 0 , 
                "start": data.start ?? 0 , 
            }

            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            let response = await helper.api(  
                                            token ,  
                                            {lang} , 
                                            "/index.php?route=japi/profile"
                                        ).post("/search" ,  sendeddata ) ;  



            if(response.data.result) {
                runInAction(()=>{
                    this.searchResult = response.data.profiles; 
                });
            }

        
        } catch (error) {
            if(error) {
                console.log("searchProducts store error"  , {error});
            }
        }
    }


}

const homestore  =  new Homestore() ; 

export default homestore ;
