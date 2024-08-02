import React from 'react';
import { 
    Text, 
    View,
    StyleSheet, 
    Image , 
    TouchableOpacity , 

} from 'react-native';
import colors from '../../values/colors';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';




const CommentsCardComponent = ({
    image,
    name , 
    speciality ,
    rating , 
    description , 
    containerStyle={} , 
}) => {



return(
    <View style={{...styles.commentsContainer ,  ...containerStyle }}>
        <View style={styles.starUserTopDescriptionContainer}>
            <View  style={styles.imageContainer}>
                <LinearGradient 
                    colors={['#CC75C6', '#5690D6']} 
                    start={{x: 0.055, y: 0.30}} 
                    end={{x: 0.2, y: 1.0}}
                    locations={[0, 0.6]}
                    style={styles.gradientImageContainer}
                >
                    {
                        image?
                        <Image
                        style={styles.profileImage}
                        source={image}
                        />
                        :
                        null
                    }
                </LinearGradient>
                <View>
                    <Text 
                    style={styles.starNameText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    >{name}</Text>
                    <Text 
                    style={styles.starjobText}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    >{speciality}</Text>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.onlineTimeContainer} > */}
                {/* <Text style={styles.onlineTimeText}></Text> */}
                {/* {icons.dots(colors.blanko, 20)} */}
            {/* </TouchableOpacity> */}
        </View>

        <View style={styles.ratingContainer}> 
            <Rating
                type='custom'
                ratingCount={5}
                startingValue={rating ?? 1 }
                showRating={false}
                readonly={true}
                ratingBackgroundColor={colors.text}
                tintColor={colors.gray}
                imageSize={10}
                // style={{marginTop: 6}}
            />
            <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text
        style={styles.descriptionText}
        >
        {description}
        </Text>
    </View>
)};

const styles = StyleSheet.create({
    commentsContainer:{
        marginVertical: helper.px(10) ,
        paddingVertical: helper.px(16) ,
        paddingHorizontal: helper.px(10) ,
        borderRadius: helper.px(5) ,
        backgroundColor: colors.gray , 
    }, 
    starUserTopDescriptionContainer: {
        flexDirection:"row" , 
        justifyContent: "space-between" ,
        alignItems: "center" , 
        // marginVertical: helper.px(24) ,
    }, 
    imageContainer: {
        flexDirection: "row" ,
        alignItems: "center" , 
    },
    gradientImageContainer: {
        paddingHorizontal: helper.px(2) , 
        paddingVertical: helper.px(2) , 
        borderRadius: 100 , 
        marginRight: helper.px(10),
        minWidth: helper.px(40) , 
        minHeight: helper.px(40) , 
    }, 
    profileImage: {
        width: helper.px(40) , 
        height: helper.px(40) , 
        borderRadius: 100 ,
    }, 
    starNameText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(16) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
    }, 
    starjobText: {
        fontFamily: helper.fontFamily("Medium"), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(24) , 
        color: colors.blanko , 
        fontWeight:"500" ,  
    }, 
    onlineTimeContainer:{
        flexDirection:"row" ,
        alignItems:"center",
    }, 
    onlineTimeText: {
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(10) , 
        lineHeight: helper.px(12) , 
        color: colors.blanko , 
        fontWeight:"400" , 
        letterSpacing: -0.011,
    }, 
    onlineTimeImage: {
        width: 5 , 
        height: 10  ,
        marginRight: helper.px(5),
    }, 

    // rating
    ratingContainer : {
        flexDirection: "row" , 
        alignItems: "center" , 
        marginVertical: helper.px(10),
    }, 
    ratingText:{
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(10) , 
        lineHeight: helper.px(12) , 
        color: colors.blanko , 
        fontWeight:"400" ,
        marginLeft: 5 ,  
    },
    descriptionText: {
        fontFamily: helper.fontFamily(""), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(16) , 
        color: colors.blanko , 
        fontWeight:"400" , 
        marginVertical: helper.px(10),
    }, 
});

export default CommentsCardComponent;
