import React from 'react';
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



const ChangeEmail = ({
    params,
}) =>{

return (
    <CommonLayout
        showDrawerButton={false}
        pageName={`ChangeEmail`}
        showSearchComponent={false}
    >

        <View  style={styles.inputItem}>
            <Text style={styles.inputLabel}>Cari e-mail</Text>
            <TextInput
            // value={state.name}
            // onChangeText={(value)=>{dispatch({name: value })}}
            placeholder="Şifrə"
            style={styles.input}
            placeholderTextColor={colors.placeholderText}
            />
            <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text>
        </View>

        <View  style={styles.inputItem}>
            <Text style={styles.inputLabel}>Yeni e-mail</Text>
            <TextInput
            // value={state.name}
            // onChangeText={(value)=>{dispatch({name: value })}}
            placeholder="Təkrar şifrə"
            style={styles.input}
            placeholderTextColor={colors.placeholderText}
            />
            <Text style={styles.infoText}>Lorem ipsum lorem ipsum</Text>
        </View>

        <TouchableOpacity
        onPress={() => { console.log("confitm changhes")}}
        style={styles.button}
        >
            <Text style={styles.buttonText}>Təsdiq et</Text>
        </TouchableOpacity>

    </CommonLayout>
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


export default ChangeEmail;
