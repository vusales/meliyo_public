import React , {
    useRef , 
    useState ,  
    useEffect , 
    useCallback , 
} from 'react' ; 
import {
    StyleSheet , 
    View ,  
    Text , 
    TouchableOpacity , 
} from "react-native"; 
import { createDrawerNavigator  } from '@react-navigation/drawer';
// import Tab from './Tab';
import Stack from './Stack';
import helper from '../helpers/helper';
import colors from '../values/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem  , 
} from '@react-navigation/drawer';
import icons from '../values/icons';
import { 
    VIDEOORDERS ,  
    CART ,
    SETTINGS ,  
    FAVORITES , 
    LOGIN ,  
} from '../values/screenNameLists';
import { 
    VideoOrders , 
    CartScreen ,
    SettingsScreen ,  
    FavoritesScreen , 
} from '../screens';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const DrawerStack = createDrawerNavigator();

const labelItem  =  ( icon , screenName , focused ,  color ) => {
    // console.log("focused" , focused ); 
    return (
        <View style={styles.drawerItemLabelContainer}>
            {icon}
            <Text 
            style={
                focused? 
                {...styles.labelStyle ,  color: color } 
                :styles.labelStyle}
            >{screenName}</Text>
        </View>
    )
}

const CustomDriverComponent = (props) => {
    const navigation =  useNavigation() ; 
    const [logedIn , setLogedIn ]=useState(false); 

    let loginPageTitle = helper.translate("loginPagetitle") ; 

    useEffect(useCallback(()=>{
        const checAuth  =  async () => {
            try {
                let isLogedIn  =  await helper.isUserLogedIn() ;
                // if(isLogedIn){
                //     setLogedIn(true);  
                // }
                setLogedIn(isLogedIn) ; 
            } catch (error) {
                if(error){
                    console.log("error" , error ); 
                }
            }
        }
        checAuth(); 
    } , [] )) ;

    return (
        <View style={{flex:1 }} >
            <View style={styles.closeButtonView}>
                <TouchableOpacity
                onPress={() => props.navigation.closeDrawer()}
                >
                    {icons.close()}
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView  {...props }>
                {/* <DrawerItemList 
                 {...props }
                /> */}
                <DrawerItem
                    label={({ focused, color })=>labelItem(icons.video(focused ? colors.second : colors.text) , helper.translate("videoorderPageTitle"),  focused , color  )}
                    labelStyle={styles.labelStyle}
                    onPress={() => navigation.navigate(VIDEOORDERS) }
                    activeTintColor={colors.second}
                    style={{ marginVertical: 0 }}
                />
                {/* <DrawerItem
                    label={({ focused, color })=>labelItem(icons.shoppingcart(focused ? colors.second : colors.text) , helper.translate("cartPageTitle") ,  focused , color )}
                    labelStyle={styles.labelStyle}
                    onPress={() => navigation.navigate(CART) }
                    activeTintColor={colors.second}
                    sstyle={{ marginVertical: 0 }}
                />
                <DrawerItem
                    label={({ focused, color })=>labelItem(icons.heart(focused ? colors.second : colors.text) , helper.translate("favoritesPagetitle") ,  focused , color  )}
                    labelStyle={styles.labelStyle}
                    onPress={() => navigation.navigate(FAVORITES) }
                    activeTintColor={colors.second}
                    style={{ marginVertical: 0 }}
                /> */}
            </DrawerContentScrollView>
            <View style={styles.footerDrawerContainer}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("stack" , { screen: SETTINGS })}
                style={styles.footerDrawerContainerButton} 
                >
                    {icons.setting()}
                    <Text style={styles.footerDrawerContainerButtonText}>{helper.translate("settingPagetitle")}</Text>
                </TouchableOpacity>

                {
                    logedIn ?
                    null
                    :
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("stack" , { screen: LOGIN })}
                    style={styles.footerDrawerContainerButton}
                    >
                        {icons.login()}
                        <Text style={styles.footerDrawerContainerButtonText}>{loginPageTitle}</Text>
                    </TouchableOpacity>
                }
                
                {/* <TouchableOpacity 
                onPress={()=>logout()}
                style={styles.footerDrawerContainerButton}
                >
                    {icons.logout()}
                    <Text style={styles.footerDrawerContainerButtonText}>{helper.translate("logoutPagetitle")}</Text>
                </TouchableOpacity> */}
            </View>
        </View> 
    ); 
}

