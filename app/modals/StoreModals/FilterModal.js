import React, {
    useRef , 
    forwardRef , 
    useImperativeHandle , 
    useState , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity ,  
    ScrollView , 
} from 'react-native';
import Modal from "react-native-modal";
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';
import CollapsibleButton from '../../components/General/CollapsibleButton';

const filterData = [
    {
        id: 1 , 
        itemName: "someNAME" , 
        items: [
            {
                id: 1 , 
                itemName: "someNAME-child" , 
                items: [
                    {
                        id: 1 , 
                        itemName: "someNAME-grandChild" , 
                        items: [] , 
                    }
                ] , 
            },
            {
                id: 1 , 
                itemName: "someNAME-child-2" , 
                items: [
                    {
                        id: 1 , 
                        itemName: "someNAME-grandChild-2-1" , 
                        items: [] , 
                    }
                ] , 
            }
        ] , 
    } , 
    {
        id: 1 , 
        itemName: "someNAME-2" , 
        items: [
            {
                id: 1 , 
                itemName: "someNAME-2-child" , 
                items: [] , 
            }
        ] , 
    }
] ; 


const FilterModal = forwardRef(({
    params,
}, ref ) =>{ 

    const [ visibility ,  setVisibility ] =  useState(false); 

    useImperativeHandle(ref , ()=>({
        showWModal: ()=> setVisibility(true) , 
        hideModal: () => setVisibility(false) , 
    }) , [] ) ;

return (
    <Modal
    style={{
        margin: 0, 
        bottom: 0 , 
        ...styles.layoutModal 
    }}
    animationIn={"slideInUp"}
    isVisible={visibility}
    onBackdropPress={()=>setVisibility(false)}
    onBackButtonPress={()=>setVisibility(false)}
    onSwipeComplete={()=>setVisibility(false)}
    deviceWidth={helper.screenWidth}
    swipeDirection={['down']}
    panResponderThreshold={50}
    transparent={true}
    >
        <View style={styles.scrollContainer}>
            <View 
            style={styles.modelineContainer}
            >
                <View style={styles.modeline}></View>
            </View>
            <View
            style={styles.header}
            >
                <TouchableOpacity
                onPress={()=>setVisibility(false)}
                >
                    {icons.close()}
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{helper.translate("filter")}</Text>
                <TouchableOpacity
                onPress={()=>setVisibility(false)}
                >
                   <Text style={styles.clearButtonText}>{helper.translate("clear")}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always" 
                style={styles.scrollCon}
            >
                {
                    filterData.map((item , index) => {
                        return (
                            <CollapsibleButton
                            key={`${index}-nestedCollapses`}
                            data={item.items}
                            name={item.itemName}
                            Component={( name ,  data ) =>{
                                return( 
                                    <View  style={{paddingLeft:helper.px(10)}}>
                                        <CollapsibleButton
                                        data={data}
                                        name={name}
                                        Component={(name ,  data ) =>(  
                                            <View  style={{paddingLeft:helper.px(10)}}>
                                                <CollapsibleButton
                                                    data={data}
                                                    name={name}
                                                    Component={(name ,  data ) =><Text style={styles.buttonText}></Text>}
                                                />
                                            </View>
                                        )}
                                    />
                                    </View>
                                )
                                }}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    </Modal>
)});


const styles = StyleSheet.create({
    layoutModal: {
        justifyContent: "flex-end" , 
    },
    scrollContainer: {
        height: helper.screenHeight, 
        backgroundColor: colors.main , 
        borderTopRightRadius: helper.px(10),
        borderTopLeftRadius: helper.px(10), 
        paddingVertical: helper.px(32),
        paddingHorizontal: helper.px(16),
    },
    modelineContainer: {
        justifyContent: "center" , 
        alignItems: "center" , 
        paddingVertical: helper.px(10) , 
    }, 
    modeline: {
        backgroundColor: "#565E73" , 
        borderRadius: helper.px(72) , 
        height: 2 , 
        width: 37 , 
    }, 
    modalTitle: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(16) , 
        color:colors.blanko ,  
    }, 
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .4 , 
        borderBottomColor: colors.placeholderText ,  
    } , 
    buttonText: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko ,  
    } , 
    scrollCon: {
        marginVertical: helper.px(16) ,
    }, 
    header: {
        flexDirection: "row" , 
        justifyContent: "space-between" ,
        alignItems: "center" ,
        marginVertical: helper.px(16) ,
    }, 
    clearButtonText: {
        fontFamily: helper.fontFamily("Medium") , 
        fontWeight: 500 , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.second ,  
    }, 
    
});
export default FilterModal;
