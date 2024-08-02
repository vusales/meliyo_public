import React , {
    useState , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity ,
} from 'react-native';
import colors from '../../values/colors';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import Collapsible from 'react-native-collapsible';

const CollapsibleButton = ({
    name,
    data , 
    Component , 
}) => {

    const [isCollapsed ,  setCollapsed] =  useState(true) ; 
    
    
    
return (
    <View>
        <TouchableOpacity 
        onPress={()=>setCollapsed(!isCollapsed)}
        style={styles.button}
        >
            <Text style={styles.buttonText}>{name}</Text>
            { data.length ? icons.chevronright(colors.blanko ,  14) : null }
        </TouchableOpacity>
        {
            data.length ? 
            <Collapsible
            collapsed={isCollapsed}
            >
                {
                    data.map((item  , index) => {
                        return (
                            <>
                                {/* <TouchableOpacity 
                                // onPress={()=>setCollapsed(!isCollapsed)}
                                style={styles.button}
                                >
                                    <Text style={styles.buttonText}>{item.itemName}</Text>
                                    { data.length ? icons.chevronright(colors.blanko ,  14) : null }
                                </TouchableOpacity> */}
                              { Component(item.itemName , item.items )}
                            </>
                        )
                    })
                }

               

            </Collapsible>
            :null
        }
    </View>
)};

const styles = StyleSheet.create({
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .4 , 
        borderBottomColor: colors.placeholderText , 
        flexDirection:"row" , 
        alignItems:"center" , 
        justifyContent:"space-between"
    } , 
    buttonText: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko ,  
    } ,
});

export default CollapsibleButton;
