import React , 
{ 
    ReactNode , 
} from "react" ; 
import {
    StyleSheet , 
    View ,  
    StatusBar , 
    Text , 
    TouchableOpacity,
    SafeAreaView , 
    KeyboardAvoidingView , 
} from "react-native" ; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../values/colors";
import helper from "../helpers/helper";
import icons from "../values/icons";    
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import HeaderSearchComponent from "../components/CommonLayoutComponents/HeaderSearchComponent";
import StarDetailsFollowHeaderComponent from "../components/CommonLayoutComponents/StarDetailsFollowHeaderComponent";


const CommonLayout = ({
    children , 
    pageName , 
    showDrawerButton , 
    showSearchComponent ,
    starDetailsHeader , 
    hideFollowButton , 
    starId , 
    shareLink , 
}) => {

    return  (
        <SafeAreaView
        style={styles.baseLayout}
        >
            <StatusBar 
            translucent={false}
            backgroundColor={colors.main}
            /> 

            <KeyboardAwareScrollView
             showsVerticalScrollIndicator={false}
             enableOnAndroid={true}
             keyboardShouldPersistTaps='always'
            >
                                
                <View style={styles.baseView}> 
                    <HeaderComponent
                    showDrawerButton={showDrawerButton ?? false } 
                    pageName={pageName ?? ""}
                    starDetailsHeader={starDetailsHeader}
                    hideFollowButton={hideFollowButton}
                    starId={starId}
                    shareLink={shareLink}
                    />
                    {
                        showSearchComponent? 
                        <HeaderSearchComponent
                        />
                        :null 
                    }
                    {children}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
    baseLayout: {
        flex: 1 , 
        backgroundColor: colors.main , 
    }, 
    baseView: {
        paddingHorizontal: helper.px(16) ,
        paddingBottom: helper.px(50) ,
    }
}); 


export default CommonLayout ; 