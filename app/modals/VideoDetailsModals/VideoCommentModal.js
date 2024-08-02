import React, {
    useRef , 
    forwardRef , 
    useImperativeHandle , 
    useState , 
    useReducer ,  
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    ScrollView , 
    TouchableOpacity , 
    TextInput , 
} from 'react-native';
import Modal from "react-native-modal";
import colors from '../../values/colors';
import icons from '../../values/icons';
import helper from '../../helpers/helper';
import CommentsCardComponent from '../../components/Cards/CommentsCardComponent';
import { Rating } from 'react-native-ratings';



const initials =  {
    rating: 0 ,
    message: "" ,  
}

const reducer  =  (state , action ) => {
    return { ...state , ...action }
}



const VideoCommentModal = forwardRef(({
    params,
}, ref ) =>{ 

    const [ visibility ,  setVisibility ] =  useState(false); 
    const [ state , dispatch ] =  useReducer(reducer , initials ); 
    

    useImperativeHandle(ref , ()=>({
        showModal: ()=> setVisibility(true) , 
        hideModal: () => setVisibility(false) , 
    }) , [] ) ;

return (
    <Modal
    style={{
        margin: 0, 
        bottom: 0 , 
        ...styles.layoutModal , 
    }}
    animationIn={"slideInUp"}
    isVisible={visibility}
    onBackdropPress={()=>setVisibility(false)}
    onBackButtonPress={()=>setVisibility(false)}
    onSwipeComplete={()=>setVisibility(false)}
    deviceWidth={helper.screenWidth}
    swipeDirection={['down']}
    panResponderThreshold={50}
    transparent={true}
    >
        <View style={styles.scrollContainer}>
            <View 
            style={styles.modelineContainer}
            >
                <View style={styles.modeline}></View>
            </View>
            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always" 
            style={styles.scrollCon}
            >
                <View style={{flex: 1 }}>
                    <Text style={styles.modalTitle}>Şəhrlər</Text>

                    <View style={styles.addCommentView}>
                        <View style={styles.addCommentViewsecond}>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                startingValue={state.rating}
                                showRating={false}
                                readonly={false}
                                ratingBackgroundColor={colors.text}
                                tintColor={colors.gray}
                                imageSize={10}
                                // style={{marginTop: 6}}
                                onFinishRating={(value)=>{
                                    dispatch({rating: value})
                                }}
                            />
                            <TextInput
                            value={state.message}
                            onChangeText={(value)=>dispatch({message: value})}
                            placeholder='Add comment'
                            placeholderTextColor={colors.placeholderText}
                            style={styles.input}
                            />
                        </View>

                        <TouchableOpacity
                        style={styles.addCommentButton}
                        >
                            {icons.send(state.message && state.rating ? colors.turkuaz : colors.blanko )}
                        </TouchableOpacity>
                    </View>

                    {
                        [1 , 2 , 3 , 4 , 5  ].map((item , index)=>{
                            return (
                                <CommentsCardComponent
                                key={index}
                                name="some Name"
                                image={require("../../assets/images/cardImage.png")}
                                speciality={"someJob goes here"}
                                rating={4}
                                description={"some description text goes here!!"}
                                />
                            )
                        })
                    }

                    {/* <View style={styles.addCommentView}>
                        <View style={styles.addCommentViewsecond}>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                startingValue={state.rating}
                                showRating={false}
                                readonly={false}
                                ratingBackgroundColor={colors.text}
                                tintColor={colors.gray}
                                imageSize={10}
                                // style={{marginTop: 6}}
                                onFinishRating={(value)=>{
                                    dispatch({rating: value})
                                }}
                            />
                            <TextInput
                            value={state.message}
                            onChangeText={(value)=>dispatch({message: value})}
                            placeholder='Add comment'
                            placeholderTextColor={colors.placeholderText}
                            style={styles.input}
                            />
                        </View>

                        <TouchableOpacity
                        style={styles.addCommentButton}
                        >
                            {icons.send(state.message && state.rating ? colors.turkuaz : colors.blanko )}
                        </TouchableOpacity>
                    </View> */}

                    <View style={{height:100}}></View>
                </View>
            </ScrollView>
        </View>
    </Modal>
)});


const styles = StyleSheet.create({
    addCommentViewsecond: {
        width: "80%",
        justifyContent: "flex-start" ,
        alignItems: "flex-start" ,
    } , 
    addCommentButton: {
        height:helper.px(40) ,
        width: helper.px(40) ,
        alignItems: "flex-end" ,
        justifyContent:"center" , 
    } , 
    addCommentView: {
        borderWidth: helper.px(1) , 
        borderColor: colors.blanko , 
        // marginBottom: helper.px(32) ,
        borderRadius: helper.px(20) ,
        paddingVertical: helper.px(16) , 
        paddingHorizontal: helper.px(10) , 
        flexDirection:"row" ,
        justifyContent:"center",
        alignItems:"center", 
        marginTop: helper.px(16) ,
    } , 
    layoutModal: {
        justifyContent: "flex-end" , 
    },
    scrollContainer: {
        height: helper.screenHeight - helper.px(150) , 
        backgroundColor: colors.gray , 
        borderTopRightRadius: helper.px(10),
        borderTopLeftRadius: helper.px(10), 
        paddingVertical: helper.px(16),
        paddingHorizontal: helper.px(16),
    },
    modelineContainer: {
        justifyContent: "center" , 
        alignItems: "center" , 
        paddingVertical: helper.px(10) , 
    }, 
    modeline: {
        backgroundColor: "#565E73" , 
        borderRadius: helper.px(72) , 
        height: 2 , 
        width: 37 , 
    }, 
    modalTitle: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(16) , 
        color:colors.blanko ,  
    }, 
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .4 , 
        borderBottomColor: colors.placeholderText ,  
    } , 
    buttonText: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko ,  
    } , 
    scrollCon: {
        marginVertical: helper.px(16) ,
    }, 
    input:{
        color:colors.blanko , 
    }, 
});
export default VideoCommentModal;
