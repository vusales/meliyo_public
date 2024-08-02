import React , {
    useState ,
    useMemo , 
    useEffect ,  
} from "react" ; 
import {
    View ,  
    Text , 
    StyleSheet , 
    Image ,
    TouchableOpacity , 
} from "react-native"; 
import helper from "../../helpers/helper";
import colors from "../../values/colors";
import icons from "../../values/icons";
import { Rating } from 'react-native-ratings';


const FollowCardComponent = ({
    stores, 
    image ,
    name , 
    speciality , 
    followers , 
    rating , 
    comments , 
    callback , 
    containerStyle , 
    reviewCount , 
    starId , 
    subscribers , 
}) => {

    const [ follow , setFollow ] =  useState(true) ; 

    useEffect(()=>{
        setFollow(true); 
    }, []);

    const handleFollowing = async () => {
        try {
            if(!starId) return  ; 
            let body  = {
                "star_id" : starId
            }; 
            if(!follow){
                await stores.getFollowersStore.follow(body).then((result)=>{
                    if(result) setFollow(true);
                });

            }else {
                await stores.getFollowersStore.unfollow(body).then((result)=>{
                    if(result) setFollow(false);
                });
            }
        } catch (error) {
            console.log("star folllow error : " ,  error );   
        }
    }

    return (
        <TouchableOpacity
        onPress={()=>callback()}
        >
            <View style={containerStyle ? {
               ...styles.followCardContainer , 
                ...containerStyle ,
            }:styles.followCardContainer}>
                <View style={styles.contain}>
                    <View style={styles.leftContainer}>
                        <Image 
                        source={image ?? require("../../assets/images/cardImage.png")}
                        style={styles.cardImage}
                        /> 
                        <View>
                            <Text 
                            style={styles.titleText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{name ?? ""}</Text>
                            <Text 
                            style={styles.justText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{speciality??""}</Text>
                        </View>
                    </View>
                    <View style={styles.rigthContainer}>
                        <View>
                            <Text style={styles.justText}>{helper.translate("followers")}</Text>
                            <Text style={styles.justText}>{followers ?? 0 }</Text>
                        </View>
                        <View>
                            <Text style={styles.justText}>{helper.translate("comments")}</Text>
                            <Text style={styles.justText}>{ reviewCount ?? 0 }</Text>
                        </View>
                        <View>
                            <Text style={styles.justText}>{helper.translate("ratings")}</Text>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                startingValue={rating ?? 1 }
                                showRating={false}
                                readonly={true}
                                ratingBackgroundColor={colors.text}
                                tintColor={colors.gray}
                                imageSize={10}
                                style={{marginTop: 6}}
                            />
                        </View>
                    </View>
                </View>
                {
                    subscribers ? 
                    null : 
                    <TouchableOpacity 
                    onPress={()=>handleFollowing() }
                    style={follow ? styles.followButton : {...styles.followButton ,  backgroundColor: "red"}}
                    >
                        <Text style={styles.followButtonText} >{ follow ? helper.translate("unFollow") : helper.translate("follow") }</Text>
                    </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles =  StyleSheet.create({
    followCardContainer: {
        backgroundColor: colors.gray , 
        paddingVertical: helper.px(16) , 
        paddingHorizontal: helper.px(16) , 
        borderRadius: helper.px(5) , 
        flexDirection: "row"  ,
        justifyContent: "space-between" ,
        marginBottom: helper.px(16) ,
    }, 
    contain: {
        width: "60%",
    },
    leftContainer:{
        flexDirection: "row" ,
        marginBottom: helper.px(16) ,
    },
    cardImage:{
        width: helper.px(38) , 
        height: helper.px(38) , 
        borderRadius: 100 , 
        marginRight: helper.px(10) ,
    } ,
    titleText:{
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(15) , 
        lineHeight:helper.px(18) , 
        color:colors.blanko , 
        letterSpacing: -0.408 , 
    } ,
    justText:{
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(13) , 
        lineHeight:helper.px(18) , 
        color:colors.text , 
        letterSpacing: -0.408 , 
    } ,
    followButton:{
        borderRadius: 2,    
        // height: helper.px(18) , 
        height: helper.px(25) , 
        backgroundColor: colors.turkuaz ,  
        justifyContent: "center" , 
        alignItems: "center" , 
        // paddingHorizontal: helper.px(24) ,
        paddingHorizontal: helper.px(14) ,
        marginTop: 3 , 
    } ,
    followButtonText:{
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(12) , 
        lineHeight:helper.px(14) , 
        color:colors.text ,
    } ,
    rigthContainer:{
        flexDirection: "row" , 
        justifyContent: "space-between" ,
    } ,
}); 


export default helper.mobx(FollowCardComponent);