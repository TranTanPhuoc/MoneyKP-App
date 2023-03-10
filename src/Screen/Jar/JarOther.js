import { ScrollView, View } from 'react-native';
import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import styles from "./styles/JarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
// Import FireBase
import { initializeAuth, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { reload_IU } from '../../redux/action/ActionRedux';
import { Modal } from 'react-native';
import { useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

function JarOther({ navigation, route }) {
    const { id, name } = route.params;
    const [JarOther, setJarOther] = useState("");
    const [money, setMoney] = useState("");
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [dateGD, setDate] = useState(selectedDate);
    const [dateNote, setdateNote] = useState(selectedDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    const hanldhanldAddJarOther = () => {
        if (id == 4) {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket',
                {
                    userId: idUser,
                    name: JarOther,
                    precent: 0,
                    availableBalances: money,
                    totalSpending: 0,
                    totalIncome: 0,
                    type: id,
                    status: 0,
                    moneyPurpose: 999999999999999,
                },
                {
                    headers: {
                        authorization: accessToken
                    }
                }).then((res) => {
                    dispatch(reload_IU(idReload + 1));
                    Alert.alert("Th??ng b??o", "Th??m th??nh c??ng");
                    navigation.goBack();

                }).catch((err) => {
                    console.log(err);
                })
        }
        else {
            const date = new Date(dateGD);
            if (selectedDate.getTime() <= date.getTime()) {
                axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket',
                    {
                        userId: idUser,
                        name: JarOther,
                        precent: 0,
                        availableBalances: 0,
                        totalSpending: 0,
                        totalIncome: 0,
                        type: id,
                        status: 0,
                        moneyPurpose: money,
                        datedComplete: dateGD,
                        createdDate: selectedDate
                    },
                    {
                        headers: {
                            authorization: accessToken
                        }
                    }).then((res) => {
                        dispatch(reload_IU(idReload + 1));
                        Alert.alert("Th??ng b??o", "Th??m th??nh c??ng");
                        navigation.goBack();

                    }).catch((err) => {
                        console.log(err);
                    })
            }
            else {
                Alert.alert("Th??ng b??o", "Ng??y ho??n th??nh ph???i sau ng??y hi???n t???i ho???c b???ng ng??y hi???n t???i");
            }
        }
    }
    useEffect(() => {
        if (dateGD != "") {
            const newDate = new Date(dateGD);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        }
    }, [dateGD]);

    const onDateChange = (date) => {
        setDate(date);
        setModalVisible(!modalVisible);
    }
    return (
        <SafeAreaView style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CalendarPicker onDateChange={onDateChange}>
                        </CalendarPicker>
                    </View>
                </View>
            </Modal>
            <View style={styles.containerheader}>
                <View style={styles.containerheader_icon}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerheader_title}>
                    <Text style={styles.fontTitle}>
                        Th??m m???c {name} m???i
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <View style={styles.viewBody}>
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/icons/jar.png')} />
                </View>
                <View style={{ flex: 0.85, justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                    <TextInput value={JarOther} onChangeText={x => setJarOther(x)} style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, fontSize: 16, }} placeholder='Nh???p t??n m???c c???n th??m' />
                </View>
            </View>
            <View style={styles.viewBody}>
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/icons/wallet.png')} />
                </View>
                <View style={{ flex: 0.85, justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                    <TextInput keyboardType='number-pad' value={money} onChangeText={x => setMoney(x)} style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, fontSize: 16, }} placeholder='Nh???p ti???n' />
                </View>
            </View>
            {
                id != 4 &&
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewBody}>
                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/icons/calendar.png')} />
                    </View>
                    <View style={{ flex: 0.85, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, width: "100%", display: 'flex', flexDirection: 'row' }}>
                            <View style={{ flex: 0.8, width: "100%", justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, }}>{dateNote}</Text>
                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../../assets/icons/reset.png')} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            }
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={hanldhanldAddJarOther} style={styles.buttonStyle}>
                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Th??m</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


export default JarOther;