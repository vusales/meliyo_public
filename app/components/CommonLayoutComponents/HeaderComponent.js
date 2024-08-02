import React ,  {
    ReactNode
}  from "react" ; 
import {
    StyleSheet, 
    View ,
    Text ,
    TouchableOpacity ,  
} from "react-native";
import colors from "../../values/colors";
import icons from "../../values/icons";
import helper from "../../helpers/helper";
import { useNavigation ,  DrawerActions  } from "@react-navigation/native";
import StarDetailsFollowHeaderComponent from "./StarDetailsFollowHeaderComponent";
import { SEARCHOME } from "../../values/screenNameLists";



const HeaderComponent = ({
    showDrawerButton , 
    pageName , 
    starDetailsHeader , 
    hideFollowButton , 
    starId , 
    shareLink ,
    hideReport , 
}) => {
    const navigation  =  useNavigation(); 

    return (
        <View style={styles.headerComponentContainer}>
            {
                showDrawerButton? 
                <TouchableOpacity 
                onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                style={styles.drawerButton}
                >
                    {icons.menu()}
                    <Text style={styles.drawerButtonText}>{pageName}</Text>
                </TouchableOpacity>
                :
                <View 
                style={
                    starDetailsHeader? 
                    {
                        ...styles.gobackContainer , 
                        justifyContent:"space-between" ,
                    }
                    :styles.gobackContainer
                }
                >
                    <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={()=> {
                        if ( navigation.canGoBack() ) navigation.goBack(); 
                        else navigation.navigate("stack" , {
                            screen: "tab" , 
                            params: {
                                screen: SEARCHOME + "stack" , 
                            }
                        }); 
                    }}
                    >
                        {icons.chevronleft(colors.blanko ,  helper.px(15))}
                    </TouchableOpacity>
                    {
                        starDetailsHeader ? 
                        <>
                            {
                                pageName&&hideFollowButton ? 
                                <Text 
                                style={styles.gobackText}>{pageName}</Text>
                                :null
                            }
                            <StarDetailsFollowHeaderComponent
                            hideFollowButton={hideFollowButton}
                            starId={starId}
                            shareLink={shareLink}
                            hideReport={hideReport}
                            />
                        </>
                        :
                        <View style={styles.textView} >
                            <Text style={styles.gobackText}>{pageName}</Text>
                        </View>
                    }
                                        
                </View>
            }
        </View> 
    );
}

const styles =  StyleSheet.create({
    headerComponentContainer: {
        paddingVertical: helper.px(10) , 
        // paddingHorizontal: helper.px(16) ,
    }, 
    drawerButton: {
        flexDirection: "row" , 
        alignItems: "center" ,
        height: helper.px(40),
    }, 
    drawerButtonText: {
        fontFamily:helper.fontFamily('Bold') , 
        fontSize: helper.px(18) , 
        lineHeight: helper.px(24) , 
        letterSpacing: -0.408 , 
        color: colors.blanko, 
        marginLeft: helper.px(10) , 
        textTransform: "capitalize",
    }, 
    gobackText: {
        fontFamily:helper.fontFamily('Bold') , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(24) , 
        color: colors.text, 
        textTransform: "capitalize",
    },
    gobackContainer: {
        height: helper.px(40) , 
        flexDirection: "row" , 
        alignItems: "center" ,
    },
    goBackButton: {
        // width:helper.px(40) , 
        height:helper.px(40) ,
        paddingRight: helper.px(16) ,  
        alignItems: "center" , 
        justifyContent: "center" ,
    }, 
    textView: {
        width: "90%" ,
        height: "100%" , 
        alignItems: "center" , 
        justifyContent: "center" ,
    }
}) ; 



export default  HeaderComponent ; 

