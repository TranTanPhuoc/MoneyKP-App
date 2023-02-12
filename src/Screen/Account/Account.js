import {  Text, SafeAreaView, ScrollView, View,Image, Alert, Modal, Dimensions} from 'react-native';
import styles from "./styles/AccountStyles";
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// Import FireBase
import{signOut,initializeAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { Platform } from 'react-native';
function Account({navigation}){
    
    const hanldPressUpdateInfo = ()=>{
        navigation.navigate("User");
    }
    const hanldInfo = ()=>{
        var mess = `Phần mềm: KPMoney \nPhiên bản : 1.0.0 \n${Platform.OS === "android" ? 'Thiết bị : Android \n':'Thiết bị : Iphone \n'}Phiên bản điện thoại: ${Platform.Version}`;
        Alert.alert("Thông tin",mess);
    }
    const hanldPressExit = () =>{
        // Connect FireBase
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app,{
        });
        signOut(auth).then(()=>{
            navigation.navigate("Login");
        }).catch((err)=>{
            console.log("Lỗi")
        })
    }
    const handSetPercentJar = () =>{
        navigation.navigate("SetPercentJar");
    }
    return(
        <SafeAreaView style={styles.container} >
            <ScrollView  style={styles.scrollview}>
                <View style={styles.containerTop}>
                    <View style={styles.containerTopImage}>
                        <Image source={{uri:'https://res.cloudinary.com/drljnqaai/image/upload/v1671783897/KhoaLuan/313270093_816356566288400_2893180884073968601_n.jpg_gufop7.jpg'}} style={{height:60,width:60,borderRadius:40,}}/>
                    </View>
                    <View style={styles.containerTopName}>
                        <View style={{flex:0.8,justifyContent:'center'}}>
                            <Text style={{color:'#000',fontSize:24,fontWeight:'bold'}}>Trần Tấn Phước </Text>
                        </View>
                        <View style={{flex:0.2,justifyContent:'flex-end'}}>
                            <Text style={{color:'#000',fontSize:18,}}>Tài khoản thường</Text>
                        </View>
                        
                    </View>
                    <TouchableOpacity onPress={hanldPressExit} style={styles.containerTopIcon}>
                        <Image style={{tintColor:'red',height:24,width:24}} source={require('../../../assets/icons/logout.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{borderWidth:1,marginTop:10,borderColor:"grey",borderRadius:10,}}></View>
                <TouchableOpacity onPress={hanldPressUpdateInfo} style={styles.containerEditInfo}>
                    <Text style={{fontSize:20,}}>Sửa thông tin cá nhân</Text>
                    <AntDesign name="right" size={15} color="#000" />
                </TouchableOpacity>
                <View style={{borderWidth:1,marginTop:10,borderColor:"grey",borderRadius:10,}}></View>
                <View style={styles.containerPrInfo}>
                    <TouchableOpacity style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center',}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/usericon.png')} style={{tintColor:'#000'}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Mã của bạn</Text>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>VK3XRC</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/share.png')} style={{tintColor:'#000',height:28,width:28}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Nhập mã giới thiệu</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerPrInfo1}>
                    <TouchableOpacity style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center',}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/grid_view.png')} style={{tintColor:'#000',height:28,width:28}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Cài đặt chung</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center',}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/currency.png')} style={{tintColor:'#000',height:28,width:28}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Giao dịch định kỳ</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handSetPercentJar} style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center',}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/settingsicon.png')} style={{tintColor:'#000',height:28,width:28}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Thiết lập các hủ</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerPrInfo2}>
                    <TouchableOpacity  onPress={hanldInfo}  style={styles.containerPrInfoItem}>
                        <View style={{flex:0.2,height:"100%",justifyContent:'center',alignItems:'center',}}>
                            <View style={{height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../../assets/icons/info.png')} style={{tintColor:'#000',height:28,width:28}}/>
                            </View>
                        </View>
                        <View style={{flex:0.7,height:"100%",}}>
                            <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row',flex:1}}>
                                <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>Thông tin</Text>
                            </View>
                        </View>
                        <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                            <AntDesign name="right" size={14} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Account;