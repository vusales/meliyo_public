import React , {
    useReducer ,  
    useState , 
    useEffect , 
    useRef , 
    useMemo ,  
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,  
    TextInput, 
    TouchableOpacity, 
    Image , 
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import AuthLayout from '../layouts/AuthLayout';
import { MaskedTextInput } from "react-native-mask-text";
import DatePicker from 'react-native-date-picker'; 
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {cloneDeep}  from  "lodash" ; 
import InputComponent from '../components/Signin/InputComponent';
import registerValidationschema  from "../validations/RegisterValidationschema" ; 
import registerValidationUserschema from '../validations/RegisterValidationUserschema';
import Alert from '../components/General/Alert';
import { useNavigation } from '@react-navigation/native';
import { PROFILE , CODECONFIRM } from '../values/screenNameLists';
import { phonePrefixes } from '../values/constants';







const initials  =   { 
    email : "" , 
    password: "" , 
    name  : "" , 
    surname: "" , 
    birthday: "" ,
    phone: "" , 
    username:"" ,
    passwordrepeat: "" , 
    links : [] , 
    instagram : "" , 
    tiktok: "" , 
    youtube:"" , 
    facebook : "" , 
    description: "" ,   
}

const reducer =( state  , action ) => {
    return {...state , ...action }
}

const SignIn = ({
    params,
    stores , 
}) =>{


    const navigation  = useNavigation(); 

    // detectuser have two values  star & user ;  dataType: String 
    const [ detectUser , setDetectingUser ] = useState(""); 
    const  [ state  ,  dispatch ]  = useReducer(reducer , initials ); 
    const [date, setDate] = useState(new Date()); 
    const [open, setOpen] = useState(false);
    const [secure  , setSecure ] =  useState(true) ; 
    const [secureSecond  , setSecureSecond ] =  useState(true) ; 

    // links add cvontainer
    const [ linksCon , setLinksCon ] =  useState([]) ; 
   
    // dropdown values 
    // data from store 
    let calculatedValue =  useMemo( ()=> stores.getCategoriesStore.shortCategories ,  [stores.getCategoriesStore.shortCategories] ) ;
    const [ opendropdown, setOpendropdown ] = useState(false);
    const [value, setValue] = useState(null);
    const [categories, setCategories] = useState(stores.getCategoriesStore.shortCategories);

    // socials trigger state 
    const [ socials ,  setsocials ] = useState(); 

    // phone prefix 
    const [openPhonePrefixDropDown, setOpenPhonePrefixDropDown] = useState(false);
    const [valuePhonePrefix, setValuePhonePrefix] = useState(null);
    const [phonePrefixItems, setPhonePrefixItems] = useState(phonePrefixes);

    // alert 
    const alertRef =  useRef(); 

    useEffect(()=>{
        getDropdownCategories(); 
    }, [] ); 

    const getDropdownCategories = async  () => {
        try {
            await stores.getCategoriesStore.getCategoriesShort() ;  
            // setCategories(calculatedValue); 
            setCategories(stores.getCategoriesStore.shortCategories); 
        } catch (error) {
            console.log("getDropdownCategories error" ,  error );   
        }
    }

    const registerUser = async  () => {
        try {

            let isValidregistration ;  

            if( detectUser == "user" ){
               isValidregistration = await   registerValidationUserschema.validate(state) ; 
            }else if(detectUser == "star") { 
                if(!value && value.length <= 0 ){
                    alertRef.current.alert( true , "error" , "Kateqoriya secin!" );
                    return ; 
                }
               isValidregistration = await   registerValidationschema.validate(state) ; 
            }

            if(state.password !== state.passwordrepeat ){
                alertRef.current.alert( true , "error" , "Şifrə və Şifrənin təkrarı eyni deyil!" );
                return ; 
            }

            if(isValidregistration) {

                let wholePhoneNumber =  valuePhonePrefix ? 
                `${valuePhonePrefix}${state.phone}` :
                "+994" + state.phone ; 

                let data  =  {
                    "phone": wholePhoneNumber ,
                    "lastname":state.surname ,
                    "firstname":state.name ,
                    "email":state.email ,
                    "password": state.password ,
                    "categories": detectUser == "star" ? value : []  ,
                    "instagram": state.instagram ,
                    "tiktok": state.tiktok ,
                    "facebook": state.facebook ,
                    "description":state.description ,
                    "youtube": state.youtube ,
                    "isStar": detectUser == "star" ? true :  false , 
                    "birthday" : state.birthday ,  
                }

                await stores.authorationStore.register(data).then((result)=>{
                    if(result.success){
                        // alertRef.current.alert( true , "success" , "Qeydiyyatı uğurla tamamladınız!" );
                        // setTimeout(()=> navigation.navigate("stack" , {
                        //     screen : "tab" ,  
                        //     params : {
                        //         screen: PROFILE + "stack" , 
                        //     }
                        // }) ,  3000 ) ; 
                        let register_request_id  =  result.register_request_id ?? "" ; 
                        navigation.navigate("stack" , {
                            screen : CODECONFIRM ,  
                            params : {
                                register_request_id , 
                                ...data ,  
                                "from" : "register"  , 
                            }
                        }) ;  

                    }else if(result.error){
                        alertRef.current.alert( true , "error" , "Xəta baş verdi!" + result.error  );
                    }
                });                
            }

        } catch (error) {
            // console.log("registration page error" ,  error ); 
            alertRef.current.alert( true , "error" , error[0] );
        }
    }

    const addRemovelinksInput = (bool)=>{
        let  number ; 
        let copyArray =  cloneDeep(linksCon) ;  
        if(bool){
            number  = linksCon.length ; 
            copyArray.push(number); 
        }else {
            copyArray.splice(-1);
            let linksVlaue =  cloneDeep(state.links); 
            linksVlaue.splice(-1) ; 
            dispatch({links: linksVlaue });
        }
        setLinksCon(copyArray); 
    }

    const changeSocial = (value) => {
        switch (socials) {
            case "instagram":
                dispatch({instagram: value});  
                break;
            case "facebook":
                dispatch({facebook: value});  
                break;
            case "tiktok":
                dispatch({tiktok: value});  
                break;
            case "youtube":
                dispatch({youtube: value});  
                break;
            default:
                break;
        }
    }

return (
    <>
        <Alert ref={alertRef} />
        <AuthLayout>
            <View style={  
                detectUser ?  
                styles.container : 
                {
                    ...styles.container , 
                    height:helper.screenHeight ,
                }}
            >
                {
                    detectUser ? 
                    <View style={[styles.width ,  styles.center ]}>
                        <Text style={styles.pageTitle}>Qeydiyyat</Text>
                        <View style={{
                            ...styles.row , 
                            justifyContent:"space-between" ,
                            width: "100%" ,  
                            marginTop: helper.px(16),
                            }}
                        >
                            <View style={{
                                ...styles.inputCon ,  
                                width: "49%",
                                }}
                            >
                                <Text style={styles.labelText}>Ad</Text>
                                <TextInput
                                value={state.name}
                                onChangeText={(value)=>dispatch({name:value})}
                                placeholder='adınızı yazın'
                                style={styles.input}
                                placeholderTextColor={colors.placeholderText}
                                />
                            </View>
                            <View style={{
                                ...styles.inputCon ,  
                                width: "49%" , 
                                }}
                            >
                                <Text style={styles.labelText}>Soyadınız</Text>
                                <TextInput
                                value={state.surname}
                                onChangeText={(value)=>dispatch({surname:value})}
                                placeholder='soyadınızı yazın'
                                style={styles.input}
                                placeholderTextColor={colors.placeholderText}
                                />
                            </View>
                        </View>

                        {
                            detectUser == "star" ? 
                            <> 
                                {/* <View style={styles.inputCon}>
                                    <Text style={styles.labelText}>Sosial şəbəkə linkləri</Text>

                                    <View style={{
                                        flexDirection: "row" , 
                                        alignItems: "center" ,
                                        justifyContent: "space-between"
                                        }}
                                    >
                                        <TextInput
                                        value={state.links[0]}
                                        onChangeText={(value)=>{
                                            let array = cloneDeep(state.links); 
                                            array[0] =  value ;  
                                            dispatch({links: array }) ;  
                                        }}
                                        placeholder='Sosial şəbəkə linki əlavə edin'
                                        style={{...styles.input ,  width : "70%" }}
                                        placeholderTextColor={colors.placeholderText}
                                        />

                                        <TouchableOpacity 
                                        onPress={()=>addRemovelinksInput(true)}
                                        style={{
                                            paddingVertical: helper.px(14) , 
                                            paddingHorizontal: helper.px(14) ,
                                            alignItems: "center" ,
                                            borderWidth: .7 , 
                                            borderColor: colors.blanko ,  
                                            borderRadius: 5 ,
                                        }}
                                        >{icons.plus(colors.blanko , 20)}</TouchableOpacity>
                                        <TouchableOpacity 
                                        onPress={()=>addRemovelinksInput( false)}
                                        style={{
                                            paddingVertical: helper.px(14) , 
                                            paddingHorizontal: helper.px(14) ,
                                            alignItems: "center" ,
                                            borderWidth: .7 , 
                                            borderColor: colors.blanko ,  
                                            borderRadius: 5 ,
                                        }}
                                        >{icons.trush(colors.blanko , 20 )}</TouchableOpacity>
                                    </View>
                                    {
                                        linksCon?.map(( item , index )=>{
                                            return (
                                                <TextInput
                                                key={index}
                                                value={state.links}
                                                onChangeText={(value)=>{
                                                    let array = cloneDeep(state.links); 
                                                    array[index + 1 ] =  value ; 
                                                    console.log("array" , array);  
                                                    dispatch({links: array }) ; 
                                                }}
                                                placeholder='Sosial şəbəkə linki əlavə edin'
                                                style={{...styles.input ,}}
                                                placeholderTextColor={colors.placeholderText}
                                                />
                                            ); 
                                        })
                                    }
                                </View> */}

                                <View style={{...styles.inputCon , ...styles.dropdownContainer }}>
                                    <Text style={styles.labelText}>Kateqoriya</Text>
                                    <DropDownPicker
                                        multiple={true}
                                        min={0}
                                        max={5}
                                        listMode={'MODAL'}
                                        mode={'BADGE'}
                                        showBadgeDot={false}
                                        badgeTextStyle={{
                                            color: colors.main ,   
                                        }}
                                        searchable={true}
                                        searchPlaceholder={"Axtar..."}
                                        searchContainerStyle={{
                                            borderBottomColor: colors.blanko , 
                                        }}
                                        searchTextInputStyle={{
                                            color:colors.blanko , 
                                            borderColor: colors.blanko , 
                                        }}
                                        open={opendropdown}
                                        value={value}
                                        items={categories}
                                        setOpen={setOpendropdown}
                                        setValue={setValue}
                                        setItems={setCategories}
                                        style={styles.dropdown}
                                        dropDownDirection="BOTTOM"
                                        textStyle={{
                                            color: colors.blanko ,  
                                        }}
                                        dropDownContainerStyle={{
                                            backgroundColor: colors.gray, 
                                            // borderColor: colors.blanko ,
                                            minHeight: helper.screenHeight - 350 ,
                                        }}
                                        modalContentContainerStyle={{
                                            backgroundColor: colors.gray ,
                                        }}
                                        zIndex={100000}
                                        zIndexInverse={300000}
                                        placeholder={"Kateqoriya seçin"}
                                        placeholderStyle={{
                                            color: colors.placeholderText ,
                                        }}
                                        // placeholderTextColor={{color: colors.placeholderText}}
                                        showTickIcon={true}
                                        arrowIconStyle={{ 
                                            color: colors.blanko 
                                        }}
                                        TickIconComponent={({style}) => <View>{icons.check()}</View>}
                                        CloseIconComponent={({style}) => <View>{icons.close()}</View>}
                                        ArrowUpIconComponent={({style}) => <View>{icons.chevrontop()}</View> }
                                        ArrowDownIconComponent={({style}) => <View>{icons.chevronbottom()}</View> }
                                    />
                                </View>

                                <View style={styles.width}>
                                    <Text style={styles.labelText}>Sosial şəbəkə linkləri</Text>
                                </View>

                                <View 
                                style={styles.socialsButtonContainer}
                                >
                                    <TouchableOpacity 
                                    style={styles.socialsButtons}
                                    onPress={()=>setsocials("instagram")}
                                    >
                                        {icons.insta()}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={styles.socialsButtons}
                                    onPress={()=>setsocials("tiktok")}
                                    >
                                        {/* {icons.tiktok()} */}
                                        <Image 
                                        style={styles.tiktokImage}
                                        source={require("../assets/logo/logotiktok.png")} 
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={styles.socialsButtons}
                                    onPress={()=>setsocials("facebook")}
                                    >
                                        {icons.facebook()}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={styles.socialsButtons}
                                    onPress={()=>setsocials("youtube")}
                                    >
                                        {icons.youtube()}
                                    </TouchableOpacity>
                                </View>
                                {
                                    socials? 
                                    <InputComponent 
                                    icon={socials}
                                    value={state[socials]}
                                    callback={(value) => changeSocial(value)}
                                    />
                                    :null
                                }

                                <View style={styles.inputCon}
                                >
                                    <Text style={styles.labelText}>Description</Text>
                                    <TextInput
                                    value={state.description}
                                    onChangeText={(value)=>dispatch({description:value})}
                                    placeholder='Məlumat yazın'
                                    style={{
                                        ...styles.input , 
                                        verticalAlign: "top" ,
                                    }}
                                    placeholderTextColor={colors.placeholderText}
                                    multiline={true}
                                    numberOfLines={5}
                                    />
                                </View>
                                                                
                            </> :
                            <>
                                {/* <View style={styles.inputCon}>
                                    <Text style={styles.labelText}>Istifadəçi adınız</Text>
                                    <TextInput
                                    value={state.username}
                                    onChangeText={(value)=>dispatch({username:value})}
                                    placeholder='Istifadəçi adınızı yazın'
                                    style={styles.input}
                                    placeholderTextColor={colors.placeholderText}
                                    />
                                </View> */}

                                <View  style={styles.inputCon}>
                                    <Text style={styles.labelText}>Doğum tarixi</Text>
                                    <View
                                    style={[styles.input , styles.dateTime]}
                                    >
                                        <MaskedTextInput
                                        type="date"
                                        keyboardType="numeric"
                                        value={state.birthday}
                                        options={{
                                            dateFormat: 'DD/MM/YYYY',
                                        }}
                                        onChangeText={(text, rawText) => {
                                            console.log(text);
                                            console.log(rawText);
                                            dispatch({ birthday: text});
                                        }}
                                        style={styles.dateInput}
                                        mask={"DD/MM/YYYY"}
                                        placeholder="DD/MM/YYYY"
                                        placeholderTextColor={colors.placeholderText}
                                        />

                                        <TouchableOpacity
                                        onPress={() => setOpen(true)}
                                        style={styles.datePickerButton}
                                        >
                                            {icons.note()}
                                        </TouchableOpacity>

                                        <DatePicker
                                        modal
                                        open={open}
                                        date={date}
                                        mode="date"
                                        onConfirm={(date) => {
                                            setOpen(false);
                                            setDate(date); 
                                            const newDate =  moment(date).format('DD/MM/YYYY'); 
                                            dispatch({birthday: JSON.stringify(newDate)});   
                                        }}
                                        onCancel={() => {
                                            setOpen(false);
                                        }}
                                        />
                                    </View>
                                </View> 
                            </>
                        }

                        <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Email adresiniz</Text>
                            <TextInput
                            value={state.email}
                            onChangeText={(value)=>dispatch({email:value})}
                            placeholder='email elave et'
                            style={styles.input}
                            placeholderTextColor={colors.placeholderText}
                            />
                        </View>
                        {/* <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Telefon nömrəsi</Text>
                            <MaskedTextInput
                                keyboardType="numeric"
                                value={state.phone}
                                onChangeText={(text, rawText) => {
                                    console.log(text);
                                    console.log(rawText);
                                    dispatch({ phone: rawText});
                                }}
                                style={styles.input}
                                mask={"(99) 999 99 99"}
                                placeholder="(XX) XXX XX XX"
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
                                paddingRight: helper.px(16),
                                }}>
                                <TextInput
                                value={state.password}
                                onChangeText={(value)=>dispatch({password:value})}
                                placeholder='Şifrənizi yazın'
                                style={{color:colors.blanko}}
                                secureTextEntry={secure}
                                placeholderTextColor={colors.placeholderText}
                                />

                                <TouchableOpacity
                                style={styles.hideButton}
                                onPress={()=>setSecure(!secure)}>
                                    {
                                        secure? 
                                        icons.eye(colors.blanko , 18 ) 
                                        : icons.eyeoff(colors.blanko , 18 ) 
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.labelText}>Şifrə yenidən</Text>
                            <View style={{
                                ...styles.input ,  
                                flexDirection:"row" ,
                                alignItems:"center" ,
                                justifyContent:"space-between" ,
                                paddingRight: helper.px(16),
                                }}>
                                <TextInput
                                value={state.passwordrepeat}
                                onChangeText={(value)=>dispatch({passwordrepeat:value})}
                                placeholder='Şifrənizi yenidən yazın'
                                style={{color:colors.blanko}}
                                secureTextEntry={secureSecond}
                                placeholderTextColor={colors.placeholderText}
                                />

                                <TouchableOpacity
                                style={styles.hideButton}
                                onPress={()=>setSecureSecond(!secureSecond)}>
                                    {
                                        secureSecond? 
                                        icons.eye(colors.blanko , 18 ) 
                                        : icons.eyeoff(colors.blanko , 18 ) 
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity 
                        onPress={()=>registerUser()}
                        style={{
                            ...styles.button ,
                            marginTop: helper.px(16) , 
                            ...styles.width ,
                            }}
                        >
                            <Text style={styles.buttontext}>Qeydiyyatdan keç</Text>
                        </TouchableOpacity>
                        <View style={{height:50}}></View>
                    </View>
                    :
                    <>
                        <TouchableOpacity 
                        onPress={()=>setDetectingUser("user") }
                        style={{...styles.button ,  marginRight: helper.px(16)}}
                        >
                            <Text style={styles.buttontext}>İstifadəçi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>setDetectingUser("star") }
                        style={styles.button}
                        >
                            <Text style={styles.buttontext}>Ulduz</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </AuthLayout>
    </>
)};

const styles = StyleSheet.create({
    container: {     
        justifyContent:"center" , 
        alignItems: "center" , 
        flexDirection: "row" , 
        marginVertical: "auto" ,
        paddingVertical: helper.px(32) ,
    }, 
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
        justifyContent:"center" , 
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
    infoText: {
        fontFamily: helper.fontFamily(""),
        fontWeight:"400" ,  
        fontSize:helper.px(10) , 
        lineHeight: helper.px(14) , 
        color: colors.text ,
    }, 
    dateTime: {
        flexDirection: "row" , 
        justifyContent:"space-between" , 
        alignItems: "center",
        paddingRight: helper.px(16) ,
        color: colors.blanko , 
    },
    dateInput: {
        width: "80%", 
        color: colors.blanko , 
    }, 
    dropdown: {
        backgroundColor: "transparent" , 
        borderColor: colors.blanko , 
        borderRadius: 5 ,  
        borderWidth: .7 , 
        marginVertical: helper.px(10) ,
    },
    dropdownContainer: {
        zIndex: 30000 ,
    }, 
    socialsButtonContainer: {
        flexDirection:"row" , 
        alignItems:"center" , 
        justifyContent:'space-around' , 
        width: "100%" , 
        paddingVertical: helper.px(16) ,  
    }, 
    socialsButtons: {
        width: helper.px(50) , 
        height: helper.px(50) , 
        alignItems:"center" , 
        justifyContent: "center" ,
        backgroundColor: colors.main , 
        borderWidth:  1  ,  
        borderColor: colors.text , 
        borderRadius: helper.px(16),  
    },  
    tiktokImage : {
        height: helper.px(16) , 
        width: helper.px(16) ,
    }

});


export default helper.mobx(SignIn);
