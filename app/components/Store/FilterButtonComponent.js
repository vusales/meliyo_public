import React , {
    useRef , 
} from 'react';
import { 
    Text, 
    View, 
    StyleSheet , 
    TouchableOpacity , 
} from 'react-native';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';
import SortModal from '../../modals/StoreModals/SortModal';
import FilterModal from '../../modals/StoreModals/FilterModal';


const FilterButtonComponent = ({
    params,
}) =>{ 

    const sortModalRef  =  useRef(); 
    const filterModalRef  =  useRef(); 
    
return (
    <View style={styles.container}>
        <TouchableOpacity 
        onPress={()=> filterModalRef.current.showWModal()}
        style={styles.button}
        >
            {icons.filter(colors.second,  18 )}
            <Text style={styles.buttonText}>{helper.translate("filter")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=> sortModalRef.current.showWModal()}
        style={styles.button}>
            {icons.sort(colors.second , 18 )}
            <Text style={styles.buttonText}>{helper.translate("sort")}</Text>
        </TouchableOpacity>

        <SortModal
        ref={sortModalRef}
        />

        <FilterModal
        ref={filterModalRef}
        />
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "space-between" , 
        alignItems:"center" ,
        marginVertical: helper.px(16) ,  
    },
    button: {
        flexDirection:"row" , 
        backgroundColor:colors.gray , 
        borderRadius: 2 , 
        paddingVertical: helper.px(5) ,
        paddingHorizontal: helper.px(14) ,
        alignItems:"center" ,  
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Medium") , 
        fontSize: helper.px(12) , 
        fontWeight: "500" , 
        lineHeight: helper.px(22) , 
        color: colors.blanko , 
        marginLeft: 5 , 
    },
});

export default FilterButtonComponent;
