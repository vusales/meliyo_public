import React from 'react';
import { 
    StyleSheet , 
    Text, 
    View , 
    StatusBar , 
    SafeAreaView , 
    ScrollView ,  

} from 'react-native';
import colors from '../values/colors';
import helper from '../helpers/helper';
import icons from '../values/icons';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const AuthLayout = ({
    children,
}) => {
    
return (
   <SafeAreaView style={styles.base} >
        <StatusBar 
        translucent={false}
        backgroundColor={colors.main}
        /> 

        <LinearGradient 
            colors={['#000',  'transparent' ]} 
            start={{x: 0.055, y: 0.30}} 
            end={{x: 0.2, y: 1.0}}
            locations={[ 0 , 0.4  ]}
            style={styles.blackGradient}
        >
        </LinearGradient>

        <LinearGradient 
            colors={['rgba(71, 174, 153, 0.93)', 'rgba(86, 144, 214, 0.93)' , 'rgba(204, 117, 198, 0.93)' , 'rgba(247, 122, 60, 0.93)']} 
            start={{x: 0.055, y: 0.30}} 
            end={{x: 0.2, y: 1.0}}
            locations={[ 0 , 0.25 , 0.6 , 1 ]}
            style={styles.gradientLayout}
        >
        </LinearGradient>

        {/* <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always" 
        style={styles.container}
        > */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="always" 
                style={styles.container}
                nestedScrollEnabled={true} 
                horizontal={false}
            >
                { children }
            </ScrollView>
        {/* </KeyboardAwareScrollView> */}

   </SafeAreaView>
)};

const styles = StyleSheet.create({
    base: {
        flex: 1 , 
    } , 
    gradientLayout: {
        flex: 1 ,  
        ...StyleSheet.absoluteFill ,
        top: 0, 
        left: 0 , 
        zIndex: -1 ,
    },  
    container: {
        flex: 1 , 
        paddingHorizontal: helper.px(16) ,
    }, 
    blackGradient: {
        flex: .5 ,
        ...StyleSheet.absoluteFill, 
        top: 0 , 
        left: 0 ,
    }, 

});

export default AuthLayout;
