import React , {
    useEffect , 
    useState , 
    useRef ,  
    useMemo  , 
}from 'react';
import { 
    Text, 
    View, 
    SafeAreaView , 
    StatusBar , 
    StyleSheet ,  
    ActivityIndicator , 
} from 'react-native';
import icons from '../values/icons';
import helper from '../helpers/helper';
import colors from '../values/colors';
import Video from 'react-native-video'; 
import HeaderComponent from '../components/CommonLayoutComponents/HeaderComponent';
import { useNavigation } from '@react-navigation/native';
import { SEARCHOME } from '../values/screenNameLists';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VideoDescriptionModal from '../modals/VideoDetailsModals/VideoDescriptionModal';
import VideoCommentModal from '../modals/VideoDetailsModals/VideoCommentModal';



const FullScreenVideo = ({
    route , 
    stores , 
}) =>{ 

    // nav
    const navigation =  useNavigation(); 

    // refs
    const videoRef = useRef(null); 
    const commentsModalRef  = useRef(); 
    const videodescriptionModalRef =  useRef(); 

    // states
    const [ videoSource ,  setVideoSource ]  =  useState(""); 
    const [showVideo ,  setShowingVideo ] =  useState(false) ; 
    const [pause ,  setPause ] =  useState(false) ; 
    const [mute ,  setMute ] =  useState(false) ; 

    // memos
    const videoDetails = useMemo(()=>stores.videoStore.videoDetails, [stores.videoStore.videoDetails]); 

    useEffect(()=>{
        if(route?.params?.source || route?.params?.id ){
            setVideoSource(route?.params?.source); 
            getVideoShareLink(route?.params?.id); 
        }else {
            navigation.navigate("stack" ,  {
                screen: SEARCHOME ,  
            }); 
        }
    } , []); 


    const getVideoShareLink = async (id) => {
        try {
            let body = {
                video_id:  id  , 
            }
            await stores.videoStore.getVideo(body); 
        } catch (error) {
            if(error) {
                console.log("error" , error ) ; 
            }
        }
    }

    return (
        <SafeAreaView style={styles.base}>
            <StatusBar /> 
            <View style={styles.container}>
                {/* absolute control buttons container */}
                <View 
                style={styles.absoluteContainer}
                >
                    <HeaderComponent
                    showDrawerButton={false}
                    starDetailsHeader={true}
                    pageName={videoDetails?.firstname + videoDetails?.lastname || route?.params?.title}
                    hideFollowButton={true}
                    shareLink={videoDetails?.video_link}
                    hideReport={true}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={styles.videoControlButtons} >
                            <TouchableOpacity
                            style={styles.controlButtons}
                            onPress={()=>setPause(!pause)}
                            >
                                {
                                    pause ? 
                                    icons.play()
                                    :
                                    icons.pause()
                                }
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.controlButtons}
                            onPress={()=>setMute(!mute)}
                            >
                                {
                                    mute 
                                    ? 
                                    icons.mute(colors.blanko ,  25 ) 
                                    : 
                                    icons.unmute(colors.blanko ,  25 ) 
                                }
                            </TouchableOpacity>
                        </View>

                        {/*  dont delete  */}
                        {/* <View style={styles.videoDetailsContainer}>
                            < View style={styles.detailsButtonView} >
                                <TouchableOpacity
                                style={styles.controlButtons}
                                onPress={()=>{
                                    commentsModalRef.current.showModal(); 
                                }}
                                >
                                    {
                                        icons.comment(colors.blanko , 24)
                                    }
                                </TouchableOpacity>
                                <Text style={styles.detailsText}>Comments</Text>
                            </View>

                            <View style={styles.detailsButtonView} >
                                <TouchableOpacity
                                style={styles.controlButtons}
                                onPress={()=>{
                                    videodescriptionModalRef.current.showModal(); 
                                }}
                                >
                                    {
                                        icons.info(colors.blanko , 24)
                                    }
                                </TouchableOpacity>
                                <Text style={styles.detailsText}>Info</Text>
                            </View>
                        </View> */}
                    </View>
                </View>

                {/* Video */}
                {
                    videoSource? 
                    <Video
                        source={ videoSource || videoDetails?.video }   
                        ref={videoRef}  
                        style={styles.backgroundVideo} 
                        poster={videoDetails?.image || route?.params?.poster }
                        onReadyForDisplay={(object)=>{
                            setShowingVideo(true);
                        }}
                        onBuffer={(object)=>{
                            setShowingVideo(true);
                        }}                
                        // onError={this.videoError}               
                        controls={false}
                        paused={pause}
                        muted={mute}
                        loop={true}
                        fullscreenOrientation="portrait"
                        hideShutterView={true}
                        repeat
                        resizeMode="cover"
                        bufferConfig={{
                            minBufferMs: 1000,
                            maxBufferMs: 1000,
                            bufferForPlaybackMs: 1000,
                            bufferForPlaybackAfterRebufferMs: 1000
                        }}
                    /> 
                    :null 
                } 


                {/* Loader */}
                {
                    showVideo ?
                    null 
                    :
                    <View style={styles.activityContainer}>
                        <ActivityIndicator
                        size={"large"}
                        color={colors.second}
                        />
                    </View>
                }


                {/* Modals */}
                <VideoDescriptionModal
                description={"some video description"}
                ref={videodescriptionModalRef}
                />

                <VideoCommentModal
                videoId={"5"}
                ref={commentsModalRef}
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    base: {
        flex:1 ,  
        backgroundColor: colors.main ,  
       
    },  
    container:{
        flex: 1 , 
    }, 
    absoluteContainer: {
        ...StyleSheet.absoluteFillObject ,  
        paddingHorizontal: helper.px(16) ,  
        paddingVertical: helper.px(10) ,
        zIndex: 100000 ,  
        justifyContent: "space-between" ,  
    } ,
    bottomContainer: {
        flexDirection: "row" , 
        justifyContent: "space-between" , 
        alignItems: "flex-end" ,
    } , 
    backgroundVideo : {
        flex:1 , 
        width: helper.screenWidth , 
        zIndex: 0 ,  
    } , 
    activityContainer:{
        ...StyleSheet.absoluteFill , 
        top: "50%",
        bottom: "50%" , 
    }, 
    videoDetailsContainer: {
        // height: helper.screenHeight/2 , 
        // width: helper.px(60) ,
        alignItems:"center" , 
    } , 
    videoControlButtons: {
        flexDirection:"row" , 
    }, 
    controlButtons : {
        width: helper.px(40) , 
        height: helper.px(40) ,  
        justifyContent:"center" , 
        alignItems:"center" , 
    }, 
    detailsButtonView: {
        alignItems: "center" ,
        marginBottom: helper.px(10) , 
    }, 
    detailsText: {
        fontFamily: helper.fontFamily("Bold"), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(14) , 
        color: colors.blanko , 
        fontWeight:"500" ,  
    }    
});

export default helper.mobx(FullScreenVideo);
