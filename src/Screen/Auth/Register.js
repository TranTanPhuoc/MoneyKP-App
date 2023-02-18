import {  Text, SafeAreaView, TouchableOpacity, TextInput,View, Alert,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/RegisterStyles";
import { AntDesign, Entypo, Feather, FontAwesome5} from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
import axios from 'axios';
// Import FireBase
import{initializeAuth,createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
function Register(){
    const navigation = useNavigation();
    const [isPassword,setPassword] = useState(true);
    const [isPasswordConfirm,setisPasswordConfirm] = useState(true);
    const [email,setEmail] = useState("");
    const [userName,setuserName] = useState("");
    const [passWord,setPassWord] = useState("");
    const [passWordConfirm,setPasswordConfirm] = useState("");
    const [loading,setisLoading] = useState(false);
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

    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Đăng ký
    const hanldPressRegister = ()=>{
        setisLoading(true);
        if(email == ""){
            setisLoading(false);
            Alert.alert("Thông báo","Email không được rỗng")
        }
        else {
            if(!regexEmail.test(email)&& passWord == passWordConfirm || !regexEmail.test(email)&& passWord != passWordConfirm){
                setisLoading(false);
                Alert.alert("Thông báo","Email không hợp lệ")
            }
            else if(regexEmail.test(email) && passWord != passWordConfirm) {
                setisLoading(false);
                Alert.alert("Thông báo","Mật khẩu xác nhận không giống với mật khẩu trên")
            }
            else if(regexEmail.test(email) && passWord == "") {
                setisLoading(false);
                Alert.alert("Thông báo","Mời bạn nhập mật khẩu")
            }
            else 
            {
                createUserWithEmailAndPassword(auth,email,passWord)
                .then((userCredential)=>{
                    setisLoading(false);
                    var user = userCredential.user;
                    sendEmailVerification(user);
                    const accessToken =`Bearer ${userCredential.user.stsTokenManager.accessToken}`;
                    var urlImage = "https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/08/anh-avatar-viet-nam-cute-ngau-tuyet-dep-1.jpg"
                    axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/user',
                    {
                        id : userCredential.user.uid, name: userName,email: userCredential.user.email, urlPic : urlImage
                    },
                    {
                        headers:{
                            authorization: accessToken 
                        }
                    }
                    ).then(()=>{
                        const dataListJar = [
                            {
                                userId:  userCredential.user.uid,
                                name: "Cần thiết",
                                precent: 50,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            },
                            {
                                userId:  userCredential.user.uid,
                                name: "Giáo dục",
                                precent: 10,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            },
                            {
                                userId:  userCredential.user.uid,
                                name: "Tiết kiệm",
                                precent: 15,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            },
                            {
                                userId:  userCredential.user.uid,
                                name: "Hưởng thụ",
                                precent: 10,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            },
                            {
                                userId:  userCredential.user.uid,
                                name: "Đầu tư",
                                precent: 10,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            },
                            {
                                userId:  userCredential.user.uid,
                                name: "Từ thiện",
                                precent: 5,
                                availableBalances: 0,
                                totalSpending: 0,
                                totalIncome: 0,
                                type: 1
                            }
                        ]
                        axios({
                            url:'http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/create-list-basket',
                            method:'POST',
                            headers:{
                                authorization: accessToken 
                            },
                            data: dataListJar
                        }
                        ).then(()=>{
                        }).catch((err)=>{
                            console.log(err)
                        });
                    }).catch((err)=>{
                        console.log(err)
                    });
                    
                    Alert.alert("Thông báo",`Đăng ký thành công ! ${'\n'}Mời bạn kiểm tra email để xác nhận`);
                    setEmail("");
                    setPassWord("");
                    setPasswordConfirm("");
                    navigation.navigate("Login");
                })
                .catch(error =>{
                    console.log(error);
                    setisLoading(false);
                    Alert.alert("Thông báo","Xảy ra lỗi! \n Mời bạn nhập lại tài khoản và mật khẩu")
                })
            }
        }
    }
    return(
        <>
        {loading && 
            <SafeAreaView style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <ActivityIndicator color='#16C0E5' size='large' />
            </SafeAreaView>
        }
        {(loading == false) &&
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
                            <Feather name="user" size={26} color="black" />
                        </View>
                        <TextInput onChangeText={x=>setuserName(x)} value={userName} placeholder="Vui lòng nhập tên người dùng" style={{marginRight:15,height:50,fontSize:22,flex:0.85}}/>
                    </View>
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
    }
        </>
    );
}

export default Register;