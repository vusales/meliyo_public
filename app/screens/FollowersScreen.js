import React, { 
    useState, 
    useEffect,  
    useMemo , 
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
import { USERDETAILS } from "../values/screenNameLists";
import FollowCardComponent from "../components/Cards/FollowCardComponent";
import { data } from "../demoData";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import NoProductComponent from "../components/General/NoProductComponent";


const FollowersScreen = ({
    route , 
    stores , 
}) => {
    const navigation =  useNavigation() ; 

    // memos
    const subscribers =  useMemo(()=>stores.getFollowersStore.subscribers,[stores.getFollowersStore.subscribers]); 

    // states
    const [ userId , setUserId ] =  useState(); 


    useEffect(()=> {
        if(route?.params?.userId){
            setUserId(route?.params?.userId); 
            getsubscribers(); 
        }
    },  [route?.params?.userId] ); 

     



    const getsubscribers =  async () => {
        try {
            if(!route?.params?.userId) return ; 
            await stores.getFollowersStore.getSubscribers({starId:route?.params?.userId}) ; 
        } catch (error) {
            if(error) {
                console.log("error in getsubscribers" , error );  
            }
        }
    }

    // console.log("subscribers" , subscribers ) ; 


    // FLATLIST FUNCTIONS 
    const _renderItem = (item) => {

        return(
            <FollowCardComponent
                image={{uri:item.image}} 
                name={`${item.firstname} ${item.lastname}`}     
                speciality={item.category_name} 
                followers={item.subscription_count} 
                rating ={item.rating}
                comments ={item.review_count}
                subscribers={true}
                callback={()=>{
                    if(item.isStar){
                        navigation.navigate( "stack" , 
                        {
                            screen :  USERDETAILS  , 
                            params : {
                                id: item.star_id ,  
                            }
                        })
                    }else {
                        return ; 
                    }
                }}
            />
        )
    }

    const _emptyHeaderComponent = () => {
        return(
            <HeaderComponent
            showDrawerButton={false}
            pageName={"İzləyicilərin"}
            showSearchComponent={false}
            />
        )
    }

    const _emptyListComponent = () => {
        return(
            <NoProductComponent
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

            {/* {
                loading ? 
                <Loader/>
                : 
                ( */}
                <FlatList
                    data={subscribers}
                    renderItem={({item}) => _renderItem(item) }
                    style={styles.flat}
                    contentContainerStyle={styles.contentContainer}
                    ListEmptyComponent={()=>_emptyListComponent()}
                    ListHeaderComponent={()=>_emptyHeaderComponent()}
                    keyExtractor={(item , index) => `FollowCardComponent-${index}`}
                />
                {/* )
            } */}
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


export default helper.mobx(FollowersScreen); 