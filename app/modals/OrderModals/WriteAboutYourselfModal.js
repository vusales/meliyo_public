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
import colors from '../../values/colors';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WriteAboutYourselfModal = forwardRef( 
(
    {
        modalTitle , 
        isInstructionsModal ,
        contentTitle , 
        description ,
        callBack , 
    },
    ref 
) => {
    const [ visibility ,  setVisibility ] =  useState(false); 
    const [textareaValue ,  setTextAreaValue ] = useState(""); 
    const [instructionsData ,  setInstructions] =  useState(); 

    useImperativeHandle(ref , ()=>({
        showWriteAboutYourselfModal: ()=> setVisibility(true) , 
        hideWriteAboutYourselfModal: () => setVisibility(false) , 
    }) , [] ) ;

    const changeTextAreaValue  = (value) => {
        if(textareaValue.length >= 250 ) {
            return ; 
        }
        if(isInstructionsModal) {
            setInstructions(value); 
        }else {
            setTextAreaValue(value); 
        }
    }


    const saveData = () => {
        if(textareaValue){
            callBack("aboutUser" , textareaValue) ; 
        }else {
            callBack("instructions" , instructionsData) ; 
        }

        setTimeout(()=> {
            setInstructions(""); 
            setTextAreaValue(""); 
        },500);

        setVisibility(false) ; 
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
                <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                >
                    <View style={styles.titleContainer}> 
                        <View  style={styles.modalCloseButton} ></View>
                        <Text style={styles.modalTitle}>{modalTitle}</Text>
                        <TouchableOpacity
                        onPress={()=>{
                            setVisibility(false);
                        }}
                        style={styles.modalCloseButton}
                        >
                            {icons.close()}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textContainer} >
                        <Text style={styles.modalTitle}>{contentTitle}</Text>
                        <Text style={styles.subtitleText} >{description}</Text>
                    </View>

                    <TextInput
                        style={styles.textArea}
                        onChangeText={ (value )=>changeTextAreaValue(value ) }
                        value={ isInstructionsModal ? instructionsData :textareaValue }
                        multiline={true}
                        placeholderTextColor={colors.blanko}
                        placeholder="Buraya yazin..."
                        textAlignVertical={'top'}
                    />

                    <View style={styles.valueLengthCon}>
                        <Text style={styles.lengthText}>{ 
                        (isInstructionsModal ? instructionsData?.length :textareaValue?.length) 
                        ?? "0" }/250</Text>
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                style={ styles.rememberButton }
                onPress={()=> saveData()}
                >
                    <Text style={styles.rememberButtonText }>Yadda saxlayın</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    )});

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

    } , 
    rememberButtonText: {
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(20) , 
        color:colors.text ,  
    }, 

});


export default  WriteAboutYourselfModal ;
