import React ,  {
    useState ,  
    useRef , 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    StatusBar , 
    SafeAreaView ,  
    TouchableOpacity ,  

} from 'react-native';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import CommonLayout from '../layouts/CommonLayout';
import { Switch } from 'react-native-switch';
import Alert from '../components/General/Alert';



const SecurityandPrivacy = ({
    stores , 
    params ,
}) =>{

    // refs
    const alertRef  = useRef();  

    const [disableProfile ,  setDisablingProfile ] = useState(false); 

    const removeAccount = async () => {
        try {
            await stores.authorationStore.disableProfile().then((result)=>{
                if(!result)  return alertRef.current.alert(true, "error" ,"Profili deaktiv etmək mümkün olmadı!"); 
                setDisablingProfile(!disableProfile);  
                return  alertRef.current.alert(true, "success" ,"Profili deaktiv edildi!"); 
            }); 
        } catch (error) {
            if(error) {
                console.log("error in disabling profile"  ,  error) ; 
                return alertRef.current.alert(true, "error" ,"Xəta baş verdi!"); 
            }
        }
    }

return (
    <CommonLayout
        showDrawerButton={false}
        pageName={`Security&Privacy`}
        showSearchComponent={false}
    >
        <TouchableOpacity
        onPress={() => removeAccount()}
        style={styles.button}
        >
            <Text  
            style={styles.buttonText}
            >
                Security and privacy
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => removeAccount()}
        style={{
            ...styles.button, 
            alignItems: "flex-start" , 
            // paddingTop: helper.px(16) ,
        }}
        >
            <View   
            style={{width:"70%"}}
            >
                <Text  
                style={styles.buttonText}
                >
                    Profili deaktiv edin
                </Text>
                <Text  
                style={styles.infoText}
                >
                    ghcvfsgh gvfsdgvc vguvsav  hdsgfudhgvhud hjdsvcfhgvsd  ghcvfsgh gvfsdgvc vguvsav       
                </Text>
            </View>

            <Switch
                value={disableProfile}
                onValueChange={(val) => removeAccount() }
                disabled={false}
                activeText={''}
                inActiveText={''}
                circleSize={31}
                barHeight={31}
                circleBorderWidth={0}
                backgroundActive={'#30a566'}
                backgroundInactive={colors.gray}
                circleActiveColor={colors.blanko}
                circleInActiveColor={colors.blanko}
                //renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={31} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
        </TouchableOpacity>
    </CommonLayout>
)};

const styles = StyleSheet.create({
    button: {
        paddingVertical:helper.px(10) , 
        borderBottomWidth: .6 , 
        borderBottomColor: colors.placeholderText , 
        flexDirection:"row" , 
        alignItems:"center" , 
        justifyContent:'space-between' , 
        marginBottom: helper.px(5),
    } , 
    row: {
        flexDirection: "row" , 
    } , 
    buttonText: {
        textTransform : "capitalize" , 
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko ,  
    } ,
    infoText: {
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(11) , 
        lineHeight:helper.px(18) , 
        color:colors.text , 
        width: "100%" ,  
    },
});


export default helper.mobx(SecurityandPrivacy);
