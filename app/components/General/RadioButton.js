import React , 
{
  useState , 
} from "react";
import {
  View , 
} from "react-native";
import colors from "../../values/colors";


function RadioButton(props) {
    return (
        <View style={[{
          height: props.size || 24,
          width: props.size || 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: props.borderColor || colors.text ,
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: props.size/2 || 12,
                width: props.size/2 || 12,
                borderRadius: 6,
                backgroundColor: props.borderColor || colors.text ,
              }}/>
              : null
          }
        </View>
    );
}


export default RadioButton ; 