import React , {
    useState , 
    useEffect , 
    useRef ,  

} from 'react';
import { 
    Text, 
    View,
    StyleSheet , 
    TouchableOpacity , 
    Image, 
    TouchableWithoutFeedback , 
    Pressable , 
} from 'react-native';
import helper from '../../helpers/helper';
import icons from '../../values/icons';
import colors from '../../values/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { PROFILEEDIT , FOLLOWERS } from '../../values/screenNameLists'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import StarDetailsModal from '../../modals/ProfileModals/StarDetailsModal';



const ProfileIntroComponent = ({
    stores,
    name, 
    username , 
    image, 
    star , 
    followers , 
    soldProducts , 
    onlyProfilePicture ,
    suspendCallback , 
    profileId , 
    imageFromGalaryParent , 
    setImageFromGalaryParent , 
    changeImageCallBack ,  
}) =>{ 
    const navigation =  useNavigation(); 
    const starDetailsModalRef =  useRef(); 

    const followerstext =  helper.translate("followers");
    const soldproductsText=helper.translate("soldProducts");
    const purchaisedProducts = helper.translate("purchaisedProducts"); 
    const editphotoText=helper.translate("editpicture");
    const editProfileText=helper.translate("editProfile");

    const [imageFromGalary ,  setImageFromGalary ] = useState("") ; 

    useEffect(()=>{
        // getAsyncImage();
    } , []) ; 

    const getAsyncImage = async () => {
        if(image){
            setImageFromGalary(image);
            return ; 
        }
        let savedImage =  await helper.getdataFromAsyncStorage("@profile_img") ; 
        if( savedImage!==null && savedImage ){
            savedImage = JSON.parse(savedImage);
            setImageFromGalary(savedImage);
        }else {
            return;
        }
    }

    
    const changeProfilePhoto = async (body) => {
        try {
            await stores.profileStore.changeProfileImage(body); 
        } catch (error) {
            console.log("error in change photo func" , error ); 
        }
    }

    const selectImage = () => {
        // get image from galery
        let options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
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
                const source = {uri : response.assets[0].uri } ;
                let formData =  new FormData(); 
                formData.append("file" , response );
                changeProfilePhoto(formData); 
                setImageFromGalary(source);
                setImageFromGalaryParent(formData);
                // set image to async storage 
                let strngfyImage ; 
                if(response.assets[0].uri) {
                    strngfyImage =  JSON.stringify(source);
                    await helper.writeAsyncStroga( "@profile_img" , strngfyImage );
                }
            }
        });
    }


return (
    <>
        <View style={styles.rowContainer} >
            <View style={styles.rowContainer}>
                {
                    imageFromGalary ? 
                    <TouchableOpacity
                    onPress={() => suspendCallback ? console.log("suspended") : selectImage() }
                    >
                        <LinearGradient 
                            colors={['#CC75C6', '#5690D6']} 
                            start={{x: 0.055, y: 0.30}} 
                            end={{x: 0.2, y: 1.0}}
                            locations={[0, 0.6]}
                            style={styles.gradientImageContainer}
                        >
                            <Image 
                            style={styles.profileImage}
                            source={imageFromGalary}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    onPress={() =>suspendCallback ? console.log("suspended") : selectImage() }
                    >
                        <LinearGradient 
                            colors={['#CC75C6', '#5690D6']} 
                            start={{x: 0.055, y: 0.30}} 
                            end={{x: 0.2, y: 1.0}}
                            locations={[0, 0.6]}
                            style={styles.gradientImageContainer}
                        >
                            {
                                image ? 
                                <Image 
                                style={styles.profileImage}
                                source={image}
                                />
                                :
                                icons.adduserSecond(colors.main , helper.px(20))
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                }
                <View style={styles.textContainer}>
                    {
                        onlyProfilePicture ? 
                        <TouchableWithoutFeedback
                        onPress={() =>selectImage()}
                        >
                            <Text style={{
                                ...styles.nameText,
                                textDecorationLine: "underline" ,
                            }}>{ editphotoText }</Text>
                        </TouchableWithoutFeedback>
                        :
                        <>
                            <Text style={styles.nameText}>{name}</Text>
                            { star ? null : <Text style={styles.nameText}>{username}</Text> }
                        </>
                    }
                </View>
            </View>
            {
                onlyProfilePicture ? 
                null :
                <>
                    {
                        star?
                        <TouchableOpacity
                        onPress={()=>{starDetailsModalRef.current.showModal()}}
                        >
                            {icons.profileDetails(colors.blanko ,  28)}
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate(PROFILEEDIT , { isStar: star})}}
                        >
                            <Text style={styles.buttonText}>{editProfileText}</Text>
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
        {
            onlyProfilePicture? 
            null 
            :
            <View 
            style={{
                ...styles.rowContainer ,  
                justifyContent: "flex-start" ,
                marginTop: helper.px(16), 
            }}  
            >

                {
                    star ? 
                    <Pressable 
                    onPress={()=>{
                        navigation.navigate("stack" ,  {
                            screen: FOLLOWERS , 
                            params: {
                                userId : profileId , 
                            }
                        })
                    }}
                    style={styles.starInfoContainer}
                    >
                        <Text style={{...styles.nameText, fontSize: helper.px(13)}} >{followerstext}</Text>
                        <Text style={{...styles.nameText, fontSize: helper.px(14)}}>{followers}</Text>
                    </Pressable>
                    :null 
                }
                
                {/* <View  style={styles.starInfoContainer}>
                    <Text style={{...styles.nameText, fontSize: helper.px(13)}}>{star ? soldproductsText : purchaisedProducts }</Text>
                    <Text style={{...styles.nameText, fontSize: helper.px(14)}}>{soldProducts}</Text>
                </View> */}
            </View>
        }

        <StarDetailsModal
        ref={starDetailsModalRef}
        />

        
    </>
)};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection:"row" , 
        alignItems: "center" ,
        justifyContent:"space-between" ,
    }, 
    gradientImageContainer: {
        borderRadius: 100 , 
        width: helper.px(45) , 
        height: helper.px(45) , 
        alignItems:"center" , 
        justifyContent:"center" , 
    }, 
    profileImage: {
        width: helper.px(40) , 
        height: helper.px(40) , 
        borderRadius: 100 , 
    } , 
    textContainer: {
        marginLeft: helper.px(10), 
    },
    nameText: {
        fontFamily: helper.fontFamily("Medium") , 
        fontWeight: "500" , 
        fontSize: helper.px(15) , 
        lineHeight: helper.px(18) , 
        color:colors.blanko , 
    }, 
    buttonText: {
        fontFamily: helper.fontFamily("Bold") , 
        fontWeight: "600" , 
        fontSize: helper.px(14) , 
        lineHeight: helper.px(24) , 
        color:colors.blanko , 
    }, 
    starInfoContainer: {
        alignItems: "center" , 
        justifyContent: "center" , 
        marginRight:helper.px(14),
    }, 


    




});

export default helper.mobx(ProfileIntroComponent);
