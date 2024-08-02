import React, {
    useState , 

} from 'react';
import { 
    Text, 
    View, 
    StyleSheet , 
    StatusBar ,  
    SafeAreaView , 
    FlatList ,
} from 'react-native';
import colors from '../values/colors';
import icons from '../values/icons';
import helper from '../helpers/helper';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../components/CommonLayoutComponents/HeaderComponent';
import NoProductComponent from '../components/General/NoProductComponent';
import CardComponent from '../components/Cards/CardComponent';
import { data } from '../demoData';
import ProductCardComponent from '../components/Cards/ProductCardComponent';
import { PRODUCTDETAILS } from '../values/screenNameLists';



const FavoritesScreen = ({
    
}) =>{ 
    const navigation =  useNavigation(); 
    
   
    const _renderItem = (item) => {
        return (
            <ProductCardComponent
            image={require("../assets/images/productCardImage.png")}
            productName ={"hsvajdvh hgbadkhs"}  
            price ={20} 
            discountPrice ={50}
            callback={()=>navigation.navigate("stack" , {
                screen: PRODUCTDETAILS , 
                params: {
                    productId : 0 , 
                    productName: "SOME product"
                }
            })}
            containerstyle={{
                width: helper.px(170) ,
            }}
            fromFavorites={true}
            />
        )
    }

    const _headerComponent = () => {
        return (
            <HeaderComponent  
            showDrawerButton={false} 
            pageName={"Favorites"}
            /> 
        ); 
    }

    const _listempty =() => {
        return (
            <NoProductComponent
                text="no product"
                buttonText="sifaris ele"
                callBack={()=>{
                navigation.navigate("stack" , {
                    screen: SEARCHOME , 
                })
                }}
            />
        )
    }

    return(
        <SafeAreaView style={styles.baseLayout}>
            <StatusBar 
            translucent={false}
            backgroundColor={colors.main}
            /> 
            <FlatList
            data={data.trends.data}
            keyExtractor={(item) => item.id + "favorites"}
            renderItem={({item})=>_renderItem(item)}
            ListHeaderComponent={()=>_headerComponent()}
            horizontal={false}
            numColumns={2}
            style={styles.flat}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={()=>_listempty}
            />
        </SafeAreaView>
    ); 
};

const styles=  StyleSheet.create({
    baseLayout: {
        flex: 1 , 
        backgroundColor: colors.main , 
    }, 
    flat: {
    }, 
    contentContainer: {
        paddingHorizontal: helper.px(16) , 
    } ,

    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: helper.px(20),
    },


}); 

export default FavoritesScreen;
