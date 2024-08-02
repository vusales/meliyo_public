import React , {
    useEffect , 
    useState , 
} from  "react" ;
import {
    View ,  
    Text ,
    StyleSheet , 
    SafeAreaView ,  
    FlatList , 

}from "react-native" ; 
import { 
    STORE ,  
    PRODUCTDETAILS , 
    USERDETAILS , 
    SEARCHOME , 
} from "../values/screenNameLists";
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import colors from "../values/colors";
import icons from "../values/icons";
import helper from "../helpers/helper";
import ProductCardComponent from "../components/Cards/ProductCardComponent";
import { data } from "../demoData";
import HeaderSearchComponent from "../components/CommonLayoutComponents/HeaderSearchComponent";
import FilterButtonComponent from "../components/Store/FilterButtonComponent";
import { useNavigation } from "@react-navigation/native";
import FollowCardComponent from "../components/Cards/FollowCardComponent";
import NoProductComponent from "../components/General/NoProductComponent";



const StoreScreen = ({
    route
}) => {

    const navigation =  useNavigation(); 
    const [ seller , setSeller ] = useState(""); 

    useEffect(()=>{
        if(route?.params?.sellerId){
            setSeller(route?.params?.sellerId); 
        }
    },[seller]); 

    const _renderItem  = () => {
        return (
            <ProductCardComponent
            image={require("../assets/images/productCardImage.png")}
            productName ={"hsvajdvh hgbadkhs"}  
            price ={20} 
            discountPrice ={50}
            callback={()=>{
                navigation.navigate("stack" , {
                    screen: PRODUCTDETAILS , 
                    params: {
                        productId : 0 , 
                        productName: "SOME product"
                    }
                });
            }}
            containerstyle={{
                width: helper.px(170) ,
            }}
            // promotion={"SALE"}
            inStock={true}
            />
        )
    }

    const _headerComponent  = () => {

        return (
            <View style={styles.header}>
                <HeaderComponent
                showDrawerButton={ true } 
                pageName={helper.translate("storePageTitle")}
                starDetailsHeader={false}
                />

                <HeaderSearchComponent
                />

                {
                    seller ? 
                    <View style={{paddingVertical: helper.px(16)}}>
                        <FollowCardComponent
                            // key={`FollowCardComponent-${index}`}
                            image={require("../assets/images/cardImage.png")} 
                            name={"name"}     
                            speciality={"actor"} 
                            followers={"50"} 
                            rating ={"3"}
                            comments ={"2"}
                            callback={()=>{
                                navigation.navigate( "stack" , 
                                {
                                    screen :  USERDETAILS  , 
                                    params : {
                                        id: "name" ,  
                                    }
                                })
                            }}
                        />
                    </View>
                    :null 
                }
                <FilterButtonComponent
                />
            </View>
        )

    }

    return (
        <SafeAreaView 
        style={styles.layout}
        >
            {/* delete this and uncommit Flatlist if store section is activated  */}
            <View style={{paddingHorizontal: helper.px(16)}}>
                <HeaderComponent
                showDrawerButton={ true } 
                pageName={helper.translate("storePageTitle")}
                starDetailsHeader={false}
                />
                <HeaderSearchComponent
                />
                <View style={{height:30}}></View>
                <NoProductComponent
                text={helper.translate("soon")}
                buttonText={helper.translate("tohome")}
                callBack={()=> navigation.navigate("stack" , {
                            screen: "tab" , 
                            params : {
                                screen : SEARCHOME + "stack" ,
                            }
                        })
                }
                />
            </View>

            {/* <FlatList
                data={data.trends.data}
                keyExtractor={(item) => item.id + "stores"}
                renderItem={({item})=>_renderItem(item)}
                ListHeaderComponent={()=>_headerComponent()}
                horizontal={false}
                numColumns={2}
                style={styles.flat}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
            /> */}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    layout: {
        flex: 1 , 
        backgroundColor: colors.main , 
    }, 
    paddingH : {
        paddingHorizontal: helper.px(16) , 
    } , 
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: helper.px(20),
    },
    flat: {
        paddingHorizontal: helper.px(16) , 
    } , 
    header: {
        marginBottom: helper.px(16) ,
    } , 
});


export default StoreScreen ; 