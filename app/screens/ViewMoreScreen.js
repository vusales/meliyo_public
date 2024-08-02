import React , {
    useState  , 
    useEffect , 
    useMemo ,  
} from  "react" ;
import helper from "../helpers/helper";
import colors from "../values/colors";
import icons from "../values/icons";
import {
    View ,  
    Text ,
    TouchableOpacity , 
    FlatList  , 
    StyleSheet ,
    SafeAreaView ,  
    StatusBar ,
}from "react-native" ; 
import { VIEWALL ,  USERDETAILS } from "../values/screenNameLists";
import { useNavigation } from "@react-navigation/native";
import { data } from "../demoData";
import CardComponent from "../components/Cards/CardComponent";
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import NoProductComponent from "../components/General/NoProductComponent";



const ViewMoreScreen = ({
    route , 
    stores , 
}) => {

    const navigation =  useNavigation(); 
    const  [screenName ,  setScreenName ] =  useState("") ; 
    const  [searchedText ,  setSearchedText ] =  useState("") ; 
    const  [id  ,  setId ] =  useState("") ; 

    const resultdata =  useMemo(()=>stores.homestore.searchResult ,  [stores.homestore.searchResult]); 

    useEffect(()=> {
        //  screenName ,  id  , searchedText comes from  route 
        if(route.params){
            const { params } =  route ; 

            setScreenName(params?.screenName) ; 

            console.log( "params" , params );  

            if(params?.id) {
                setId(params.id);
            }

            if(params?.searchText){
                setSearchedText(params.searchText); 
            }
           
        }  
    }, [route.params.id ,  route.params.searchText ] ); 


    useEffect (()=>{
        getResultData() ; 
    }, [id , searchedText ]);

   
    // getData
    const getResultData = async () => {
        try {

            let body = {} ; 

            if(id) {
                body.category_id =  id ;   
            }

            if(searchedText){
                body.searchText =  searchedText ;   
            }

            if(Object.keys(body).length <= 0 ) {
                return ; 
            }

            await stores.homestore.searchProducts(body);  
        } catch (error) {
            if(error) {
                console.log("getting data errro in viewall page " , error); 
            }  
        }
    }


    // flatlist  fuxtions
    const _renderItem = (item) => {
        return (
            <CardComponent
                key={`key-home-card-${item.customer_id}`}
                image={item.image}  
                price={item.price}   
                discountPrice={item.discountPrice}   
                speciality={item.speciality} 
                name={item.firstname + item.lastname } 
                onlineTime={item.onlineTime}
                callBack={()=>{
                    navigation.navigate( "stack" , 
                    {
                        screen :  USERDETAILS  , 
                        params : {
                            id: item.customer_id ,  
                        }
                    })
                }}
            />
        )
    }

    const _headerComponent = () => {
        return (
            <HeaderComponent  
            showDrawerButton={false} 
            pageName={ screenName ?? ""}
            /> 
        ); 
    }

    const _emptyComponnet =() => {
        return (
            <NoProductComponent
                text="no product"
                buttonText="sifaris ele"
                callBack={()=>{
                    navigation.goBack();
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
            data={resultdata}
            keyExtractor={(item) => item.customer_id + "searches"}
            renderItem={({item})=>_renderItem(item)}
            ListHeaderComponent={()=>_headerComponent()}
            horizontal={false}
            numColumns={2}
            style={styles.flat}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={()=>_emptyComponnet()}
            />
        </SafeAreaView>
    ); 
}


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

export default helper.mobx(ViewMoreScreen)  ; 


