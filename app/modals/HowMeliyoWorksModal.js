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
import colors from '../values/colors';
import icons from '../values/icons';
import helper from '../helpers/helper';



const HowMeliyoWorksModal = forwardRef( 
(
    {
        modalTitle, 
    },
    ref 
) => {
    const [ visibility ,  setVisibility ] =  useState(false); 

   
    useImperativeHandle(ref , ()=>({
        showHowMeliyoWorksModal: ()=> setVisibility(true) , 
        hideHowMeliyoWorksModal: () => setVisibility(false) , 
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
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.baseContainer}
                >
                    <View 
                    style={styles.modelineContainer}
                    >
                        <View style={styles.modeline} ></View>
                    </View>
                    <View style={styles.titleContainer}> 
                        <View  style={styles.modalCloseButton} ></View>
                        <Text style={styles.modalTitle}>{modalTitle || helper.translate("how.meliyo.works") }</Text>
                        <TouchableOpacity
                        onPress={()=>setVisibility(false)}
                        style={styles.modalCloseButton}
                        >
                            {icons.close()}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitleText}>{helper.translate("how.meliyo.works")}</Text>

                    <View 
                    style={styles.containerItem }
                    >
                        <View
                        style={styles.leftContainer }
                        >
                            <View style={styles.iconContainer }>
                                {icons.search("#5690D6")}
                            </View>
                            <View style={styles.iconLine}></View>
                        </View>
                        <Text 
                        style={styles.desc} 
                        >{helper.translate("how.meliyo.first")}</Text>  
                    </View>

                    <View 
                    style={styles.containerItem }
                    >
                        <View
                        style={styles.leftContainer }
                        >
                            <View style={styles.iconContainer }>
                                {icons.note(colors.second)}
                            </View>
                            <View style={styles.iconLine}></View>
                        </View>
                        <Text 
                        style={styles.desc} 
                        >{helper.translate("how.meliyo.second")}</Text>  
                    </View>

                    <View 
                    style={styles.containerItem }
                    >
                        <View
                        style={styles.leftContainer }
                        >
                            <View style={styles.iconContainer }>
                                {icons.file("#CC75C6")}
                            </View>
                            <View style={styles.iconLine}></View>
                        </View>
                        <Text 
                        style={styles.desc} 
                        >{helper.translate("how.meliyo.third")}</Text>  
                    </View>

                    <View 
                    style={styles.containerItem }
                    >
                        <View
                        style={styles.leftContainer }
                        >
                            <View style={styles.iconContainer }>
                                {icons.envelop("#5690D6")}
                            </View>
                            <View style={styles.iconLine}></View>
                        </View>
                        <Text 
                        style={styles.desc} 
                        >{helper.translate("how.meliyo.fourth")}</Text>  
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )}
);

const styles = StyleSheet.create({

    // current 
    baseContainer: {
        width: "100%",
    }, 
    containerItem: {
        flexDirection: "row" , 
    }, 
    leftContainer:{
        alignItems:"center",
        minHeight: helper.px(120),
    }, 
    rightContainer: {
        paddingVertical: helper.px(10),
        paddingHorizontal: helper.px(10),
        paddingTop: 0 ,
    }, 
    iconContainer: {
        paddingVertical: helper.px(10),
        paddingHorizontal: helper.px(10),
        backgroundColor: colors.gray , 
        justifyContent:"center" , 
        alignItems:"center",
        width: helper.px(44),
        height: helper.px(44),
        borderRadius: 2 ,  
    }, 
    iconLine: {
        backgroundColor: colors.gray , 
        width: helper.px(5),
        flex:1 ,
    } ,
    
    desc:{
        fontFamily: helper.fontFamily("Medium") , 
        fontWeight: 500 , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(16) , 
        color:colors.blanko ,  
        width: "80%", 
        marginLeft: 10 , 
        marginBottom: 10,
    }, 
    // base design 
   
    layoutModal: {
        justifyContent: "flex-end" , 
    },
    scrollContainer: {
        height: helper.screenHeight -helper.px(50), 
        backgroundColor: colors.tabBack , 
        borderTopRightRadius: helper.px(10),
        borderTopLeftRadius: helper.px(10), 
        paddingVertical: helper.px(16),
        paddingHorizontal: helper.px(16),
        paddingBottom: helper.px(32),
    },
    modelineContainer: {
        justifyContent: "center" , 
        alignItems: "center" , 
        paddingVertical: helper.px(10) , 
    }, 
    modeline: {
        backgroundColor: colors.placeholderText , 
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
        paddingVertical: helper.px(10),

    },  
    subtitleText:{
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(18) , 
        lineHeight: helper.px(22) , 
        color:colors.text ,  
        marginVertical:helper.px(16) ,
    }, 
   
   
    
   

   

});


export default  HowMeliyoWorksModal ;
