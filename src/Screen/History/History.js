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

function History({ navigation, route }) {
    const { id, name,year,month } = route.params;

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
    useEffect(() => {
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-type-and-type-basket',
            {
                userId: idUser,
                year: year,
                basketId: id,
                month: month,
                type: null,
                typeBasket: 1,
                pageSize: 1000,
                pageNumber: 0,
                sort: [
                    {
                        key: "createDate", // sort theo createDate
                        asc: false // thứ tự lớn trước nhỏ sau
                    }
                ]

            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setdataHistory(res.data.map((item, index) => {
                    var obj = {
                        basketId: item.basketId,
                        createDate: item.createDate,
                        id: item.id,
                        moneyTransaction: item.moneyTransaction,
                        note: item.note,
                        type: item.type,
                        userId: item.userId,
                        color: colorJar[0],
                        name: name
                    };
                    return obj;
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
                        Xem lịch sử lọ {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                
                {
                    dataHistory.map((item, index) => {
                        const date = new Date(item.createDate);
                        return (
                            <View key={index} style={styles.containerItem}>
                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: item.color, height: 50, width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/icons/jar.png')} style={{ tintColor: '#000' }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.45, }}>
                                    <View style={{ marginBottom: 10, }}>
                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.note}</Text>
                                    </View>
                                    {
                                        (item.type == 1) ? <Text>Thu nhập</Text> : <Text>Chi tiền</Text>
                                    }
                                </View>
                                <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    {
                                        (item.type == 1) ?
                                            <Text style={{ color: '#339900', fontSize: 16, fontWeight: 'bold' }}>+ {moneyFormat(item.moneyTransaction)}</Text> :
                                            <Text style={{ color: '#EE0000', fontSize: 16, fontWeight: 'bold' }}>- {moneyFormat(item.moneyTransaction)}</Text>
                                    }
                                    <Text style={{ color: '#000', fontSize: 13, marginTop: 10, }}>{date.toLocaleDateString('VN', { second: '2-digit', minute: '2-digit', hour: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>

        </SafeAreaView>
    );
}


export default History;