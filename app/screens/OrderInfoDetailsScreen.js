import React,  {
    useState , 
    useEffect ,  
    useMemo , 
    useRef , 
} from 'react';
import {
    Text, 
    View ,
    StyleSheet , 
    Image , 
    TouchableOpacity ,
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import CommonLayout from '../layouts/CommonLayout';
import Video from "react-native-video"; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import VideoCardComponent from '../components/Cards/VideoCardComponent';
import Alert from '../components/General/Alert';


const OrderInfoDetailsScreen = ({
    stores , 
    route: {
        params: {
            status ,
            statusId ,
            star ,
            order_id ,  
            sellerImage , 
            starId , 
        }
    },
}) => {

    // refs
    const alertRef = useRef(); 

    // states 
    const [videouri ,  setVideoUri ] =  useState(""); 
    const [video ,  setVideo ] =  useState(null); 

    // memos  
    const orderDetails = useMemo(()=> stores.orderStore.orderDetails, [stores.orderStore.orderDetails]); 

    const addVideo = async () => {
        let options = {
            type:[
                "video/mp4" , 
                "video/mpeg" , 
                "video/ogg" , 
                "video/mp2t" ,
                "video/webm" ,
                "video/3gpp" , 
                "video/3gpp2" , 
            ], 
        }
        try {
            DocumentPicker.pickSingle(options).then(async (result)=>{
                const formData = new FormData();
                formData.append('file', result );
                let resultApi = await stores.videoStore.uploadVideo(formData , order_id ); 
                if(resultApi){
                    setVideoUri(result.uri) ; 
                    setVideo({uri: result.uri});
                    alertRef.current.alert(true, "success" , "Videonuz yükləndi!" );
                }else {
                    alertRef.current.alert(true, "error" , "Xəta baş verdi!" );
                }
            }); 
        } catch (error) {
            console.log("error when adding video: \n " , error ); 
        }
    }

    useEffect(()=>{
        getOrderById() ; 
    },[]); 


    const getOrderById = async () => {
        try {
            if(!order_id) return ; 
            await stores.orderStore.getOrderDetails(order_id); 
        } catch (error) {
            if(error) {
                console.log("error" , error) ; 
            } 
        }
    }

return (
    <>
        <Alert
        ref={alertRef}
        />
        <CommonLayout
            showDrawerButton={false}
            pageName={status}
            showSearchComponent={false}
        >
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.leftContainer}>
                        <Image 
                        source={sellerImage ? {uri: sellerImage } : ""}
                        style={styles.cardImage}
                        /> 
                        <View>
                            <Text 
                            style={styles.titleText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{orderDetails?.firstname} {orderDetails?.lastname}</Text>
                            {/* <Text 
                            style={styles.justText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{"dfhdh"}</Text> */}
                        </View>
                    </View>
                    <View style={styles.rowcon}>
                        <Text style={styles.infoText}>{status}</Text>
                        {icons.dots(colors.yellow , 20)}
                    </View>
                </View>

                <View style={{
                    ...styles.rowcon ,  
                    ...styles.textItemsContainer , 
                    alignItems: "flex-start",
                    }}
                >
                    <View  >
                        <Text style={styles.titleTexts}>{helper.translate("video.order.from.whom.title")}</Text> 
                        <Text style={styles.descriptionTexts}>{orderDetails?.custom_field?.who}</Text> 
                    </View>
                    <View style={{marginHorizontal:helper.px(10)}}>
                        {icons.fromto(colors.placeholderText)}
                    </View>
                    <View >
                        <Text style={styles.titleTexts}>{helper.translate("video.order.to.who.title")}</Text> 
                        <Text style={styles.descriptionTexts}>{orderDetails?.custom_field?.whoe}</Text> 
                    </View>
                </View>

                <View style={styles.textItemsContainer}>
                    <Text style={styles.titleTexts}>{helper.translate("video.order.description.title")}</Text> 
                    <Text style={styles.descriptionTexts}>{orderDetails?.custom_field?.forWhat}</Text> 
                </View>

                <View style={styles.textItemsContainer}>
                    <Text style={styles.titleTexts}>{helper.translate("video.order.theme.title")}</Text> 
                    <Text style={styles.descriptionTexts}>{orderDetails?.custom_field?.videoTheme}</Text> 
                </View>

                <View style={styles.textItemsContainer}>
                    <Text style={styles.titleTexts}>{helper.translate("video.order.info.title")}</Text> 
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionTexts}>{orderDetails?.custom_field?.selfDescription}</Text>
                    </View>
                </View>

                <View style={styles.textItemsContainer}>
                    <Text style={styles.titleTexts}>{helper.translate("video.order.instructions")}</Text> 
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionTexts}>{orderDetails?.comment}</Text>
                    </View>
                </View>
            </View>

            {
                (star && starId == orderDetails?.star_id)
                && ( statusId ==17  || statusId ==20 ) 
                ? 
                <View 
                    style={styles.addVideoStyle}
                >
                    {
                        video !== null ? 
                        <TouchableOpacity
                        // onPress={()=>addVideo()}
                        onPress={()=>console.log("try again")}
                        >
                            <VideoCardComponent
                            source={video}
                            />
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity
                        style={styles.addVideoButton}
                        onPress={()=>addVideo()}
                        > 
                            <View style={styles.cube}>
                                {icons.plus(colors.text ,  12)}
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                :null 
            }
        </CommonLayout>
    </>
   
)};


