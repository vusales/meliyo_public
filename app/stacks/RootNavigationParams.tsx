import {
    VIEWALL,
    STORE,
    PROFILE,
    CATEGORIES,
    SEARCHOME,
    FOLLOWS , 
} from "../values/screenNameLists" ; 


type ScreenNames = 
 typeof SEARCHOME | 
 typeof FOLLOWS | 
 typeof CATEGORIES | 
 typeof PROFILE | 
 typeof STORE | 
 typeof VIEWALL ;

export type RootNavigationParams = {
  [Key in ScreenNames]: {
    id?: string , 
    screenName?: string , 
  }
};
