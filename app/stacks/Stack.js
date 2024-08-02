import { createStackNavigator } from '@react-navigation/stack';
import { 
  VIEWALL , 
  USERDETAILS , 
  ALLCOMMENTS , 
  ORDER , 
  ORDERCONFIRM , 
  ORDERINFODETAILS , 
  PRODUCTDETAILS , 
  ADDPRODUCT , 
  STOREFROMCART , 
  SETTINGS ,
  CHANGEEMAIL,
  CHANGEPASSWORD , 
  FAQ ,  
  LOGIN , 
  SIGNIN , 
  SECURITY , 
  TERMS , 
  FULLSCREENVIDEO , 
  CODECONFIRM , 
  STARSTATISTICS , 
  FOLLOWERS , 
  CHANGELANG , 
  VIDEOORDERS ,  
} from '../values/screenNameLists';
import {
  ViewAllScreen , 
  UserDetailsScreen , 
  CommentsScreen , 
  OrderScreen , 
  OrderConfirmationScreen , 
  OrderInfoDetailsScreen , 
  ProductDetailsScreen , 
  AddProductScreen , 
  StoreScreen ,  
  SettingsScreen , 
  FullScreenVideo , 
  StarStatistics ,
  FollowersScreen ,  
  VideoOrders
} from "../screens" ; 
import {
  ChangeEmailPage ,
  ChangePasswordPage , 
  SecurityandPrivacyPage ,  
  LoginPage ,  
  SignInPage ,  
  FAQPage , 
  TermsPage , 
  ConfirmationCode , 
  ChangeLanguagePage ,  
}from '../pages';
import helper from '../helpers/helper';
import Tab from './Tab';

const StackNavigator = createStackNavigator();

function Stack() {
  return (
    <StackNavigator.Navigator screenOptions={helper.screenOptions}>
      {/* <StackNavigator.Screen name={VIDEOORDERS+"test"} component={VideoOrders} /> */}
      <StackNavigator.Screen name="tab" component={Tab} />
      <StackNavigator.Screen name={LOGIN} component={LoginPage} />
      <StackNavigator.Screen name={VIEWALL} component={ViewAllScreen} />
      <StackNavigator.Screen name={USERDETAILS} component={UserDetailsScreen} />
      <StackNavigator.Screen name={ALLCOMMENTS} component={CommentsScreen} />
      <StackNavigator.Screen name={ORDER} component={OrderScreen} />
      <StackNavigator.Screen name={ORDERCONFIRM} component={OrderConfirmationScreen} />
      <StackNavigator.Screen name={ORDERINFODETAILS} component={OrderInfoDetailsScreen} />
      <StackNavigator.Screen name={PRODUCTDETAILS} component={ProductDetailsScreen} />
      <StackNavigator.Screen name={ADDPRODUCT} component={AddProductScreen} />
      <StackNavigator.Screen name={STOREFROMCART} component={StoreScreen} />
      <StackNavigator.Screen name={SETTINGS} component={SettingsScreen} />
      <StackNavigator.Screen name={CHANGEEMAIL} component={ChangeEmailPage} />
      <StackNavigator.Screen name={CHANGEPASSWORD} component={ChangePasswordPage} />
      <StackNavigator.Screen name={SECURITY} component={SecurityandPrivacyPage} />
      <StackNavigator.Screen name={SIGNIN} component={SignInPage} />
      <StackNavigator.Screen name={FAQ} component={FAQPage} />
      <StackNavigator.Screen name={TERMS} component={TermsPage} />
      <StackNavigator.Screen name={FULLSCREENVIDEO} component={FullScreenVideo} />
      <StackNavigator.Screen name={CODECONFIRM} component={ConfirmationCode} />
      <StackNavigator.Screen name={STARSTATISTICS} component={StarStatistics} />
      <StackNavigator.Screen name={FOLLOWERS} component={FollowersScreen} />
      <StackNavigator.Screen name={CHANGELANG} component={ChangeLanguagePage} />
    </StackNavigator.Navigator>
  );
}

export default Stack ; 