import React from 'react';
import { 
    StyleSheet , 
    Text, 
    View , 
    TouchableOpacity ,  
} from 'react-native';
import colors from '../../values/colors';
import icons from '../../values/icons';
import helper from '../../helpers/helper';


const NoProductComponent = ({
    text ,
    buttonText , 
    callBack , 
    hideButton , 
}) => {


return(
    <View style={styles.con}>
        <Text style={styles.text}>{text}</Text>
        {
            hideButton ? 
            null
            : 
            <TouchableOpacity 
            onPress={() => callBack() }
            style={styles.button}
            > 
                <Text style={styles.buttonText}>{buttonText ?? "Sifariş edin"}</Text>
            </TouchableOpacity>
        }
    </View>
)};

const styles = StyleSheet.create({
    con :{
        height: helper.screenHeight / 2 , 
        borderRadius: 5 ,
        color:colors.gray ,  
        justifyContent:"center" , 
        alignItems: "center" , 
        backgroundColor: colors.gray , 
    },
    button: {
        backgroundColor: colors.second , 
        paddingVertical: helper.px(10) , 
        justifyContent:"center" , 
        alignItems: "center" , 
        width: helper.px(158) ,
        borderRadius: 5 , 
    }, 
    buttonText: {
        color: colors.text , 
        fontFamily: helper.fontFamily("Bold") ,
        fontWeight: "600", 
        fontSize:helper.px(16) , 
        lineHeight: helper.px(20) ,  
    }, 
    text: {
        color: colors.text , 
        fontFamily: helper.fontFamily("Medium") ,
        fontSize:helper.px(16) , 
        lineHeight: helper.px(24) ,  
        fontWeight: "500", 
        textTransform:"capitalize" ,
        marginBottom: helper.px(24), 
    }

});

export default NoProductComponent;
