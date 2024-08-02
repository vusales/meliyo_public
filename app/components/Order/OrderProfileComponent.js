import React from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    SafeAreaView, 
    Image , 
} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';
import LinearGradient from 'react-native-linear-gradient';

const OrderProfileComponent = ({
    image,
    name , 
    job , 
}) => (
    <View style={styles.profileContainer}>
        {
            image? 
            <LinearGradient 
                colors={['#CC75C6', '#5690D6']} 
                start={{x: 0.055, y: 0.30}} 
                end={{x: 0.2, y: 1.0}}
                locations={[0, 0.6]}
                style={styles.gradientImageContainer}
            >
                <Image
                source={image}
                style={styles.profileImage}
                />
            </LinearGradient>
            :
            <View
            style={{
                ...styles.gradientImageContainer,
                borderWidth: 1 , 
                borderColor: colors.text ,
                backgroundColor: colors.main ,
            }}
            >
                <Image
                    source={require("../../assets/images/icons/logouser.png")}
                    style={{
                        ...styles.profileImage ,  
                        width: 25 ,
                        height: 20
                    }}
                />
            </View>
        }
       
        {
            job ? 
            <>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.jobText}>{job}</Text>
            </>
            :
            <Text style={styles.jobText}>{name}</Text>
        }
    </View>
);

const styles = StyleSheet.create({
    gradientImageContainer: {
        height:helper.px(45) , 
        width:helper.px(45) ,
        justifyContent: "center" , 
        alignItems: "center" ,
        borderRadius: 100 , 
    }, 
    profileImage: {
        height:helper.px(40) , 
        width:helper.px(40) , 
        borderRadius: 100 , 

    },
   
    nameText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(14) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
    }, 
    jobText: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(11) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
    },
    profileContainer: {
        justifyContent:"center" , 
        alignItems: "center" ,
        marginBottom: helper.px(16) , 
        marginTop: helper.px(24), 
    }, 


});

export default OrderProfileComponent;
