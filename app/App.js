/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */ 

import React,  {
  useState, 
  useEffect ,  

} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import helper from './helpers/helper';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './stacks/Drawer';
import stores from './stores';
import { Provider } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen'


const  App = (props) => {
  const {i18n} =useTranslation();

  useEffect(()=> {
    SplashScreen.hide();
    cahngeLanguage() ; 
    registerDevice(); 
  } , []) ; 

  // when there is choosen lang in asyncstorage
  const cahngeLanguage = async () => {
    let choosenLang =  await helper.getdataFromAsyncStorage("@lang_code");
    if(choosenLang){
      i18n.changeLanguage(choosenLang);
    }else {
      return;
    }
  }

  const registerDevice = async () => { 
    try {
      let isDeviceRegistered =  await stores.registerDeviceStore.validateToken();  

      if(!isDeviceRegistered) {
        console.log("not registered"); 
        await stores.registerDeviceStore.registerDevice();   
      }
    } catch (error) {
      if(error) {
        console.log("app.js register device has not completed successfully!");  
      }
    }
  }


  return (
    <Provider stores={stores}>
      <NavigationContainer >
        <Drawer/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
