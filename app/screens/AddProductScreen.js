import React, {
    useState , 
    useEffect , 
    useReducer , 

} from 'react';
import {
    StyleSheet, 
    Text,
    View ,
    SafeAreaView , 
    TextInput , 
    TouchableOpacity , 
} from 'react-native';
import colors from '../values/colors';
import icons from '../values/icons';
import helper from '../helpers/helper';
import CommonLayout from '../layouts/CommonLayout';
import AddProductComponent from '../components/Products/AddProductComponent';
import HeaderComponent from '../components/CommonLayoutComponents/HeaderComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButton from '../components/General/RadioButton';
import { ScrollView } from 'react-native-gesture-handler';

const initial  = { 
    size : null  , 
    color: null , 
    initialPrice: "" , 
    sellPrice : "" , 
    profit: "" , 
    productDescription : "" , 
    title: "" , 
    productCount : "" , 
}

const reducer =(state  , action ) => {
    return {...state , ...action }
}

const aboutProductArray   =  [
    {
        name: "Az istifadə olunmuş" ,  
        value : "nearlyNew" , 
    }, 
    {
        name: "Yeni" ,  
        value : "new" , 
    }, 
    {
        name: "Etiketli" ,  
        value : "withtag" , 
    }, 
] 


const AddProductScreen = ({
    params,
}) =>{ 
    DropDownPicker.setListMode("SCROLLVIEW");
    const [state  ,  dispatch  ] =  useReducer(reducer ,  initial ) ; 
    const [colorsValue, setColorsValue] = useState(null);
    const [sizeValues, setsizeValues] = useState(null);
    const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
    const [sizeitems, setSizeitems] = useState([
        {label: 'm', value: 'm'},
        {label: 'l', value: 'l'}, 
        {label: 'm', value: 'm'},
        {label: 'l', value: 'l'},
        {label: 'm', value: 'm'},
        {label: 'l', value: 'l'},
    ]);
    const [openColorDropdown, setOpenColorDropdown] = useState(false);
    const [colorItems, setColorItems] = useState([
        {label: 'red', value: 'red' ,    icon: () => icons.singledot(colors.error) },
        {label: 'blue', value: 'blue' ,  icon: () => icons.singledot("blue") }
    ]);
    const [aboutPrd , setAboutPrd] =  useState("") ; 


    
return (

    <SafeAreaView style={styles.safe} >
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="always"
        >
            <View style={styles.paddingH} >
                <HeaderComponent
                    showDrawerButton={false } 
                    pageName={"Product"}
                    starDetailsHeader={false}
                />
            </View>
            <View style={styles.paddingL}>
                <Text style={styles.titles}>Şəkil</Text>
                <AddProductComponent
                />
            </View>

            <View  style={styles.inputItem}>
                <Text style={styles.titles}>Başlıq</Text>
                <TextInput
                value={state.title}
                onChangeText={(value)=>dispatch({title:value})}
                style={styles.inputF}
                placeholder='Başlıq əlavə edin'
                placeholderTextColor={colors.placeholderText}
                />
            </View>

            <View  style={styles.inputItem}>
                <Text style={styles.titles}>Açıqlama</Text>
                <TextInput
                style={styles.inputF}
                placeholder='Məhsul haqqında yazın'
                placeholderTextColor={colors.placeholderText}
                // textAlignVertical='top'
                value={state.productDescription}
                onChangeText={(value)=>dispatch({productDescription:value})}
                />
            </View>

            {/* <View style={styles.marginV}>
                <View style={{...styles.paddingH , ...styles.titleLine}}>
                    <Text style={styles.titles }>Başlıq</Text>
                </View>
                <TextInput
                style={styles.fullWidthInput}
                placeholder='Başlıq əlavə edin'
                placeholderTextColor={colors.placeholderText}
                value={state.title}
                onChangeText={(value)=>dispatch({title:value})}
                />
            </View> */}

            {/* <View style={styles.marginV}>
                <View style={{...styles.paddingH , ...styles.titleLine}}>
                    <Text style={styles.titles }>Açıqlama</Text>
                </View>
                <TextInput
                style={styles.fullWidthInput}
                placeholder='Məhsul haqqında yazın'
                placeholderTextColor={colors.placeholderText}
                // textAlignVertical='top'
                value={state.productDescription}
                onChangeText={(value)=>dispatch({productDescription:value})}
                />
            </View> */}

            <View  style={{ ...styles.paddingH , ...styles.row , zIndex: 5000 }}>
                <View  style={styles.dropdownContainer}>
                    <Text style={{
                        ...styles.titles , 
                        // fontSize : helper.px(10) ,
                        marginVertical: helper.px(10), 
                    }}>Bədən ölçüsü</Text>
                    <DropDownPicker
                    open={openSizeDropdown}
                    value={sizeValues}
                    items={sizeitems}
                    setOpen={setOpenSizeDropdown}
                    setValue={setsizeValues}
                    setItems={setSizeitems}
                    style={styles.dropdown}
                    dropDownDirection="BOTTOM"
                    textStyle={{
                        color:colors.blanko ,  
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: colors.gray , 
                    }}
                    zIndex={3000}
                    zIndexInverse={2000}
                    />
                </View>

                <View style={styles.dropdownContainer} >
                    <Text
                    style={{
                        ...styles.titles , 
                        // fontSize : helper.px(10) ,
                        marginVertical: helper.px(10), 
                    }}
                    >Rəng</Text>
                    <DropDownPicker
                    open={openColorDropdown}
                    value={colorsValue}
                    items={colorItems}
                    setOpen={setOpenColorDropdown}
                    setValue={setColorsValue}
                    setItems={setColorItems}
                    style={styles.dropdown}
                    dropDownDirection="BOTTOM"
                    textStyle={{
                        color:colors.blanko ,  
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: colors.gray , 
                    }}
                    zIndex={2000}
                    zIndexInverse={3000}
                    />
                </View>
            </View>

            <View style={{...styles.paddingH , ...styles.marginV }}>
                <Text style={styles.titles}>Məhsul haqqında</Text>
                {
                    aboutProductArray?.map((item , index )=> {

                        return  (
                            <TouchableOpacity
                            onPress={() => setAboutPrd(item.value) }
                            key={`${item.value}`}
                            style={{
                                ...styles.row , 
                                marginVertical: helper.px(10) , 
                                alignItems: "center" ,
                            }}
                            >
                                <RadioButton
                                selected={ item.value ===  aboutPrd ?  true  : false }
                                size={15}
                                borderColor={"#2371F9"}
                                style={{
                                    backgroundColor:colors.blanko , 
                                    marginRight:helper.px(10),
                                }}
                                />
                                <Text style={styles.texts}>{item.name}</Text>
                            </TouchableOpacity>
                        ); 
                    })
                }
            </View>

            <View style={{...styles.paddingH , }}>
                <Text style={styles.titles}>Məbləğ</Text>
            </View>

            <View style={{
                ...styles.titleLine , 
                ...styles.row ,
                ...styles.inputCon , 
                ...styles.paddingH ,
                ...styles.borderBottom , 
                }}
            >
                <Text style={styles.texts}>Məhsul sayı?</Text>
                <TextInput
                placeholder='0 ədəd'
                placeholderTextColor={colors.placeholderText}
                style={styles.input}
                textAlign='right'
                // keyboardType='numeric'
                value={state.productCount}
                onChangeText={(value)=>dispatch({productCount:value})}
                />
            </View>

            {/* <View style={{
                ...styles.titleLine , 
                ...styles.row ,
                ...styles.inputCon , 
                ...styles.paddingH ,
                ...styles.borderBottom , 
                }}
            >
                <Text style={styles.texts}>Məhsulu neçəyə aldınız?</Text>
                <TextInput
                placeholder='0 ₼'
                placeholderTextColor={colors.placeholderText}
                style={styles.input}
                textAlign='right'
                // keyboardType='numeric'
                value={state.initialPrice}
                onChangeText={(value)=>dispatch({initialPrice:value})}
                />
            </View> */}
            
            <View style={{
                ...styles.titleLine , 
                ...styles.row ,
                ...styles.inputCon , 
                ...styles.paddingH,
                ...styles.borderBottom , 
                }}
            >
                <Text style={styles.texts} >Məhsulu neçəyə satırsınız?</Text>
                <TextInput
                placeholder='0 ₼'
                placeholderTextColor={colors.placeholderText}
                style={styles.input}
                textAlign='right'
                // keyboardType='numeric'
                value={state.sellPrice}
                onChangeText={(value)=>dispatch({sellPrice:value})}
                />
            </View>
            {/* <View style={{
                ...styles.titleLine , 
                 ...styles.row ,
                  ...styles.inputCon , 
                  ...styles.paddingH , 
                  ...styles.borderBottom , 
                }}
            >
                <Text style={styles.texts}>Əldə edəcəyiniz məbləğ:</Text>
                <TextInput
                placeholder='0 ₼'
                placeholderTextColor={colors.placeholderText}
                style={styles.input}
                textAlign='right'
                // keyboardType='numeric'
                value={state.profit}
                onChangeText={(value)=>dispatch({profit:value})}
                />
            </View> */}

            <Text 
            style={{ 
                ...styles.texts , 
                marginTop: helper.px(16) , 
                paddingHorizontal:helper.px(16),   
                color: colors.error , 
            }} 
            >Satışdan əldə ediləcək gəlirin 20%-i komissiya haqqı olaraq çıxılacaqdır.</Text>

            <View 
            style={{
                ...styles.paddingH , 
                ...styles.marginV 
                }}
            >
                <TouchableOpacity
                style={styles.button} 
                >
                    <Text style={styles.buttonText}>Təsdiqlə</Text>
                </TouchableOpacity>
            </View>

            <View style={{height:50}}></View>
        </ScrollView>
    </SafeAreaView>
)};