function Drawer () {
    return (
        <DrawerStack.Navigator 
        gestureEnabled={false}
        drawerContent={props=><CustomDriverComponent {...props } />}
        screenOptions={{ 
            ...helper.screenOptions , 
            drawerLockMode: 'locked-closed',  
            drawerStyle: styles.drawerStyle , 
            drawerActiveTintColor: colors.second ,
            drawerActiveBackgroundColor: colors.gray , 
            drawerInactiveTintColor: colors.text , 
            drawerInactiveBackgroundColor: colors.gray  , 
            drawerHideStatusBarOnOpen: true , 
            drawerItemStyle: styles.drawerItemStyle , 
            drawerLabelStyle : styles.labelStyle , 
            headerStyle:styles.headerStyle , 
            headerTitleStyle: styles.headerTitleStyle , 
        }} 
        > 
            <DrawerStack.Screen 
            name="stack" 
            component={Stack}
            options={{
                drawerIcon : () => icons.home() , 
            }}
            key={`HDSUD`}
            />
            <DrawerStack.Screen 
                name={VIDEOORDERS} 
                component={VideoOrders}
                options={{
                    drawerIcon : () => icons.video() , 
                }}
                key={`${VIDEOORDERS}`}
            />
            <DrawerStack.Screen 
                name={CART} 
                component={CartScreen}
                options={{
                    drawerIcon : () => icons.shoppingcart() , 
                }}
                key={`${CART}`}
            />
            <DrawerStack.Screen 
                name={FAVORITES} 
                component={FavoritesScreen}
                options={{
                    drawerIcon : () => icons.heart() , 
                }}
                key={`${FAVORITES}`}
            />
        </DrawerStack.Navigator>
    );
}

const styles  = StyleSheet.create({
    drawerStyle: {
        backgroundColor: colors.gray , 
        zIndex: 100000000 , 
    }, 
    drawerItemStyle :{} , 
    labelStyle : {
        fontFamily: helper.fontFamily('') ,
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(20) ,  
        color:colors.text , 
        marginLeft: helper.px(10) ,
        textTransform: "capitalize",
    }, 
    closeButtonView: {
        paddingHorizontal: helper.px(16) , 
        height: helper.px(100) ,  
        justifyContent: "center" , 
    }, 
    footerDrawerContainerButtonText: {
        fontFamily: helper.fontFamily('') ,
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(20) , 
        color: colors.text , 
        marginLeft: helper.px(10) ,
    }, 
    footerDrawerContainerButton: {
        flexDirection: "row" , 
        paddingHorizontal: helper.px(16) , 
        paddingVertical: helper.px(10) , 
    }, 
    footerDrawerContainer: {
        borderTopColor: colors.darkborder , 
        borderTopWidth: helper.px(1) , 
        height: helper.px(200) , 
        paddingTop: helper.px(32) , 
    } , 
 
    itemContainer: {
        backgroundColor: "yellow" ,
    },
    headerStyle : {
        backgroundColor: colors.main  ,

    }, 
    headerTitleStyle: {
        fontFamily: helper.fontFamily('') ,
        fontWeight: "600" , 
        fontSize: helper.px(16) , 
        lineHeight: helper.px(22) , 
        color: colors.text , 
        marginLeft: helper.px(10) ,
    }, 
    // headerBackgroundContainerStyle :{
    //     backgroundColor: "green" ,
         
    // }, 
    // headerTitleContainerStyle: {
    //     backgroundColor: "orange"
    // }, 

    drawerItemLabelContainer: {
        flexDirection: "row" , 
    }, 



    

});

export default Drawer ; 

   
  
