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
    const [monthR, setMonth] = useState(month);
    const [dataMonth, setDataMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    // Năm hiện tại
    const now = new Date(); // lấy thời gian hiện tại
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [yearR, setYear] = useState(year);
    const [dataYear, setDataYear] = useState([selectedDate.getFullYear() - 2, selectedDate.getFullYear() - 1, selectedDate.getFullYear()]);
    const [dataHistory, setdataHistory] = useState([]);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const dataTK = ['Tất cả', 'Thu nhập', 'Chi tiêu'];
    const [valuesDefaut, setvaluesDefaut] = useState("Loại");
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
                year: yearR,
                basketId: idJar,
                month: monthR,
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
                            nameBasket: item.nameBasket
                        };
                        return obj;
                    }));
                } else {
                    setdataHistory([]);
                    // Alert.alert("Thông báo","Không có dữ liệu");
                    // setMonth(now.getMonth()+1);
                    // setYear(now.getFullYear());
                }
            }).catch((err) => {
                console.log(err);
            });

    }, [idReload, typeID, idJar, monthR, yearR])

    useEffect(() => {
        if (idJar == null) {
            axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
                monthNumber: parseInt(monthR),
                yearNumber: parseInt(yearR)
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
            <View style={styles.viewBody}>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'center',marginLeft:10,marginRight:10}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Tháng: </Text>
                    <SelectDropdown
                        data={dataMonth}
                        defaultButtonText={monthR}
                        buttonTextStyle={{ fontSize: 16, }}
                        onSelect={(selectedItem, index) => {
                            const newDate = new Date(year, parseInt(selectedItem) - 1, 2);
                            if (now < newDate) {
                                Alert.alert("Thông báo", "Không có dữ liệu");
                            }
                            else {
                                setSelectedDate(newDate);
                                setMonth(parseInt(selectedItem));
                            }
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'down' : 'right'} color={'black'} size={16} />;
                        }}
                        renderCustomizedButtonChild={value => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16 }}>{monthR}</Text>
                                </View>
                            );
                        }}
                        buttonStyle={styles.containerSelectDropDown}
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, }}>, năm : </Text>
                    <SelectDropdown
                        data={dataYear}
                        defaultButtonText={yearR}
                        buttonTextStyle={{ fontSize: 16, }}
                        onSelect={(selectedItem, index) => {
                            const newDate = new Date(parseInt(selectedItem), month, 2);
                            if (now < newDate) {
                                Alert.alert("Thông báo", "Không có dữ liệu");
                            }
                            else {
                                setSelectedDate(newDate);
                                setYear(parseInt(selectedItem));
                            }
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'down' : 'right'} color={'black'} size={16} />;
                        }}
                        renderCustomizedButtonChild={value => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16 }}>{yearR}</Text>
                                </View>
                            );
                        }}
                        buttonStyle={styles.containerSelectDropDown}
                    />
                </View>
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
                <ScrollView style={{ flex: 1 }}>
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
                    {
                        dataHistory.length == 0 &&
                        <View style={{ justifyContent:'center',alignItems:'center',flex:1,marginTop:100}}>
                            <Text style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>Không có dữ liệu</Text>
                        </View>
                    }
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}


export default History;