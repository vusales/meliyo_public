import React, {
    useState , 

} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
} from 'react-native';
import CommonLayout from '../layouts/CommonLayout';
import helper from '../helpers/helper';
import icons from '../values/icons';
import colors from '../values/colors';
import { BarChart ,  LineChart  } from "react-native-gifted-charts";
import DropDownPicker from 'react-native-dropdown-picker';


const barData = [
    {value: 0.7, label: 'Jan'},
    {value: 0.8, label: 'Feb'},
    {value: 0.6, label: 'Mar'},
    {value: 0.4, label: 'Apr'},
    {value: 0.9, label: 'May'},
    {value: 0.7, label: 'Jun'},
];

const lineData = [
    {value: 0, dataPointText: '0' , label: 'Jan'  ,   frontColor: '#177AD5', },
    {value: 10, dataPointText: '10' , label: 'Feb' } ,
    {value: 8, dataPointText: '8' ,  label: 'Mar' ,  frontColor: '#177AD5',  },
    {value: 58, dataPointText: '58' , label: 'Apr'  },
    {value: 56, dataPointText: '56', label: 'May' ,  frontColor: '#177AD5', },
    {value: 78, dataPointText: '78' , label: 'Jun'  },
    {value: 74, dataPointText: '74' , label: 'Jun' , frontColor: '#177AD5', },
    {value: 98, dataPointText: '98' , label: 'Jun' , frontColor: '#177AD5', },
];

const lineData2 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
];


const barDataSecond = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];



