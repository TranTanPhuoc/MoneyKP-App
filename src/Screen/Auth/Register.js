import {  Text, SafeAreaView, TouchableOpacity, TextInput,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/RegisterStyles";
import { AntDesign, Entypo, Feather, FontAwesome5} from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
function Register(){
    const navigation = useNavigation();
    const [isPassword,setPassword] = useState(true);
    const [isPasswordConfirm,setisPasswordConfirm] = useState(true);
    const [email,setEmail] = useState("");
    const [passWord,setPassWord] = useState("");
    const [passWordConfirm,setPasswordConfirm] = useState("");
    
    const hanldPressLogin = () => {
        navigation.navigate("Login");
    };
    // Hiện, ẩn mật khẩu
    const hanldPress = () => {
        if(isPassword){
            setPassword(false);
        }else{
            setPassword(true);
        }
    };
    const hanldPressPassConfirm = () => {
        if(isPasswordConfirm){
            setisPasswordConfirm(false);
        }else{
            setisPasswordConfirm(true);
        }
    };
    const hanldPressConfirm = () => {
        if(isPassword){
            setPassword(false);
        }else{
            setPassword(true);
        }
    };
    // Đăng ký
    const hanldPressRegister = ()=>{
        
    }
    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.containerTop}>
                <TouchableOpacity onPress={hanldPressLogin} style={{flex:0.2,justifyContent:'center',}}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <View style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:24,}}>Đăng ký</Text>
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
                <View style={styles.containerInput}>
                    <View style={{flex:0.15,alignItems:'center',}}>
                        <FontAwesome5 name="keyboard" size={24} color="black" />
                    </View>
                    <TextInput onChangeText={x=>setPassWord(x)} value={passWord} secureTextEntry={isPassword}  placeholder="Vui lòng nhập mật khẩu" style={{height:50,fontSize:22,flex:0.7}}/>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:0.15}} onPress={hanldPress}>
                        {
                            (isPassword)? <Entypo name="eye" size={24} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInput}>
                    <View style={{flex:0.15,alignItems:'center',}}>
                        <FontAwesome5 name="keyboard" size={24} color="black" />
                    </View>
                    <TextInput onChangeText={x=>setPasswordConfirm(x)} value={passWordConfirm} secureTextEntry={isPasswordConfirm}  placeholder="Vui lòng xác nhận lại mật khẩu" style={{height:50,fontSize:22,flex:0.7}}/>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:0.15}} onPress={hanldPressPassConfirm}>
                        {
                            (isPasswordConfirm)? <Entypo name="eye" size={24} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom} >
                        <Text style={{fontSize:22, color:'#fff',fontWeight:'bold'}}> Đăng ký</Text>
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
                        <Text style={{fontSize:20,marginRight:10,}}>Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={hanldPressLogin}>
                            <Text style={{fontSize:22,color:'#F4A460',fontWeight:'bold'}}>Đăng nhập</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Register;