import React ,  
{
    useEffect , 
    useMemo , 
    useCallback , 
} from  "react" ;
import helper from "../helpers/helper";
import colors from "../values/colors";
import {
    View ,  
    Text ,
    TouchableOpacity , 
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import {SEARCHOME ,  VIEWALL} from "../values/screenNameLists" ; 
import ScrollHorizontalHomeComponent from "../components/Scrolls/ScrollHorizontalHomeComponent";
import FilmsTvCardComponent from "../components/Cards/FilmsTvCardComponent";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {data} from "../demoData" ; 




const SearchHomeScreen = ({
    stores,  
}) => {
    const navigation =  useNavigation() ; 
    const memoizedCategories =  useMemo( ()=> stores.homestore.homepageBasecategories ,  [stores.homestore.homepageBasecategories] ) ; 

    useFocusEffect(useCallback(()=>{
        getBaseDataForHomePage(); 
    }, [])); 

    const getBaseDataForHomePage =  async () => {
        try {
            await stores.homestore.getHomePageData(); 
        } catch (error) {
            if(error) {
                console.log("error"  , error ); 
            }
        }
    }

    return (
        <CommonLayout
        showDrawerButton={true}
        pageName={helper.translate("homepagetitle")}
        showSearchComponent={true}
        >
            

            {
                memoizedCategories?.map((item)=>(
                    <ScrollHorizontalHomeComponent
                        key={`home-categories${item.category_id}`}
                        title={item.name}
                        iteratingData={item.stars}
                        viewMoreCallBack={()=> navigation.navigate("stack" ,  {
                            screen: VIEWALL ,
                            params: {
                                        id: item.category_id , 
                                        screenName : "View all" , 
                                    }
                        })}
                        hideViewMore={false}
                    />
                ))
            }
            



            {/* Tv and films card */}

            {/* <ScrollHorizontalHomeComponent
                iteratingData={data.trends.data}
                title={helper.translate("tvFilms")}
                hideViewMore={false}
                customComponent={
                    ( title , images, id )=> <FilmsTvCardComponent
                    key={`FilmsTvCardComponent-${title}-${id}`}
                    title={title} 
                    images= {images}
                    goDetails ={ () => {
                        if(id) {
                            console.log(id) ; 
                        }else {
                            console.log('sdfbhusgdfv') ;     
                        }
                    }}
                    />
                }
                viewMoreCallBack={()=> navigation.navigate("stack" ,  {
                    screen: VIEWALL ,
                    params: {
                                id: 10 , 
                                screenName : "View all" , 
                            }
                })}
            /> */}
            
        </CommonLayout>
    );
}


export default helper.mobx(SearchHomeScreen) ; 


