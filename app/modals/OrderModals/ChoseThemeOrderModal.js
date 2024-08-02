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


const ChoseThemeOrderModal = forwardRef( 
(
    {
        modalTitle , 
        isInstructionsModal ,
        contentTitle , 
        description ,
        callBack , 
        themes , 
    },
    ref 
) => {
    const [ visibility ,  setVisibility ] =  useState(false); 
   
    useImperativeHandle(ref , ()=>({
        showChoseThemeOrderModal: ()=> setVisibility(true) , 
        hideChoseThemeOrderModal: () => setVisibility(false) , 
    }) , [] ) ;

    const sendDataToParent =  (value) => {
        callBack(value);
        setVisibility(false); 
    }

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
                <View style={styles.titleContainer}> 
                    <View  style={styles.modalCloseButton} ></View>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <TouchableOpacity
                    onPress={()=>setVisibility(false)}
                    style={styles.modalCloseButton}
                    >
                        {icons.close()}
                    </TouchableOpacity>
                </View>

                <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                >
                    <View style={styles.themeButtonsContainer}>

                        {
                            themes?.map(( item , index )=>{
                                return(
                                    <View 
                                    key ={`themes_${index}`} 
                                    style={styles.themeButtonsSmallCon} 
                                    >
                                        <TouchableOpacity
                                        onPress={()=>sendDataToParent(item)}
                                        style={styles.themeButtons}
                                        >
                                            {icons.gift()}
                                        </TouchableOpacity>
                                        <Text style={styles.themeButtonsText}>{item.name}</Text>
                                    </View>
                                )
                            })
                        }
                        
                        {/* <View style={styles.themeButtonsSmallCon} >
                            <TouchableOpacity
                            onPress={()=>sendDataToParent("Digər")}
                            style={{
                                ...styles.themeButtons,
                                backgroundColor: colors.turkuaz , 
                            }}
                            >
                                {icons.question()}
                            </TouchableOpacity>
                            <Text style={styles.themeButtonsText}>Digər</Text>
                        </View> */}
                    </View>

                </ScrollView>
            </View>
        </Modal>
    )}
);

const styles = StyleSheet.create({
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


export default  ChoseThemeOrderModal ;
