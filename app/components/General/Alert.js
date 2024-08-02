import React , {
    useState ,
    useEffect ,
    forwardRef ,  
    useImperativeHandle , 
} from 'react';
import {View, StyleSheet, Text ,  TouchableOpacity} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';

let closeAlertTimeOut ; 
let typeStyle;


const Alert  = forwardRef ((
    {
        
    } 
    ,  ref 
) => {

    const [alert , setAlert ] = useState({
        showAlert :  false , 
        alertType: "" , 
        alertMessage: "" , 
    }); 

    useImperativeHandle(ref , ()=>({
        alert : ( showAlert , type , message ) => {
            clearTimeout(closeAlertTimeOut); 
            setAlert({
                showAlert : showAlert , 
                alertType: type , 
                alertMessage: message , 
            });
            closeAlertTimeOut = setTimeout( () => closeAlert() , 4000);
        }, 
    }) , [] ) ;

    useEffect(()=>{
        clearTimeout(closeAlertTimeOut); 
    }, []);

    const closeAlert =  () => {
        setAlert({
            showAlert : false , 
            alertType: "" , 
            alertMessage: "" , 
        });
    }

    switch (alert.alertType) {
        case "error":
                typeStyle = styles.error; 
            break;
        case "success":
                typeStyle = styles.success; 
            break;
        case "warning":
                typeStyle = styles.warning; 
            break;
        default: typeStyle = styles.default;
            break;
    }

    return (
        <>
            {
                alert.showAlert ? 
                <View style={{...styles.layoutAlert,...typeStyle}}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>closeAlert()}
                    >
                        {icons.close()}
                    </TouchableOpacity>
                    {
                        alert.alertMessage ? 
                        <Text style={{...styles.message}}>{helper.capitalize(alert.alertMessage)}</Text> 
                        :null 
                    }
                </View>
                : null 
            }
        </>   
    )
}) ; 

const styles =  StyleSheet.create({
    layoutAlert: {
        width: helper.screenWidth-helper.px(30), 
        paddingVertical: helper.px(10),
        paddingHorizontal:helper.px(16), 
        borderWidth: helper.px(3), 
        alignSelf:"center",
        borderRadius: helper.px(20),
        alignItems: "flex-start", 
        justifyContent: "center",
        position: 'absolute', 
        zIndex: 5000, 
        top: helper.px(20),   
    }, 
    message:{
        fontFamily: helper.fontFamily("Black Bold"), 
        fontWeight: "400" ,
        fontSize: helper.px(14) , 
        lineHeight: helper.px(18),
        color:colors.text , 
        // color:colors.main , 
        width: "90%",
    }, 
    default:{
        backgroundColor: colors.main,
        borderColor: colors.text,
    }, 
    error: {
        borderColor: "#FF7165" ,
        backgroundColor: "#E60023", 
    }, 
    success: {
        borderColor: "#48AF7C" ,
        backgroundColor: "#009100",
    }, 
    warning: {
        borderColor: "#FFBA54",
        backgroundColor: "#F56702",
    },
    button: {
        position: "absolute" , 
        right: helper.px(16), 
        top:helper.px(7),
    }
}); 

export default Alert ;