import React ,  {
    useEffect ,  
    useMemo ,  
} from 'react';
import {  
    View ,  
    Text ,
    TouchableOpacity , 
    FlatList  , 
    StyleSheet ,
    SafeAreaView ,  
    StatusBar , 
} from 'react-native';
import HeaderComponent from '../components/CommonLayoutComponents/HeaderComponent';
import CommentsCardComponent from '../components/Cards/CommentsCardComponent';
import colors from '../values/colors';
import helper from '../helpers/helper';
import icons from '../values/icons';


const CommentsScreen = ({
    route , 
    stores , 
}) =>{ 

    const reviews =  useMemo(()=>stores.userDetailsStore.reviews ,  [stores.userDetailsStore.reviews]) ; 

    useEffect(()=>{
        const {params: {starUserId}} = route ; 
        if(starUserId) {
            getUserComments(starUserId); 
        }
    }, [route.params.starUserId]) ; 

    const getUserComments =  async (id) => {
        try {
            await stores.userDetailsStore.getUserdetails({id}) ;  
        } catch (error) {
            if(error) {
                console.log("error" , error );  
            } 
        }
    }

    const _headerComponent = () => {
        return (
            <HeaderComponent
            showDrawerButton={ false } 
            pageName={helper.translate("comments")}
            starDetailsHeader={false}
            />
        );
    }

    const _renderItem = (item) => {
        return (
            <CommentsCardComponent
            name={item.name}
            image={{uri:item.image}}
            speciality={item.date_added}
            rating={item.rating}
            description={item.text}
            />
        ); 
    }

return(
    <SafeAreaView style={styles.baseLayout}>
        <StatusBar 
        translucent={false}
        backgroundColor={colors.main}
        /> 
        <FlatList
        data={reviews}
        keyExtractor={( item ,  index ) => index + "favorites" }
        renderItem={({item})=>_renderItem(item)}
        ListHeaderComponent={()=>_headerComponent()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        // numColumns={2}
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainer}
        />
    </SafeAreaView>
)};


const styles = StyleSheet.create({
    baseLayout: {
        flex: 1 , 
    }, 
    flatlist: {
        backgroundColor: colors.main , 
    }, 
    contentContainer: {
        paddingHorizontal: helper.px(16),
    },
});

export default helper.mobx(CommentsScreen);
