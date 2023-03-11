import { Text, SafeAreaView, TouchableOpacity, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/LoginStyles";
import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
// Import FireBase
import { initializeAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";

import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { reload_IU } from '../../redux/action/ActionRedux';

function Login() {
    const navigation = useNavigation();
    const [isPassword, setPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const dispatch = useDispatch();

    const [loading, setisLoading] = useState(false);
    const hanldPressRegister = () => {
        navigation.navigate("Register");
    };
    const hanldPressForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    };
    // Hiện, ẩn mật khẩu
    const hanldPress = () => {
        if (isPassword) {
            setPassword(false);
        } else {
            setPassword(true);
        }
    };

    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    // Đăng nhập
    const hanldPressLogin = () => {
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, passWord)
            .then((result) => {
                if (!result.user.emailVerified) {
                    setisLoading(false);
                    alert("Email chưa được xác thực vui lòng kiểm tra hộp thư của bạn");
                    return;
                }
                setisLoading(false);
                const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
                console.log(accessToken);
                navigation.navigate("Tabs");
                dispatch(reload_IU(1));
            })
            .catch(error => {
                setisLoading(false);
                Alert.alert("Thông báo", "Tài khoản không chính xác \n Mời bạn nhập lại tài khoản và mật khẩu");
                console.log(error);
            })
    }
    return (
        <>
            {loading &&
                <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator color='#16C0E5' size='large' />
                </SafeAreaView>
            }
            {(loading == false) &&
                <SafeAreaView style={styles.container} >
                    <View style={styles.containerTop}>
                        <TouchableOpacity onPress={hanldPressRegister} style={{ flex: 0.2, justifyContent: 'center', }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, }}>Đăng nhập</Text>
                        </View>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                    </View>
                    <View style={styles.containerBody}>
                        <View style={styles.containerInput}>
                            <View style={{ flex: 0.15, alignItems: 'center' }}>
                                <Feather name="mail" size={22} color="black" />
                            </View>
                            <TextInput onChangeText={x => setEmail(x)} value={email} placeholder="Vui lòng nhập Email" style={{ marginRight: 15, height: 50, fontSize: 16, flex: 0.85 }} />
                        </View>
                        <View style={styles.containerInput}>
                            <View style={{ flex: 0.15, alignItems: 'center', }}>
                                <FontAwesome5 name="keyboard" size={22} color="black" />
                            </View>
                            <TextInput onChangeText={x => setPassWord(x)} value={passWord} secureTextEntry={isPassword} placeholder="Vui lòng nhập mật khẩu" style={{ height: 50, fontSize: 16, flex: 0.7 }} />
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flex: 0.15 }} onPress={hanldPress}>
                                {
                                    (isPassword) ? <Entypo name="eye" size={22} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', width: "85%", marginTop: 20, }}>
                            <TouchableOpacity onPress={hanldPressForgotPassword}>
                                <Text style={{ color: "#FF8247", fontSize: 18, fontWeight: 'bold' }}>Quên mật khẩu? </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={hanldPressLogin} style={styles.bottom} >
                                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}> Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerFooter}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', }}>
                            <TouchableOpacity style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: "#DCDCDC" }} >
                                <Image source={require('../../../assets/icons/google.png')} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>
                            <View style={{ marginRight: 20, }}></View>
                            <TouchableOpacity style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: "#DCDCDC" }} >
                                <Image source={require('../../../assets/icons/facebook.png')} />
                            </TouchableOpacity>
                            <View style={{ marginRight: 20, }}></View>
                            <TouchableOpacity style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: "#DCDCDC" }} >
                                <Image source={require('../../../assets/icons/twitter.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', marginTop: 20, }}>
                            <Text style={{ fontSize: 16, marginRight: 10, }}>Chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={hanldPressRegister}>
                                <Text style={{ fontSize: 20, color: '#F4A460', fontWeight: 'bold' }}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            }
        </>
    );
}


export default Login;