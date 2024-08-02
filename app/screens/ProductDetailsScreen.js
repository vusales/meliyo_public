import React , {
    useState ,  
} from 'react';
import { 
    StyleSheet , 
    Text, 
    View , 
    Image ,  
    ImageBackground ,  
    ScrollView ,  
    TouchableOpacity , 
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CommonLayout from '../layouts/CommonLayout';
import Carousel  from 'react-native-reanimated-carousel';
import helper from '../helpers/helper';
import colors from '../values/colors';
import icons from '../values/icons';
import FollowCardComponent from '../components/Cards/FollowCardComponent';
import HeadingComponent from '../components/General/HeadingComponent';
import CommentsCardComponent from '../components/Cards/CommentsCardComponent';
import { ALLCOMMENTS ,  PRODUCTDETAILS , CART } from '../values/screenNameLists';
import { useNavigation } from '@react-navigation/native';
import ScrollHorizontalHomeComponent from '../components/Scrolls/ScrollHorizontalHomeComponent';
import ProductCardComponent from '../components/Cards/ProductCardComponent';
import AddToCartButtonComponent from '../components/General/AddToCartButtonComponent';



const demoImageData  =  [
    require("../assets/images/productCardImage.png") ,
    require("../assets/images/instruments.png") ,
    require("../assets/images/instruments.png") ,
    require("../assets/images/instruments.png") ,
    require("../assets/images/instruments.png") ,
    require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
    // require("../assets/images/instruments.png") ,
]; 


const ProductDetailsScreen = ({
    route :  {
        params  : {
            productId , 
            productName 
        }
    }
}) =>{ 
    // console.log(" id  , prod"   ,  productId ,  productName ) ; 
    const navigation  =  useNavigation(); 
    const [activeSlide, setActiveSlide] = useState(0);
    const [ isFavorite  ,  setIsFavorite ] = useState(false) ; 



    const addToFavorites =() => {
        setIsFavorite(!isFavorite); 
    }

  
    const renderItem = (item  , index ) => {
        // console.log(item  , index) ; 
        return (
            <View style={styles.carouselImageBackground}>
                <Image
                style={styles.carouselImage}
                source={item}
                />
            </View>
        ); 
    }
    
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <CommonLayout
         showDrawerButton={false}
         pageName={productName}
         showSearchComponent={false}
        >
            <View style={{
                alignItems: "center" ,  
                justifyContent:"center" , 
                marginVertical: helper.px(16) , 
                }}
            >
                <Carousel
                    loop
                    width={helper.screenWidth - helper.px(32)}
                    height={helper.screenHeight - helper.px(360)}
                    autoPlay={true}
                    data={demoImageData}
                    scrollAnimationDuration={1000}
                    // activeSlideIndex={activeSlide}
                    // onSlideChange={setActiveSlide}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />

                <ScrollView
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}
                horizontal={true}
                style={styles.scrrolContainer}
                contentContainerStyle={{paddingHorizontal: helper.px(5)}}
                >
                    {
                        demoImageData.map((item , index)=>(
                            <TouchableOpacity
                            key={`dots-${index}`}
                            style={ index == activeSlide  ? 
                                {
                                    ...styles.dots , 
                                     backgroundColor: "#424242" ,
                                }
                                : 
                                styles.dots
                            }
                            ></TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

            <View style={{ 
                ...styles.rowcon ,  
                justifyContent: "space-between", 
                }} 
            >
                <Text style={styles.titleText} >{productName}</Text>
                <TouchableOpacity
                onPress={()=>addToFavorites()}
                >
                    {
                        isFavorite? 
                        icons.heartfilled( colors.error)
                        :
                        icons.heart( colors.placeholderText)
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.rowcon}>
                <Text style={{...styles.text, marginRight:helper.px(16)}}>{icons.tag(colors.textGray , 11)} az istifadə olunmuş</Text>
                <Text style={{...styles.text, marginRight:helper.px(16)}}>Bədən: S/36</Text>
                <Text style={{...styles.text, marginRight:helper.px(16)}}> {icons.singledot(colors.textGray , 11 )} Narıncı</Text>
            </View>

            <Text style={styles.subTitleText}>Məhsul haqqında</Text>
            <Text style={{
                ...styles.text,
                fontSize: helper.px(12) ,
                fontFamily:helper.fontFamily("Medium"),

            }}>Məhsul az istifadə olunmuşdur 2 dəfə İstifadə olunub. 
            Narıncı rəngdədir.</Text>


            {/* SELLER INFO */}
            <View style={styles.intoSellerCon}>
                <Text style={styles.intoSellerText}>Məhsulu satan</Text>
                <Text 
                style={{
                    ...styles.intoSellerText,
                    color: colors.second ,  
                }}>Hamısını gör</Text>
            </View>
            <FollowCardComponent
                image={require("../assets/images/cardImage.png")} 
                name={"Name"}     
                speciality={"job"} 
                followers={"20"} 
                rating ={4}
                comments ={"20"}
                callback={()=>{
                    console.log("FollowCardComponent id") ; 
                }}
                containerStyle={{
                    borderTopLeftRadius: 0 , 
                    borderTopRightRadius: 0 , 
                }}
            />


            {/* cOMMENTS */}

            <ScrollHorizontalHomeComponent
                iteratingData={[1 , 2 , 3]}
                title="Comments"
                hideViewMore={false}
                viewMoreCallBack={()=>  navigation.navigate("stack" , {
                    screen: ALLCOMMENTS , 
                    params: {
                        starUserId: "" ,  
                    }
                }) }
                customComponent={
                    ( title , images, id ) => 
                    <CommentsCardComponent
                    name="some Name"
                    image={require("../assets/images/cardImage.png")}
                    speciality={"someJob goes here"}
                    rating={4}
                    description={"some description text goes here!!"}
                    containerStyle={{
                        width:helper.screenWidth - helper.px(32), 
                    }}
                    />
                }
            />

            {/* <HeadingComponent
                title={"Comments"}
                callback={()=>{
                    navigation.navigate("stack" , {
                        screen: ALLCOMMENTS , 
                        // params: {
                        //     starUserId
                        // }
                    })
                }} 
                buttonText={"show more"}
            />
            <CommentsCardComponent
            name="some Name"
            image={require("../assets/images/cardImage.png")}
            speciality={"someJob goes here"}
            rating={4}
            description={"some description text goes here!!"}
            /> */}

            {/* related products */}
            <ScrollHorizontalHomeComponent
                iteratingData={[1 , 2 , 3]}
                title={"Oxşar məhsullar"}
                hideViewMore={true}
                customComponent={
                    ( title , images, id )=> (
                        <ProductCardComponent
                        image={require("../assets/images/productCardImage.png")}
                        productName ={"hsvajdvh hgbadkhs"}  
                        price ={20} 
                        discountPrice ={50}
                        callback={()=>{
                            // navigation.navigate("stack" , {
                            //     screen: PRODUCTDETAILS , 
                            //     params: {
                            //         productId : 0 , 
                            //         productName: "SOME product"
                            //     }
                            // });
                        }}
                        containerstyle={{
                            width: helper.px(170) ,
                        }}
                        />
                    )
                }
            />
        </CommonLayout>
        <AddToCartButtonComponent
        price={400} 
        discountPrice={200}
        buttonText="Səbətə əlavə edin" 
        callback={()=>navigation.navigate(CART)}
        />
    </GestureHandlerRootView>
)};


const styles = StyleSheet.create({
    rowcon:{
        flexDirection: "row" , 
        alignItems: "center" ,
    } , 
    carouselImage:{
        backgroundColor: colors.blanko  , 
        borderRadius: 5  ,
    }, 
    carouselImageBackground: {
        backgroundColor: colors.blanko , 
        height: "100%" , 
        width: "100%" , 
        borderRadius: 5  ,
        justifyContent: "center" , 
        alignItems:"center",
    }, 
    dots: {
        width: helper.px(7) , 
        height: helper.px(7) , 
        backgroundColor: colors.blanko , 
        borderRadius: 100,  
        marginRight: helper.px(5),   
    }, 
    scrrolContainer: {
        maxWidth: helper.px(76) , 
        paddingVertical: helper.px(5) , 
        paddingHorizontal: helper.px(7) , 
        backgroundColor: colors.transparentGray ,  
        borderRadius: helper.px(63), 
        position:"absolute" ,
        bottom: helper.px(16) ,
    }, 
    titleText:{
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(16) , 
        lineHeight:helper.px(24) , 
        color:colors.blanko , 
        width: "90%" , 
        textTransform: "capitalize" , 
    } ,
    subTitleText:{
        fontFamily: helper.fontFamily('Medium') , 
        fontWeight: "500" , 
        fontSize: helper.px(12) , 
        lineHeight:helper.px(24) , 
        color:colors.blanko , 
        textTransform: "capitalize" , 
    } ,

    text: {
        color:colors.textGray , 
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "500" , 
        fontSize: helper.px(11) , 
        lineHeight:helper.px(24) , 
        alignItems: "center",
    },
    intoSellerCon: {
        paddingVertical: helper.px(10), 
        paddingHorizontal:helper.px(16),
        borderTopLeftRadius: 5 , 
        borderTopRightRadius: 5 , 
        backgroundColor: colors.gray ,
        marginTop: helper.px(16) , 
        flexDirection: "row" , 
        justifyContent: "space-between" ,
        borderBottomColor: "#747474" , 
        borderBottomWidth: .6 , 
    },
    intoSellerText: {
        color:colors.text , 
        fontFamily: helper.fontFamily('Bold') , 
        fontWeight: "600" , 
        fontSize: helper.px(12) , 
        lineHeight:helper.px(22) , 
        alignItems: "center",
        letterSpacing: -0.408 ,
    } , 


   

    
});
export default ProductDetailsScreen;
