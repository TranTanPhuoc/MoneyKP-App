import {  Text, SafeAreaView, TouchableOpacity, TextInput,View, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/FotgotPasswordStyles";
import { AntDesign, Entypo, Feather, FontAwesome5} from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
// Import FireBase
import{initializeAuth,sendPasswordResetEmail,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { Alert } from 'react-native';

function ForgotPassword(){
    const navigation = useNavigation();
    const [email,setEmail] = useState("");
    const [loading,setisLoading] = useState(false);
    const hanldPressRegister = () => {
        navigation.navigate("Register");
    };
    const hanldPressLogin = () => {
        navigation.navigate("Login");
    };

    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const hanldPressSendEmail = ()=>{
        setisLoading(true);
        if(email == ""){
            setisLoading(false);
            Alert.alert("Thông báo","Email không được rỗng");
        }
        else if(regexEmail.test(email)){
            sendPasswordResetEmail(auth,email).then(()=>{
                setisLoading(false);
                Alert.alert("Thông báo","Link reset đã gởi về email của bạn");
                navigation.navigate("Login");
            }).catch((err)=>{
                console.log(err);
                setisLoading(false);
                Alert.alert("Thông báo","Xảy ra lỗi");
            });
        }
        else{
            setisLoading(false);
            Alert.alert("Thông báo","Email của bạn không hợp lệ")
        }
       
    }
    return(
        <>
        {loading && 
            <SafeAreaView style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <ActivityIndicator color='#16C0E5' size='large' />
            </SafeAreaView>
        }
        {(loading==false) &&
            <SafeAreaView style={styles.container} >
                <View style={styles.containerTop}>
                    <TouchableOpacity onPress={hanldPressLogin} style={{flex:0.2,justifyContent:'center',}}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:24,}}>Quên mật khẩu</Text>
                    </View>
                    <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                    </View>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.containerInput}>
                        <View style={{flex:0.15,alignItems:'center'}}>
                            <Feather name="mail" size={26} color="black" />
                        </View>
                        <TextInput onChangeText={x=>setEmail(x)} value={email} placeholder="Vui lòng nhập Email" style={{marginRight:15,height:50,fontSize:22,flex:0.85}}/>
                    </View>
                    <View style={styles.containerBottom}>
                        <TouchableOpacity onPress={hanldPressSendEmail} style={styles.bottom} >
                            <Text style={{fontSize:22, color:'#fff',fontWeight:'bold'}}> Lấy mật khẩu </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerFooter}>
                    <View style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'row',}}>
                        <TouchableOpacity  style={{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:"#DCDCDC"}} >
                                <Image source={require('../../../assets/icons/google.png')}/>
                        </TouchableOpacity>
                        <View style={{marginRight:20,}}></View>
                        <TouchableOpacity  style={{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:"#DCDCDC"}} >
                                <Image source={require('../../../assets/icons/facebook.png')}/>
                        </TouchableOpacity>
                        <View style={{marginRight:20,}}></View>
                        <TouchableOpacity  style={{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:"#DCDCDC"}} >
                                <Image source={require('../../../assets/icons/twitter.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'row',marginTop:20,}}>
                            <Text style={{fontSize:20,marginRight:10,}}>Chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={hanldPressRegister}>
                                <Text style={{fontSize:22,color:'#F4A460',fontWeight:'bold'}}>Đăng ký</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        }
        </>
    );
}

  
export default ForgotPassword;