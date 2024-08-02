import React ,  {
    useState ,  
    useEffect ,  
    useMemo , 
    useCallback , 
}  from  "react" ;
import helper from "../helpers/helper";
import colors from "../values/colors";
import {
    View ,  
    Text ,
    SafeAreaView , 
    StyleSheet , 
    StatusBar , 
    FlatList ,
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import { CATEGORIES ,VIEWALL } from "../values/screenNameLists";
import CategoriesButtonComponent from "../components/Cards/CategoriesButtonComponent";
import {categoriesdemodata} from "../demoData" ; 
import { useNavigation , useFocusEffect } from "@react-navigation/native";
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import NoProductComponent from "../components/General/NoProductComponent";

const CategoryScreen = ({
    stores , 
}) => {
    const navigation =  useNavigation(); 
    const categories =  useMemo(()=> stores.getCategoriesStore.categories  , [stores.getCategoriesStore.categories]) ; 

    // useFocusEffect(useCallback(()=>{
    //     getcategories() ; 
    // },  [])); 
    useEffect(()=>{
        getcategories() ; 
    },  []); 
    
    
    const getcategories = async () => {
        try {
            await stores.getCategoriesStore.getCategoriesShort() ; 
        } catch (error) {
            if(error) {
                console.log("error in getCategories " , error) ; 
            }
        }
    }

    // FLATLIST FUNCTIONS 
    const _renderItem = (item) => {
        return(
            <CategoriesButtonComponent
            key={`CategoriesButtonComponent-${item.category_id}-${item.name}`}
            categoryName={item.name} 
            callBack={()=>{
                navigation.navigate( "stack" , {
                    screen: VIEWALL , 
                    params: {
                        id: item?.category_id , 
                        screenName : item?.name , 
                    }
                }); 
            }}
            image={item.image}
            color={item?.color}
            />   
        )
    }

    const _emptyHeaderComponent = () => {
        return(
            <HeaderComponent
            showDrawerButton={true}
            pageName={helper.translate("categoryPageTitle")}
            showSearchComponent={false}
            />
        )
    }

    const _emptyListComponent = () => {
        return(
            <NoProductComponent
            // text={ notLoggedIn ? "You are not loged in!" :"No followings!"}
            text={"No product!"}
            hideButton={true}
            />
        )
    }


    return (

        <SafeAreaView style={styles.safeareviewdesign} >
            <StatusBar 
            translucent={false}
            backgroundColor={colors.main}
            /> 
            <FlatList
                data={categories}
                renderItem={({item}) => _renderItem(item)}
                style={styles.flat}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={()=>_emptyListComponent()}
                ListHeaderComponent={()=>_emptyHeaderComponent()}
                keyExtractor={(item , index) => `CATEGORIES-${index}`}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeareviewdesign: {
        flex: 1 , 
        backgroundColor: colors.main ,  
    }, 
    flatlist:{
        paddingHorizontal: helper.px(16),
    } , 
    contentContainer: {
        paddingHorizontal: helper.px(16),
    },
    
});

export default helper.mobx(CategoryScreen) ; 