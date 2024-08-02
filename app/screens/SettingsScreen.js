import React,  {
    useRef , 
    useState ,  
    useEffect , 
    useCallback , 
} from 'react';
import { 
    Text, 
    View, 
    StyleSheet , 
    StatusBar ,  
    SafeAreaView , 
    FlatList ,
} from 'react-native';
import colors from '../values/colors';
import icons from '../values/icons';
import helper from '../helpers/helper';
import { useNavigation } from '@react-navigation/native';
import CommonLayout from '../layouts/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { 
    CHANGEEMAIL ,  
    CHANGEPASSWORD ,  
    FAQ , 
    SECURITY , 
    TERMS ,
    CODECONFIRM , 
    CHANGELANG , 
    SEARCHOME , 
} from '../values/screenNameLists';
import Alert from '../components/General/Alert';
import { useFocusEffect } from '@react-navigation/native';



const SettingsScreen = ({
    stores , 
}) =>{ 
    const navigation =  useNavigation(); 
    const alertRef =  useRef(); 


    // translations 
    const logoutText  =  helper.translate("logoutPagetitle") ;
    const langsText  = helper.translate("languagePageTitle");
    const faqstext  = helper.translate("faqsPageTitle") ;
    const termstext = helper.translate("termsPageTitle") ;
    const securtext = helper.translate("securityPrivacyPageTitle");
    const changepass = helper.translate("changePasswordPageTitle") ;
    const changeemail = helper.translate("changeEmailPageTitle");
    const [logedIn , setLogedIn ]=useState(false);  

    const settingsbuttons = [
        // {
        //     buttonName: changeemail , 
        //     icon: icons.envelop(colors.blanko , 15) , 
        //     screenName: CHANGEEMAIL , 
        // }, 
        {
            buttonName: changepass , 
            icon: icons.lock(colors.blanko , 15) , 
            screenName: CHANGEPASSWORD , 
            hide : logedIn? false : true , 
        }, 
        {
            buttonName: securtext , 
            icon: icons.security(colors.blanko , 15) , 
            screenName: SECURITY , 
            hide : logedIn? false : true , 
        }, 
        {
            buttonName: termstext , 
            icon: icons.file(colors.blanko , 15) , 
            screenName: TERMS , 
        }, 
        {
            buttonName: faqstext, 
            icon: icons.help(colors.blanko , 15) , 
            screenName: FAQ , 
        }, 
        {
            buttonName: langsText , 
            icon: icons.lang(colors.blanko , 15), 
            screenName: CHANGELANG , 
        }, 
        {
            buttonName: logoutText , 
            icon: icons.logout(colors.blanko , 15) , 
            screenName: "" , 
            hide : logedIn? false : true , 
        }, 
        // {
        //     buttonName: "confirm test" , 
        //     icon: icons.logout(colors.blanko , 15) , 
        //     screenName: CODECONFIRM , 
        // }, 
    ]; 


    useFocusEffect(useCallback(()=>{
        const checAuth  =  async () => {
            try {
                let isLogedIn  =  await helper.isUserLogedIn() ;
                if(isLogedIn){
                    setLogedIn(true);  
                }
            } catch (error) {
                if(error){
                    console.log("error" , error ); 
                }
            }
        }
        checAuth(); 
    },[]));

   
    const logout = async () => {
        try {
            let user_token  =  await helper.getdataFromAsyncStorage('@user_token');  

            if(!user_token || user_token === null ) {
                alertRef.current.alert(true , "error" , "Hesabınıza giriş etməmisiniz!" );
                return ;      
            }

            let logoutResult = await stores.authorationStore.logout(); 

            if(logoutResult){
                alertRef.current.alert(true , "success" , "Hesabınızdan uğurla çıxış etdiniz!"); 
                setTimeout(() => {
                    navigation.navigate("stack" , {
                        screen : "tab" ,
                        params: {
                            screen: SEARCHOME + "stack" , 
                        }
                    }); 
                }, 2000 );
            }else {
                alertRef.current.alert(true , "error" , "Hesabınızdan çıxış edilə bilmədi!"); 
            }
             
        } catch (error) {
            console.log("error" , error); 
        }
    }


    return(
        <>
            <Alert
            ref={alertRef}
            />
            <CommonLayout
                showDrawerButton={false}
                pageName={helper.translate("settingPagetitle")}
                showSearchComponent={false}
            >
                {
                    settingsbuttons.map((item  , index )=>{
                        if(item.hide) {
                            return null; 
                        }
                        return(
                            <TouchableOpacity 
                            key={index}
                            onPress={()=> {
                                if(item.screenName) {
                                    navigation.navigate("stack" , {
                                        screen: item.screenName ,  
                                    });
                                }else {
                                    logout(); 
                                }
                            }}
                            style={styles.button}
                            > 
                                {item.icon}
                                <Text style={styles.buttonText}>{item.buttonName}</Text>
                            </TouchableOpacity>
                        ) 
                    })
                }
            </CommonLayout>
        </>
    ); 
};

const styles=  StyleSheet.create({
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .6 , 
        borderBottomColor: colors.placeholderText , 
        flexDirection:"row" , 
        alignItems:"center" , 
    } , 
    buttonText: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko ,  
        marginLeft: helper.px(10) ,
    } ,
}); 

export default helper.mobx(SettingsScreen);
