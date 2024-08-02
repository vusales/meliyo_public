import React , {
    useState ,
    useEffect ,  
    useCallback ,  
    useMemo ,  
} from  "react" ;
import {
    View ,  
    Text ,
    StyleSheet , 
    TouchableOpacity , 
    SafeAreaView , 
    FlatList , 
    StatusBar , 
}from "react-native" ; 
import { PRODUCTDETAILS, PROFILE } from "../values/screenNameLists";
import ProfileIntroComponent from "../components/Profile/ProfileIntroComponent";
import icons from "../values/icons";
import helper from "../helpers/helper";
import colors from "../values/colors";
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import VideoCardComponent from "../components/Cards/VideoCardComponent";
import ProductCardComponent from "../components/Cards/ProductCardComponent";
import OrderInfoCardComponent from "../components/Cards/OrderInfoCardComponent";
import OrderFilterButtonsComponent from "../components/Order/OrderFilterButtonsComponent";
import { useNavigation } from "@react-navigation/native";
import { ORDERINFODETAILS,  ADDPRODUCT ,  SEARCHOME ,  CART ,LOGIN  } from "../values/screenNameLists";
import Loader from "../components/General/Loader";
import NoProductComponent from "../components/General/NoProductComponent";
import { useFocusEffect } from "@react-navigation/native";
import {cloneDeep}  from "lodash" ; 
import i18next from "i18next";