const styles = StyleSheet.create({
    addVideoButton: {
        width: helper.px(147) ,
        height:helper.px(201) , 
        backgroundColor: colors.gray , 
        borderRadius: 5 , 
        paddingHorizontal:helper.px(3) , 
        paddingVertical: helper.px(3) ,
        justifyContent:"center" , 
        alignItems:"center" ,
    }, 
    cube: {
        borderWidth: .5 ,  
        borderColor: colors.text , 
        borderRadius: 5 , 
        paddingVertical: helper.px(10) , 
        paddingHorizontal: helper.px(10) ,
    } , 
    titleTexts: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(16) , 
        lineHeight:helper.px(20) , 
        color:colors.second , 
        letterSpacing: 2 , 
    } , 
    descriptionTexts: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(14) , 
        lineHeight:helper.px(20) , 
        color: "#6F6F70" , 
        letterSpacing: 1 , 
    }, 
    textItemsContainer:{
        marginVertical: helper.px(14)
    } , 
    container:{
        borderRadius: 5 , 
        paddingVertical: helper.px(16) ,
        paddingHorizontal: helper.px(16) , 
        backgroundColor: colors.gray ,
        marginVertical: helper.px(24),
    }, 
    rowcon:{
        flexDirection: "row" , 
        alignItems: "center" ,
    } , 
    leftContainer:{
        flexDirection: "row" ,
    },
    upper: {
        flexDirection:"row" , 
        justifyContent:'space-between',
        alignItems:"flex-start" ,
    }, 
    titleText:{
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(16) , 
        lineHeight:helper.px(22) , 
        color:colors.blanko , 
        letterSpacing: .7 , 
    } ,
    justText:{
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(14) , 
        lineHeight:helper.px(22) , 
        color:colors.text , 
        letterSpacing: -0.408 , 
    } ,
    cardImage:{
        width: helper.px(45) , 
        height: helper.px(45) , 
        borderRadius: 100 , 
        marginRight: helper.px(10) ,
    } ,
    infoText: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(13) , 
        lineHeight:helper.px(18) , 
        color:colors.text , 
        marginRight: helper.px(5),
    },
    descriptionView : {
        borderRadius: 5 , 
        borderWidth: .5 , 
        borderColor : "#4F4F4F" , 
        backgroundColor: "#171717" , 
        paddingVertical: helper.px(16) , 
        paddingHorizontal: helper.px(16) , 
        marginTop: helper.px(10) ,
    }
    
});

export default helper.mobx(OrderInfoDetailsScreen);
