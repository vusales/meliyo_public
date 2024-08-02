import React , {
    useState , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    SafeAreaView, 
    Image , 
    ScrollView , 
} from 'react-native';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';

const OrderFilterButtonsComponent = ({
   data = [] , 
   callBack , 
   choosenButton , 
}) => { 
    
    const chooseButton =(id) => {
        callBack(id);
    }


return(
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false} 
    showsVerticalScrollIndicator={false}
    style={styles.container }
    >
        {
            data.map((item ,  index)=>{
                return(
                    <TouchableOpacity 
                    onPress={()=> chooseButton(item.order_status_id)}
                    key={`${index}hdvjf`}
                    style={styles.button}
                    >
                        <Text 
                         style={choosenButton == item.order_status_id ? 
                            {
                                ...styles.buttonText , 
                                color:colors.second,  
                            }
                            :styles.buttonText
                        }
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ); 
            })
        }
    </ScrollView>
)};

const styles = StyleSheet.create({
    button: {
        paddingVertical: helper.px(10) , 
        paddingHorizontal: helper.px(10) , 
    }, 
    buttonText: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(15) , 
        lineHeight:helper.px(24) , 
        color:colors.text , 
        letterSpacing: -0.408 , 
    }, 
    container: {
        paddingVertical: helper.px(10),
    } , 
});

export default OrderFilterButtonsComponent;
