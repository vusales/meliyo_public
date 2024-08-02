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
    TextInput ,  
} from 'react-native';
import Modal from "react-native-modal";
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';
import { useNavigation } from '@react-navigation/native';
import { CHANGEPASSWORD , CODECONFIRM } from '../../values/screenNameLists';
import Alert from '../../components/General/Alert';



const EnterEmailModal = forwardRef(({
    params,
}, ref ) =>{ 
    const navigation = useNavigation(); 
    const alertRef = useRef(); 
    const [ email ,  setEmail ] =  useState(""); 
    const [ visibility ,  setVisibility ] =  useState(false); 

    useImperativeHandle(ref , ()=>({
        showModal: ()=> setVisibility(true) , 
        hideModal: () => setVisibility(false) , 
    }) , [] ) ;

    const confirm = () => {

        if(email) {
            navigation.navigate("stack" , {
                screen: CODECONFIRM , 
                params: {
                    email: email 
                }
            })
        }else {
            setVisibility(false);
            alertRef.current.alert(true ,"error" ,  "Email daxil edilməyib!" ); 
        }
      
    }

return (
    <>

        <Alert
        ref={alertRef}
        />
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
                    <View style={styles.inputCon}>
                        <Text style={styles.labelText}>Email adresiniz</Text>
                        <TextInput
                        value={email}
                        onChangeText={(value)=>setEmail(value)}
                        placeholder='email elave et'
                        style={styles.input}
                        placeholderTextColor={colors.placeholderText}
                        />
                    </View>

                    <TouchableOpacity 
                    onPress={()=>confirm()}
                    style={{
                        ...styles.button ,
                        marginTop: helper.px(16) , 
                        ...styles.width ,
                        }}
                    >
                        <Text style={styles.buttontext}>Təsdiq et</Text>
                    </TouchableOpacity>


                </ScrollView>
            </View>
        </Modal>
    
    </>
)});


const styles = StyleSheet.create({
    layoutModal: {
        justifyContent: "center" , 
    },
    scrollContainer: {
        height: helper.screenHeight - helper.px(350) , 
        backgroundColor: colors.gray , 
        borderRadius: helper.px(10),
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
        borderRadius: 5, 
        height: helper.px(40) , 
        backgroundColor: colors.blanko , 
        justifyContent: "center" , 
        alignItems: "center" , 
        paddingHorizontal: helper.px(32) ,
    }, 
    buttontext: {
        fontFamily: helper.fontFamily('Bold') ,
        fontWeight: "600" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(16) , 
        color: colors.main ,
    },  
    scrollCon: {
        marginVertical: helper.px(16) ,
    }, 
    detailsText: {
        fontFamily: helper.fontFamily("Bold"), 
        fontSize:helper.px(12) , 
        lineHeight: helper.px(14) , 
        color: colors.blanko , 
        fontWeight:"500" ,  
    },
    labelText:{
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
    } , 
    inputCon: {
        width: "100%",
        marginVertical: helper.px(6) ,
    } , 
    input: {
        borderRadius: 5 ,  
        borderWidth: .7 , 
        borderColor: colors.blanko ,  
        fontFamily: helper.fontFamily('Medium') ,
        fontWeight: "500" , 
        lineHeight: helper.px(19) , 
        fontSize:helper.px(12) , 
        color: colors.blanko ,
        marginVertical: helper.px(10) ,
        paddingLeft: helper.px(16),
    } , 
});

export default EnterEmailModal;