const styles = StyleSheet.create({
    paddingH: {
        paddingHorizontal: helper.px(16) ,
    } , 
    paddingL: {
        paddingLeft: helper.px(16) ,
    } , 
    row: {
        flexDirection:"row" ,
    }, 
    marginV: {
        marginVertical: helper.px(24) ,
    } , 
    safe:{
        backgroundColor: colors.main , 
        flex: 1 , 
    }, 
    titles: {
        fontFamily: helper.fontFamily("Medium") ,
        fontWeight: "500" , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(24) ,
        color: colors.blanko ,
        marginBottom:helper.px(16) ,
    } , 
    texts: {
        fontFamily: helper.fontFamily("Medium") ,
        fontWeight: "500" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) ,
        color: colors.text ,  
    } , 
    titleLine :{
        paddingVertical: helper.px(10) , 
        backgroundColor: colors.gray , 

    } , 
    fullWidthInput : {
        paddingVertical: helper.px(10) , 
        paddingHorizontal: helper.px(16) , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(24) ,
        fontWeight: "500" , 
        fontFamily: helper.fontFamily("Medium"), 
        borderBottomWidth: .7 , 
        borderBottomColor: "#686868" , 
        color:colors.blanko ,
    } , 
    dropdownContainer: {
        width: "50%" ,
        paddingVertical: 5 , 
        paddingHorizontal: 5 ,  
    }, 
    dropdown: {
        backgroundColor: colors.gray , 
        color: colors.blanko ,
    }, 
    input: {
        width: "40%" , 
        alignItems: "flex-end" ,
        color: colors.blanko , 
    }, 
    inputCon: {
        alignItems: "center" , 
        justifyContent:"space-between" , 
    }, 
    borderBottom : {
        borderBottomColor: colors.placeholderText , 
        borderBottomWidth: .5 ,  
    },
    button: {
        backgroundColor: colors.second , 
        paddingVertical: helper.px(14), 
        paddingHorizontal: helper.px(10) , 
        justifyContent:"center", 
        alignItems:"center" ,
        borderRadius: helper.px(5), 
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Bold"),
        fontWeight:"600" ,  
        fontSize:helper.px(16) , 
        color: colors.blanko ,  
    } , 

    inputItem: {
        paddingHorizontal: helper.px(16) ,
        marginTop: helper.px(16),
    },

    inputF: {
        height: helper.px(38) , 
        backgroundColor: colors.gray, 
        borderWidth: .4 , 
        borderColor: "#4F4F4F" , 
        paddingVertical: 0 , 
        paddingLeft: helper.px(10) ,
        borderRadius: 4 , 
        marginVertical: helper.px(10), 
        color: colors.blanko , 
        fontSize: helper.px(12) , 
        lineHeight: helper.px(24) ,
        fontWeight: "500" , 
        fontFamily: helper.fontFamily("Medium"), 
    } , 
});

export default AddProductScreen;
