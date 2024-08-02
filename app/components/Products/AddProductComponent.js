import React ,  {
    useState , 
    useEffect , 
    useRef, 
} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    Image , 
    ScrollView ,   
    TouchableWithoutFeedback , 
    Pressable , 
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import helper from '../../helpers/helper';
import colors from '../../values/colors';
import icons from '../../values/icons';
import Alert from '../General/Alert';



const AddProductComponent = ({
    params,
}) => {
    
    const alertRef =  useRef(null); 
    const [productPhotos ,  setProductPhotos ] = useState([]); 
    const [showDeleteIcon ,  setshowDeleteIcon ] = useState(false); 


    useEffect(()=> {
        console.log("productPhotos" , productPhotos); 
    }, [productPhotos] ); 


    const chooseImage = async  () => {
        try {

            let options =  {
                title: 'Select Image',
                selectionLimit: 10 , 
                mediaType: "photo" ,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            }

            if(productPhotos.length >= 10 ){
                alertRef.current.alert(true ,  "error" , "Ən çoxu 10 ədəd şəkil əlavə edə bilərsiniz!"); 
                return ;
            }

            launchImageLibrary(options , async (response)=>{
                if(response.didCancel){
                    console.log("canceled");
                    return ; 
                }else if(response.error){
                    console.log("error" , response.error );
                    return ; 
                }else if(response.customButton){
                    console.log("customButton" , response.customButton );
                    return ; 
                }else {
                    let responseArray=[]; 
                    response.assets.forEach((element , index) => {
                        responseArray.push({uri: response.assets[index].uri}); 
                    });
                    let newArray =  [...productPhotos ,  ...responseArray ] ; 
                    let uniqueArray  =  new Set(newArray) ; 
                    setProductPhotos([...uniqueArray]); 
                }
            });

            // ImagePicker.openPicker({
            //     multiple: true
            // }).then(images => {
            //     console.log("images" , images);
            // });

        } catch (error) {
            console.log("error" ,  error ) ;   
        }
    }

    const removeImage =(choosenIndex) => {
        let newArray  =  productPhotos.filter((item , index )=>choosenIndex !== index ) ; 
        setProductPhotos(newArray); 
        setshowDeleteIcon(false);
    }


return (
    <>
        <Alert ref={alertRef} />
        <View style={styles.container}>
            <TouchableOpacity
            onPress={()=>chooseImage()}
            style={styles.addButton}
            >
                {icons.photoCamera(colors.second , 16 )}
                <Text  style={styles.addButtonText}>Şəkil əlavə edin</Text>
            </TouchableOpacity>

            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            horizontal={true}
            style={styles.scrollContainer}
            >
                {
                    productPhotos?.map(( item , index )=>{
                        return(
                            <Pressable
                            key={`${index}images-product`}
                            onPress={()=>removeImage(index)}
                            onPressIn={()=>setshowDeleteIcon(true)}
                            onPressOut={()=>setshowDeleteIcon(false)}
                            >
                                <>
                                    <Image 
                                    style={styles.images}
                                    source={item}
                                    />
                                    {
                                        showDeleteIcon ?
                                        <View  style={styles.deleteContainer} >
                                            {icons.trush(colors.blanko ,  helper.px(20))}
                                        </View>
                                        :null 
                                    }
                                </>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </View>
        <Text   style={styles.infoText} >10 şəkil əlavə oluna bilər</Text>
    </>
    
)};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row" , 
        marginVertical:  helper.px(10) , 
    }, 
    addButton: {
        // width: helper.px(62) , 
        // height: helper.px(62) , 
        width: helper.px(75) , 
        height: helper.px(75) , 
        justifyContent:"center" , 
        alignItems:"center",
        backgroundColor: colors.gray ,  
        borderRadius: 3 , 
        paddingVertical: helper.px(14) , 
        paddingHorizontal: helper.px(10) , 
    }, 
    addButtonText: {
        color:colors.blanko   ,
        width: "100%" , 
        textAlign: "center" ,
        fontSize: helper.px(13) , 
        fontWeight: "500" , 
        fontFamily: helper.fontFamily("Medium") , 
        lineHeight: helper.px(14) , 
        marginTop:helper.px(10),
    }, 
    images: {
        // width: helper.px(62) , 
        // height: helper.px(62) , 
        width: helper.px(75) , 
        height: helper.px(75) ,
        borderRadius: 3 , 
        marginRight: helper.px(10),
    }, 
    scrollContainer: {
        marginLeft: helper.px(10), 
    }, 
    infoText: {
        fontSize: helper.px(12) , 
        fontWeight: "500" , 
        fontFamily: helper.fontFamily("Medium") , 
        lineHeight: helper.px(24) , 
        color: colors.text ,  
        marginBottom: helper.px(10),
    }, 
    deleteContainer:{
        // width: helper.px(62) , 
        // height: helper.px(62) , 
        width: helper.px(75) , 
        height: helper.px(75) ,
        backgroundColor: colors.gray , 
        justifyContent:"center" , 
        alignItems:"center" , 
        ...StyleSheet.absoluteFillObject , 
        top: 0 , 
        left: 0 , 
        borderRadius: 3 , 
    }, 



    
});

export default AddProductComponent;
