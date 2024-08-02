import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import azerbaijani from "./langs/azerbaijani.json";
import english from "./langs/english.json";
import russian from "./langs/russian.json";

i18next.use(initReactI18next).init({
    "compatibilityJSON": 'v3',
    "lng":"az",
    "resources": {
        en: english,
        ru: russian ,
        az: azerbaijani,
    },
    "react" : {
        useSuspense: false , 
    }
}); 


export default i18next ; 

