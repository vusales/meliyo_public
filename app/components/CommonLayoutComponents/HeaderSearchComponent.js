import React , {
    useState, 
    useRef,  
} from "react" ; 
import {
    Text , 
    View , 
    StyleSheet , 
    TouchableOpacity ,
    TextInput ,
} from "react-native" ; 
import colors from "../../values/colors";
import helper from "../../helpers/helper";
import icons from "../../values/icons";
import { useNavigation } from "@react-navigation/native";
import { VIEWALL } from "../../values/screenNameLists";
import Alert from "../General/Alert";
import {t} from "i18next";


const HeaderSearchComponent = ({

}) => {
    const navigation  =  useNavigation(); 
    const alertRef=useRef();
    const placeHolderText =  helper.translate("search");
    const [ searchedText ,  setSearchedText ] =  useState(""); 

    const search = () => {
        if(!searchedText){
            alertRef.current.alert(
                true  , 
                "error" , 
                "Heç bir məlumat daxil etmədən axtarış edirsiniz!" 
            ); 
            return ; 
        }
        navigation.navigate(
            "stack"  , 
            {
                screen: VIEWALL , 
                params: {
                    id: "", 
                    screenName : "Search result" ,
                    searchText :  searchedText ,  
                }
            } 
        );

        setTimeout(()=>{
            setSearchedText(""); 
        }), [500];
    }

    return (
        <>
            <Alert ref={alertRef} />
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    onPress={()=>search()}
                    style={styles.searchButton}
                >
                    {icons.search()}
                </TouchableOpacity>
                <TextInput
                    value={searchedText}
                    onChangeText={(value)=>setSearchedText(value)}
                    onSubmitEditing={()=>search()}
                    style={styles.searchInput}
                    placeholder={placeHolderText}
                    placeholderTextColor={colors.placeholderText}
                />
            </View>
        </>
    ) ; 
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row" , 
        backgroundColor: colors.gray , 
        alignItems: "center" , 
        // marginHorizontal: helper.px(16) , 
        borderRadius: helper.px(5) ,
    }, 
    searchButton: {
        height: helper.px(40) , 
        width: helper.px(50) , 
        justifyContent: "center" , 
        alignItems: "center" , 
    }, 
    searchInput: {
        paddingHorizontal: helper.px(16) ,
        fontFamily:helper.fontFamily('') , 
        fontWeight: "400" , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(22) , 
        letterSpacing: -0.408 , 
        color: colors.text,  
        textTransform: "capitalize",
        width: "80%" , 
    },
});


export default  HeaderSearchComponent ; 




