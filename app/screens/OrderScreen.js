import React , {
    useState  , 
    useEffect , 
    useRef , 
    useReducer  , 
    useMemo , 
} from  "react" ;
import colors from "../values/colors";
import icons from "../values/icons";
import helper from "../helpers/helper";
import {
    View ,  
    Text ,
    TouchableOpacity , 
    FlatList  , 
    StyleSheet ,
    SafeAreaView ,  
    StatusBar ,
    Image ,
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import OrderProfileComponent from "../components/Order/OrderProfileComponent";
import WriteAboutYourselfModal from "../modals/OrderModals/WriteAboutYourselfModal";
import ChoseThemeOrderModal from "../modals/OrderModals/ChoseThemeOrderModal";
import FromWhomToModal from "../modals/OrderModals/FromWhomToModal";
import OrderButtonComponent from "../components/StarUserDetailsScreen/OrderButtonComponnet";
import { ORDERCONFIRM } from "../values/screenNameLists";
import { useNavigation } from "@react-navigation/native";
import Alert from "../components/General/Alert";




const initialValues =  { 
    aboutUser: "" ,
    instructions : "" , 
    theme: {} ,
    fromWhomTo : {} , 
}

const reducer = ( state ,  action ) => {
    return {...state ,  ...action }
}


const OrderScreen = ({
    route:{params:{starUserId, mainProduct }},
    stores ,  
}) =>{ 
    const navigation = useNavigation(); 

    const modalsRef = useRef(null); 
    const modalsSecondRef = useRef(null); 
    const modalsThirdRef = useRef(null); 
    const alertRef =  useRef(); 

    const [gift , setGift ] =  useState(false); 
    const [giftToMyself , setGiftToMyself ] =  useState(false); 
    const [isInstructionsModal , setInstuctionsModal ] =  useState(false) ; 
    const [ state ,  dispatch  ] =  useReducer( reducer , initialValues ); 
    const [ user , setUser ] = useState(null); 

    const starInfo =  useMemo(() => stores.userDetailsStore.userInfo ,  [stores.userDetailsStore.userInfo]);  
    const videoThemes =  useMemo(() => stores.getVideoThemesStore.videoThemes ,  [stores.getVideoThemesStore.videoThemes]);  

    useEffect(()=> {
        getUserAndStarData(); 
        console.log("mainProduct" , mainProduct );
    },[]); 


    const getUserAndStarData = async () => {
        try {

            if(!starUserId) return ;  
            let body = {
                id: starUserId , 
            };
            await stores.userDetailsStore.getUserdetails(body);
            await stores.profileStore.getCustomer();
            await stores.getVideoThemesStore.getVideoThemes(); 

            let user_data =  await helper.getdataFromAsyncStorage('@user_data'); 
            if(!user_data || user_data == null ) return alertRef.current.alert(true , "error" ,  "hesabınıza daxil olmamısınız!") ; 
            let user =  JSON.parse(user_data); 
            setUser(user);
      
        } catch (error) {
            if(error){
                console.log("error" , error) ;  
            }
        }
    }


    const openInstructionsModal  =  () => {
        setInstuctionsModal(true) ; 
        modalsRef.current.showWriteAboutYourselfModal(); 
    }

    const saveDuoModalData = ( keyword ,  value ) => {
        if( value.length < 50 ){
            alertRef.current.alert(true , "error" ,  "Qeyd etdiyiniz məlumat 50 simvoldan az olmamalıdır!");
            return; 
        }
        if(keyword ==  "instructions"){
            dispatch({instructions: value });
        }else {
            dispatch({aboutUser: value });
        }
    }

    

return(
    <>
        <Alert
        ref={alertRef}
        />
        <CommonLayout
        showDrawerButton={false}
        showSearchComponent={false}
        pageName={"order"}
        >
            <View style={
                gift || giftToMyself ? 
                {
                ...styles.baseContainer,  
                justifyContent: 'space-around',
                paddingHorizontal: helper.px(32),
                }
                : styles.baseContainer
                }
                >
                {/* show only starprofile */}
                <OrderProfileComponent
                    image={{uri: starInfo?.image }}
                    name={starInfo?.firstname + " " +starInfo?.lastname }
                    job={gift || giftToMyself ? "" : ""}
                />

                {/* after select show user profile also */}
                {
                    gift || giftToMyself ?
                    <OrderProfileComponent
                        image={{uri: user?.image }}
                        name={user?.firstname + " " + user?.lastname}
                        job={gift || giftToMyself ? "" : ""}
                    />
                    :null
                }
            </View>

            {/* if user select then hide select buttons */}
            {
                gift || giftToMyself ? 
                null
                : 
                <View  style={styles.buttonsContainer} >
                    <TouchableOpacity 
                    onPress={()=>setGift(true)}
                    style={styles.buttons}
                    >
                        <Text 
                        style={styles.buttonsText}
                        >Hədiyyə</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>setGiftToMyself(true)}
                    style={[styles.buttons, styles.secondbutton ]}
                    >
                        <Text 
                        style={styles.buttonsText}
                        >Özüm üçün</Text>
                    </TouchableOpacity>
                </View>
            }

            {/*  after selection  show modal buttons */}
            {
                gift || giftToMyself ?
                <View style={styles.modalButtonsContainer}>
                    {
                        gift ? 
                        <>
                            <TouchableOpacity 
                            onPress={()=>modalsThirdRef.current.showFromWhomToModal()}
                            style={styles.modalButton}
                            >
                                <View style={styles.modalButtonTextContainer}>
                                    <Text style={styles.modalButtonTextTitle}>Kimdən-Kimə?</Text>
                                    {/* <Text 
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={styles.modalButtonTextDescription}
                                    >Lorem Ipsum has been the industry's standard dummy 
                                    text ever </Text> */}
                                </View>
                                {state?.fromWhomTo?.from ? icons.check()  : icons.plus()}
                            </TouchableOpacity>
                            {
                                state.fromWhomTo?.from ? 
                                <Text style={styles.modalButtonTextDescription} >{state.fromWhomTo?.from }-{state.fromWhomTo?.to }</Text>
                                :null
                            }
                            
                        </>
                        :
                        <>
                            <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={()=> {
                                setInstuctionsModal(false);
                                modalsRef.current.showWriteAboutYourselfModal();
                            }}
                            >
                                <View 
                                style={styles.modalButtonTextContainer}
                                >
                                    <Text style={styles.modalButtonTextTitle}>Özünüz haqqında yazın?</Text>
                                    {/* <Text 
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={styles.modalButtonTextDescription}
                                    >Lorem Ipsum has been the industry's standard dummy 
                                    text ever </Text> */}
                                </View>
                                {state?.aboutUser ? icons.check()  : icons.plus()}
                            </TouchableOpacity>
                            {
                                state?.aboutUser ? 
                                <Text style={styles.modalButtonTextDescription} >{state?.aboutUser}</Text>
                                :null
                            }
                        </>
                        
                    }
                
                    <TouchableOpacity 
                        onPress={()=>modalsSecondRef.current.showChoseThemeOrderModal()}
                        style={styles.modalButton}
                    >
                        <View style={styles.modalButtonTextContainer}>
                            <Text style={styles.modalButtonTextTitle}>Mövzu seçin</Text>
                            {/* <Text 
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.modalButtonTextDescription}
                            >Lorem Ipsum has been the industry's standard dummy 
                            text ever </Text> */}
                        </View>
                        {state?.theme.value ? icons.check()  : icons.plus()}
                    </TouchableOpacity>
                    {
                        state?.theme?.value ? 
                        <Text style={styles.modalButtonTextDescription} >{state?.theme?.name}</Text>
                        :null
                    }
                   
                    <TouchableOpacity 
                        onPress={()=>openInstructionsModal()}
                        style={styles.modalButton}
                    >
                        <View style={styles.modalButtonTextContainer}>
                            <Text style={styles.modalButtonTextTitle}>Təlimatlar əlavə edin</Text>
                            {/* <Text 
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.modalButtonTextDescription}
                            >Lorem Ipsum has been the industry's standard dummy 
                            text ever </Text> */}
                        </View>
                        {state?.instructions ? icons.check()  : icons.plus()}
                    </TouchableOpacity>
                    {
                        state?.instructions ? 
                        <Text style={styles.modalButtonTextDescription} >{state?.instructions}</Text>
                        :null
                    }
                </View>
                :null
            }
            <WriteAboutYourselfModal
                ref={modalsRef}
                modalTitle={isInstructionsModal ? "Təlimatlarınızı əlavə edin" :"Mənə biraz özündən danış..."}
                isInstructionsModal={isInstructionsModal}
                contentTitle={isInstructionsModal ? "Təlimatlarınızı əlavə edin" :"Mənə biraz özündən danış..."}
                description={isInstructionsModal ? "Təlimatlarınızı əlavə edin" :"Mənə biraz özündən danış..."}
                callBack  ={ (key , value ) => saveDuoModalData(key , value)}
            />
            <ChoseThemeOrderModal
                ref={modalsSecondRef}
                modalTitle={"choose theme"}
                themes={videoThemes}
                callBack  ={(value) => dispatch({theme:value})}
            />
            <FromWhomToModal
            ref={modalsThirdRef}
            modalTitle={"Kimdən Kimə?"}
            callBack  ={(value) => dispatch({fromWhomTo:value})}
            />
        </CommonLayout>

        <OrderButtonComponent
            hideOrderButton={
                (state.fromWhomTo.from || state.aboutUser) &&
                state.theme && 
                state.instructions 
                ?
                false: 
                true 
            }
            containerStyle={{backgroundColor:colors.main}}
            textFontSize={15}
            price={mainProduct?.price}
            activateCallback={true}
            callBack={()=>navigation.navigate("stack" , {
                screen: ORDERCONFIRM , 
                params: {
                    price: mainProduct?.price , 
                    starUserId ,  
                    mainProduct , 
                    orderInfo : {
                        ...state , 
                        isInstructionsModal ,
                        giftToMyself , 
                        gift , 
                    }
                }
            })}
        />
    </>
)};

