import React, {
    useReducer ,  
    useState , 
    useRef , 
    useCallback ,  
    useEffect , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,  
    TextInput, 
    TouchableOpacity, 
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import AuthLayout from '../layouts/AuthLayout';
import { 
    SIGNIN ,  
    CHANGEPASSWORD, 
    SEARCHOME , 
    CODECONFIRM 
} from '../values/screenNameLists';
import { useNavigation } from '@react-navigation/native';
import EnterEmailModal from '../modals/LoginModals/EnterEmailModal';
import loginValidationschema from '../validations/LoginValidation';
import Alert from '../components/General/Alert';
import { MaskedTextInput } from "react-native-mask-text";
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { phonePrefixes } from '../values/constants';

const initials  =   { 
    email : "" , 
    password: "" , 
    phone: "" , 
}

const reducer =( state  , action ) => {
    return {...state , ...action }
}

const Login = ({
    stores ,
}) =>{
    const navigation =  useNavigation(); 
    const enterEmailModalRef= useRef(); 
    const alertRef =  useRef(); 
    const  [ state  ,  dispatch ]  = useReducer(reducer , initials ); 
    const [secure  , setSecure ] =  useState(true) ; 
    const [logedIn , setLogedIn ]=useState(false); 
    
    // phone prefix 
    const [openPhonePrefixDropDown, setOpenPhonePrefixDropDown] = useState(false);
    const [valuePhonePrefix, setValuePhonePrefix] = useState(null);
    const [phonePrefixItems, setPhonePrefixItems] = useState(phonePrefixes);
     
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

    useEffect(()=>{
        getPhonePrefixes();
    },[]); 

    const getPhonePrefixes = async () => {
        try {
            let response = await stores.phonePrefixesStore.getPhonePrefixes() ; 
        } catch (error) {
            console.log("error in login getprefixes"  ,  error ); 
        }
    }

    const login = async () => {
        try {
            let isValid  =  await loginValidationschema.validate(state) ; 
            if(isValid) {
                let wholePhoneNumber =  valuePhonePrefix ? 
                                  `${valuePhonePrefix}${state.phone}` :
                                  "+994" + state.phone ; 

                console.log("wholePhoneNumber" ,  wholePhoneNumber ); 
                
                let data = {
                    phone : wholePhoneNumber , 
                    password : state.password , 
                }

               await stores.authorationStore.login(data).then((result)=>{

                if(result.error) {
                    alertRef.current.alert( true , "error" , result.error  );
                    // if(result.notRegistered){
                    //     setTimeout(() => navigation.navigate("stack" , {
                    //             screen: SIGNIN , 
                    //         })
                    //     , 3000);
                    // }
                }

                if(result.success){
                    alertRef.current.alert( true , "success" , "Hesabınıza daxil oldunuz!" );
                    // setTimeout(() => 
                    navigation.navigate("stack" , {
                        // screen: CODECONFIRM , 
                        screen: "tab" , 
                        params : {
                            screen : SEARCHOME + "stack" ,
                        }
                    })
                    // , 3000);
                }

               }); 
            }
        } catch (error) {
            console.log("error"  , error ) ;
            alertRef.current.alert( true , "error" , error.errors[0] );   
        }
    }

return (
    <>
        <Alert ref={alertRef} />
        <AuthLayout>
            {
                logedIn ? 
                <View style={{
                    ...styles.container , 
                    flexDirection:"column" , 
                    }}
                >
                    <Text style={styles.pageTitle}>Hesabınıza daxil olmusunuz!</Text>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("stack" ,  {
                        screen: "tab" , 
                        params: {
                            screen : SEARCHOME
                        }
                    })}
                    style={{...styles.linkButtons ,  marginTop: helper.px(16)}}
                    >
                        <Text style={styles.linkButtonsText}>Əsas səhifəyə qayıt</Text>
                    </TouchableOpacity>
                </View>
                : 
                <View style={styles.container}>
                    <View style={[styles.width ,  styles.center ]}>
                        <Text style={styles.pageTitle}>Daxil ol</Text>

                        {/* <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Email adresiniz</Text>
                            <TextInput
                            value={state.email}
                            onChangeText={(value)=>dispatch({email:value})}
                            placeholder='email elave et'
                            style={styles.input}
                            placeholderTextColor={colors.placeholderText}
                            />
                        </View> */}
                        <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Telefon nömrəsi</Text>
                            <View style={{
                                    flexDirection:"row" , 
                                    justifyContent:"space-between", 
                                    width:"100%" ,
                                }} 
                            >
                                <View style={{width: "26%"}}>
                                    <DropDownPicker
                                        open={openPhonePrefixDropDown}
                                        value={valuePhonePrefix}
                                        items={phonePrefixItems}
                                        setOpen={setOpenPhonePrefixDropDown}
                                        setValue={setValuePhonePrefix}
                                        setItems={setPhonePrefixItems}
                                        style={{
                                            ...styles.input , 
                                            backgroundColor:"transparent" ,
                                            marginRight: 10 ,  
                                        }}
                                        placeholder='+994' 
                                        placeholderStyle={{
                                            color: colors.blanko ,
                                        }}
                                        listMode="MODAL"
                                        searchable={true}
                                        searchPlaceholder={"Axtar..."}
                                        searchContainerStyle={{
                                            borderBottomColor: colors.blanko , 
                                        }}
                                        searchTextInputStyle={{
                                            color:colors.blanko , 
                                            borderColor: colors.blanko , 
                                        }}
                                        modalTitle='Ölkə kodunu seçin'
                                        modalTitleStyle={{
                                            // color: colors.blanko , 
                                            fontWeight: "bold" , 
                                        }}
                                        modalContentContainerStyle={{
                                            backgroundColor: "#000" , 
                                            color: "#fff" , 
                                        }}
                                        theme="DARK"
                                    />
                                </View>
                                <View style={{width: "72%"}}>
                                    <MaskedTextInput
                                        keyboardType="numeric"
                                        value={state.phone}
                                        onChangeText={(text, rawText) => {
                                            console.log(text);
                                            console.log(rawText);
                                            dispatch({ phone: rawText});
                                        }}
                                        style={{...styles.input   }}
                                        mask={"(99) 999 99 99"}
                                        placeholder="(XX) XXX XX XX"
                                        placeholderTextColor={colors.placeholderText}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Şifrəniz</Text>
                            <View style={{
                                ...styles.input ,  
                                flexDirection:"row" ,
                                alignItems:"center" ,
                                justifyContent:"space-between" ,
                                }}>
                                <TextInput
                                value={state.password}
                                onChangeText={(value)=>dispatch({password:value})}
                                placeholder='Şifrənizi yazın'
                                style={{...styles.inputsyntax , width: "90%" }}
                                secureTextEntry={secure}
                                placeholderTextColor={colors.placeholderText}
                                />

                                <TouchableOpacity
                                style={styles.hideButton}
                                onPress={()=>setSecure(!secure)}>
                                    {
                                        secure? 
                                        icons.eye(colors.blanko , 16 ) 
                                        : icons.eyeoff(colors.blanko , 16 ) 
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity 
                        onPress={()=>login()}
                        style={{
                            ...styles.button ,
                            marginTop: helper.px(16) , 
                            ...styles.width ,
                        }}
                        >
                            <Text style={styles.buttontext}>Daxil ol</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>enterEmailModalRef.current.showModal()}
                        style={{...styles.linkButtons ,  marginTop: helper.px(16)}}
                        >
                            <Text style={styles.linkButtonsText}>Şifrəni unutmusunuz?</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.row}>
                            <View 
                            // onPress={()=>navigation.navigate("stack" , {
                            //     screen: SIGNIN , 
                            // })}
                            style={{...styles.linkButtons ,  marginRight: helper.px(10) }}
                            >
                                <Text style={{
                                    ...styles.linkButtonsText,
                                    textDecorationLine: "none" , 
                                }}>Hesabınız yoxdur?</Text>
                            </View>
                            {/* <TouchableOpacity 
                            onPress={()=>navigation.navigate("stack" , {
                                screen: SIGNIN , 
                            })}
                            style={styles.linkButtons}
                            >
                                <Text style={styles.linkButtonsText}>Qeydiyyatdan keç</Text>
                            </TouchableOpacity> */}
                        </View>

                        <TouchableOpacity 
                            onPress={()=>navigation.navigate("stack" , {
                                screen: SIGNIN , 
                            })}
                            style={{
                                ...styles.button ,
                                marginTop: helper.px(10) , 
                            }}
                            >
                                <Text style={styles.buttontext}>Qeydiyyatdan keç</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
    
            <EnterEmailModal
            ref={enterEmailModalRef}
            />
        </AuthLayout>
    </>
)};

