import React from 'react';
import { 
    Text, 
    View , 
    ActivityIndicator , 
    StyleSheet , 
} from 'react-native';

const Loader = ({
}) => (
    <View style={styles.loaderBase}>
        <ActivityIndicator 
        size="large"
        />
    </View>
);


const styles = StyleSheet.create({
    loaderBase: {
        flex: 1,
        alignItems: "center" , 
        justifyContent: "center" ,  
    },  
});

export default Loader;

