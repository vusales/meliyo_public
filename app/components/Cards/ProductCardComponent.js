import React, { useState } from 'react';
import { 
    Text, 
    View ,
    StyleSheet , 
    ImageBackground , 
    TouchableOpacity , 

} from 'react-native';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';



const ProductCardComponent = ({
    image,
    productName ,  
    price , 
    discountPrice ,
    callback , 
    containerstyle , 
    promotion ,  
    inStock , 
    fromFavorites ,  
}) =>{ 

    const [favorite  , setFavorite ] =  useState(false); 
    

return (
    <TouchableOpacity
    onPress={()=>callback()}
    >
        <View style={
            containerstyle ? 
            { ...styles.container , ...containerstyle }
             :styles.container
            }
        >
            <ImageBackground
            style={styles.image}
            source={image}
            // resizeMethod='cover'
            >

                <View style={promotion? 
                    {
                        ...styles.favProm,
                        justifyContent:"space-between" , 
                    } 
                    : 
                    {
                        ...styles.favProm ,
                        justifyContent:"flex-end",
                    }}
                >
                    {
                        promotion ? 
                        <Text style={styles.promotionText}>{promotion}</Text>
                        :null
                    }
                    <TouchableOpacity
                    onPress={()=>setFavorite(!favorite)}
                    style={styles.heartButton}
                    >
                        {
                            favorite ? 
                            icons.heartfilled(colors.error)
                            :
                            icons.heart(colors.text)
                        }
                    </TouchableOpacity>
                </View>
                {
                    inStock ? null :
                    <View style={styles.stockContainer}>
                        <Text style={styles.stockText}>Satışda yoxdur</Text>
                    </View>
                } 
            </ImageBackground>
            <Text 
            numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.title}
            >{productName}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{price}₼</Text>
                <Text style={styles.discountPrice}>{discountPrice}₼</Text>
            </View>
            {
                fromFavorites? 
                <TouchableOpacity style={styles.addtoCartButton}>
                    <Text style={styles.addtoCartButtonText}>Səbətə əlavə edin</Text>
                </TouchableOpacity>
                :null 
            }
        </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
    addtoCartButton:{
        borderWidth: 2 , 
        borderColor: colors.second ,  
        borderRadius: 4 , 
        height: helper.px(35), 
        justifyContent:"center" , 
        alignItems:"center",
        marginTop: helper.px(16),
    } , 
    addtoCartButtonText:{
        fontFamily: helper.fontFamily("Medium") ,
        fontSize: helper.px(14) ,
        fontWeight: "500" , 
        color:colors.text , 
        lineHeight:helper.px(24),
    }, 
    container:{
        width: helper.px(175) ,
        paddingHorizontal: helper.px(12) ,
        paddingVertical:helper.px(12),
        backgroundColor: colors.gray ,
        borderRadius: 2 , 
    }, 
    favProm: {
        flexDirection:"row" , 
        alignItems:"center" ,
        width:"100%",
        paddingHorizontal: helper.px(5) ,
    } , 
    promotionText:{
        borderRadius: 2, 
        backgroundColor: "#D83838" , 
        paddingVertical: 3 , 
        paddingHorizontal: 7 , 
        color:colors.blanko , 
        fontFamily: helper.fontFamily("Black") ,
        fontSize: helper.px(10) ,
        fontWeight: "700" , 
        lineHeight:helper.px(16),
        textTransform:"capitalize" ,
    }, 
    image:{
        height: helper.px(163),
        justifyContent:"space-between"
    }, 
    heartButton:{
        height:helper.px(40) , 
        width:helper.px(40) , 
        alignItems:"center" , 
        justifyContent:"center" , 
    }, 
    title:{
        fontFamily: helper.fontFamily("Medium") ,
        fontSize: helper.px(15) ,
        fontWeight: "500" , 
        color:colors.blanko , 
        lineHeight:helper.px(18),
        letterSpacing: -0.078 ,
        marginVertical: helper.px(8) ,
    }, 
    priceContainer:{
        flexDirection:"row" , 
        justifyContent:"space-between" , 
        alignItems:"center" , 
    }, 
    price:{
        fontFamily: helper.fontFamily("Medium") ,
        fontSize: helper.px(14) ,
        fontWeight: "500" , 
        color:colors.blanko , 
        lineHeight:helper.px(18),
    }, 
    discountPrice:{
        fontFamily: helper.fontFamily("Medium") ,
        fontSize: helper.px(12) ,
        fontWeight: "500" , 
        color:colors.blanko , 
        lineHeight:helper.px(16),
        textDecorationLine: "line-through" ,
        textDecorationStyle:"solid" , 
    }, 
    // container:{}, 
    stockText:{
        color:"#D83838" , 
        fontFamily: helper.fontFamily("Bold") ,
        fontSize: helper.px(10) ,
        fontWeight: "600" , 
        lineHeight:helper.px(16),
        textTransform:"capitalize" ,
    } , 
    stockContainer:{
        width: "100%" , 
        backgroundColor:colors.blanko , 
        paddingVertical: helper.px(6) ,
        alignItems:"center" ,
    } , 
});

export default ProductCardComponent;
