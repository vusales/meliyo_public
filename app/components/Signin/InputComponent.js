import React ,  {
    useState , 
    useEffect , 
    useRef, 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    Image , 
    ScrollView ,   
    TouchableWithoutFeedback , 
    Pressable , 
    TextInput , 
} from 'react-native';
import colors from '../../values/colors';
import icons from '../../values/icons';
import helper from '../../helpers/helper';



const InputComponent = ({
   icon , 
   callback , 
   value  , 
}) => {


return (
    <View style={styles.customInputContainer}>
        <TouchableOpacity  style={styles.socialsButtons}>
            {
                icon == "instagram" ? icons.insta() :(
                    icon =="facebook"?  icons.facebook() : (
                        icon =="tiktok"?  
                        // icons.tiktok()
                        <Image 
                        source={require("../../assets/logo/logotiktok.png")}
                        style={styles.tiktokImage}
                        />
                        : (
                            icon =="youtube"?  icons.youtube(): ""
                        )
                    ) 
                )   
            }
        </TouchableOpacity>
        <View style={styles.inputCon}>
            {/* <Text style={styles.labelText}>Email adresiniz</Text> */}
            <TextInput
            value={value}
            onChangeText={(value)=>callback(value)}
            placeholder='sosial şəbəkə əlavə et'
            style={styles.input}
            placeholderTextColor={colors.placeholderText}
            />
        </View>
    </View>
)};


const styles = StyleSheet.create({
    input: {
        borderRadius: 5 ,  
        borderWidth: .7 , 
        borderColor: colors.blanko ,  
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
        paddingLeft: helper.px(16),
    } ,  
    labelText:{
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
        marginBottom: helper.px(5),
    } , 
    inputCon: {
        width: "85%",
    }, 
    socialsButtons: {
        width: helper.px(50) , 
        height: helper.px(50) , 
        alignItems:"center" , 
        justifyContent: "center" ,
        borderWidth:  1  ,  
        borderColor: colors.text , 
        borderRadius: helper.px(16),  
    },  
    customInputContainer: {
        flexDirection: "row" , 
        alignItems: "flex-end" ,
        justifyContent:"space-between" , 
        width: "100%" , 
        paddingVertical: helper.px(10),
    } , 
    tiktokImage : {
        height: helper.px(16) , 
        width: helper.px(16) ,
    }
    
});

export default InputComponent;



