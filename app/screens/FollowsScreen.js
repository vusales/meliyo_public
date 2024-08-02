import React ,  {
    useEffect , 
    useMemo ,  
    useState ,  
    useCallback ,  
} from  "react" ;
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
import { FOLLOWS  , USERDETAILS ,LOGIN } from "../values/screenNameLists";
import FollowCardComponent from "../components/Cards/FollowCardComponent";
import { useNavigation } from "@react-navigation/native";
import NoProductComponent from "../components/General/NoProductComponent";
import Loader from "../components/General/Loader";
import { useFocusEffect } from '@react-navigation/native';
import HeaderComponent from "../components/CommonLayoutComponents/HeaderComponent";
import { useTranslation } from "react-i18next";





const FollowScreen = ({
    stores, 
}) => {
    const navigation =  useNavigation();
    const {t} = useTranslation(); 
    const followings =  useMemo(()=>stores.getFollowersStore.followings , [stores.getFollowersStore.followings ,  notLoggedIn ]);
    // const followings =  stores.getFollowersStore.followings ; 
    const  [ notLoggedIn, setNotLoggedIn ] = useState(false);  
    const  [ loading, setLoading ] = useState(true);  

    useEffect(()=>{
        getFollowings() ; 
    }, [notLoggedIn]);

    useFocusEffect(useCallback(()=>{ 
        defineAuthentification();
        // getFollowings(); 
    },[] )); 

    const getFollowings = async () => {
        try {
            await stores.getFollowersStore.getFollowers().then((result)=>{
                setTimeout(()=>
                {
                    setLoading(false); 
                } ,  1000 ) ; 
            });   
        } catch (error) {
            if(error) {
                console.log("error"  , error );  
            }
        }
    }

    const defineAuthentification = async () => {
        try {
            let islogedIn = await helper.isUserLogedIn(); 
            console.log("isloged favorites" , islogedIn ); 
            if( islogedIn == false ){
                setNotLoggedIn(true);
                setTimeout(()=>
                {
                    setLoading(false); 
                } ,  1000 ) ; 
                return ; 
            }
            setNotLoggedIn(false);
        } catch (error) {
            if(error) {
                console.log("error"  , error );  
            }
        }
    }

    // FLATLIST FUNCTIONS 
    const _renderItem = (item) => {
        return(
            <FollowCardComponent
                image={{uri:item.image}} 
                name={ `${item.firstname} ${item.lastname}`}     
                speciality={item.category_name} 
                followers={item.subscription_count} 
                rating ={item.rating}
                reviewCount ={item.review_count}
                comments ={item.comments}
                starId={item.star_id}
                callback={()=>{
                    navigation.navigate( "stack" , 
                    {
                        screen :  USERDETAILS  , 
                        params : {
                            id: item.star_id ,  
                        }
                    })
                }}
            />
        )

    }

    const _emptyHeaderComponent = () => {
        return(
            <HeaderComponent
            showDrawerButton={true}
            pageName={helper.translate("followPagetitle")}
            showSearchComponent={false}
            />
        )
    }

    const _emptyListComponent = () => {
        return(
            <NoProductComponent
                text={ notLoggedIn ? t("notloggedIn") : t("noFollowings") }
                hideButton={ notLoggedIn ? false : true }
                callBack={()=>{navigation.navigate(LOGIN)}}
                buttonText="Giriş edin!"
            />
        )
    }

    return (
        <SafeAreaView style={styles.safeareviewdesign} >
            <StatusBar 
            translucent={false}
            backgroundColor={colors.main}
            /> 
            {
                loading ? 
                <Loader/>
                : 
                (
                <FlatList
                    data={notLoggedIn ?[]:followings}
                    renderItem={({item}) => _renderItem(item) }
                    style={styles.flat}
                    contentContainerStyle={styles.contentContainer}
                    ListEmptyComponent={()=>_emptyListComponent()}
                    ListHeaderComponent={()=>_emptyHeaderComponent()}
                    keyExtractor={(item , index) => `FollowCardComponent-${index}`}
                />
                )
            }
        </SafeAreaView>
    )
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


export default helper.mobx(FollowScreen) ; 