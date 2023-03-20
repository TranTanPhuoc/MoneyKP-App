import { Button, DatePickerAndroid, ScrollView, View } from 'react-native';
import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import styles from "./styles/HistoryStyles";
import { AntDesign, } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
// Import FireBase
import { initializeAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useSelector } from 'react-redux';
import axios from 'axios';

function HistoryOther({ navigation, route }) {
    const { id, name } = route.params;
    const [dataHistory, setdataHistory] = useState([]);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [statusItem, setstatusItem] = useState(0);
    const [colorItem0, setColoritem0] = useState(colorJar[5]);
    const [colorItem1, setColoritem1] = useState("#fff");
    const hanldPressStatus0 = () => {
        setstatusItem(0);
        setColoritem0(colorJar[5]);
        setColoritem1("#fff");
    }
    const hanldPressStatus1 = () => {
        setstatusItem(1);
        setColoritem0("#fff");
        setColoritem1(colorJar[5]);
    }
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                setdataHistory(res.data.map((item) => {
                    var objtemp = {
                        id: item.id, name: item.name, population: item.precent, userId: item.userId,
                        precent: item.precent, totalIncome: item.totalIncome, totalSpending: item.totalSpending,
                        availableBalances: item.availableBalances, moneyPurpose: item.moneyPurpose,
                        datedComplete: item.datedComplete, createdDate: item.createdDate, status: item.status
                    };
                    return objtemp;
                }));
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload])
    return (
        <SafeAreaView style={styles.container} >
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
                        Danh sách mục {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                {
                    id != 4 &&
                    <View style={{ backgroundColor: colorItem0, height: 40, width: "100%", display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={hanldPressStatus0} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, }}>Chưa hoàn thành</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldPressStatus1} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: colorItem1 }}>
                            <Text style={{ fontSize: 16, }}>Hoàn thành</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    dataHistory.map((item, index) => {
                        if (item != null && item.status == statusItem) {
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    navigation.navigate("Detail", {
                                        id: id, name: name, itemName: item.name, money: item.availableBalances, idJar: item.id,
                                        moneyPurpose: item.moneyPurpose, availableBalances: item.availableBalances, status: item.status
                                    });
                                }} style={styles.buttomItem}>
                                    <View
                                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginLeft: 10, marginRight: 10 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                            <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/money.png')} />
                                            </View>
                                            <Text style={{ fontSize: 24, marginLeft: 15, fontWeight: 'bold', marginRight: 15, }}> {item.name}</Text>
                                            {
                                                id != 4 && (item.status == 1 || item.moneyPurpose == item.availableBalances) &&
                                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/checked.png')} />
                                            }
                                        </View>
                                        <Text style={{ fontSize: 20, marginRight: 10 }}>{moneyFormat(item.availableBalances)}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })
                }
            </ScrollView>

        </SafeAreaView>
    );
}


export default HistoryOther;