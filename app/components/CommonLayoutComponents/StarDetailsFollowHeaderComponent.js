import React, {
    useState , 
    useEffect , 
    useMemo , 
    useRef , 
} from 'react';
import { 
    Text, 
    View , 
    StyleSheet , 
    TouchableOpacity , 
    Share , 

 } from 'react-native';
import colors from '../../values/colors';
import icons from '../../values/icons';
import helper from '../../helpers/helper';
import {cloneDeep}  from "lodash" ; 
import Alert from '../General/Alert';



const StarDetailsFollowHeaderComponent = ({
    stores , 
    hideFollowButton ,
    starId , 
    shareLink , 
    hideReport , 
}) =>{ 

    // refs
    const alertRef =  useRef(); 
    // states 
    const [following ,  setFollowing ] =  useState(false) ; 
    const [showDots , setShowDots ] =  useState(false) ; 
    const [logedin , setLogedin ] =  useState(false) ; 
    // memos
    const memoizedFollowers = useMemo(()=>stores.getFollowersStore.followings , [stores.getFollowersStore.followings] ); 


    useEffect(()=>{
        checkFollowings();  
        checkUserAuth();  
    }, [memoizedFollowers]);

    useEffect(()=>{
        getFollowersAndCheckfollowing();  
    }, []); 


    const report = async () => {
        try {
            if(!starId)  return ; 
        
            await  stores.userDetailsStore.reportUser(starId).then((result)=>{
                if(result){
                   return  alertRef.current.alert( true , "success" ,  "Ulduz haqqında şikayət etdiniz!" ); 
                }else{
                   return  alertRef.current.alert( true , "error" ,  "Xəta baş verdi!" ); 
                }
            }).catch( (error) => alertRef.current.alert( true , "error" ,  "Xəta baş verdi!" )); 

            setShowDots(false);
        } catch (error) {
            if(error) {
                console.log("error in report user function" , error ); 
            }
        }
    }


    const share = async () => {
        try {

            console.log("share shareLink"  , shareLink );  
            const result = await Share.share({
                message: shareLink ?? 'Meliyo star sharing...',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            
        } catch (error) {
            console.log("share error" , error) ; 
        }
    }

    const follow = async () => {
        try {
            if(!starId) return  ; 
            if(!logedin) return alertRef.current.alert( true , "error" ,  "Hesabınıza daxil olmamısınız!Hesabınız yoxdursa qeydiyyatdan kecin!" );  
            let body  = {
                "star_id" : starId
            }; 
            if(!following){
                await stores.getFollowersStore.follow(body).then((result)=>{
                    if(result) setFollowing(true);
                });
            }else {
                await stores.getFollowersStore.unfollow(body).then((result)=>{
                    if(result) setFollowing(false);
                });
            }
        } catch (error) {
            console.log("star folllow error : " ,  error );   
        }
    }

    const getFollowersAndCheckfollowing =  async () => {
        try {
            await stores.getFollowersStore.getFollowers(); 
            checkFollowings();  
        } catch (error) {
            if(error) {
                console.log("error" , error );  
            } 
        }
    }

    const checkFollowings = () => {
        const clonedFollowers =  cloneDeep(memoizedFollowers); 
        let currentStar = clonedFollowers?.find((item) => item.star_id == starId );  
        if(currentStar  && Object.keys(currentStar).length){
            setFollowing(true); 
        }
    }

    const checkUserAuth = async () => {
        try {
            let isloged =  await  helper.isUserLogedIn();  
            if(isloged){
                setLogedin(true); 
            }else {
                setLogedin(false); 
            }       
        } catch (error) {
            if(error) {
                console.log("error" , error);  
            }
        }
    }


return (
    <>
        <Alert
        ref={alertRef}
        />

        <View style={styles.starDetailsHeaderContainer} >
            {
                hideFollowButton ? 
                null 
                :
                <TouchableOpacity 
                onPress={()=>follow()}
                style={following ? {...styles.followButton , backgroundColor: colors.turkuaz } : styles.followButton }
                >
                    <Text style={styles.followButtonText}>{ following ?"Following" : "Follow" }</Text>
                </TouchableOpacity>
            }

            <TouchableOpacity 
            onPress={() => share()}
            style={styles.shareButton }
            >
                {icons.share(colors.text ,  18)}  
            </TouchableOpacity>
            {
                hideReport ?
                null:
                <TouchableOpacity 
                onPress={()=>setShowDots(!showDots)}
                style={styles.dotsButton }
                >
                    {icons.dots(colors.text ,  20)}
                    {
                        showDots ? 
                        <TouchableOpacity
                        style={styles.absoluteButton}
                        onPress={()=>report()}
                        >
                            {icons.flag()}
                            <Text style={styles.absoluteButtonText}>Şikayət et</Text>
                        </TouchableOpacity>
                        :null
                    }
                </TouchableOpacity>
            }
        </View>
    </>
   
)};

const styles = StyleSheet.create({
    absoluteButton:{
        position:"absolute" , 
        backgroundColor: colors.gray , 
        flexDirection:"row" ,
        bottom: -40 ,
        right: 0 , 
        minWidth: helper.px(120) ,
        paddingVertical: helper.px(10) , 
        paddingHorizontal: helper.px(10),
        borderRadius: 5 , 
        justifyContent: "space-around" ,
        alignItems: "center" , 
    } , 
    absoluteButtonText:{
        color: colors.text ,
        fontFamily: helper.fontFamily("Medium") ,  
        marginLeft: helper.px(5),
    } , 
    starDetailsHeaderContainer: {
        flexDirection: "row" , 
        width: "50%" , 
        justifyContent:"flex-end",
        alignItems: "center" ,
    }, 
    followButton:{
        paddingHorizontal: helper.px(20), 
        paddingVertical: helper.px(3), 
        borderRadius: 2 , 
        backgroundColor: colors.gray , 
    } , 
    followButtonText:{
        fontSize: helper.px(12) , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        lineHeight: helper.px(24), 
        color:colors.text , 
    }, 
    shareButton:{
        borderRadius: 2 , 
        width: helper.px(40) , 
        alignItems:"center" ,
        marginLeft: helper.px(5) , 
        height:"100%",
        paddingVertical: helper.px(10),
    } , 
    dotsButton:{
        width: helper.px(40) , 
        alignItems:"center" ,
        marginLeft: helper.px(5) , 
        height:"100%",
        paddingVertical: helper.px(10),
        zIndex: 100000 ,
    }, 
   
});

export default helper.mobx(StarDetailsFollowHeaderComponent);

