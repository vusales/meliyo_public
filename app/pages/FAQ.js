import React from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,  

} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import CommonLayout from '../layouts/CommonLayout';



const FAQ = ({
    params,
}) =>{

return (
    <CommonLayout
        showDrawerButton={false}
        pageName={`FAQ`}
        showSearchComponent={false}
    >

    </CommonLayout>
)};

const styles = StyleSheet.create({
    
});


export default FAQ;
