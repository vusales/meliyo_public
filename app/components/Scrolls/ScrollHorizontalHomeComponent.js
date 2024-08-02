import React, { ReactNode } from "react" ; 
import {
    View , 
    Text , 
    ScrollView , 
    StyleSheet ,
    TouchableWithoutFeedback , 
} from "react-native" ; 
import helper from "../../helpers/helper";
import icons from "../../values/icons";
import colors from "../../values/colors";
import CardComponent from "../Cards/CardComponent";
import { useNavigation } from "@react-navigation/native";
import { USERDETAILS } from "../../values/screenNameLists";





const ScrollHorizontalHomeComponent = ({
    title , 
    iteratingData , 
    viewMoreCallBack , 
    hideViewMore = false ,
    customComponent , 
}) => {
    const navigation =  useNavigation() ; 

    return ( 
        <View style={styles.baseScrollContainer} >
            <View style={styles.titleTextContainer} >
                {
                    title? 
                    <Text style={styles.titleText}>{title}</Text>
                    :null
                }
                {
                    hideViewMore ? 
                    null 
                    :
                    <TouchableWithoutFeedback
                    onPress={()=>viewMoreCallBack()}
                    >
                        <Text style={styles.viewMoreText}>{helper.translate("viewAll")}</Text>
                    </TouchableWithoutFeedback>
                }
            </View>
            <ScrollView
                style={styles.horizontalScrolContainer}
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false} 
            >
                {
                    iteratingData?.map( ( item , index ) => (
                        <View
                        key={`${index}someiteratingVlaue`}
                        style={styles.cardCoverContainer}
                        >
                            {
                                customComponent ? 
                                customComponent( item , item?.name ,  item?.images , item.customer_id  )
                                :
                                <CardComponent
                                key={`key-home-card-${title||"uyotg8"}-${index}`}
                                image={item.image}  
                                price={item.price}   
                                discountPrice={item.discountPrice}   
                                speciality={item.speciality} 
                                name={item.name} 
                                onlineTime={item.onlineTime}
                                callBack={()=>{
                                    navigation.navigate( "stack" , 
                                    {
                                        screen :  USERDETAILS  , 
                                        params : {
                                            id: item.customer_id ,  
                                        }
                                    })
                                }}
                                />
                            }
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles  = StyleSheet.create({
    titleText: {
        fontFamily: helper.fontFamily('Black') ,
        fontWeight: "700" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(24) , 
        fontSize:helper.px(18) , 
        color: colors.blanko ,
    }, 
    horizontalScrolContainer: {
        width: "100%" ,
    },
    baseScrollContainer: {
        marginVertical: helper.px(16) ,
    }, 
    cardCoverContainer: {
        marginRight: helper.px(10) ,
    }, 
    viewMoreText: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        letterSpacing: -0.24 , 
        lineHeight: helper.px(16) , 
        fontSize:helper.px(12) , 
        color: colors.second ,
    } , 
    titleTextContainer: {
        flexDirection: "row" , 
        justifyContent: "space-between" ,
        alignItems: "center" , 
        marginBottom: helper.px(14) ,
    }

});

export default ScrollHorizontalHomeComponent ; 


