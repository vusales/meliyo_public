import React , {
    useState , 
    useRef ,
    useEffect , 
    useMemo , 
} from "react" ; 
import {
    View ,  
    Text , 
    TextInput , 
    StyleSheet, 
    TouchableOpacity,
} from "react-native" ; 
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import helper from "../helpers/helper";
import colors from "../values/colors";
import { useNavigation } from "@react-navigation/native";
import CommonLayout from "../layouts/CommonLayout";
import { CHANGEPASSWORD } from "../values/screenNameLists";

const CELL_COUNT = 4;

const CodeConfirmation = ({
    route , 
    stores  ,
}) => {
    const navigation  =  useNavigation(); 
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [dataFromRouter , setDataFromRouter ] =  useState({}); 
    
    useEffect(()=>{
        setDataFromRouter(route.params);  
    }, []); 
 

    // const isuserRegistered =  useMemo(
    //     ()=>stores.LoginRegisterDeviceAndUser.isUserRegistered , 
    //     [stores.LoginRegisterDeviceAndUser.isUserRegistered] 
    // ); 

    const verifyCode = async () => {
        try {
            
            if(value.length !== CELL_COUNT){
                return; 
            }

            let body  =  {
                ...dataFromRouter ,  
                code: value , 
                "register_request_id" : dataFromRouter.register_request_id , 
            }


            if(dataFromRouter.from  === "register") {
                await stores.authorationStore.confirmRegister(body).then((result )=>{
                    console.log("result"  , result ); 
                }); 

                // await stores.LoginRegisterDeviceAndUser.checkUserRegistered();
            
                // console.log("isUserRegistered in Verify code page" ,  isuserRegistered ) ; 

                // if(isuserRegistered) {
                //     await stores.LoginRegisterDeviceAndUser.verifyCode(body); 
                //     navigation.navigate(MAIN); 
                // }else {
                    // navigation.navigate( 
                    //     MAIN , 
                    //     { 
                    //         screen: ACCOUNT + "stack"  , 
                    //         params : {
                    //         screen: PROFIL , 
                    //         params: body , 
                    //         }
                    //     }
                    // ); 
                //     navigation.navigate( PROFILDETAILS , body );
                // }




            }else {
                navigation.navigate( "stack" , {
                    screen: CHANGEPASSWORD , 
                    params: {}
                });
    
                setTimeout(() => {
                    setValue(""); 
                }, 1000);

            }
                    
        } catch (error) {
            console.log("error" ,  error) ;  
        }
    }

    const sendAgain = async () => {
        try {
            // let body ={
            //     phone : route?.params?.phone , 
            // }
            // await stores.LoginRegisterDeviceAndUser.authPhone(body); 

        } catch (error) {
            console.log("error" ,  error );
        }
    }


    return(
       <CommonLayout
       pageName="Code verification"
       >
        <View style={styles.layout}>
            <Text style={styles.infoText}>Enter the 4-digit code sent to your number via SMS</Text>
            <View style={styles.verificationContainer} >
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    // caretHidden={false}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) =>{
                        return (
                            <View 
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            // onLayout={getCellOnLayoutHandler(index)}
                            >
                                <Text
                                style={styles.text}
                                >
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>
            <TouchableOpacity
            style={styles.sendButton}
            onPress={()=>verifyCode()}
            >
                <Text style={styles.confirmText} >Confirm</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
            onPress={sendAgain}
            style={styles.sendAgain}
            >
                <Text style={styles.sendAgainText} >Send again</Text>
            </TouchableOpacity> */}
        </View>  
       </CommonLayout>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex:1 ,
        paddingHorizontal: helper.px(16) , 
        paddingVertical: helper.px(32) , 
        paddingTop:helper.px(60), 
        // justifyContent:"center",
        // backgroundColor:colors.main,
        height: helper.screenHeight -  helper.px(100),
    },
    verificationContainer: {
        padding:helper.px(16) , 
        borderWidth: helper.px(1) , 
        borderColor: colors.blanko , 
        borderRadius: helper.px(23),
    }, 
    infoText: {
        fontFamily: helper.fontFamily("") , 
        fontSize: helper.px(16),
        fontWeight: "400" , 
        letterSpacing: -0.32 , 
        color: colors.blanko , 
        lineHeight: helper.px(21), 
        width:"70%",
        marginBottom: helper.px(16),
    }, 
    sendButton: {
        width: "100%" , 
        backgroundColor:colors.turkuaz ,
        justifyContent:"center" , 
        alignItems:"center", 
        borderRadius: helper.px(18) , 
        height:helper.px(57),
        marginTop: helper.px(16) , 
    }, 
    confirmText: {
        fontFamily: helper.fontFamily("Bold") , 
        fontSize: helper.px(20),
        fontWeight: "700" , 
        letterSpacing: 0.38 , 
        color: colors.blanko , 
        lineHeight: helper.px(25), 
    }, 
    sendAgainText: {
        fontFamily: helper.fontFamily("Bold") , 
        fontSize: helper.px(16),
        fontWeight: "500" , 
        letterSpacing: -0.32 , 
        color: colors.blanko , 
        lineHeight: helper.px(21), 
    }, 
    sendAgain: {
        width:"100%" , 
        padding:helper.px(16) , 
        justifyContent:"center",
        alignItems: "center" , 
        marginTop:helper.px(10),
    },

    // for code varifation input design 
    root: {
        flex: 1,      
    },
    codeFieldRoot: {
        // backgroundColor: "yellow",
    },
    cell: {
      width: helper.px(64),
      height: helper.px(85),
      borderBottomWidth: 4,
      borderBottomColor: colors.gray ,
      justifyContent:"center" , 
      alignItems:"center",
    //   backgroundColor:"red",
    },
    focusCell: {
        borderBottomColor: colors.turkuaz ,
    },
    text: {
        fontFamily: helper.fontFamily("Bold") , 
        fontSize:helper.px(64),
        fontWeight:"700" , 
        letterSpacing:0.374 , 
        color:colors.turkuaz , 
    }, 
    // ********************************
  });


export default  helper.mobx(CodeConfirmation) ; 
