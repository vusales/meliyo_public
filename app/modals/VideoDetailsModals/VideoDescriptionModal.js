import React, {
    useRef , 
    forwardRef , 
    useImperativeHandle , 
    useState , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    ScrollView , 
    TouchableOpacity , 
} from 'react-native';
import Modal from "react-native-modal";
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';


const VideoDescriptionModal = forwardRef(({
    params,
}, ref ) =>{ 

    const [ visibility ,  setVisibility ] =  useState(false); 

    useImperativeHandle(ref , ()=>({
        showModal: ()=> setVisibility(true) , 
        hideModal: () => setVisibility(false) , 
    }) , [] ) ;

return (
    <Modal
    style={{
        margin: 0, 
        bottom: 0 , 
        ...styles.layoutModal 
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
                <Text style={{...styles.modalTitle ,  marginBottom: helper.px(14) }}>Video haqqında</Text>
                <Text style={styles.detailsText} >lorem ipsum dolar sit</Text>

            </ScrollView>
        </View>
    </Modal>
)});


const styles = StyleSheet.create({
    layoutModal: {
        justifyContent: "flex-end" , 
    },
    scrollContainer: {
        height: helper.screenHeight - helper.px(250) , 
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
    detailsText: {
        fontFamily: helper.fontFamily("Bold"), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(14) , 
        color: colors.blanko , 
        fontWeight:"500" ,  
    }
});

export default VideoDescriptionModal;