const styles = StyleSheet.create({
    linkButtons:{
        marginVertical: helper.px(3) ,
    } , 
    linkButtonsText: {
        textDecorationLine:"underline" ,  
        color:colors.blanko ,  
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(12) , 
        letterSpacing: - 0.117 ,
    } , 
    container: {   
        height:helper.screenHeight ,  
        justifyContent:"center" , 
        alignItems: "center" , 
        flexDirection: "row" , 
        marginVertical: "auto" ,
    } , 
    width:{width:"100%"} , 
    input: {
        borderRadius: 5 ,  
        borderWidth: .7 , 
        borderColor: colors.blanko ,  
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
        marginVertical: helper.px(10) ,
        paddingLeft: helper.px(16),
    } , 
    inputsyntax : {
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
    } , 
    labelText:{
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
    } , 
    inputCon: {
        width: "100%",
        marginVertical: helper.px(6) ,
    } , 
    row:{
        flexDirection: "row" ,
    } , 
    center: {
        justifyContent: "center" , 
        alignItems: 'center',
    }, 
    button: {
        borderRadius: 5, 
        height: helper.px(40) , 
        backgroundColor: colors.blanko , 
        justifyContent: "center" , 
        alignItems: "center" , 
        paddingHorizontal: helper.px(32) ,
    }, 
    buttontext: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(16) , 
        color: colors.main ,
    }, 
    pageTitle: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        lineHeight: helper.px(32) , 
        fontSize:helper.px(22) , 
        color: colors.blanko ,
    }, 
    hideButton: {
        height:helper.px(40) , 
        width:helper.px(40) , 
        justifyContent:"center" , 
        alignItems:"center" ,
    }
});


export default helper.mobx(Login) ;
