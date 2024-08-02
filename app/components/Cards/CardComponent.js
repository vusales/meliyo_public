import React , {ReactNode} from "react" ; 
import {
    View , 
    Text , 
    StyleSheet , 
    TouchableWithoutFeedback , 
    ImageBackground, 
    TextBase, 
    Image ,
} from "react-native"; 
import colors from "../../values/colors";
import icons from "../../values/icons";
import helper from "../../helpers/helper";





const CardComponent = ({
    image ,
    discountPrice ,  
    price , 
    name , 
    speciality , 
    onlineTime, 
    callBack ,
}) => {

    return (
        <TouchableWithoutFeedback
        onPress={()=>callBack()}
        > 
            <View
            style={styles.cardContainer}
            >
                <ImageBackground
                source={{uri:image}} 
                resizeMode="cover" 
                style={styles.image}
                imageStyle={styles.bgimage}
                >
                    {
                        onlineTime ? 
                        <View 
                        style={styles.onlineConytainer}
                        >
                            <Image 
                            style={{ width: 5 , height: 5 }}
                            source={require("../../assets/images/icons/cardtimeicon.png")} 
                            />
                            <Text style={styles.onlineConytainerText}>{onlineTime} s</Text>
                        </View>
                        :null
                    }
                </ImageBackground>
                <Text 
                style={styles.nameText}
                numberOfLines={1}
                ellipsizeMode='tail'
                >{name}</Text>
                <Text 
                style={styles.jobText} 
                numberOfLines={1}
                ellipsizeMode='tail'
                >{speciality}</Text>
                {
                    discountPrice ? 
                    <View style={styles.priceContainer}>
                        <Text 
                        style={styles.price}
                        >{discountPrice}₼</Text>
                        <Text 
                        style={{ ...styles.price , ...styles.discountPrice}}
                        >{price}₼</Text>
                    </View>
                    :
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    ); 
}

const styles=  StyleSheet.create({
    cardContainer : {
        width: helper.px(170) , 
    }, 
    image:{ 
        width: "100%" , 
        height: helper.px(199), 
        borderRadius: helper.px(5) ,
        flex: 1,
        justifyContent: 'center',
    }, 
    bgimage: {
        width: "100%" , 
        height: "100%" ,
    }, 
    priceContainer: {
        width: "100%" ,
        flexDirection:"row" , 
        marginTop: helper.px(10) ,
        alignItems: "baseline" ,
        paddingVertical: 3 ,
    },
    price: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(14) , 
        color: colors.blanko ,
        marginRight: helper.px(10) , 
    }, 
    discountPrice: {
        textDecorationLine: "line-through" , 
        textDecorationColor: colors.blanko ,
        textDecorationStyle: "solid" , 
        fontSize:helper.px(12) , 
        color:colors.error ,
    }, 
    nameText: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(14) , 
        color: colors.blanko ,
        marginTop: helper.px(10) , 
        textTransform: "capitalize" , 
    }, 
    jobText: {
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
        textTransform: "capitalize" , 
        marginTop: helper.px(10) , 
    } , 
    onlineConytainer: {
        paddingVertical: 3 , 
        paddingHorizontal: 3 , 
        borderRadius: 3 , 
        backgroundColor: colors.placeholderText ,
        flexDirection: "row" , 
        alignItems: "center" ,
        marginLeft: helper.px(10) , 
        marginTop: helper.px(10) ,
    }, 
    onlineConytainerText: {
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        letterSpacing: -0.011 , 
        lineHeight: helper.px(13) , 
        fontSize:helper.px(7) , 
        color: colors.blanko ,
        marginLeft: helper.px(5) ,
    }, 
}); 


export default CardComponent ; 
