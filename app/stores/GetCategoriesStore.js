import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';
   

class GetcategoriesStore  {
    shortCategories = [] ;  
    categories = [] ; 

    constructor() {
        makeAutoObservable(this);
    }

    getCategoriesShort = async () => {
        try {
            let token  =  await helper.defineToken(); 
            let lang =  await helper.defineLang() ; 
            let response  =  await helper.api(
                                                token ,  
                                                {lang} , 
                                                "/index.php?route=japi/category" , 
                                            ).get("/getShortAll"); 

            let dropdownCategory  = [] ; 
            if(response.data.categories && response.data.categories.length > 0 ) {
                let categories =  response.data.categories ;
                let colorsArray  = ['#47AE99' , '#F3CD46' , "#F77A3C" , "#CC75C6" , '#5690D6' ,   ] ;   
                 
                categories.map((item)=>{
                    let newItem = {
                        label: item.name ,
                        value: item.category_id , 
                    }
                    dropdownCategory.push(newItem) ;  
                    let random = Math.floor(Math.random() * colorsArray.length) + 1 ; 
                    item.color =  colorsArray[random]; 
                }); 

                runInAction(()=>{
                    this.shortCategories = dropdownCategory ;
                    this.categories = categories ; 
                }); 
            }

        } catch (error) {
            if(error) {
                console.log("getCategoriesShort error"  , {error}); 
            }
            return false ;
        }
    }
}

const getCategoriesStore  =  new GetcategoriesStore() ; 

export default getCategoriesStore ;
