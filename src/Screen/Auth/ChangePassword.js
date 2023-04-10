import { Text, SafeAreaView, TouchableOpacity, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/RegisterStyles";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
import axios from 'axios';
// Import FireBase
import { initializeAuth, sendPasswordResetEmail, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
function ChangePassword() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [loading, setisLoading] = useState(false);
    const hanldPressLogin = () => {
        navigation.goBack();
    };

    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const hanldPressSendEmail = () => {
        setisLoading(true);
        if (email == "") {
            setisLoading(false);
            Alert.alert("Thông báo", "Email không được rỗng");
        }
        else if (regexEmail.test(email)) {
            sendPasswordResetEmail(auth, email).then(() => {
                setisLoading(false);
                Alert.alert("Thông báo", "Link đổi mật khẩu đã gởi về email của bạn", [
                    {
                        text: "Thoát ra màn hình Login", onPress: () => {
                            navigation.navigate("Login");
                        }
                    },
                    {
                        text: "Giữ đăng nhập", onPress: () => {
                            navigation.goBack();
                        }
                    }
                ]);

            }).catch((err) => {
                console.log(err);
                setisLoading(false);
                Alert.alert("Thông báo", "Xảy ra lỗi");
            });
        }
        else {
            setisLoading(false);
            Alert.alert("Thông báo", "Email của bạn không hợp lệ")
        }
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
                        <TouchableOpacity onPress={hanldPressLogin} style={{ flex: 0.2, justifyContent: 'center', }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, }}>Đổi mật khẩu</Text>
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
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={hanldPressSendEmail} style={styles.bottom} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xác nhận </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            }
        </>
    );
}

export default ChangePassword;