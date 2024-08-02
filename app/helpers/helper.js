import React from "react";
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// import LanguageStore from "../stores/languageStore"; 
import config from "../values/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";

const  helper = {
  token: config.COMMON_TOKEN , 
  // lang: async ()=> {
  //   try {
  //     return await helper.getdataFromAsyncStorage("@lang_code");   
  //   } catch (error) {
  //     if(error) {
  //       console.log("language code error" , error ); 
  //     }
  //   }
  // } ,
  api: (token , headers = {} , route ="" ) => {
    route =  route ?  route : '/index.php?route=japi/api' ; 

    let lang_code ;  

    if(headers.lang){
      lang_code = headers.lang;
      delete headers.lang ; 
    }

    if( "lang" in headers ){
      delete headers.lang ;
    }

    headers = helper.token
    ? 
    {
      ...headers,
      Authorization: token ? `Bearer ${token}` : `Bearer ${helper.token}` , 
      Lang : lang_code? lang_code : "az" , 
    }
    : {
      ...headers , 
      Lang : lang_code? lang_code : "az" , 
    };
    console.log("headers"  , headers ); 
    return axios.create({
      baseURL: config.URL_PREFIX + route ,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });
  },
  mobx: LOC => inject('stores')(observer(LOC)),
  isIOS: Platform.OS === 'ios',
  fontFamily: (type)=> helper.isIOS ? `Raleway ${type || 'Regular'}` : `Raleway ${type || 'Regular'}`,
  screenOptions: {
    headerShown: false,
    animation: 'slide_from_right',
  },
  px:  (pixel)  => {
    const scale = helper.screenWidth / 375;
    const newSize = pixel * scale;
    let result = Math.round(PixelRatio.roundToNearestPixel(newSize));
    result = helper.isIOS ? result : result - 2;
    return pixel > 0 && result <= 0 ? 1 : result ;
  },
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  secretKey: "Dolce_far_niente" , 
  writeAsyncStroga : async (key , value) => {
    if( typeof(value) == "object" || typeof(value) != "string" ){
      value = JSON.stringify(value); 
    }
    let encryptedData = CryptoJS.AES.encrypt( value , helper.secretKey ).toString();
    await AsyncStorage.setItem(key ,  encryptedData) ; 
  },
  getdataFromAsyncStorage: async (key) => {
    let value = await AsyncStorage.getItem(key) ; 
    if(value === null || !value ){
      return false ;
    }

    let bytes = CryptoJS.AES.decrypt(value, helper.secretKey);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // you have to Json,parse() if your value have to be object 
    return decryptedData ; 
  } , 
  removeFromAsyncStorage : async (keys) => {
    try {
      let isError = false  ; 
      if( typeof(keys) === "string") {
        await AsyncStorage.removeItem(keys ,  (err) => {
          isError = err ; 
        })  ;  
      }else {
        await AsyncStorage.multiRemove(keys ,  (err) => {
          isError = err ; 
        }) ;  
      }
      helper.getAllKeysFromAsyncstorage() ; 
      return isError ; 
    } catch (error) {
      if(error) {
        console.log("error in removeAsyncStore"  , error ) ; 
      }
    }
  } , 
  clearAsyncStorage : async () => {
    try {
      await AsyncStorage.clear() ; 
      helper.getAllKeysFromAsyncstorage() ; 
  
    } catch (error) {
      if(error) {
        console.log("error in clearAsyncStorage"  , error ) ; 
      }
      
    }
  } , 
  getAllKeysFromAsyncstorage : async () => {
    try {
      let allkeys = await AsyncStorage.getAllKeys() ; 
      console.log("allkeys"  , allkeys ) ;
    
    } catch (error) {
      if(error) {
        console.log("error in getAllKeysFromAsyncstorage"  , error ) ; 
      }
    }
  },  
  translate  : (keyword) => {
    const {t} = useTranslation();
    let word = t(keyword);
    return word; 
  },
  defineToken : async () => {
    try {
      let device_token  =  await helper.getdataFromAsyncStorage("@device_token");
      let user_token =  await helper.getdataFromAsyncStorage("@user_token");


      if (user_token && user_token!==null ) {
        return user_token; 
      } else if(device_token && device_token!== null  ){
        return device_token;  
      } 
      return false ;
    } catch (error) {
        if(error) {
            console.log("error when defining headers token" ,  {error}); 
            return false; 
        }
    }
  },
  isUserLogedIn : async () => {
    try {
      let userTkn = await helper.getdataFromAsyncStorage('@user_token'); 
      console.log("userTkn in helper isUserLogedIn" ,  userTkn) ;
      if(!userTkn){
        return false ; 
      }
      return true ; 
    } catch (error) {
      if(error) {
        console.log("error", error ); 
      }
    }
  } , 
  defineLang : async () => {
    try {
      let lang = await helper.getdataFromAsyncStorage('@lang_code'); 
      console.log("lang in helper defineLang" ,  lang);
      if(!lang){
        return false ; 
      }
      return lang ; 
    } catch (error) {
      if(error) {
        console.log("error", error ); 
      }
    }
  } , 

 

//   translate : (sentence) => {
//     const {t} = useTranslation();
//     if(typeof sentence !== "string" || !sentence ){
//       return "";
//     }
//     let sentenceLower = sentence.toLocaleLowerCase();
//     // const sentenceArray = sentenceLower.match(/\b(\w+)\b/g); 
//     // const newSentence = sentenceArray.map((item)=>t(item)).join(" ");
//     const newSentence = t(sentenceLower);
//     return newSentence; 
//   },
//   sendErrorMessage : (errorType) => {
//     let message = "" ; 
//     switch (errorType) {
//       case "UE":
//         message= "ue" ; 
//         break;
//       case "T1":
//         message= "ue" ; 
//         break;
//       case "T2":
//         message= "ue" ; 
//         break;
//       case "T3":
//         message= "ue" ; 
//         break;
//       case "T4":
//         message= "ue" ; 
//         break;
//       case "P1":
//         message= "p1" ; 
//         break;
//       case "P2":
//         message= "p2" ; 
//         break;
//       case "P3":
//         message= "p3" ; 
//         break;
//       case "P4":
//         message= "p4" ; 
//         break;
//       case "P5":
//         message= "p5" ; 
//         break;
//       case "U1":
//         message= "u1" ; 
//         break;
//       case "N1":
//         message= "namevalidation" ; 
//         break;
//       case "N2":
//         message= "n2" ; 
//         break;
//       case "S1":
//         message= "surnamevalidation" ; 
//         break;
//       case "S2":
//         message= "s2" ; 
//         break;
//       case "E1":
//         message= "emailrequiredvalidation" ; 
//         break;
//       case "E2":
//         message= "e2" ; 
//         break;
//       case "E3":
//         message= "emailvalidation" ; 
//         break;
//       case "E4":
//         message= "e4" ; 
//         break;
//       case "C1":
//         message= "c1" ; 
//         break;
//       case "C2":
//         message= "error"; 
//         break;
//       case "С3":
//         message= "c3" ; 
//         break;
//       case "R1":
//         message= "error" ; 
//         break;
//       case "D1":
//         message= "error" ; 
//         break;
//       default:
//         message= "error" ; 
//         break;
//     }
//     return message ; 
//   },
//   uniqid: (length:number):string => {
//     let chars = [
//       'a',
//       'b',
//       'c',
//       'd',
//       'e',
//       'f',
//       'g',
//       'h',
//       'i',
//       'j',
//       'k',
//       'l',
//       'm',
//       'n',
//       'o',
//       'p',
//       'q',
//       'r',
//       's',
//       't',
//       'u',
//       'v',
//       'w',
//       'x',
//       'y',
//       'z',
//       0,
//       1,
//       2,
//       3,
//       4,
//       5,
//       6,
//       7,
//       8,
//       9,
//     ];
//     let part1 = chars.sort(() => Math.random() - 0.5).join('');
//     let part2 = chars.sort(() => Math.random() - 0.5).join('');
//     return (part1 + part2).substring(5, length + 5);
//   },
//   uniqint: (length:number):string => {
//     let chars:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     let parts:string[] = [];
//     chars.forEach(() =>
//       parts.push(chars.sort(() => Math.random() - 0.5).join('')),
//     );
//     return parts.join('').substring(5, length + 5);
//   },
//   arrayUniqueByKey: (array, key) => {
//     return [...new Map(array.map(item => [item[key], item])).values()];
//   },
//   confirm: (options = {}) => {
//     Alert.alert(
//       options?.title || '',
//       options?.text || '',
//       [
//         {
//           text: options?.noButtonText || 'İmtina et',
//           style: 'cancel',
//           color: 'red',
//         },
//         {
//           text: options?.yesButtonText || 'Bəli',
//           onPress: () => options?.onConfirm(),
//         },
//       ],
//       {
//         cancelable: options?.cancelable || true,
//       },
//     );
//   },
//   flatListHeight: () => (helper.isIOS ? helper.px(270) : helper.px(240)),
//   ucWords: str => {
//     str = str.toLocaleLowerCase();
//     return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
//       return s.toLocaleUpperCase();
//     });
//   },
  // checkScreen : (setDimensions) => {
  //   const subscription = Dimensions.addEventListener(
  //     "change",
  //     ({ window, screen }) => {
  //       helper.screenWidth = window.width ;
  //       helper.screenHeight = window.height ;
  //     }
  //   );
  //   return () => subscription?.remove();
  // } , 
};


export default helper ; 