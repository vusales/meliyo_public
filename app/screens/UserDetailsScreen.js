import React , {
    useState  , 
    useEffect , 
    useRef , 
    useMemo ,
    useCallback ,  
} from  "react" ;
import helper from "../helpers/helper";
import colors from "../values/colors";
import icons from "../values/icons";
import {
    View ,  
    Text ,
    TouchableOpacity , 
    FlatList  , 
    StyleSheet ,
    SafeAreaView ,  
    StatusBar ,
    Image ,
    Pressable, 
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import VideoCardComponent from "../components/Cards/VideoCardComponent";
import ScrollHorizontalHomeComponent from "../components/Scrolls/ScrollHorizontalHomeComponent";
import LinearGradient from 'react-native-linear-gradient';
import CommentsCardComponent from "../components/Cards/CommentsCardComponent";
import { data } from "../demoData";
import OrderButtonComponent from "../components/StarUserDetailsScreen/OrderButtonComponnet";
import { useNavigation } from "@react-navigation/native";
import { ALLCOMMENTS, FOLLOWERS, PRODUCTDETAILS , VIEWALL } from "../values/screenNameLists";
import ProductCardComponent from "../components/Cards/ProductCardComponent";
import { useFocusEffect } from "@react-navigation/native";
import { comparer } from "mobx";



const  UserDetailsScreen = ({
    route , 
    stores ,  
}) => {
    const videoRef =  useRef() ; 
    const navigation =  useNavigation(); 
    const [starUserId ,  setStarUserId] =  useState("");  

    const userMainInfo  =  useMemo(()=>stores.userDetailsStore.userInfo ,  [stores.userDetailsStore.userInfo]) ; 
    const videos  =  useMemo(()=>stores.userDetailsStore.videos ,  [stores.userDetailsStore.videos]) ; 
    const reviews  =  useMemo(()=>stores.userDetailsStore.reviews ,  [stores.userDetailsStore.reviews]) ; 
    const mainproduct =   useMemo(()=>stores.userDetailsStore.mainProduct ,  [stores.userDetailsStore.mainProduct]) ; 
    const shareLink =  useMemo(()=>stores.userDetailsStore.shareLink ,  [stores.userDetailsStore.shareLink]) ; 
    

    // translations 
    const followersText =helper.translate("followers"); 
    const commentstexts  =  helper.translate("comments"); 
    const videostexts  =  helper.translate("videos"); 

    useFocusEffect(useCallback(()=>{
        const {params } = route; 
        if(params.id){
            setStarUserId(params.id);  
        }
    }, [])); 

    useEffect(()=>{ 
        if(starUserId){
            getStarInfo();
        } 

        console.log("userMainInfo" , userMainInfo );  
    },  [starUserId]) ; 

    const getStarInfo = async () => {
        console.log("good");
        try {
            let body = {
                id: starUserId , 
            };
            await stores.userDetailsStore.getUserdetails(body) ;    
        } catch (error) {
            if(error) {
                console.log("error while getting star user info:" , error );  
            }
        }
    }

    console.log("userMainInfo" , userMainInfo );  
    console.log("starUserId" , starUserId );  

    return (
        <>
            <CommonLayout
            showDrawerButton={false}
            showSearchComponent={false}
            starDetailsHeader={true}
            starId = {starUserId}
            shareLink={shareLink}
            >
                <View style={styles.starUserTopDescriptionContainer}>
                    <View  style={styles.imageContainer}>
                        <LinearGradient 
                            colors={['#CC75C6', '#5690D6']} 
                            start={{x: 0.055, y: 0.30}} 
                            end={{x: 0.2, y: 1.0}}
                            locations={[0, 0.6]}
                            style={styles.gradientImageContainer}
                        >
                            {
                                userMainInfo.image ? 
                                <Image
                                style={styles.profileImage}
                                source={{uri:  userMainInfo.image }}
                                />
                                :null 
                            }
                        </LinearGradient>
                        <View>
                            <Text 
                            style={styles.starNameText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{userMainInfo.firstname} {userMainInfo.lastname}</Text>
 
                            <Text 
                            style={{...styles.starjobText , marginRight:5}}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            >
                                {
                                    userMainInfo?.categories?.map((item, index) => {
                                        return (
                                            item.name + " " 
                                        );
                                    })
                                }            
                            </Text>
                        </View>
                    </View>
                    {/* <View style={styles.onlineTimeContainer} >
                        <Image
                        style={styles.onlineTimeImage}
                        source={require("../assets/images/icons/cardtimeicon.png")}
                        />
                        <Text style={styles.onlineTimeText}>48 s</Text>
                    </View> */}
                </View>

                <Text style={styles.descriptionText}>{userMainInfo.description}</Text>

                <View style={styles.baseContainer}>
                    <Pressable 
                    style={styles.smallContainer}
                    onPress={()=>  navigation.navigate("stack" , {
                        screen: ALLCOMMENTS , 
                        params: {
                            starUserId
                        }
                    })}
                    >
                        <Text style={styles.infoTitle}>{commentstexts + " "  + userMainInfo.reviewCount } </Text>
                        <View style={styles.iconContainer}>
                            {icons.star(colors.yellow , 10)}
                            <Text style={styles.ratingText}>{userMainInfo.rating}</Text>
                        </View>
                    </Pressable>
                    <View style={styles.divider}></View>
                    <Pressable 
                    onPress={()=> navigation.navigate("stack" ,  {
                        screen: FOLLOWERS , 
                        params: {
                            userId : "" , 
                        }
                    })}
                    style={styles.smallContainer}
                    >
                        <Text style={styles.infoTitle}>{followersText}</Text>
                        <View style={styles.iconContainer}>
                            {icons.heart(colors.error , 10)}
                            <Text style={styles.ratingText}>{userMainInfo.subscriptionCount}</Text>
                        </View>
                    </Pressable>
                </View>

                {
                    videos.length > 0 ? 
                    <ScrollHorizontalHomeComponent
                        iteratingData={videos}
                        title={videostexts}
                        hideViewMore={true}
                        customComponent={
                            ( item  , title , images, id )=>{ 


                                console.log("video item " , item ); 
                                return (
                                    <VideoCardComponent
                                    source={{uri:item.video}}
                                    key={`FilmsTvCardComponent-${title}-${id}`}
                                    poster={ item?.image&&item?.image!==null? item.image : false }
                                    title={ item?.firstname + item?.lastname } 
                                    id={item?.video_id}
                                    // images= {images}
                                    // goDetails ={ () => {
                                    //     if(id) {
                                    //         console.log(id) ; 
                                    //     }else {
                                    //         console.log('sdfbhusgdfv') ;     
                                    //     }
                                    // }}
                                    />
                                )
                            }
                        }
                    />
                    : null 
                }
                
    
                {/* <ScrollHorizontalHomeComponent
                    iteratingData={data.trends.data}
                    title="Məhsullar"
                    hideViewMore={true}
                    customComponent={
                        ( title , images, id ) => 
                        < ProductCardComponent
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
                            width: helper.px(150) ,
                        }}
                        fromFavorites={false}
                        />
                    }
                /> */}

                {
                    reviews?.length > 0 ? 
                    <ScrollHorizontalHomeComponent
                        iteratingData={reviews}
                        title={commentstexts}
                        hideViewMore={false}
                        viewMoreCallBack={()=>  navigation.navigate("stack" , {
                            screen: ALLCOMMENTS , 
                            params: {
                                starUserId
                            }
                        }) }
                        customComponent={
                            (  item  , title , images, id  ) => {

                                console.log("item" , item ); 
                            return ( 
                                <CommentsCardComponent
                                name={item.name}
                                image={{uri:item.image}}
                                speciality={item.date_added}
                                rating={item.rating}
                                description={item.text}
                                containerStyle={{
                                    width:helper.screenWidth - helper.px(32) , 
                                }}
                                />
                            )}
                        }
                    />
                    :null  
                } 

               
                {/* <HeadingComponent
                    title={"Comments"}
                    callback={()=>{
                        navigation.navigate("stack" , {
                            screen: ALLCOMMENTS , 
                            params: {
                                starUserId
                            }
                        })
                    }} 
                    buttonText={"show more"}
                />
                <CommentsCardComponent
                name="some Name"
                image={require("../assets/images/cardImage.png")}
                speciality={"someJob goes here"}
                rating={4}
                description={"some description text goes here!!"}
                /> */}

            </CommonLayout>

            <OrderButtonComponent
            price={mainproduct.price}
            mainProductId={mainproduct.mainProductId}
            mainProduct={mainproduct}
            starUserId={starUserId}
            />
        </>
    ); 
}

const styles=  StyleSheet.create({

    starUserTopDescriptionContainer: {
        flexDirection:"row" , 
        justifyContent: "space-between" ,
        alignItems: "center" , 
        marginVertical: helper.px(24) ,
    }, 
    imageContainer: {
        flexDirection: "row" ,
        alignItems: "center" , 
    },
    gradientImageContainer: {
        paddingHorizontal: helper.px(2) , 
        paddingVertical: helper.px(2) , 
        borderRadius: 100 , 
        marginRight: helper.px(10),
    }, 
    profileImage: {
        width: helper.px(40) , 
        height: helper.px(40) , 
        borderRadius: 100 ,
    }, 
    starNameText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(16) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
    }, 
    starjobText: {
        fontFamily: helper.fontFamily("Medium"), 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
        fontWeight:"500" ,  
    }, 
    onlineTimeContainer:{
        flexDirection:"row" ,
        alignItems:"center",
    }, 
    onlineTimeText: {
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(13) , 
        lineHeight: helper.px(16) , 
        color: colors.blanko , 
        fontWeight:"400" , 
        letterSpacing: -0.011,
    }, 
    onlineTimeImage: {
        width: 10 , 
        height: 15  ,
        marginRight: helper.px(5),
    }, 
    descriptionText: {
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(18) , 
        color: colors.blanko , 
        fontWeight:"400" , 
        marginVertical: helper.px(10),
    }  , 

    // 

    baseContainer : {
        flexDirection: "row" , 
        alignItems: "center" , 
        paddingVertical: helper.px(5) ,
        justifyContent: "space-between" , 
        backgroundColor: colors.gray , 
        borderRadius: 5 , 
        marginVertical: helper.px(16) ,
    } , 

    smallContainer : {
        width: "45%" , 
        justifyContent: "center" , 
        alignItems: "center" ,
        paddingVertical: helper.px(10) ,


    } ,

    infoTitle : {
        fontFamily: helper.fontFamily("Medium"), 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(16) , 
        color: "#727272" ,
        fontWeight:"500" , 
        marginBottom: helper.px(10),
    } ,

    ratingText : {
        fontFamily: helper.fontFamily("Medium"), 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(16) , 
        color: colors.blanko , 
        fontWeight:"500" , 
        marginLeft: helper.px(5) , 
    } ,

    divider: {
        width: 1  ,
        backgroundColor: "#474747" , 
        height: "100%" , 
    }, 
    iconContainer: {
        flexDirection: "row" ,
        alignItems: "baseline",
    }



}); 

export default helper.mobx(UserDetailsScreen) ; 
