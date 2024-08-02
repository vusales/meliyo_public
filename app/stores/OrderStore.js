import  {makeAutoObservable , runInAction } from "mobx" ; 
import helper from "../helpers/helper"; 
import { Linking } from "react-native" ; 



class OrderStore {

    videoOrders = [] ;  
    starVideoOrders = [] ;  
    orderDetails = {} ;  
    videoOrderStatusArray =[]; 

    constructor() {
        makeAutoObservable(this) ; 
    }

    order = async (body) => {
        try {

            let token =  await helper.defineToken(); 
            let lang = await helper.defineLang();  

            console.log("body" , body  );

            let result =  await helper.api(token,{lang},"/index.php?route=japi/order").post("/placeVideoOrder" , body); 

            if(result.data.result) {
                let body =  {
                    order_id: result.data.order_id , 
                }

                let responseSecond =  await helper.api(token,{lang},"/index.php?route=japi/order").post("/getPaymentLinkForOrder" , body);

                if(responseSecond.data.result){
                    let url =  responseSecond.data.url ; 
                    await Linking.openURL(url); 
                }else{
                    return false ; 
                }
            }
        } catch (error) {
            if(error) {
                console.log("error" , error ); 
            }
            
        }
    }

    getOrders = async () => {
        try {

            let token = await helper.defineToken();  
            let lang = await helper.defineLang(); 


            let response = await helper.api(token, {lang}, "/index.php?route=japi").get("/order"); 

            console.log("response in get orders " , response ) ; 
            if(response.data.result) {
                let orders =  response.data.orders ; 

                runInAction(()=>{
                    this.videoOrders =  orders ;  
                }); 
            }
        } catch (error) {
            console.log("error in getting orders"  , error ) ; 
            
        }
    }

    getOrderDetails  = async (id) => {
        try {

            let token = await helper.defineToken();  
            let lang = await helper.defineLang(); 

            let body  =  {
                order_id: id , 
            }

            let response =  await helper.api(token,{lang},"/index.php?route=japi").post("/order/detail" ,  body ); 

            if(!response.data.result)return ; 

            let orderDetails =  response.data.order ; 

            runInAction(()=>{
                this.orderDetails =  orderDetails ; 
            }); 
            
        } catch (error) {
            if(error) {
                console.log("error in getOrderDetails" , error);  
            }
        }
    }

    getOrderStatus = async () => {
        try {
            let token = await helper.defineToken();  
            let lang = await helper.defineLang(); 
            let response =  await helper.api(token,{lang},"/index.php?route=japi").get("/order/getOrderStatuses"  ); 

            console.log("response in getOrderStatusess" ,  response ); 

            if(response.data.result) 
            {
                runInAction(()=>{
                    this.videoOrderStatusArray = response.data.order_statuses ;  
                }); 
            }
        } catch (error) {
            if(error) console.log("error in get orderStatusess store" , error) ; 
            
        }
    }

    getStarOrders = async () => {
        try {

            let token = await helper.defineToken();  
            let lang = await helper.defineLang(); 


            let response = await helper.api(token, {lang}, "/index.php?route=japi").get("/order/vusale"); 

            console.log("response in get star orders****" , response ) ; 
            if(response.data.result) {
                let orders =  response?.data?.orders_for_stars ; 

                runInAction(()=>{
                    this.starVideoOrders =  orders ;  
                }); 
            }
        } catch (error) {
            console.log("error in getting star orders"  , error ) ; 
            
        }
    }

}

const orderStore =  new OrderStore(); 

export default orderStore ; 