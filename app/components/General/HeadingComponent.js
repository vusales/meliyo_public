import React from 'react';
import { 
    Text, 
    View ,
    StyleSheet , 
    TouchableOpacity , 
} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';


const HeadingComponent = ({
    title,
    callback, 
    buttonText, 
}) => { 
    
   
return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
        onPress={()=>callback()}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row" , 
        justifyContent: 'space-between' , 
        alignItems: "center" , 
        marginTop: helper.px(24) , 
        marginBottom: helper.px(10),
    }, 
    buttonText: {
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(14) , 
        color: colors.turkuaz , 
        fontWeight:"400" ,  
    }, 
    title: {
        fontFamily: helper.fontFamily("Bold"), 
        fontSize:helper.px(16) , 
        lineHeight: helper.px(18) , 
        color: colors.blanko , 
        fontWeight:"600" ,  
        letterSpacing: -0.011 ,
    }
});

export default HeadingComponent;
