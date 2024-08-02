import React , {
    useState ,  
    useReducer , 
    useEffect , 
    useRef , 
} from  "react" ;
import {
    View ,  
    Text ,
    StyleSheet , 
    TouchableOpacity , 
    TextInput ,
    Linking ,  
    Image , 
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import ProfileIntroComponent from "../components/Profile/ProfileIntroComponent";
import { MaskedTextInput } from "react-native-mask-text";
import LinearGradient from 'react-native-linear-gradient';
import helper from "../helpers/helper";
import colors from "../values/colors";
import icons from "../values/icons";
import DatePicker from 'react-native-date-picker'; 
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {cloneDeep}  from  "lodash" ; 
import InputComponent from "../components/Signin/InputComponent";
import editProfileValidationSchema from "../validations/EditProfileValidation";
import Alert from "../components/General/Alert";
import { phonePrefixes } from "../values/constants";




const  initialValue = {
    name: "" , 
    surname: "" ,
    birthday: ""  ,
    username: "" , 
    email: "" , 
    description: "" , 
    // links : [] , 
    phone: "" , 
    youtube: "" ,  
    tiktok : "", 
    facebook : "", 
    instagram : "", 
    image: ""
}

const reducer  = ( state , action )=> {
    return {...state  , ...action }
}

const ProfileEditScreen = ({
    stores ,  
    route: {
        params:{
            isStar
        }
    }
}) => { 
    const alertRef =  useRef(); 
    const [ state  , dispatch ] =  useReducer( reducer ,  initialValue ) ;  
    const [date, setDate] = useState(new Date()); 
    const [open, setOpen] = useState(false);

    const [imageFromGalary ,  setImageFromGalary ] = useState({}) ; 

    // dropdown values 
    const [ opendropdown, setOpendropdown ] = useState(false);
    const [value, setValue] = useState(null);
    const [categories, setCategories] = useState([]);

    // links add cvontainer
    const [ linksCon , setLinksCon ] =  useState([]) ; 
    // socials trigger state 
    const [ socials ,  setsocials ] = useState(); 


    // phone prefix 
    const [openPhonePrefixDropDown, setOpenPhonePrefixDropDown] = useState(false);
    const [valuePhonePrefix, setValuePhonePrefix] = useState(null);
    const [phonePrefixItems, setPhonePrefixItems] = useState(phonePrefixes);

    // console.log("isStar" , isStar);
    // when isstar true required values name/email , bio 
    // when isstar false  required name ,  username ,  birthday
    // DropDownPicker.setListMode("MODAL");

    // texts 
    const wpText =  helper.translate("wpnumber");

    useEffect(()=>{
        getProfile(); 
        getDropdownCategories(); 
    },  [] );  

    const editProfile = async () => {
        try {

            console.log("state"  , state);  
            let isValid = await editProfileValidationSchema.validate(state) ; 

              
            if(!isValid){ 
                alertRef.current.alert( true , "error" , "Məlumatlar tam deyil!" );
                return ;
            };  

            let wholePhoneNumber =  valuePhonePrefix ? 
            `${valuePhonePrefix}${state.phone}` :
            "+994" + state.phone ; 
        
            const body  = {
                "phone": wholePhoneNumber ,
                "lastname":state.surname ,
                "firstname":state.name ,
                "email":state.email ,
                "password": state.password ,
                "categories": isStar ? value : []  ,
                "instagram": state.instagram ,
                "tiktok": state.tiktok ,
                "facebook": state.facebook ,
                "description":state.description ,
                "youtube": state.youtube ,
                "isStar": isStar ,  
                image: imageFromGalary , 
            }
            console.log("boidy" , body ) ; 
            if(!body?.image) return ;  
            

            let editingResult = await stores.profileStore.editProfile(body); 
            if(editingResult) {
                alertRef.current.alert( true , "success" , "Məlumatlarınız dəyişdirildi!" );
            }else{
                alertRef.current.alert( true , "error" , "Xəta baş verdi!" );
            }

        } catch (error) {
            if(error) console.log("error in editprofile function" ,  error ) ; 
        }
    }

    const getProfile = async () => {
        try {
            let profile  =  await helper.getdataFromAsyncStorage("@user_data"); 
            profile =  JSON.parse(profile); 

            console.log("profile" ,  profile); 
            if (!profile) return ; 
            dispatch({
                name: profile?.firstname , 
                surname: profile?.lastname  ,
                email: profile?.email , 
                // description: "" , 
                phone: profile?.telephone.slice(3)  , 
                image: profile?.image , 
            }); 
        } catch (error) {
            if(error) console.log("error" , error );  
        }
    }

    const getDropdownCategories = async  () => {
        try {
            await stores.getCategoriesStore.getCategoriesShort() ;  
            // setCategories(calculatedValue); 
            setCategories(stores.getCategoriesStore.shortCategories); 
        } catch (error) {
            console.log("getDropdownCategories error" ,  error );   
        }
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

    const openWhatsApp = () => {
        let msg = "Qiymət dəyişilməsi üçün müraciət edirəm.Zəhmət olmasa köməklik göstərərdiniz.";
        let mobile = state.phone ;
        if (mobile) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=+994" + '102288301';
                Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened successfully " + data);
                })
                .catch(() => {
                    alertRef.current.alert(true , "error" , "Make sure WhatsApp installed on your device");
                });
            } else {
                alertRef.current.alert(true , "error" , "Please enter message to send");
            }
        } else {
          alertRef.current.alert(true , "error" , "Please enter mobile no");
        }
    };

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

      
return(
    <>
        <Alert
        ref={alertRef}
        />
        <CommonLayout
        showDrawerButton={false}
        pageName={helper.translate("editProfilePagename")}
        showSearchComponent={false}
        >
            <LinearGradient 
                colors={['#CC75C6', '#5690D6']} 
                start={{x: 0.055, y: 0.30}} 
                end={{x: 0.2, y: 1.0}}
                locations={[0, 0.6]}
                style={styles.gradient}
            ></LinearGradient>
            <View style={{marginTop:helper.px(70)}}></View>

            <ProfileIntroComponent
                image={state.image ? {uri:state.image} : false }
                onlyProfilePicture={true}
                imageFromGalaryParent={imageFromGalary}
                setImageFromGalaryParent={(value)=>setImageFromGalary(value)}
                // changeImageCallBack={(value)=>changeProfilePhoto(value)}
            />
            <View style={styles.inputContainer}>
                
                <View  style={styles.inputItem}>
                    <Text style={styles.inputLabel}>{helper.translate("name_label")}</Text>
                    <TextInput
                    value={state.name}
                    onChangeText={(value)=>{dispatch({name: value })}}
                    placeholder={helper.translate("name_label")}
                    style={styles.input}
                    placeholderTextColor={colors.placeholderText}
                    />
                    {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
                </View>
                <View  style={styles.inputItem}>
                    <Text style={styles.inputLabel}>{helper.translate("surname_label")}</Text>
                    <TextInput
                    value={state.surname}
                    onChangeText={(value)=>{dispatch({surname: value })}}
                    placeholder={helper.translate("surname_label")}
                    style={styles.input}
                    placeholderTextColor={colors.placeholderText}
                    />
                    {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
                </View>

                {/* <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>{helper.translate("phone_label")}</Text>
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

                <View style={styles.inputItem}>
                    <Text style={styles.inputLabel}>{helper.translate("phone_label")}</Text>
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
                                style={{...styles.input , minHeight: 32 }}
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



                {/* {
                    isStar ? null :
                    <View  style={styles.inputItem}>
                        <Text style={styles.inputLabel}>{helper.translate("username_label")}</Text>
                        <TextInput
                        value={state.username}
                        onChangeText={(value)=>{dispatch({username: value })}}
                        placeholder={helper.translate("username_label")}
                        style={styles.input}
                        placeholderTextColor={colors.placeholderText}
                        />
                        <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text>
                    </View>
                } */}


                <View  style={styles.inputItem}>
                    <Text style={styles.inputLabel}>{helper.translate("email_label")}</Text>
                    <TextInput
                    value={state.email}
                    onChangeText={(value)=>{dispatch({email: value })}}
                    placeholder={helper.translate("email_label")}
                    style={styles.input}
                    placeholderTextColor={colors.placeholderText}
                    />
                    {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
                </View>

                
                {/* {
                    !isStar ? null :
                    <> */}
                        <View  style={styles.inputItem}>
                            <Text style={styles.inputLabel}>{helper.translate("bio_label")}</Text>
                            <TextInput
                            value={state.description}
                            onChangeText={(value)=>{dispatch({description: value })}}
                            placeholder={helper.translate("bio_label")}
                            style={{
                                ...styles.input , 
                                height: helper.px(70) , 
                                paddingVertical: helper.px(10),
                            }}
                            numberOfLines={4}
                            textAlignVertical={'top'}
                            placeholderTextColor={colors.placeholderText}
                            />
                            {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
                        </View>
                    {/* </>                
                } */}

                {/* {
                    isStar ? null :
                    <View  style={styles.inputItem}>
                        <Text style={styles.inputLabel}>{helper.translate("birthday_label")}</Text>
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
                        <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text>
                    </View>
                } */}

                {
                    isStar ? 
                    <>
                        <View 
                        style={{
                            ...styles.inputItem , 
                            ...styles.dropdownContainer 
                        }}
                        >
                            <Text style={styles.inputLabel}>{helper.translate("categoryPageTitle")}</Text>
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

                        {/* <View style={styles.inputCon}>
                            <Text style={styles.inputLabel}>Sosial şəbəkə linkləri</Text>

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
                                    // borderColor: colors.blanko ,  
                                    // borderRadius: 5 ,
                                }}
                                >{icons.plus(colors.blanko , 20)}</TouchableOpacity>
                                    <TouchableOpacity 
                                onPress={()=>addRemovelinksInput( false)}
                                style={{
                                    paddingVertical: helper.px(14) , 
                                    paddingHorizontal: helper.px(14) ,
                                    alignItems: "center" ,
                                    // borderWidth: .7 , 
                                    // borderColor: colors.blanko ,  
                                    borderRadius: 5 ,
                                }}
                                >{icons.trush(colors.blanko , 20 )}</TouchableOpacity>
                            </View>

                            {
                                linksCon?.map(( item , index )=>{
                                    return (
                                        <TextInput
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

                        {
                            isStar ? 
                            <>
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
                                
                                <TouchableOpacity
                                onPress={() => openWhatsApp() }
                                style={[
                                    styles.button , 
                                    {
                                        paddingVertical: 10 , 
                                        backgroundColor: colors.turkuaz , 
                                        marginBottom: helper.px(16) ,
                                        marginTop: helper.px(16) ,
                                    }
                                ]}
                                >
                                    <Text style={[
                                        styles.buttonText ,
                                        {
                                            fontSize: helper.px(16)
                                        }
                                    ]}>{wpText}</Text>
                                </TouchableOpacity>
                            </>
                            :null 
                        }

                      



                    
                    </>
                    :null 
                }

            </View>

            <TouchableOpacity
            onPress={() => editProfile() }
            style={styles.button}
            >
                <Text style={styles.buttonText}>{helper.translate("confirm")}</Text>
            </TouchableOpacity>
        </CommonLayout>
    </>
   
)};

const styles = StyleSheet.create({
    gradient: {
        height: helper.px(84) , 
        ...StyleSheet.absoluteFill , 
        zIndex: -1,
        top: helper.px(60),
    }, 
    inputLabel: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(14) , 
        lineHeight: helper.px(18) , 
        color: colors.blanko ,
    }, 
    input: {
        height: helper.px(32) , 
        backgroundColor: colors.gray, 
        borderWidth: .4 , 
        borderColor: "#4F4F4F" , 
        paddingVertical: 0 , 
        paddingLeft: helper.px(10) ,
        borderRadius: 4 , 
        marginVertical: helper.px(10), 
        color: colors.blanko , 
    } , 
    infoText: {
        fontFamily: helper.fontFamily(""),
        fontWeight:"400" ,  
        fontSize:helper.px(10) , 
        lineHeight: helper.px(14) , 
        color: colors.text ,
    }, 
    inputContainer: {
        marginVertical: helper.px(24) ,
    }, 
    dateTime: {
        flexDirection: "row" , 
        justifyContent:"space-between" , 
        alignItems: "center",
    }, 
    datePickerButton : {
        width: helper.px(40),
        alignItems:"center",
    }, 
    dateInput: {
        paddingVertical: 0 , 
        width: "80%", 
        color: colors.blanko , 

    }, 
    inputItem: {
        marginBottom: helper.px(16) ,
    },
    button: {
        backgroundColor: colors.second , 
        paddingVertical: helper.px(14), 
        justifyContent:"center", 
        alignItems:"center" ,
        borderRadius: helper.px(5), 
        marginBottom: helper.px(5),
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(18) , 
        lineHeight: helper.px(20) , 
        color: colors.blanko , 
    }, 

    dropdownContainer: {
        zIndex: 300000 ,
    },

    dropdown: {
        backgroundColor: colors.gray , 
        // color: colors.blanko ,
        // borderColor: colors.blanko , 
        borderRadius: 5 ,  
        // borderWidth: .7 , 
        marginVertical: helper.px(10) ,
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

export default helper.mobx(ProfileEditScreen);
