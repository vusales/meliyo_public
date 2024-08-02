import React from "react" ; 
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
import LinearGradient from 'react-native-linear-gradient';


const FilmsTvCardComponent = ({
    title, 
    images , 
    goDetails ,
}) => {
    return (
        <TouchableOpacity
         onPress={()=>goDetails()}
        >
            <LinearGradient 
            colors={['#CC75C6', '#5690D6']} 
            start={{x: 0.055, y: 0.30}} 
            end={{x: 0.2, y: 1.0}}
            locations={[0, 0.6]}
            style={styles.container}
            >
                <View style={styles.imageContainer}>
                    {
                        images?.slice(0, 3).map(( imagesrc ,  index ) =>{ 
                            let customstyle =  {} ; 
                            if(index == 0 ){
                                customstyle = {
                                    position: "relative" , 
                                    left: 10 ,
                                };  
                            }else if (index == 2 ){
                                customstyle = {
                                    position: "relative" , 
                                    right: 10 ,
                                    zIndex: -1 , 
                                }; 
                            }
                        return(
                            <Image 
                            key={`image-${index}`}
                            source={imagesrc} 
                            style={{...styles.image ,  ...customstyle }}
                            />
                        )})
                    }
                </View>
                <Text 
                style={styles.titleText}
                numberOfLines={1}
                ellipsizeMode="tail"
                >{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    ); 
}

const styles=  StyleSheet.create({
    container: {
        width:helper.px(164), 
        height:helper.px(119), 
        borderRadius: helper.px(5) , 
        // backgroundColor: "red",
        justifyContent: "center" ,
        alignItems: "center" ,
    }, 

    imageContainer: {
        flexDirection:"row" , 
    }, 

    image: {
        width: helper.px(40) , 
        height: helper.px(40) , 
    }, 

    titleText: {
        fontFamily: helper.fontFamily('') , 
        fontWeight: "400" , 
        fontSize: helper.px(13), 
        lineHeight: helper.px(16), 
        color: colors.main , 
        marginTop: helper.px(20)  ,
    }, 
    linearGradient: {

    }, 



}); 


export default FilmsTvCardComponent ; 