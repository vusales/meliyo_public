
import React , {
    useState ,  
} from 'react'; 
import { 
    Text, 
    View ,
    StyleSheet , 
    TouchableOpacity , 
    Image ,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../values/colors';
import helper from '../../helpers/helper';
import icons from '../../values/icons';


const OrderInfoCardComponent = ({
    image,
    name , 
    speciality , 
    gradientColors , 
    infoText , 
    infoIcon,
    giftType , 
    callBack , 
})=>{ 
    
    
return (

    <TouchableOpacity
    onPress={() => callBack()}
    >
        <LinearGradient 
        colors={gradientColors? ['#CC75C6', '#5690D6'] : [colors.gray,  colors.gray] } 
        start={{x: 0.055, y: 0.30}} 
        end={{x: 0.2, y: 1.0}}
        locations={[0, 0.6]}
        style={styles.gradientContainer}
        >
            <View style={styles.upper}>
                <View style={styles.leftContainer}>
                    <Image 
                    source={image ?? require("../../assets/images/cardImage.png")}
                    style={styles.cardImage}
                    /> 
                    <View >
                        <Text 
                        style={styles.titleText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        >{name ?? ""}</Text>
                        <Text 
                        style={styles.justText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        >
                            {
                                speciality && speciality.length > 0  ?
                                speciality?.map((item)=>item?.name + "/")
                                :""
                            }
                        </Text>
                    </View>
                </View>

                <View style={styles.rowcon}>
                    <Text style={styles.infoText}>{infoText} </Text>
                    {infoIcon}
                </View>
                
            </View>

            <View style={[styles.rowcon , styles.below ]}>
                <View style={
                    gradientColors?
                    {
                        ...styles.giftTypeButton , 
                        backgroundColor: colors.blanko , 
                    }
                    : styles.giftTypeButton
                }>
                    {icons.gift(gradientColors? colors.main :colors.blanko  , 15 )}
                    <Text 
                    style={
                        gradientColors?
                        {
                            ...styles.giftType , 
                            color: colors.main , 

                        }
                        :styles.giftType
                    }
                    >{giftType}</Text>
                </View>
                {
                    gradientColors ? 
                    <View style={[styles.rowcon , styles.timeCon]}>
                        <Image 
                        style={styles.giftTypeimg} 
                        source={require("../../assets/images/icons/cardtimeicon.png")} 
                        />
                        <Text style={styles.timeText}>48 s</Text>
                    </View>
                    :
                    null
                }
            </View>
        </LinearGradient>

    </TouchableOpacity>
    
)};


const styles = StyleSheet.create({
    rowcon:{
        flexDirection: "row" , 
        alignItems: "center" ,
    } , 
    gradientContainer: {
        paddingVertical: helper.px(16) , 
        paddingHorizontal: helper.px(16) , 
        borderRadius: 5 , 
        marginVertical: helper.px(5),
    }, 
    leftContainer:{
        flexDirection: "row" ,
    },
    cardImage:{
        width: helper.px(38) , 
        height: helper.px(38) , 
        borderRadius: 100 , 
        marginRight: helper.px(10) ,
    } ,
    titleText:{
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(12) , 
        lineHeight:helper.px(14) , 
        color:colors.blanko , 
        letterSpacing: -0.408 , 
        width: "70%" , 
    } ,
    justText:{
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(10) , 
        lineHeight:helper.px(14) , 
        color:colors.text , 
        letterSpacing: -0.408 , 
        width: "70%" ,
    } ,
    infoText: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(11) , 
        lineHeight:helper.px(18) , 
        color:colors.text , 
        marginRight: helper.px(5),
    }, 
    upper: {
        flexDirection:"row" , 
        justifyContent:'space-between',
        alignItems:"flex-start" ,
    }, 
    below: {
        justifyContent:"space-between" ,
        marginTop: helper.px(12),
    },
    giftType: {
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(11) , 
        lineHeight:helper.px(22) , 
        color:colors.blanko , 
        letterSpacing: -0.408 ,
        marginLeft: helper.px(5) ,
    },
    giftTypeButton: {
        flexDirection: "row" , 
        backgroundColor: colors.second , 
        paddingVertical: helper.px(5) , 
        paddingHorizontal: helper.px(7) ,
        borderRadius: 2 , 
        justifyContent:"center" , 
        alignItems: "center" ,
    },
    timeText : {
        fontFamily: helper.fontFamily('') , 
        fontWeight: "400" , 
        fontSize: helper.px(9) , 
        lineHeight:helper.px(12) , 
        color: colors.blanko , 
        letterSpacing: -0.066 ,
        marginLeft: 3 ,
    } , 
    timeCon : {
        borderStyle:"dotted" , 
        borderWidth: .6 ,  
        borderColor: colors.blanko , 
        borderRadius: 5 ,  
        justifyContent:"center",
        alignItems:"center", 
        paddingVertical: 3 , 
        paddingHorizontal: 5 ,
    } , 
    giftTypeimg: {
        height: 12,
        width: 5 ,
    },




});

export default OrderInfoCardComponent;
