const styles = StyleSheet.create({
    baseContainer: {
        flexDirection: "row" , 
        justifyContent:"center" , 
        alignItems:"center",
    },
    buttonsContainer: {
        flexDirection: "row" , 
        justifyContent:"space-between",
    } , 
    buttons: {
        paddingVertical: helper.px(16), 
        paddingHorizontal: helper.px(10), 
        justifyContent: "center" , 
        alignItems: "center" , 
        borderRadius: helper.px(5) , 
        backgroundColor: colors.turkuaz , 
        width: "49%",
    }, 
    buttonsText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(14) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko ,
    }, 
    secondbutton: {
        backgroundColor: colors.gray,
    },
    modalButtonsContainer: {
        marginVertical: helper.px(16),
    }, 
    modalButton: {
        paddingHorizontal: helper.px(16) , 
        paddingVertical: helper.px(16) , 
        marginVertical: helper.px(8) ,
        borderWidth: 1 , 
        borderColor: colors.text , 
        borderRadius: 5, 
        flexDirection: "row" , 
        justifyContent: "space-between" , 
        alignItems: "center" ,
    },

    modalButtonTextContainer: {

    }, 
    modalButtonTextTitle: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(12) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko ,
    }, 
    modalButtonTextDescription: {
        fontFamily: helper.fontFamily(""),
        fontWeight:"400" ,  
        fontSize:helper.px(10) , 
        lineHeight: helper.px(12) , 
        color: colors.text ,
    }, 

});

export default helper.mobx(OrderScreen);