const ProfileScreen = ({
    stores , 
}) => {
    const navigation  =  useNavigation() ; 

    // memos 
    const profileInfo =  useMemo(()=>stores.profileStore.profileInfo ,  [stores.profileStore.profileInfo]); 
    const videoOrders =  useMemo(()=> stores.orderStore.videoOrders, [stores.orderStore.videoOrders]);
    const starVideoOrders = useMemo(()=> stores.orderStore.starVideoOrders, [stores.orderStore.starVideoOrders]);

    const orderStatuses =  useMemo(()=> stores.orderStore.videoOrderStatusArray, [stores.orderStore.videoOrderStatusArray]);

    const startsellingtext =  helper.translate("startselling"); 
    const startorderText =  helper.translate("startorder"); 
    // for loader 
    const [ loader , setLoader ] = useState(true); 
    const [ notLoggedIn , setNotLoggedIn ] = useState(true) ; 
    // isStar state define star and user profile screen design
    const  [ isStar ,  setStar ]  =  useState(false) ; 
    const  [ starProducts ,  setStarProducts ]  =  useState(false) ; // if you have to make strProducts true for showing products then setkey(2) also ; 
    const [key, setKey] = useState(1);

    // for videoorder statuses 
    const [videoArray , setVideoArray ] = useState([]) ; 
    const [ choosenStatusId , setChoosenStatusId ] = useState(0); 


    useFocusEffect(useCallback(()=>{
        defineStar(); 
        getCustomerInfo(); 
        getVideoOrders(); 
    }, []));

    useEffect(()=>{
        setDataFilter();  
    },[choosenStatusId]);
  

    const setDataFilter = () => {
        const orders = cloneDeep(videoOrders);  
        const starOrders = cloneDeep(starVideoOrders);  
        let  allData ;   
    
        // if(profileInfo?.isStar){
          allData  = [...orders , ...starOrders] ; 
        // }else {
        //   allData  = orders ; 
        // }

        console.log("starOrders"  ,  starOrders);
        console.log("allData"  ,  allData);
    
        if(choosenStatusId == 0 ) {
          setVideoArray([...videoOrders, ...starVideoOrders ]); 
          return ; 
        }else if(choosenStatusId == "-"){
          setVideoArray(videoOrders); 
          return ; 
        }else if(choosenStatusId == "+"){
          setVideoArray(starVideoOrders); 
          return ; 
        }
    
        const filteredData = allData.filter((item)=> item.order_status_id == choosenStatusId ) ; 
        setVideoArray(filteredData);  
    }

    const defineStar  = async () => {
        try {
            await helper.getAllKeysFromAsyncstorage();
            let userData  =  await helper.getdataFromAsyncStorage("@user_data");  
            userData = JSON.parse(userData); 

            if(!userData) {
                setLoader(false);
                setNotLoggedIn(true); 
                return ; 
            }

            if(userData?.isStar) {
                setStar(true);
                setKey(1); 
            }else {
                setStar(false);
                setKey(2); 
            } 

            setNotLoggedIn(false);
            setTimeout(()=> setLoader(false) ,1000) ;   
        } catch (error) {
            console.log("error in defining customer"  , error );     
        }
    }

    const getCustomerInfo = async () => {
        try {
            await stores.profileStore.getCustomer(); 
        } catch (error) {
            if(error) {
                console.log("get customer info error " , error ); 
            }
        }
    }

    const getVideoOrders =  async () => {
        try {
            await stores.orderStore.getOrders(); 
            await stores.orderStore.getOrderStatus(); 
            await stores.orderStore.getStarOrders(); 
            setVideoArray([
                ...stores.orderStore.videoOrders , 
                ...stores.orderStore.starVideoOrders 
            ]); 
             
        } catch (error) {
            if(error) {
                console.log("getVideoorders screen error" , error ) ;  
            }
            
        }
    }

    // flatlist functions
    const _renderItem  = (item ) => {
        // when starProducts is false then only return orderCards 
        // else detect item.id and if there is no item id then return button first
        // this rules are effective when isStar is true 

        if(!starProducts && isStar ){
            return (
                <>
                    <OrderInfoCardComponent
                    name={item?.sellerName}
                    image={{ uri: item?.sellerImage }}
                    speciality={item?.categories ?? []}
                    gradientColors={false}
                    infoText={item?.order_status}
                    infoIcon={icons.dots(colors.yellowsecond , 15 )}
                    giftType={item?.videoTheme?.text}
                    callBack={()=>navigation.navigate("stack" , {
                        screen : ORDERINFODETAILS , 
                        params: {
                            status : item.order_status , 
                            star: isStar , 
                            order_id: item.order_id , 
                            sellerImage: item?.sellerImage ,
                        }
                    })}
                    />
                </>
            );
        }

        if(item.id){
            return(
                <View
                style={isStar ? styles.starFlatItem :styles.flatItem}
                >
                    {
                        isStar? 
                        <ProductCardComponent
                        image={require("../assets/images/productCardImage.png")}
                        productName ={"hsvajdvh hgbadkhs"}  
                        price ={20} 
                        discountPrice ={50}
                        callback={()=>navigation.navigate("stack" , {
                            screen: PRODUCTDETAILS , 
                            params: {
                                productId : 0 , 
                                productName: "SOME product"
                            }
                        })}
                        containerstyle={{
                            width: helper.px(170) ,
                        }}
                        />
                        :
                        <VideoCardComponent
                        source={require("../assets/videos/VID_20230504_140346.mp4")}
                        />
                    }
                </View>
            ); 
        }else{
            return(
                <View
                style={[isStar ? styles.starFlatItem :styles.flatItem ,  {
                    alignItems:"center" , 
                    justifyContent: "center" ,
                }]}
                >
                    {
                        isStar 
                        ? 
                        <TouchableOpacity
                        onPress={()=>navigation.navigate("stack" ,  {
                            screen: ADDPRODUCT ,
                        })}
                        // style={{
                        //     ...styles.makeOrderCard ,
                        // }}
                        style={styles.newButton}
                        >
                            <View 
                            // style={styles.userMakeOrdButton}
                            >
                                <Text style={styles.newButtonText}>{startsellingtext}</Text>
                            </View>
                        </TouchableOpacity>  
                        :
                        <TouchableOpacity
                        style={{
                            ...styles.newButton ,
                            width:helper.px(145) , 
                            height:helper.px(145) , 
    
                        }}
                        onPress={()=>navigation.navigate( "stack" , {
                            screen: "tab" , 
                            params: {
                                screen: SEARCHOME +"stack" , 
                            }
                        })}
                        > 
                            <Text style={styles.newButtonText}>{startorderText}</Text>
                        </TouchableOpacity>   
                    }
                </View>
            ); 
        }
    }

    const _headerComponent  =() => {
        return (
            <>
                <HeaderComponent
                showDrawerButton={true}
                pageName={helper.translate("profilePagetitle")}
                showSearchComponent={false}
                />
                <ProfileIntroComponent
                name={`${profileInfo.firstname||""} ${profileInfo.lastname||""}`}
                username={""}
                image={profileInfo?.image && profileInfo?.image!=null ? {uri: profileInfo?.image}: false }
                star={isStar}
                followers={20}
                soldProducts={1}
                suspendCallback={true}
                profileId = {profileInfo.customer_id}
                />
                {
                    isStar ?
                    <View style={styles.tabContainer}>
                        <View style={styles.buttonsContainer}>
                            {/* products button */}
                            {/* <View style={styles.buttonItem}>
                                <TouchableOpacity 
                                onPress={()=>{
                                    setStarProducts(true);
                                    setKey(2);
                                }}
                                style={styles.tabButton}
                                >
                                    {icons.shoppingBag(colors.blanko ,  20)}
                                    <Text style={styles.tabButtonText}>{helper.translate("myProducts")}</Text>
                                </TouchableOpacity>
                                {
                                    starProducts ? 
                                    <LinearGradient 
                                    colors={['#CC75C6', '#5690D6']} 
                                    start={{x: 0.055, y: 0.30}} 
                                    end={{x: 0.2, y: 1.0}}
                                    locations={[0, 0.6]}
                                    style={styles.gradient}
                                    ></LinearGradient>
                                    :
                                    <View style={styles.gradient}></View>
                                }
                            </View> */}
                            <View style={styles.buttonItem}>
                                <TouchableOpacity 
                                onPress={()=>{
                                    setStarProducts(false); 
                                    setKey(1);
                                }}
                                style={styles.tabButton}>
                                    {icons.video()}
                                    <Text style={styles.tabButtonText}>{helper.translate("videoorderPageTitle")}</Text>
                                </TouchableOpacity>
                                {
                                    starProducts ? 
                                    <View style={styles.gradient}></View>
                                    :
                                    <LinearGradient 
                                    colors={['#CC75C6', '#5690D6']} 
                                    start={{x: 0.055, y: 0.30}} 
                                    end={{x: 0.2, y: 1.0}}
                                    locations={[0, 0.6]}
                                    style={styles.gradient}
                                    ></LinearGradient>
                                }
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.tabContainer}>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonItem}>
                                <TouchableOpacity style={styles.tabButton}>
                                    {icons.video()}
                                    <Text style={styles.tabButtonText}>{helper.translate("purchaisedVideos")}</Text>
                                </TouchableOpacity>
                                <LinearGradient 
                                    colors={['#CC75C6', '#5690D6']} 
                                    start={{x: 0.055, y: 0.30}} 
                                    end={{x: 0.2, y: 1.0}}
                                    locations={[0, 0.6]}
                                    style={styles.gradient}
                                ></LinearGradient>
                            </View>
                            {/* products buton */}
                            {/* <View style={styles.buttonItem}>
                                <TouchableOpacity 
                                onPress={()=>navigation.navigate(CART)}
                                style={styles.tabButton}
                                >
                                    {icons.shoppingBag(colors.blanko ,  20)}
                                    <Text style={styles.tabButtonText}>{helper.translate("cartPageTitle")}</Text>
                                </TouchableOpacity>
                                <View style={styles.gradient}></View>
                            </View> */}
                        </View>
                    </View>
                }

                {
                    isStar&&!starProducts ? 
                    <OrderFilterButtonsComponent
                        data={[
                            {
                            name: helper.translate("all"),
                            order_status_id: '0' , 
                            }, 
                            {
                            name: helper.translate("my.orders"),
                            order_status_id: '-' , 
                            },
                            {
                            name: helper.translate("incoming.orders"),
                            order_status_id: '+' , 
                            },
                            ...orderStatuses , 
                        ]}
                        callBack={(id) => setChoosenStatusId(id) }
                        choosenButton={choosenStatusId}
                    />
                    :null
                }
            </>
        ) ; 
    }

    const _emptyComponnet = () => {
        return(
            <View style={{
                flex:1 ,
                // paddingHorizontal:16 , 
                paddingVertical:16, 
                justifyContent: "center" , 
                }}>
                <NoProductComponent
                text={i18next.t("noorder")}
                hideButton={true}
                />
            </View>
        ) 
    }

   
    return (
        <SafeAreaView style={styles.safeareviewdesign}>
            <StatusBar 
            translucent={false}
            backgroundColor={colors.main}
            /> 
            {
                loader ? 
                <Loader/>
                :(
                    notLoggedIn ? 
                    <View style={{
                        flex:1 ,
                        paddingHorizontal:16 , 
                        paddingVertical:16, 
                        justifyContent: "center" , 
                        }}>
                        <NoProductComponent
                            text={i18next.t("notlogged")}
                            hideButton={false}
                            callBack={()=>{navigation.navigate(LOGIN)}}
                            buttonText="Giriş edin!"
                        />
                    </View>
                    :
                    <FlatList
                    data={ isStar ? videoArray : [] }
                    key={key}
                    keyExtractor={(item , index ) => index + "profile"}
                    renderItem={({item})=>_renderItem(item)}
                    ListHeaderComponent={()=>_headerComponent()}
                    ListEmptyComponent={()=>_emptyComponnet()}
                    horizontal={false}
                    numColumns={key}
                    style={styles.flat}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    // makeOrderCard starts 
    makeOrderCard: {
        width: helper.px(147) , 
        height: helper.px(201) , 
        borderRadius: helper.px(5) ,
        justifyContent:"center" ,
        alignItems: "center" ,  
    } , 
    newButton : {
        width: helper.px(170) , 
        height: helper.px(170) , 
        borderRadius: 100 , 
        backgroundColor: colors.gray ,  
        alignItems: "center" ,  
        justifyContent: "center" , 
    } ,  
    newButtonText: {
        fontFamily: helper.fontFamily("Bold") ,
        fontSize: helper.px(16) ,
        fontWeight: "600" , 
        color:colors.second , 
        textAlign:"center" ,
        lineHeight:helper.px(22),
    } ,  
    userMakeOrdText: {
        fontFamily: helper.fontFamily("Bold") ,
        fontSize: helper.px(9) ,
        fontWeight: "600" , 
        color:colors.blanko , 
        textAlign:"center" ,
        lineHeight:helper.px(12),
        marginVertical: helper.px(10) ,
    }, 

    userMakeOrdButton: {
        width: helper.px(101) , 
        backgroundColor:colors.blanko , 
        borderRadius: 3 , 
        paddingVertical: 5 , 
        paddingHorizontal: 5 , 
        alignItems:"center",
    }, 

    userMakeOrdButtonText: {
        fontFamily: helper.fontFamily("Bold") ,
        fontSize: helper.px(9) ,
        fontWeight: "600" , 
        color:colors.main , 
        textAlign:"center" ,
        lineHeight:helper.px(12),

    }, 
    // makeOrderCards ends


    safeareviewdesign: {
        flex: 1 , 
        backgroundColor: colors.main ,  
    }, 
    flatlist:{
        paddingHorizontal: helper.px(16),
    } , 
    contentContainer: {
        paddingHorizontal: helper.px(16),
    },
    // columnWrapper: {
    //     justifyContent: 'space-between',
    //     marginBottom: helper.px(32),
    // },
    flatItem: {
        paddingHorizontal: helper.px(16),
        paddingVertical: helper.px(10),
    }, 
    starFlatItem:{
        paddingHorizontal: helper.px(5),
        paddingBottom: helper.px(10),
    }, 
    tabContainer: {
        marginVertical: helper.px(24) ,
    } , 

    buttonsContainer: {
        flexDirection:'row' , 
        alignItems:"center" , 
        justifyContent:"space-between" ,
    } , 

    buttonItem: {
        width: "49%" , 
    }, 

    tabButton: {
        flexDirection:"row", 
        width:"100%" , 
        justifyContent:"center" ,
        alignItems:"center" ,
    } , 

    tabButtonText:{
        fontFamily: helper.fontFamily("Medium") ,
        fontSize: helper.px(14) ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        color:colors.text , 
        marginLeft: helper.px(8) , 
    } , 

    gradient :{
        height: 1, 
        marginTop: helper.px(10) ,
    } , 
});


export default helper.mobx(ProfileScreen); 