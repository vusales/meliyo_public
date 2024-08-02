import {  makeAutoObservable, runInAction } from 'mobx';
import helper from '../helpers/helper';
import DeviceInfo from 'react-native-device-info';


class RegisterDeviceStore  {
    uniqueId = "" ;
    deviceOs = "" ; 

    constructor() {
        makeAutoObservable(this);
    }

    // get device info when app is loaded 
    getDeviceInfo = async () => {
        try {
            let os = ""  ; 
            let deviceId =   DeviceInfo.getDeviceId() ; 

            await DeviceInfo.getBaseOs().then((baseOs) => { 
                os = baseOs ;  
            });

            runInAction(()=>{
                this.uniqueId = deviceId ;
                this.deviceOs = os ; 
            }); 

        } catch (error) {
            if(error){
                console.log("error when getting devive info"  ,  error ); 
            }
        }
    }

    registerDevice = async () => {
        try {
            // first of all get info about device 
            await this.getDeviceInfo(); 

            let data =  {
                "unique_id": this.uniqueId ,
                "info":{
                    "os_system": this.deviceOs
                }
            }

            let response  =  await helper.api().post( "/registerDevice" ,  data ); 
          
            if(response.data.device_id) {
                // if result true, write device id to asyncstore 
                await helper.writeAsyncStroga("@device_id" , response.data.device_id  );
                // get token for headers and write to asyncstore
                await this.getdeviceToken(); 
            }

        } catch (error) {
            if(error) {
                console.log("device register error"  ,  error ); 
            }
        }
    }

    validateToken =  async  () => {
        try {
            // let device_token =  await this.getdeviceToken(); 
            let device_token =  await helper.getdataFromAsyncStorage("@device_token"); 

            if(!device_token)  {
                return false ; 
            }
            let data = {
                "token" : device_token , 
            }; 
            const response =  await helper.api().post("/validateToken" , data );
            console.log("validation" , response );  
            return response.data.result ; 
        } catch (error) {
            if(error){
                console.log("error when validate Token"  ,  error ); 
            }
        }
    }

    getdeviceToken = async () => {
        try {
            await this.getDeviceInfo(); 
            let device_id =  await helper.getdataFromAsyncStorage("@device_id"); 
            if(!device_id || !this.uniqueId ) {
                return "" ; 
            }
            let data =  {
                "device_id": device_id,
                "unique_id": this.uniqueId ,  
            }
            let response = await helper.api().post("/getDeviceToken" , data ) ; 
             
            if (response.data.result) {
                if(!response.data.token) {
                    return false ; 
                }
                // write device token  to asyncstore
                await helper.writeAsyncStroga("@device_token" , response.data.token); 
                console.log("device_token" ,response.data.token  );  
                return response.data.token ; 
            }else {
                return  "" ; 
            }
        } catch (error) {
            if(error){
                console.log("error when getting device Token"  ,  error ); 
            }
        }
    }

}

const RegisterDevice =  new RegisterDeviceStore() ; 

export default RegisterDevice ;
