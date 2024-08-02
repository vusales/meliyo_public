import React from 'react';
import { 
    StyleSheet , 
    Text, 
    View,
    TouchableOpacity ,  

} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';

const AddToCartButtonComponent = ({
    price, 
    discountPrice , 
    callback , 
    buttonText , 
}) => (
    <View style={styles.container}>
        {
            discountPrice ? 
            <View>
                <Text style={styles.price} >{discountPrice}₼</Text>
                <Text style={styles.discountPrice}>{ price}₼</Text>
            </View>
            :
            <View>
                <Text style={styles.price} >{price}₼</Text>
            </View>
        }
       
        <TouchableOpacity  
        onPress={()=> callback() }
        style={styles.button} 
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: helper.px(16) , 
        paddingVertical: helper.px(16) , 
        justifyContent: "space-between" , 
        alignItems: "center" , 
        backgroundColor: colors.tabBack , 
        flexDirection:"row" , 
    } , 
    button: {
        backgroundColor: colors.second , 
        paddingVertical: helper.px(14), 
        paddingHorizontal: helper.px(10) , 
        justifyContent:"center", 
        alignItems:"center" ,
        borderRadius: helper.px(5), 
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(16) , 
        lineHeight: helper.px(20) , 
        color: colors.blanko , 
    },
    price: {
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(20) , 
        fontSize:helper.px(18) , 
        color: colors.blanko ,
        marginRight: helper.px(10) , 
    }, 
    discountPrice: {
        textDecorationLine: "line-through" , 
        textDecorationColor: colors.blanko ,
        textDecorationStyle: "solid" , 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(16) , 
        color:colors.error ,
        fontFamily: helper.fontFamily("Medium") , 
    }, 



    
});

export default AddToCartButtonComponent;
