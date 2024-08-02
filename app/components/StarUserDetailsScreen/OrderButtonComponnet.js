import React, {
    useRef , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    SafeAreaView
} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';
import { useNavigation } from '@react-navigation/native';
import { ORDER } from '../../values/screenNameLists';
import HowMeliyoWorksModal from '../../modals/HowMeliyoWorksModal';



const OrderButtonComponent = ({
    price,
    starUserId , 
    containerStyle ,  
    textFontSize  , 
    hideOrderButton ,
    activateCallback , 
    callBack ,  
    mainProduct , 
}) =>{ 

    const navigation = useNavigation(); 
    const modalRef =  useRef();

    console.log(  "ModalRef" ,  modalRef.current ) ; 

return (
    <SafeAreaView >
        <View style={
            containerStyle  ? 
            [styles.container , containerStyle ]
            :styles.container }
        >
            {
                hideOrderButton ? 
                null
                :
                <TouchableOpacity 
                onPress={()=>{
                    if(activateCallback) {
                        callBack(); 
                    }else{
                        navigation.navigate("stack" , {
                            screen: ORDER , 
                            params: {
                                starUserId ,
                                mainProduct ,
                            }
                        }); 
                    }
                }}
                style={styles.button}
                >
                    {/* ₼ */}
                    <Text style={textFontSize?  {...styles.buttonText ,  fontSize: textFontSize }:styles.buttonText}>Sifariş edin {price}</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity 
            onPress={() => modalRef.current.showHowMeliyoWorksModal() }
            style={[styles.button,  styles.secondButton]}
            >
                <Text style={textFontSize?  {...styles.buttonText ,  fontSize: textFontSize }:styles.buttonText}>Meliyo necə işləyir?</Text>
            </TouchableOpacity>

            <HowMeliyoWorksModal
            ref={modalRef}
            />
        </View>
       
    </SafeAreaView>
)};



const styles = StyleSheet.create({
    container: {
        // height: helper.px(113) , 
        paddingVertical: helper.px(16), 
        paddingHorizontal: helper.px(16), 
        justifyContent: "space-between",
        backgroundColor: colors.tabBack,
    },
    button: {
        backgroundColor: colors.second , 
        paddingVertical: helper.px(14), 
        justifyContent:"center", 
        alignItems:"center" ,
        borderRadius: helper.px(5), 
        marginBottom: helper.px(5),
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(18) , 
        lineHeight: helper.px(20) , 
        color: colors.blanko , 
    }, 
    secondButton: {
        backgroundColor: "transparent" ,
    }
});

export default OrderButtonComponent;
