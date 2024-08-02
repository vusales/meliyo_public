import React , {ReactNode} from "react" ; 
import {
    View , 
    Text , 
    StyleSheet , 
    TouchableWithoutFeedback , 
    ImageBackground, 
    TextBase, 
    Image, 
    TouchableOpacity,
} from "react-native"; 
import colors from "../../values/colors";
import icons from "../../values/icons";
import helper from "../../helpers/helper";


const CategoriesButtonComponent = ({
    image ,  
    callBack , 
    categoryName , 
    color , 
}) => {

    console.log(color); 

    return (
        <TouchableOpacity 
            onPress={()=>callBack()}
            style={color ? { ...styles.button ,  backgroundColor: color } :styles.button}
        >
            <View style={styles.textView}>
                <Text style={styles.justText}>{categoryName ?? ""}</Text>
            </View>
            <View style={styles.imageView}>
                {
                    image? 
                    <Image 
                    source={{uri:image}}
                    style={styles.image} 
                    />
                    :null 
                } 
            </View>
        </TouchableOpacity>
    )
}

const styles=  StyleSheet.create({
    button: {
        borderRadius: 5 , 
        height: helper.px(130) , 
        width: "100%" ,
        backgroundColor: '#CC75C6' ,
        flexDirection: "row" , 
        marginBottom: helper.px(16) , 
        paddingLeft: helper.px(27) ,
        justifyContent: "space-between" , 
    },
    imageView: {
        width: "60%" , 
        justifyContent: "flex-end" , 
        alignItems: "flex-end" , 
    } , 
    textView: {
        width: "40%" ,
        height: "100%" ,
        justifyContent: "center" , 
    } , 
    justText : {
        fontFamily: helper.fontFamily('Black') ,
        fontWeight: "700" , 
        lineHeight: helper.px(22) , 
        fontSize:helper.px(18) , 
        color: colors.blanko ,
    }, 
    image : {
        width: "100%" , 
        height: helper.px(127) , 
    }





});
export default CategoriesButtonComponent ;