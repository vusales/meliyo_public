import { ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import helper from '../helpers/helper';
import { 
    SEARCHOME ,
    FOLLOWS  ,
    CATEGORIES , 
    PROFILE , 
    STORE , 
    VIEWALL , 
    PROFILEEDIT , 
} from '../values/screenNameLists';
import {
    SearchHomeScreen , 
    CategoryScreen , 
    FollowsScreen , 
    ProfileScreen , 
    StoreScreen , 
    ViewAllScreen , 
    ProfileEditScreen , 
} from "../screens" ; 
import colors from '../values/colors';
import { 
    View ,  
    Text ,
    StyleSheet , 
    Image , 
} from 'react-native';
import icons from '../values/icons';


const Tabs = createBottomTabNavigator();
const SearchHomeStack  =  createStackNavigator() ; 
const FollowsStack  =  createStackNavigator() ; 
const CategoryStack  =  createStackNavigator() ; 
const ProfileStack  =  createStackNavigator() ; 
const StoreStack  =  createStackNavigator() ; 


function SearchHomeStackComponnet () {
    return(
        <SearchHomeStack.Navigator screenOptions={helper.screenOptions} >
            <SearchHomeStack.Screen name={SEARCHOME}  component={SearchHomeScreen} />
        </SearchHomeStack.Navigator>
    )
}

function FollowsStackComponnet () {
    return(
        <FollowsStack.Navigator screenOptions={helper.screenOptions} >
            <FollowsStack.Screen name={FOLLOWS}  component={FollowsScreen} />
        </FollowsStack.Navigator>
    )
}

function CategoryStackComponnet () {
    return(
        <CategoryStack.Navigator screenOptions={helper.screenOptions} >
            <CategoryStack.Screen name={CATEGORIES}  component={CategoryScreen} />
        </CategoryStack.Navigator>
    )
}

function ProfileStackComponnet () {
    return(
        <ProfileStack.Navigator screenOptions={helper.screenOptions} >
            <ProfileStack.Screen name={PROFILE}  component={ProfileScreen} />
            <ProfileStack.Screen name={PROFILEEDIT}  component={ProfileEditScreen} />
        </ProfileStack.Navigator>
    )
}

function StoreStackComponnet () {
    return(
        <StoreStack.Navigator screenOptions={helper.screenOptions} >
            <StoreStack.Screen name={STORE}  component={StoreScreen} />
        </StoreStack.Navigator>
    )
}

const generateIcon = ( 
    icon  ,  
    iconName,
    label, 
    center , 
    fromProfile, 
)  => {
    return (
        <View style={center? 
            {
                ...styles.baseTabView ,  
                justifyContent:"flex-end" ,  
                height: helper.px(55), 
            } 
            :styles.baseTabView
            }
        >
            {
                center ? 
                <View
                style={icon.focused ? {...styles.centerBigTabIconContainer , ...styles.focusedIconLayout } : styles.centerBigTabIconContainer}
                >
                    {iconName}
                </View>
                :
                <View
                style={icon.focused ? {...styles.unfocusedIconLayout , ...styles.focusedIconLayout } : styles.unfocusedIconLayout}
                >
                    {iconName}
                </View>
            }
            {/* <Text style={center&&icon.focused || fromProfile&&icon.focused ? {...styles.tabLabel , color:colors.second } : styles.tabLabel}>{label}</Text> */}
            <Text style={icon.focused ? {...styles.tabLabel , color:colors.second } : styles.tabLabel}>{label}</Text>
        </View>
    )
}

function Tab() {
    return (
        <Tabs.Navigator
        screenOptions={{
            ...helper.screenOptions , 
            tabBarStyle: styles.tabBarStyle ,
        }}
        backBehavior="initialRoute"
        initialRouteName={SEARCHOME + "stack"} 
        >
            <Tabs.Screen 
                name={SEARCHOME + "stack"}
                component={SearchHomeStackComponnet} 
                options={{
                    tabBarIcon: icon => {
                        let iconName  = icon.focused ? icons.search( colors.second , helper.px(22) ) : icons.search( colors.text , helper.px(22) ) ; 
                        return generateIcon(icon , iconName , helper.translate("homepagetitle") ); 
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen 
                name={ FOLLOWS + "stack" }
                component={FollowsStackComponnet} 
                options={{
                    tabBarIcon: icon => {
                        let iconName  = icon.focused ? icons.adduser( colors.second , helper.px(22) ) : icons.adduser( colors.text , helper.px(22) ) ; 
                        return generateIcon(icon , iconName , helper.translate("followPagetitle") ); 
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen 
                name={ CATEGORIES + "stack" }
                component={CategoryStackComponnet} 
                options={{
                    tabBarIcon: icon => {
                        let iconName  = icon.focused ? icons.grid( colors.text , helper.px(22) ) : icons.grid( colors.text , helper.px(22) ) ; 
                        return generateIcon(icon , iconName , helper.translate("categoryPageTitle") ,  true ); 
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen 
                name={ PROFILE + "stack" }
                component={ProfileStackComponnet} 
                options={{
                    tabBarIcon: icon => {
                        let iconName  = <Image
                        style={{width: helper.px(22) ,  height: helper.px(22)}}
                        source={require('../assets/images/icons/profileTabIcon.png')}
                      /> ; 
                        return generateIcon(icon , iconName , helper.translate("profilePagetitle") ,false  , true ); 
                    },
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen 
                name={ STORE + "stack" }
                component={StoreStackComponnet} 
                options={{
                    tabBarIcon: icon => {
                        let iconName  = icon.focused ? icons.store( colors.second , helper.px(22) ) : icons.store( colors.text , helper.px(22) ) ; 
                        return generateIcon(icon , iconName , helper.translate("storePageTitle") ); 
                    },
                    tabBarShowLabel: false,
                }}
            />
        </Tabs.Navigator>
    );
}

const styles  =  StyleSheet.create({
    tabBarStyle: {
        backgroundColor: colors.tabBack , 
        // in center of tabs have baseTabview inline style 
        // if you have to change this height then 
        // change that inline height too , ok ? 
        height:helper.px(60) , 
    }, 

    baseTabView: {
        // width: helper.px(65),
        width: helper.screenWidth / 6 , 
        justifyContent:"space-between", 
        alignItems:"center", 
        paddingVertical: helper.px(10),
    } , 

    unfocusedIconLayout: {
        width: "100%" ,
        justifyContent:"center", 
        alignItems:"center", 
    }, 
    focusedIconLayout: {
        
    }, 
    centerBigTabIconContainer : {
        width: helper.px(40) ,
        height: helper.px(40) , 
        backgroundColor: colors.second , 
        justifyContent: "center" , 
        alignItems: "center" , 
        position: "absolute" ,
        borderRadius: helper.px(5) , 
        transform: [{ rotate: '45.66deg' }],
        top: -18,  
    } , 
    
    tabLabel : {
        fontFamily: helper.fontFamily("") ,
        fontWeight: "600" , 
        fontSize: helper.px(10) , 
        lineHeight: helper.px(12) , 
        color: colors.text , 
        textAlign: "center" ,
        textTransform: "capitalize" , 
        marginTop: helper.px(10) , 
    }

}); 

export default Tab ; 