import React ,  {
    useState , 
    useEffect , 
}from 'react';
import { 
    Text, 
    View , 
    StyleSheet ,
    TouchableOpacity ,  
} from 'react-native';
import CommonLayout from '../layouts/CommonLayout';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import { useTranslation } from 'react-i18next';


const ChangeLanguagePage = ({
    params,
}) => {

    const {t , i18n} =useTranslation();
    const[ lang , changeLang ] = useState("az");

    useEffect(()=> {
        cahngeLanguage() ; 
    } , []) ; 


    // when there is choosen lang in asyncstorage
    const cahngeLanguage = async () => {
        let choosenLang =  await helper.getdataFromAsyncStorage("@lang_code");
        if(choosenLang){
            i18n.changeLanguage(choosenLang);
            changeLang(choosenLang);
        }else {
            return ;
        }
    }

    // when userchanges language 
    const changeLangItem  = async (value) => {
        changeLang(value); 
        // write choosen language to asyncStore
        await helper.writeAsyncStroga( "@lang_code" ,  value );  
        i18n.changeLanguage(value);
    }
    
    return (
        <CommonLayout
        pageName={helper.translate("languagePageTitle")}
        >
            <TouchableOpacity
            style={ 
                lang === "az" ? 
                {...styles.button , borderBottomColor: colors.turkuaz } 
                :styles.button
            }
            onPress={()=>changeLangItem("az")}
            >
                <Text  
                style={ 
                    lang === "az" ? 
                    {...styles.justText , color: colors.turkuaz } 
                    :styles.justText
                }
                >Az</Text>
                {
                    lang === "az" ? 
                    icons.check(colors.turkuaz)
                    :null
                }
            </TouchableOpacity>

            <TouchableOpacity
            style={ 
                lang === "ru" ? 
                {...styles.button , borderBottomColor: colors.turkuaz } 
                :styles.button
            }
            onPress={()=>changeLangItem("ru")}
            >
                <Text style={ 
                    lang === "ru" ? 
                    {...styles.justText , color: colors.turkuaz } 
                    :styles.justText
                }
                >Ru</Text>
                {
                    lang === "ru" ? 
                    icons.check(colors.turkuaz)
                    :null
                }
            </TouchableOpacity>

            <TouchableOpacity
            style={ 
                lang === "en" ? 
                {...styles.button , borderBottomColor: colors.turkuaz } 
                :styles.button
            }
            onPress={()=>changeLangItem("en")}
            >
                <Text style={ 
                    lang === "en" ? 
                    {...styles.justText , color: colors.turkuaz } 
                    :styles.justText
                }
                >En</Text>
                {
                    lang === "en" ? 
                    icons.check(colors.turkuaz)
                    :null
                }
            </TouchableOpacity>    
        </CommonLayout>
    )
};


const styles = StyleSheet.create({
    justText : {
        fontFamily: helper.fontFamily('Black') ,
        fontWeight: "700" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(16) , 
        color: colors.blanko ,
    }, 
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .6 , 
        borderBottomColor: colors.placeholderText , 
        flexDirection:"row" , 
        alignItems:"center" , 
        justifyContent:"space-between" , 
        paddingHorizontal: helper.px(10),
    } ,
});

export default ChangeLanguagePage;
