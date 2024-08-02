import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';

class PhonePrefixesStore  {

    constructor() {
        makeAutoObservable(this);
    }


    getPhonePrefixes = async (data = {} ) => {
        try {
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 

            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi" , 
                                            ).post("/country" , data ) ; 
            console.log("response in getPhonePrefxes" ,  response ) ;  
        } catch (error) {
            if(error) {
                console.log("phonePrefixes store error"  , {error}); 
            }
            return false ;
        }
    }

   

}


const phonePrefixesStore  =  new PhonePrefixesStore() ; 

export default phonePrefixesStore ;