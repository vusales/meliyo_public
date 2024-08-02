import React,  {
    useEffect ,  
    useMemo , 
    useRef , 
    useReducer , 

} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,  
    TextInput ,
    TouchableOpacity ,
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import CommonLayout from '../layouts/CommonLayout';
import Alert from '../components/General/Alert';


const initials  =  {
    old_password: "" , 
    new_password: "" , 
}

const reducer  =  (state , action ) => {
    return { ...state , ...action }
}


const ChangePassword = ({
    stores , 
    params,
}) =>{

    // refs
    const alertRef =  useRef(); 

    // reducer & states 
    const [state  , dispatch ] = useReducer(reducer , initials) ; 

    console.log("state" , state );  

    const changePassword = async () => {
        try {
            if ( 
                (!state.old_password || !state.new_password) 
                || 
                (state.old_password !== state.new_password) 
            ) return alertRef.current.alert(true,  "error" , "Şifrə və ya şifrənin təkrarı qeyd edilməyib və ya səhv qeyd edilib!"); 
            await stores.authorationStore.changePassword(state.new_password).then((result)=>{
                if (!result) return  alertRef.current.alert(true,  "error" , "Xəta baş verdi!"); 
                return alertRef.current.alert(true,  "success" , "Şifrəniz uğurla dəyişdirildi!"); 
            }).catch((error)=>{
                if(error) {
                    return alertRef.current.alert(true,  "error" , "Xəta baş verdi!"); 
                }
            });  
        } catch (error) {
            if(error) console.log("error in change password" , error ) ; 
        }
    }

return (
    <>
        <Alert
        ref={alertRef}
        />
        <CommonLayout
            showDrawerButton={false}
            pageName={`ChangePassword`}
            showSearchComponent={false}
        >
            <View  style={styles.inputItem}>
                <Text style={styles.inputLabel}>Şifrə</Text>
                <TextInput
                value={state.old_password}
                onChangeText={(value)=>{dispatch({old_password: value })}}
                placeholder="Köhnə şifrə"
                style={styles.input}
                placeholderTextColor={colors.placeholderText}
                />
                {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
            </View>

            <View  style={styles.inputItem}>
                <Text style={styles.inputLabel}>Təkrar şifrə</Text>
                <TextInput
                value={state.new_password}
                onChangeText={(value)=>{dispatch({new_password: value })}}
                placeholder="Yeni şifrə"
                style={styles.input}
                placeholderTextColor={colors.placeholderText}
                />
                {/* <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text> */}
            </View>

            <TouchableOpacity
            onPress={() => changePassword() }
            style={styles.button}
            >
                <Text style={styles.buttonText}>Təsdiq et</Text>
            </TouchableOpacity>

        </CommonLayout>
    </>
)};

const styles = StyleSheet.create({
    inputLabel: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(14) , 
        lineHeight: helper.px(18) , 
        color: colors.blanko ,
    }, 
    input: {
        height: helper.px(32) , 
        backgroundColor: colors.gray, 
        borderWidth: .4 , 
        borderColor: "#4F4F4F" , 
        paddingVertical: 0 , 
        paddingLeft: helper.px(10) ,
        borderRadius: 4 , 
        marginVertical: helper.px(10), 
        color: colors.blanko , 
    } , 
    infoText: {
        fontFamily: helper.fontFamily(""),
        fontWeight:"400" ,  
        fontSize:helper.px(10) , 
        lineHeight: helper.px(14) , 
        color: colors.text ,
    }, 
    inputItem: {
        marginBottom: helper.px(16) ,
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
    
});

export default helper.mobx(ChangePassword);
