import React, {
    useState , 
    useReducer , 
    useRef , 
    useMemo ,  
    useEffect , 

} from 'react';
import {
    View ,  
    Text ,
    TouchableOpacity , 
    FlatList  , 
    StyleSheet ,
    SafeAreaView ,  
    StatusBar ,
    Image ,
    TextInput , 
}from "react-native" ; 
import OrderButtonComponent from '../components/StarUserDetailsScreen/OrderButtonComponnet';
import CommonLayout from '../layouts/CommonLayout';
import colors from '../values/colors';
import helper from '../helpers/helper';
import icons from '../values/icons';
import RadioButton from '../components/General/RadioButton';
import Checkbox from 'expo-checkbox';
import { MaskedTextInput } from "react-native-mask-text";
import OrderResultDetailsModal from '../modals/OrderModals/OrderResultDetailsModal';
import Alert from '../components/General/Alert';

const initialValue  =  { 
    email : "" ,
    phone: "" , 
    standart: true , 
}

const reducer =(state , action ) => {
    return {...state  , ...action }
}


const OrderConfirmationScreen = ({
    stores ,
    route: {params: {
        starUserId , 
        price , 
        mainProduct , 
        orderInfo , 
    } ,
}
}) =>{ 
    const modalRef  =  useRef(null) ; 
    const alertRef =  useRef(null);  

    const [isChecked, setChecked] = useState(false);
    const [user, setuser ] = useState(false);
    const [ values ,  valuesDispatch ] =  useReducer( reducer  , initialValue ) ; 
    // console.log("starUserId" , starUserId ); 
    // console.log("price" , price ); 
    // console.log("user" , user ); 

    useEffect(()=>{
        getUserData();  
    }, []); 


    const getUserData  =  async () => {
        try {
            let user =  await helper.getdataFromAsyncStorage("@user_data");  
            if(!user || user ==+ null ) return ; 
            user = JSON.parse(user); 
            setuser(user);  
            valuesDispatch({
                email : user.email ,
                // phone: user.telephone , 
            }); 
        } catch (error) {
            if(error){
                console.log("error" , error) ;
            }
        }
    }

    const order = async () => {
        try {
            let base = {
                ...orderInfo , 
                ...values , 
                standartDelivery : isChecked , 
            }

            let body = {
                "dont_publish": isChecked ,
                "is_gift":base.gift ,
                "theme": base?.theme?.value ,
                "fast_order": base?.standart ,
                "details": base?.instructions ,
                "self_description": base.aboutUser ,
                "email": base.email,
                "phone": values.phone ?? user?.telephone ,
                "star_id":starUserId,
                "from":base?.fromWhomTo?.from ,
                "to": base?.fromWhomTo?.to , 
            }


            await stores.orderStore.order(body).then((result)=> {
                if(!result) {
                    alertRef.current.alert(true , "error" ,  "Xəta baş verdi!");
                }
            });

        } catch (error) {
            console.log("error" , error ); 
            alertRef.current.alert(true , "error" ,  "Xəta baş verdi!"); 
        }
    }

    
return (
    <>
        <CommonLayout
        showDrawerButton={false}
        pageName={"Sifariş"}
        showSearchComponent={false}
        >
            <View style={ styles.container }> 
                <Text style={styles.title }>Çatdırılma məlumatı</Text>

                <TouchableOpacity 
                onPress={()=> valuesDispatch({ "standart": true }) }
                style={styles.checkboxContainer}>
                    <RadioButton
                    selected={values.standart}
                    size={20}
                    borderColor={"#2371F9"}
                    style={{
                        backgroundColor:colors.blanko , 
                        marginRight:helper.px(10),
                    }}
                    />
                    <View style={styles.checkboxTextContainer}>
                        <Text style={styles.mainText}>Standart</Text>
                        <Text style={styles.descriptionText}>Lorem Ipsum has been the industry's standard</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=> valuesDispatch({"standart": false }) }
                style={styles.checkboxContainer}>
                    <RadioButton
                    selected={values.standart ? false : true }
                    size={20}
                    borderColor={"#2371F9"}
                    style={{
                        backgroundColor:colors.blanko , 
                        marginRight:helper.px(10),
                    }}
                    />
                    <View style={styles.checkboxTextContainer}>
                        <Text style={styles.mainText}>48 saat ərzində çatdırılma</Text>
                        <Text style={styles.descriptionText}>Lorem Ipsum has been the industry's standard</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <Text style={styles.mainText}>E-mail</Text>
                    <TextInput
                    style={styles.input}
                    placeholder={user.email? user.email : 'e-mail əlavə edin'}
                    placeholderTextColor={colors.placeholderText}
                    value ={ values.email }
                    onChangeText={(value)=>valuesDispatch({"email" : value })}
                    /> 
                    {/* <Text style={styles.descriptionText}>Lorem Ipsum has been the industry's standard</Text> */}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.mainText}>Nömrənizi qeyd edin</Text>
                    <MaskedTextInput
                    value={ values.phone }
                    style={styles.input}
                    placeholder={user.telephone? user.telephone : '(+994) XX-XXX-XX-XX'}
                    placeholderTextColor={colors.placeholderText}
                    onChangeText={(masked, unmasked) => {
                        // assuming you typed "9" all the way:
                        console.log(masked); // (99) 99999-9999
                        console.log(unmasked); // 99999999999
                        valuesDispatch({ "phone" : unmasked });
                    }}
                    mask={"099 999 99 99"}
                    keyboardType="numeric"
                    />
                    {/* <Text style={styles.descriptionText}>Lorem Ipsum has been the industry's standard</Text> */}
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? colors.main : undefined}
                    />
                    <Text style={{...styles.mainText ,   marginLeft: helper.px(10) , }}>Video Ulduzun (ulduzun adı) səhifəsində görünməsin</Text>
                </View>


            </View>
        </CommonLayout>


        <OrderButtonComponent
            hideOrderButton={false}
            containerStyle={{backgroundColor:colors.main}}
            textFontSize={15}
            price={price}
            activateCallback={true}
            callBack={()=>order()}
            // callBack={()=>modalRef.current.showOrderResultDetailsModal()}
        />

        <OrderResultDetailsModal
        ref={modalRef}
        price={price}
        callBack={()=>order()}
        />
       
    </>  
)};

const styles = StyleSheet.create({
    container: {

    } , 
    checkboxContainer: {
        flexDirection:"row" , 
        marginVertical: helper.px(8) , 
        alignItems:"center" ,
    }, 
    checkboxTextContainer :{
        // alignItems:"center" ,
        marginLeft: helper.px(10) ,
    }, 
    mainText: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(14) , 
        lineHeight: helper.px(16) , 
        color: colors.blanko ,
    }, 
    descriptionText: {
        fontFamily: helper.fontFamily("Medium"),
        fontWeight:"500" ,  
        fontSize:helper.px(8) , 
        lineHeight: helper.px(12) , 
        color: colors.text ,
    }, 
    input: {
        borderRadius: 4 , 
        borderWidth: .4 , 
        borderColor: "#4F4F4F" , 
        color:colors.blanko , 
        paddingHorizontal: helper.px(10) , 
        height:helper.px(40) ,
        backgroundColor: colors.gray , 
        marginVertical: helper.px(10) , 

    }, 
    checkbox: {
        borderWidth: .5 , 
        borderColor: colors.blanko , 
    },
    inputContainer: {
        marginVertical: helper.px(16) ,
    }

    
});

export default helper.mobx(OrderConfirmationScreen);
