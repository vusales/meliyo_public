import React  from  "react" ;
import helper from "../helpers/helper";
import colors from "../values/colors";
import {
    View ,  
    Text ,
}from "react-native" ; 
import CommonLayout from "../layouts/CommonLayout";
import { 
    CATEGORIES ,
    VIEWALL ,  
    PRODUCTDETAILS , 
    STORE ,
    STOREFROMCART 
} from "../values/screenNameLists";
import { useNavigation  } from "@react-navigation/native";
import CartCardComponnet from "../components/Cards/CartCardComponnet";
import AddToCartButtonComponent from "../components/General/AddToCartButtonComponent";
import NoProductComponent from "../components/General/NoProductComponent";




const CartScreen = ({
}) => {
    const navigation =  useNavigation(); 
    // translations
    const pageTitletext =  helper.translate("cartPageTitle"); 
    const productText = helper.translate("product"); 

    return (
        <>
            <CommonLayout
            showDrawerButton={false}
            pageName={`${pageTitletext} ( ${2} ${productText} ) `}
            showSearchComponent={false}
            >
                
                <CartCardComponnet
                image ={require("../assets/images/cardImage.png")} 
                seller ={"Filankes"} 
                productName ={"alma"} 
                size ={"36/s"} 
                color ={"red"}
                price={"200"}
                discount={"50"}
                sellerButtonFunction = {()=>(
                    navigation.navigate("stack" , {
                        screen: STOREFROMCART  ,
                        params: {
                            sellerId : "7" , 
                        }
                    })
                )}
                callback={()=> navigation.navigate("stack" , {
                    screen: PRODUCTDETAILS , 
                    params: {
                        productId: "" , 
                        productName: "" , 
                    }
                })}
                />

                <CartCardComponnet
                    image ={require("../assets/images/cardImage.png")} 
                    seller ={"Filankes 2 "} 
                    productName ={"Yaxsi al"} 
                    size ={"36/s"} 
                    color ={"red"}
                    price={"150"}
                    discount={""}
                    sellerButtonFunction = {()=>(
                        navigation.navigate("stack" , {
                            screen: STOREFROMCART  ,
                            params: {
                                sellerId : "7" , 
                            }
                        })
                    )}
                    callback={()=> navigation.navigate("stack" , {
                        screen: PRODUCTDETAILS , 
                        params: {
                            productId: "" , 
                            productName: "" , 
                        }
                    })}
                />

            </CommonLayout>

            <AddToCartButtonComponent
                price={400} 
                discountPrice={200}
                buttonText={helper.translate("confirmOrder")}
                callback={()=> console.log("order")}
            />
        </>
    );
}

export default CartScreen ; 