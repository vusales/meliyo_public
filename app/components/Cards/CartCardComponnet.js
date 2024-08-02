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


const CartCardComponnet = ({
    image , 
    seller , 
    productName , 
    size , 
    color , 
    price ,  
    discount ,  
    callback , 
    sellerButtonFunction ,
}) => {

    return (
        <TouchableOpacity
        style={styles.buttonConatiner}
        onPress={()=>callback()}
        >
            <TouchableOpacity 
             onPress={()=>sellerButtonFunction()}
            style={[styles.row , styles.sellerCon]}
            >
                <Text style={{
                    ...styles.description , 
                    color:colors.blanko , 
                    fontSize: helper.px(14) ,
                }}>{seller}</Text>
                {icons.chevronright(colors.blanko , 16 )}
            </TouchableOpacity>

            <View style={styles.row} >
                <View style={styles.row}>
                    <Image
                    source={image}
                    style={styles.image}
                    />
                    <View>
                        <Text style={styles.title}>{productName}</Text>
                        <Text style={styles.description}>Bədən: {size}  Rəng: {color} </Text>

                        {
                            discount? 
                            <View style={{...styles.row , justifyContent:"flex-start"}}>
                                <Text style={styles.price}>{discount}₼</Text>
                                <Text style={styles.discount}>{price}₼</Text>
                            </View>

                            :
                            <View style={{...styles.row , justifyContent:"flex-start"}}>
                                <Text style={styles.price}>{price}₼</Text>
                            </View>
                        }
                    </View>
                </View>

                <TouchableOpacity
                style={styles.removeButton}
                >
                    {icons.trush(colors.blanko , 16)}
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

const styles=  StyleSheet.create({
    buttonConatiner: {
        marginVertical: helper.px(16) ,
    } , 
    row: {
        flexDirection: "row" ,
        alignItems:"center" ,
        justifyContent:"space-between",
    }, 
    image : {
        height: helper.px(67) , 
        width: helper.px(63) , 
        borderRadius: 3 , 
        marginRight: helper.px(10), 
    } , 
    title : {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        lineHeight: helper.px(24) , 
        fontSize:helper.px(14) , 
        color: colors.second ,
    }, 
    description : {
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(24) , 
        fontSize:helper.px(10) , 
        color: colors.placeholderText  ,
    }, 
    price : {
        fontFamily: helper.fontFamily('') ,
        fontWeight: "400" , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(16) , 
        color: colors.blanko ,
        letterSpacing: - .24 , 
    }, 
    discount : {
        color:colors.error ,  
        textDecorationLine: "line-through" ,
        marginLeft: helper.px(8) ,
        fontSize:helper.px(12) , 
    }, 
    sellerCon: {
        paddingVertical:helper.px(10) , 
        marginBottom: helper.px(10) ,
        backgroundColor: "#0C0C0C", 
        paddingHorizontal: 5 , 
    }, 
    removeButton: {
        width: helper.px(40) , 
        height: helper.px(40) , 
        justifyContent: "center" , 
        alignItems: "flex-end" ,
    },



    // previous 
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
        lineHeight: helper.px(19) , 
        fontSize:helper.px(16) , 
        color: colors.blanko ,
    }, 
   





});
export default CartCardComponnet ;