const StarStatistics = ({
    params,
}) => {
    const [ showfirstcontent , setshowingFirstContent ] = useState( true ); 

    // dropdown value
        // 1 ) videos 
        const [ opendropdown, setOpendropdown ] = useState(false);
        const [value, setValue] = useState(null);
        const [ videoFilters, setVideoFilters] = useState([
        {label: 'Günlük', value: 'day'} ,
        {label: 'Həftəlik', value: 'week'} , 
        {label: 'Aylıq', value: 'month'} , 
        ]);
        // 2 ) products

        const [ opendropdownSecond, setOpendropdownSecond ] = useState(false);
        const [valueSecond , setValueSecond] = useState(null);
        const [ productFilters, setProductFilters] = useState([
        {label: 'Günlük', value: 'day'} ,
        {label: 'Həftəlik', value: 'week'} , 
        {label: 'Aylıq', value: 'month'} , 
        ]);



    return(
    <CommonLayout
    pageName={helper.translate("statisticsPageTitle")}
    >

        <View style={styles.buttonsContainer}>
            <TouchableOpacity
            style={
                showfirstcontent ?
                [styles.statisticButtons , styles.activeButton] 
                :styles.statisticButtons
            }
            onPress={()=>setshowingFirstContent(true)}
            >
                <Text
                style={
                    showfirstcontent ?
                    [ styles.statisticButtonsText  , styles.activeButtontext ]
                   : styles.statisticButtonsText
                }
                >Video gəlir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !showfirstcontent ?
                [styles.statisticButtons , styles.activeButton] 
                :styles.statisticButtons
            }
             onPress={()=>setshowingFirstContent(false)}
            >
                <Text
                style={
                    !showfirstcontent ?
                    [ styles.statisticButtonsText  , styles.activeButtontext ]
                   : styles.statisticButtonsText
                }
                >Satılan məhsullar</Text>
            </TouchableOpacity>
        </View>


        {

            showfirstcontent ? 
            <View  >
                <Text style={styles.contentTitle}>Video gəlir</Text>
                <View 
                    style={styles.contentContainer}  
                >
                    <View style={styles.filtercontainer}>
                        <Text style={styles.chartTitleText}>Satış Hesabatı</Text>
                        <View style={{ width: "35%" ,}}>
                            <DropDownPicker
                                listMode='SCROLLVIEW'
                                dropDownDirection="BOTTOM"
                                open={opendropdown}
                                value={value}
                                items={videoFilters}
                                setOpen={setOpendropdown}
                                setValue={setValue}
                                setItems={setVideoFilters}
                                style={styles.dropdown}
                                textStyle={{
                                    color: colors.placeholderText ,  
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: colors.gray, 
                                    borderColor: colors.placeholderText , 
                                }}
                                zIndex={100000}
                                zIndexInverse={300000}
                                placeholder={"Seç"}
                                placeholderStyle={{
                                    color: colors.placeholderText ,
                                }}
                                showTickIcon={true}
                                arrowIconStyle={{ 
                                    color: colors.blanko 
                                }}
                                TickIconComponent={({style}) => <View>{icons.check()}</View>}
                                CloseIconComponent={({style}) => <View>{icons.close()}</View>}
                                ArrowUpIconComponent={({style}) => <View>{icons.chevrontop(colors.placeholderText ,  22 ) }</View> }
                                ArrowDownIconComponent={({style}) => <View>{icons.chevronbottom(colors.placeholderText ,  22)}</View> }
                            />
                        </View>
                    </View>

                    <View >
                        <BarChart
                            showFractionalValues
                            rulesType={"solid"}
                            rulesThickness={1}
                            rulesColor={'#414141'}
                            barWidth={helper.px(16)}
                            spacing={30}
                            yAxisThickness={0}
                            xAxisColor={'#414141'}
                            yAxisTextStyle={styles.axisTexts}
                            xAxisLabelTextStyle={styles.axisTexts}
                            xAxisIndicesColor="#979699"
                            noOfSections={3}
                            data={barData}
                            showGradient
                            frontColor={'#5690D6'}
                            gradientColor={'#CC75C6'}
                            renderTooltip={(item, index) => {
                                return (
                                  <View
                                    style={styles.tooltip}
                                  >
                                    <Text style={styles.tooltipText}>{item.value}</Text>
                                  </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
            :
            <View >
                <Text style={styles.contentTitle}>Satılan məhsullar</Text>
                <View 
                style={styles.contentContainer} 
                >

                    <View style={styles.filtercontainer}>
                        <View>
                            <Text style={styles.productsPriceInfo}>Ümumi məbləğ</Text>
                            <Text style={styles.productTotalPrice}>102.5M ₼</Text>
                        </View>
                        
                        <View style={{ width: "35%"}}>
                            <DropDownPicker
                                listMode='SCROLLVIEW'
                                dropDownDirection="BOTTOM"
                                open={opendropdownSecond}
                                value={valueSecond}
                                items={productFilters}
                                setOpen={setOpendropdownSecond}
                                setValue={setValueSecond}
                                setItems={setProductFilters}
                                style={styles.dropdown}
                                textStyle={{
                                    color: colors.placeholderText ,  
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: colors.gray, 
                                    borderColor: colors.placeholderText , 
                                }}
                                zIndex={100000}
                                zIndexInverse={300000}
                                placeholder={"Seç"}
                                placeholderStyle={{
                                    color: colors.placeholderText ,
                                }}
                                showTickIcon={true}
                                arrowIconStyle={{ 
                                    color: colors.blanko 
                                }}
                                TickIconComponent={({style}) => <View>{icons.check()}</View>}
                                CloseIconComponent={({style}) => <View>{icons.close()}</View>}
                                ArrowUpIconComponent={({style}) => <View>{icons.chevrontop(colors.placeholderText ,  22 ) }</View> }
                                ArrowDownIconComponent={({style}) => <View>{icons.chevronbottom(colors.placeholderText ,  22)}</View> }
                            />
                        </View>
                    </View>


                    <View>
                        {/* <LineChart
                            data={lineData}
                            data2={lineData2}
                            showFractionalValues
                            yAxisThickness={0}
                            rulesType={"solid"}
                            rulesThickness={1}
                            rulesColor={'#414141'}
                            height={210}
                            spacing={42}
                            initialSpacing={0}
                            color1="#CC75C6"
                            color2="#47AE99"
                            textColor1="#CC75C6"
                            textColor2='#47AE99'
                            dataPointsHeight={4}
                            dataPointsWidth={4}
                            dataPointsColor1="#fff"
                            dataPointsColor2="#fff"
                            textShiftY={-11}
                            textShiftX={-5}
                            textFontSize={13}
                            yAxisTextStyle={styles.axisTexts}
                            xAxisLabelTextStyle={styles.axisTexts}
                            focusEnabled
                            showTextOnFocus 
                            isAnimated
                            animateOnDataChange
                            animationDuration={1000}
                            onDataChangeAnimationDuration={300}
                            startOpacity={0.4}
                            endOpacity={0.1}
                            curved 
                            noOfSections={3}
                            yAxisLabelSuffix="M"
                            thickness={1.5}
                            xAxisColor={'#414141'}
                        /> */}

                        <BarChart
                            showFractionalValues
                            rulesType={"solid"}
                            rulesThickness={1}
                            rulesColor={'#414141'}
                            barWidth={helper.px(16)}
                            spacing={30}
                            yAxisThickness={0}
                            xAxisColor={'#414141'}
                            yAxisTextStyle={styles.axisTexts}
                            xAxisLabelTextStyle={styles.axisTexts}
                            xAxisIndicesColor="#979699"
                            noOfSections={3}
                            data={barDataSecond}
                            showGradient
                            frontColor={'#5690D6'}
                            gradientColor={'#CC75C6'}
                            renderTooltip={(item, index) => {
                                return (
                                  <View
                                    style={styles.tooltip}
                                  >
                                    <Text style={styles.tooltipText}>{item.value}</Text>
                                  </View>
                                );
                            }}
                        />   


                    </View>

                    <View style={[styles.row ,  styles.infoContainer ]}>
                        <View style={[styles.row ,  {
                            alignItems: "center" ,
                            justifyContent: "center" ,
                            marginRight: helper.px(16),
                        }]} >
                            <View style={[ styles.dot ,  {backgroundColor: "#CC75C6" } ]}></View>
                            <Text style={styles.productsPriceInfo} >əldə edilən məbləğ</Text>
                        </View>
                        <View style={[styles.row ,  {
                            alignItems: "center" ,
                            justifyContent: "center" ,
                        }]} >
                            <View style={[styles.dot ,  {backgroundColor:'#47AE99' }]}></View>
                            <Text style={styles.productsPriceInfo} >Satılan məhsul</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        }


    </CommonLayout>
)};


const styles = StyleSheet.create({
    infoContainer: {
        marginTop: helper.px(50),
        alignItems:"center" , 
        justifyContent: "center" ,
    } , 

    row: {
        flexDirection: "row" ,
    } , 
    dot:{
        width: helper.px(10) , 
        height: helper.px(10) ,
        borderRadius: 100 , 
        marginRight: helper.px(5) ,
    } , 
    filtercontainer: {
        flexDirection: "row" ,
        alignItems:"center",
        justifyContent:"space-between" ,
        marginBottom: helper.px(24),
        zIndex:100000, 
        paddingHorizontal: helper.px(16) , 
    }, 
    dropdown: {
        borderRadius: 5 , 
        borderWidth: 1 , 
        borderColor: colors.placeholderText , 
        paddingVertical: 6 , 
        paddingHorizontal: 6 ,  
        backgroundColor: colors.gray ,  
    }, 
    chartTitleText:{
        fontFamily: helper.fontFamily("Medium") , 
        fontSize: helper.px(14) , 
        fontWeight: "500" , 
        lineHeight: helper.px(16) ,
        color:colors.blanko , 
    }, 
    axisTexts: {
        color: "#979699" ,
        fontFamily:helper.fontFamily("Medium") , 
        fontSize:helper.px(14) , 
        lineHeight: helper.px(16),
    }, 
    buttonsContainer: {
        flexDirection:"row" , 
        justifyContent:"space-between",
    }, 
    statisticButtons: {
        height: helper.px(77) , 
        width: "49%" , 
        justifyContent: "center" , 
        alignItems: "center" , 
        borderRadius: helper.px(6), 
        backgroundColor: colors.gray , 
    }, 
    activeButton : {
        backgroundColor: colors.second , 
    }, 
    statisticButtonsText: {
        fontFamily: helper.fontFamily("Medium") , 
        fontSize: helper.px(18) , 
        fontWeight: "500" , 
        lineHeight: helper.px(20) ,
        color:colors.placeholderText , 
    }, 
    activeButtontext: {
        color: colors.main , 
    }, 
    contentTitle: {
        color: colors.blanko ,  
        fontFamily: helper.fontFamily("Bold") , 
        fontSize: helper.px(16) , 
        fontWeight: "600" , 
        lineHeight: helper.px(20) ,
        marginVertical: helper.px(16),  
    }, 

    contentContainer: {
        backgroundColor:colors.gray ,  
        borderRadius: helper.px(10), 
        paddingVertical: helper.px(10), 
        paddingHorizontal: helper.px(10), 
        marginVertical:helper.px(16) ,
        paddingBottom: helper.px(40),
        paddingTop: helper.px(24) , 
    }, 
    productTotalPrice: {
        color:colors.placeholderText ,  
        // fontFamily: helper.fontFamily("Medium"),
        fontSize: helper.px(24) , 
        fontWeight: "500" , 
        lineHeight: helper.px(28) ,
        marginTop: helper.px(10) , 
    } , 
    productsPriceInfo: {
        color:colors.placeholderText , 
        fontSize: helper.px(12) , 
        fontWeight:"500" , 
        fontFamily: helper.fontFamily("Medium") ,  
        lineHeight: helper.px(16),

    } , 
    tooltip : {
        marginBottom: 20,
        marginLeft: -6,
        backgroundColor: '#ffcefe',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
    } , 
    tooltipText : {
        fontFamily: helper.fontFamily("Bold") , 
        color: colors.main , 
    } ,  


});

export default StarStatistics;
