import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons" ; 
import Octicons from "react-native-vector-icons/Octicons" ; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons" ; 
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons" ; 
import Ionicons from "react-native-vector-icons/Ionicons" ; 
import Foundation from "react-native-vector-icons/Foundation" ; 
import Fontisto from "react-native-vector-icons/Fontisto" ; 
import FontAwesome5 from "react-native-vector-icons/FontAwesome5" ; 
import FontAwesome from "react-native-vector-icons/FontAwesome" ; 
import Feather from "react-native-vector-icons/Feather" ; 
import Entypo from "react-native-vector-icons/Entypo" ; 
import AntDesign from "react-native-vector-icons/AntDesign" ; 
import EvilIcons from "react-native-vector-icons/EvilIcons" ; 
import colors from "./colors";


const icons = {
    close: (color ,  size ) => <AntDesign  name="close"  size={size??22} color={color??colors.text} />  , 
    home: (color ,  size ) => <AntDesign  name="home"  size={size??22} color={color??colors.text} />  , 
    video:  (color ,  size ) => <AntDesign  name="videocamera"  size={size??22} color={color??colors.text} />  , 
    shoppingcart:  (color ,  size ) => <AntDesign  name="shoppingcart"  size={size??22} color={color??colors.text} /> ,
    heart: (color ,  size ) => <FontAwesome  name="heart-o"  size={size??22} color={color??colors.text} /> ,
    setting: (color ,  size ) => <SimpleLineIcons  name="settings"  size={size??22} color={color??colors.text} /> ,
    logout: (color ,  size ) => <MaterialIcons  name="logout"  size={size??22} color={color??colors.text} /> ,
    login: (color ,  size ) => <MaterialIcons  name="login"  size={size??22} color={color??colors.text} /> ,
    search: (color ,  size ) => <AntDesign  name="search1"  size={size??22} color={color??colors.text} /> ,
    adduser: (color ,  size ) => <Feather  name="user-plus"  size={size??22} color={color??colors.text} /> ,
    grid: (color ,  size ) => <Feather  name="grid"  size={size??22} color={color??colors.text} /> ,
    store: (color ,  size ) => <MaterialCommunityIcons
    name="storefront-outline"  size={size??22} color={color??colors.text} /> ,
    menu:  (color ,  size ) => <Feather  name="menu"  size={size??22} color={color??colors.text} /> ,
    chevronleft: (color ,  size ) => <Entypo  name="chevron-thin-left"  size={size??22} color={color??colors.text} /> ,
    chevronright: (color ,  size ) => <Entypo  name="chevron-thin-right"  size={size??22} color={color??colors.text} /> ,
    chevrontop: (color ,  size ) => <Entypo  name="triangle-up"  size={size??22} color={color??colors.text} /> ,
    chevronbottom: (color ,  size ) => <Entypo  name="triangle-down"  size={size??22} color={color??colors.text} /> ,
    share:  (color ,  size ) => <Entypo  name="share-alternative"  size={size??22} color={color??colors.text} /> ,
    dots:  (color ,  size ) => <Entypo  name="dots-three-horizontal"  size={size??22} color={color??colors.text} /> ,
    star:  (color ,  size ) => <AntDesign  name="star"  size={size??22} color={color??colors.text} /> ,
    plus:  (color ,  size ) => <Feather  name="plus"  size={size??22} color={color??colors.text} /> ,
    gift:  (color ,  size ) => <Feather  name="gift"  size={size??22} color={color??colors.text} /> ,
    question:  (color ,  size ) => <AntDesign  name="questioncircleo"  size={size??22} color={color??colors.text} /> ,
    check:  (color ,  size ) => <AntDesign  name="check"  size={size??22} color={color??colors.text} /> ,
    note:  (color ,  size ) => <Feather  name="calendar"  size={size??22} color={color??colors.text} /> ,
    file:  (color ,  size ) => <Feather  name="file-text"  size={size??22} color={color??colors.text} /> ,
    envelop:  (color ,  size ) => <FontAwesome  name="envelope-o"  size={size??22} color={color??colors.text} /> ,
    adduserSecond:  (color ,  size ) => <FontAwesome5  name="user-plus"  size={size??22} color={color??colors.text} /> ,
    shoppingBag:  (color ,  size ) => <SimpleLineIcons  name="bag"  size={size??22} color={color??colors.text} /> ,
    fromto :  (color ,  size ) => <MaterialCommunityIcons  name="ray-start-arrow"  size={size??22} color={color??colors.text} /> ,
    singledot : (color ,  size ) => <Octicons  name="dot-fill"  size={size??22} color={color??colors.text} /> ,
    tag : (color ,  size ) => <MaterialCommunityIcons  name="tag-outline"  size={size??22} color={color??colors.text} /> ,
    heartfilled: (color ,  size ) => <FontAwesome  name="heart"  size={size??22} color={color??colors.text} /> ,
    photoCamera: (color ,  size ) => <Feather  name="camera"  size={size??22} color={color??colors.text} /> ,
    trush: (color , size ) => <AntDesign  name="delete"  size={size??22} color={color??colors.text} /> ,
    filter: (color , size ) => <Feather  name="sliders"  size={size??22} color={color??colors.text} /> ,
    sort: (color , size ) => <Octicons  name="sort-asc"  size={size??22} color={color??colors.text} /> ,
    lock: (color , size ) => <Feather  name="lock"  size={size??22} color={color??colors.text} /> ,
    security: (color , size ) => <Feather  name="shield"  size={size??22} color={color??colors.text} /> ,
    help: (color , size ) => <Feather  name="help-circle"  size={size??22} color={color??colors.text} /> ,
    eye: (color , size ) => <Feather  name="eye"  size={size??22} color={color??colors.text} /> ,
    eyeoff: (color , size ) => <Feather  name="eye-off"  size={size??22} color={color??colors.text} /> ,
    lang: (color , size ) => <Feather  name="globe"  size={size??22} color={color??colors.text} /> ,
    flag: (color , size ) => <Feather  name="flag"  size={size??22} color={color??colors.text} /> ,
    mute: (color , size ) => <Octicons  name="mute"  size={size??22} color={color??colors.text} /> ,
    unmute: (color , size ) => <Octicons  name="unmute"  size={size??22} color={color??colors.text} /> ,
    play: (color ,  size ) => <FontAwesome  name="play"  size={size??22} color={color??colors.text} /> ,
    pause: (color ,  size ) => <Fontisto  name="pause"  size={size??22} color={color??colors.text} /> ,
    comment: (color ,  size ) => <FontAwesome  name="comment"  size={size??22} color={color??colors.text} /> ,
    info: (color ,  size ) => <FontAwesome5  name="info-circle"  size={size??22} color={color??colors.text} /> ,
    send: (color , size ) => <Feather  name="send"  size={size??22} color={color??colors.text} /> ,
    profileDetails : (color , size ) => <MaterialCommunityIcons  name="account-details"  size={size??22} color={color??colors.text} /> , 
    insta: (color , size ) => <AntDesign  name="instagram"  size={size??22} color={color??colors.text} /> ,
    tiktok: (color , size ) => <MaterialIcons  name="logo-tiktok"  size={size??22} color={color??colors.text} /> ,
    youtube: (color , size ) => <AntDesign  name="youtube"  size={size??22} color={color??colors.text} /> ,
    facebook: (color , size ) => <EvilIcons  name="sc-facebook"  size={size??22} color={color??colors.text} /> ,
}

export default icons ; 