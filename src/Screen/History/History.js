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
import SelectDropdown from 'react-native-select-dropdown';

function History({ navigation, route }) {
    const { id, name, year, month, typeBasket } = route.params;
    const [idJar, setIdJar] = useState(id);
    const [dataHistory, setdataHistory] = useState([]);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const dataTK = ['Tất cả', 'Thu nhập', 'Chi tiêu'];
    const [valuesDefaut, setvaluesDefaut] = useState("Hình thức");
    const [typeID, settypeID] = useState(null);
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataJar, setDataJar] = useState([]);
    const [valuesDefautJar, setvaluesDefautJar] = useState("");
    const [dataJarTemp, setdataJarTemp] = useState([]);
    useEffect(() => {
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-type-and-type-basket',
            {
                userId: idUser,
                year: year,
                basketId: idJar,
                month: month,
                type: typeID,
                typeBasket: typeBasket,
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
                if (res.data.length > 0) {
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
                            name: name,
                            nameBasket : item.nameBasket
                        };
                        return obj;
                    }));
                } else {
                    setdataHistory([]);
                }
            }).catch((err) => {
                console.log(err);
            });

    }, [idReload, typeID, idJar])

    useEffect(() => {
        if (idJar == null) {
            axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
                monthNumber: parseInt(month),
                yearNumber: parseInt(year)
            },
                {
                    headers: { authorization: accessToken },
                })
                .then((res) => {
                    const listall = ["Tất cả"];
                    setDataJar([...listall, ...res.data.map((item, index) => {
                        var obj = item.name;
                        return obj;
                    })]);
                    setdataJarTemp(res.data.map((item) => {
                        var objtemp = { id: item.id, name: item.name, population: item.precent, userId: item.userId, precent: item.precent, totalIncome: item.totalIncome, totalSpending: item.totalSpending, availableBalances: item.availableBalances };
                        return objtemp;
                    }));
                    setIdJar(null);
                    setvaluesDefautJar("Chọn lọ");
                });
        }
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
                <View style={styles.containerItem}>
                    <SelectDropdown
                        data={dataTK}
                        defaultButtonText={valuesDefaut}
                        buttonTextStyle={{ fontSize: 16, }}
                        onSelect={(selectedItem, index) => {
                            setvaluesDefaut(selectedItem);
                            index == 0 ? settypeID(null) :
                                index == 1 ? settypeID(1) : settypeID(-1);
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'filter' : 'filter'} color={'black'} size={16} />;
                        }}
                        renderCustomizedButtonChild={value => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16 }}>{valuesDefaut}</Text>
                                </View>
                            );
                        }}
                        buttonStyle={styles.containerSelectDropDown}
                    />
                    {
                        id == null &&
                        <SelectDropdown
                            data={dataJar}
                            defaultButtonText={valuesDefautJar}
                            buttonTextStyle={{ fontSize: 16, }}
                            onSelect={(selectedItem, index) => {
                                setvaluesDefautJar(selectedItem);
                                index == 0 ? setIdJar(null) :
                                    dataJarTemp.map((item, index) => {
                                        if (selectedItem == item.name) {
                                            setIdJar(item.id)
                                        }
                                    })

                            }}
                            renderDropdownIcon={isOpened => {
                                return <AntDesign name={isOpened ? 'filter' : 'filter'} color={'black'} size={16} />;
                            }}
                            renderCustomizedButtonChild={value => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                        <Text style={{ fontSize: 16 }}>{valuesDefautJar}</Text>
                                    </View>
                                );
                            }}
                            buttonStyle={styles.containerSelectDropDown}
                        />
                    }

                </View>

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
                                    <Text> {item.nameBasket}</Text>
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