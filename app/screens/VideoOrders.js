import React,  {
  useEffect , 
  useMemo , 
  useState ,  
  useCallback , 
} from 'react';
import {
  Text, 
  View , 
  SafeAreaView , 
  StyleSheet , 
  StatusBar , 
  FlatList , 
} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import OrderFilterButtonsComponent from '../components/Order/OrderFilterButtonsComponent';
import OrderInfoCardComponent from '../components/Cards/OrderInfoCardComponent';
import { ORDERINFODETAILS, SEARCHOME } from '../values/screenNameLists';
import NoProductComponent from '../components/General/NoProductComponent';
import HeaderComponent from '../components/CommonLayoutComponents/HeaderComponent';
import {cloneDeep}  from "lodash" ; 




const VideoOrders = ({
  stores ,  
  params ,
}) =>{ 
  const navigation =  useNavigation();

  // memos
  const videoOrders =  useMemo(()=> stores.orderStore.videoOrders, [stores.orderStore.videoOrders]);
  const orderStatuses =  useMemo(()=> stores.orderStore.videoOrderStatusArray, [stores.orderStore.videoOrderStatusArray]);
  const profileInfo =  useMemo(()=> stores.profileStore.profileInfo, [stores.profileStore.profileInfo]);
  const starVideoOrders = useMemo(()=> stores.orderStore.starVideoOrders, [stores.orderStore.starVideoOrders]);

  // states 
  const [videoArray , setVideoArray ] = useState([]) ; 
  const [ choosenStatusId , setChoosenStatusId ] = useState(0);  

  useFocusEffect(useCallback(()=>{
    getVideoOrders(); 
  },[])); 

  useEffect(()=>{
    setDataFilter();  
  },[choosenStatusId]);

  console.log("orderStatuses" , orderStatuses);  

  const setDataFilter = () => {
    const orders = cloneDeep(videoOrders);  
    const starOrders = cloneDeep(starVideoOrders);  
    let  allData ;   

    if(profileInfo?.isStar){
      allData  = [...orders , ...starOrders] ; 
    }else {
      allData  = orders ; 
    }

    if(choosenStatusId == 0 && profileInfo?.isStar ) {
      setVideoArray([...videoOrders, ...starVideoOrders ]); 
      return ; 
    }else if(choosenStatusId == "-"){
      setVideoArray(videoOrders); 
      return ; 
    }else if(choosenStatusId == "+"){
      setVideoArray(starVideoOrders); 
      return ; 
    }else if(choosenStatusId == 0 && !profileInfo?.isStar ) {
      setVideoArray(videoOrders); 
      return ; 
    }


    const filteredData = allData.filter((item)=> item.order_status_id == choosenStatusId ) ; 
    setVideoArray(filteredData);  
  }

  const getVideoOrders =  async () => {
    try {
      await stores.profileStore.getCustomer(); 
      await stores.orderStore.getOrders(); 
      await stores.orderStore.getOrderStatus(); 
      if(stores?.profileStore?.profileInfo?.isStar){
        await stores.orderStore.getStarOrders(); 
        setVideoArray([
          ...stores.orderStore.videoOrders , 
          ...stores.orderStore.starVideoOrders 
        ]); 
      }else {
        setVideoArray(stores.orderStore.videoOrders) ; 
      }
    } catch (error) {
      if(error) {
        console.log("getVideoorders screen error" , error ) ;  
      } 
    }
  }

  // console.log("videoArray" , videoArray ); 

  // FLATLIST FUNCTIONS 
  const _renderItem = (item) => {
    console.log("item in video Orders"  , item );  
    return(
      <OrderInfoCardComponent
      name={item?.sellerName}
      image={{ uri: item?.sellerImage }}
      speciality={item?.categories ?? []}
      gradientColors={false}
      infoText={item?.order_status}
      infoIcon={icons.dots(colors.yellowsecond , 15 )}
      giftType={item?.videoTheme?.text}
      callBack={()=>navigation.navigate("stack" , {
          screen : ORDERINFODETAILS , 
          params: {
            status : item.order_status , 
            statusId : item.order_status_id , 
            star: profileInfo?.isStar , 
            order_id: item.order_id , 
            sellerImage: item?.sellerImage ,
            starId :  profileInfo?.customer_id , 
          }
      })}
      />
    )
  }

  const _emptyHeaderComponent = () => {
    return(
      <>
        <HeaderComponent
          showDrawerButton={false}
          pageName={"Video sifaris"}
          showSearchComponent={false}
        />
        <OrderFilterButtonsComponent
          data={
            profileInfo?.isStar ? 
            [
              {
                name:  helper.translate("all") ,
                order_status_id: '0' , 
              }, 
              {
                name: helper.translate("my.orders"),
                order_status_id: '-' , 
              },
              {
                name: helper.translate("incoming.orders"),
                order_status_id: '+' , 
              },
              ...orderStatuses , 
            ]
            :
            [
              {
                name:  helper.translate("all") ,
                order_status_id: '0' , 
              }, 
              ...orderStatuses , 
            ]
          }
          callBack={(id) => setChoosenStatusId(id) }
          choosenButton={choosenStatusId}
        />
      </>
    )
  }

  const _emptyListComponent = () => {
      return(
        <NoProductComponent
          text={helper.translate("noproduct")}
          buttonText={helper.translate("tohome")}
          callBack={()=>{
            navigation.navigate("stack" , {
              screen: "tab" , 
              params: {
                screen: SEARCHOME + "stack" ,
              }
            })
          }}
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
        data={videoArray}
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
)};

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

export default helper.mobx(VideoOrders);
