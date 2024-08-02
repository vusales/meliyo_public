import React, {
    useRef , 
    useState , 
} from 'react';
import { 
    Text, 
    View ,
    StyleSheet , 
    TouchableOpacity , 
    ActivityIndicator ,  
 
} from 'react-native';
import Video from 'react-native-video';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';
import { useNavigation } from '@react-navigation/native';
import { FULLSCREENVIDEO } from '../../values/screenNameLists';


const VideoCardComponent = ({
    source , 
    poster ,  
    title , 
    id ,  
}) =>{ 
    const videoRef = useRef(null); 
    const navigation =  useNavigation(); 
    const [fullScreenVideo ,  setFullScreenVideo ] =  useState(false) ; 
    const [showVideo ,  setShowingVideo ] =  useState(false) ; 

    const goToFullScreenVideo = () => {
        if(source){
            navigation.navigate("stack" ,  {
                screen: FULLSCREENVIDEO , 
                params: {
                    source: source ,  
                    title: title , 
                    poster: poster , 
                    id , 
                }, 
            }); 
        }
    }

    return(
        <TouchableOpacity 
        onPress={()=>goToFullScreenVideo()}
        style={styles.videoContainer }
        >
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

            <Video
                source={source}   
                ref={videoRef}  
                style={styles.backgroundVideo} 
                // onLoadStart={()=>setShowingVideo(false)}
                onReadyForDisplay={(object)=>{
                    setShowingVideo(true);
                }}
                onBuffer={(object)=>{
                    setShowingVideo(true);
                }}                
                // onError={this.videoError}               
                controls={false}
                paused={false}
                muted
                fullscreenOrientation="portrait"
                hideShutterView={true}
                repeat
                resizeMode="cover"
                poster={poster}
                bufferConfig={{
                    minBufferMs: 1000,
                    maxBufferMs: 1000,
                    bufferForPlaybackMs: 1000,
                    bufferForPlaybackAfterRebufferMs: 1000
                }}
            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    videoContainer:{
        width: helper.px(147) ,
        height:helper.px(201) , 
        backgroundColor: colors.gray , 
        borderRadius: 5 , 
        paddingHorizontal:helper.px(3) , 
        paddingVertical: helper.px(3) ,
        justifyContent:"center" , 
        alignItems:"center" ,
    }, 
    backgroundVideo:{
        width: "100%" , 
        height:"100%" , 
        // width: helper.px(147) ,
        // height:helper.px(201) , 
        borderRadius: 5 , 
        // aspectRatio: ASPECT_RATIO,
    }, 
    activityContainer:{
        ...StyleSheet.absoluteFill , 
        top: "49%",
        bottom: "50%" , 
    }, 


});
export default VideoCardComponent;
