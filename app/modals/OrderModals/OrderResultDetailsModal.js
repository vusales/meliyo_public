import React , {
    forwardRef , 
    useRef , 
    useImperativeHandle , 
    useState ,  
} from 'react';
import { 
    Text, 
    View,  
    StyleSheet,
    ScrollView , 
    TouchableOpacity,
    TextInput ,
} from 'react-native';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../values/colors';
import icons from '../../values/icons';
import helper from '../../helpers/helper'; 
import OrderButtonComponent from '../../components/StarUserDetailsScreen/OrderButtonComponnet';


const OrderResultDetailsModal = forwardRef( 
(
    {
        modalTitle , 
        isInstructionsModal ,
        contentTitle , 
        description ,
        callBack , 
        price ,
    },
    ref 
) => {
    const [ visibility ,  setVisibility ] =  useState(false); 
   
   
    useImperativeHandle(ref , ()=>({
        showOrderResultDetailsModal: ()=> setVisibility(true) , 
        hideOrderResultDetailsModal: () => setVisibility(false) , 
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
                    <View style={styles.modeline} ></View>
                </View>
                {/* <View style={styles.titleContainer}> 
                    <View  style={styles.modalCloseButton} ></View>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <TouchableOpacity
                    onPress={()=>setVisibility(false)}
                    style={styles.modalCloseButton}
                    >
                        {icons.close()}
                    </TouchableOpacity>
                </View> */}

                <Text style={styles.modalTitle}>{modalTitle}</Text>

                <View>
                    <View style={styles.item}>
                        <Text style={styles.text}>Video 1</Text>
                        <Text style={styles.text}>{price} </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.text}>48 saat ərzində çatdırılma</Text>
                        <Text style={styles.text}>27 ₼  </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.text}>Ümumi qiymət</Text>
                        <Text style={styles.text}>227 ₼ </Text>
                    </View>

                </View>



                <View
                style={{marginTop: "auto"}}
                >
                    <OrderButtonComponent
                        hideOrderButton={false}
                        containerStyle={{backgroundColor:colors.gray}}
                        textFontSize={15}
                        price={200}
                        activateCallback={true}
                        callBack={()=>{callBack()}}
                    />
                </View>
                
            </View>
        </Modal>
    )}
);

const styles = StyleSheet.create({
    item: {
        paddingVertical: helper.px(10) , 
        flexDirection: "row" ,
        justifyContent: "space-between",
        alignItems:"center",
    }, 
    text: {
        fontFamily: helper.fontFamily("Medium") , 
        fontWeight: 500 , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(16) , 
        color:colors.blanko ,  
    }, 
    inputsContainer: {
        flexDirection: "row" ,
        justifyContent: "space-between" ,
        alignItems:"center" ,
        marginVertical: helper.px(24),
    }, 
    inputContainer: {
        width: "46%" ,

    } , 
    inputText: {
        fontFamily: helper.fontFamily("") , 
        fontWeight: 400 , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(14) , 
        color:colors.blanko ,  
        marginBottom: helper.px(10),
    }, 
    input:{
        borderRadius: 5 , 
        borderWidth: .5 , 
        borderColor: "#4F4F4F" , 
        height: helper.px(37) , 
        color:colors.text , 
        paddingLeft: helper.px(16) ,
    }, 

    layoutModal: {
        justifyContent: "flex-end" , 
    },
    scrollContainer: {
        height: helper.screenHeight - helper.px(300) , 
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
        backgroundColor: colors.tabBack , 
        borderRadius: helper.px(72) , 
        height: 2 , 
        width: 40 , 
    }, 
    modalTitle: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(16) , 
        color:colors.blanko ,  
    }, 

    modalCloseButton: {
        width: helper.px(40), 
        height: helper.px(40) , 
        justifyContent: "center" , 
        alignItems: "center" , 
    }, 
    titleContainer: {
        flexDirection: "row" , 
        justifyContent: "space-between" , 
        alignItems:"center" ,
    }, 
    textContainer: {
        paddingVertical: helper.px(16),
    }, 
    subtitleText:{
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("") , 
        fontWeight: 400 , 
        fontSize: helper.px(10) , 
        lineHeight: helper.px(12) , 
        color:colors.text ,  
        marginTop: helper.px(10),
    }, 
    valueLengthCon: {
        alignItems:"flex-end" ,
        paddingVertical: helper.px(16) ,
    }, 
    lengthText:{
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(16) , 
        color:colors.text ,  
    }, 
    textArea: {
        borderWidth: .5 , 
        borderColor: colors.text , 
        borderRadius: helper.px(5) , 
        paddingVertical: helper.px(16) , 
        paddingHorizontal: helper.px(16) , 
        height: helper.px(117),
        color: colors.text ,
    },
    rememberButton: {
        borderRadius: 5, 
        backgroundColor: colors.second , 
        height: helper.px(47) , 
        justifyContent:"center", 
        alignItems:"center" , 
        width: "100%"
    } , 
    rememberButtonText: {
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(20) , 
        color:colors.text ,  
    }, 

    themeButtonsContainer: {
        flexDirection: "row" ,
        paddingHorizontal: helper.px(24) , 
        paddingVertical: helper.px(24) , 
        flexWrap: "wrap" , 
    } , 
    themeButtonsSmallCon: {
        padding: helper.px(10) , 
    } , 
    themeButtons: {
        width: helper.px(81) , 
        height: helper.px(76) , 
        alignItems:"center", 
        justifyContent:"center" ,
        borderRadius: 5 , 
        backgroundColor: colors.second , 
    }, 
    themeButtonsText: {
        fontFamily: helper.fontFamily("Medium") , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(14) , 
        color:colors.blanko ,
        marginTop: helper.px(10),  
        textAlign: "center",
    } , 

});


export default  OrderResultDetailsModal ;
