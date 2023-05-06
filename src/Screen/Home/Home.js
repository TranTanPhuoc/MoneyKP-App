import { Text, SafeAreaView, ScrollView, View, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/HomeStyles";
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';
import 'intl/locale-data/jsonp/en';
import { AntDesign } from '@expo/vector-icons';
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
// Import FireBase
import { initializeAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { colorJar } from '../../../assets/AppColors/AppColors';
import { reload_IU } from '../../redux/action/ActionRedux';
import { Linking } from 'react-native';
import moment from 'moment-timezone';
import { Modal } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import SelectDropdown from 'react-native-select-dropdown';
function Home({ navigation }) {
    const { width } = Dimensions.get('window');
    const idReload = useSelector(state => state.reload.idReload);
    const [idIU, setIdIU] = useState(idReload);
    const [dataIncomeAndSpending, setdataIncomeAndSpending] = useState([]);
    const [totalIncome, settotalIncome] = useState(0);
    const [totalSpending, settotalSpending] = useState(0);
    const [avtPic, setavtPic] = useState("https://res.cloudinary.com/drljnqaai/image/upload/v1676181723/KhoaLuan/images_dcewqt.png");
    const [name, setName] = useState("");
    const [dataListJar, setdataListJar] = useState([]);
    const dispatch = useDispatch();
    const now = new Date(); // lấy thời gian hiện tại
    // Ngày hiện tại
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Tháng hiện tại
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [dataMonth, setDataMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    // Năm hiện tại
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [dataYear, setDataYear] = useState([selectedDate.getFullYear() - 2, selectedDate.getFullYear() - 1, selectedDate.getFullYear()]);
    const [labels, setlabels] = useState([["1", "2", "3", "4"]]);
    // Data biểu đồ cột của thu nhập
    const [datasets, setdatasets] = useState([400000, 813880, 0, 0,]);
    const [data, setdata] = useState({
        labels: ["1", "2", "3", "4"],
        datasets: [
            {
                data: [0, 0, 0, 0,],
            },
            {
                data: [0, 0, 0, 0,],
            },
        ],
    });
    const [moneyTransaction, setmoneyTransaction] = useState(0);
    const [loading, setisLoading] = useState(false);

    // const onDateChange = (date) => {
    //     const newDate = new Date(date);
    //     if (now < newDate) {
    //         setModalVisible(!modalVisible);
    //         Alert.alert("Thông báo", "Không có dữ liệu");
    //     }
    //     else {
    //         setSelectedDate(newDate);
    //         setModalVisible(!modalVisible);
    //         setMonth(newDate.getMonth() + 1);
    //         setYear(newDate.getFullYear());
    //     }
    // }

    // Data biểu đồ cột của chi tiêu
    const [datasets2, setdatasets2] = useState([0, 0, 0, 0,]);
    // Data biểu đồ tròn % các lọ
    const [dataPieChart, setdataPieChart] = useState([]);
    // Định dạng tiền tệ VNĐ
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const [dataHistory, setdataHistory] = useState([]);
    // Biểu đồ tròn
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        borderWidth: 0.5,
    };
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    // Data tổng chi tiêu và thu nhập
    useEffect(() => {
        setdataIncomeAndSpending(
            [
                { id: 1, name: 'Thu nhập', price: totalIncome -moneyTransaction, color: '#03fc41', icon: require('../../../assets/icons/add.png') },
                { id: 2, name: 'Chi tiêu', price: totalSpending-moneyTransaction, color: '#fc3030', icon: require('../../../assets/icons/minus.png') },
            ]
        )
    }, [totalIncome, totalSpending,moneyTransaction]);

    useEffect(() => {
        setisLoading(true);
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
            monthNumber: parseInt(month),
            yearNumber: parseInt(year)
        }, {
            headers: { authorization: accessToken },
        }).then((res) => {
            if (res.data.length == 0 && now > selectedDate) {
                Alert.alert("Thông báo", "Dữ liệu không tồn tại");
                setSelectedDate(now);
                setMonth(now.getMonth() + 1);
                setYear(now.getFullYear());
                setisLoading(false);
            }
            else if (res.data.length == 0) {
                if (month == 1) {
                    axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
                        monthNumber: 12,
                        yearNumber: parseInt(year - 1)
                    }, {
                        headers: { authorization: accessToken },
                    }).then((res) => {
                        const dataListJar = res.data.map((item, index) => {
                            var obj;
                            if (item.availableBalances >= 0) {
                                var obj = { userId: item.userId, name: item.name, precent: item.precent, availableBalances: item.availableBalances, totalSpending: 0, totalIncome: item.availableBalances, type: 1, monthNumber: month, yearNumber: year };
                            }
                            else {
                                var obj = { userId: item.userId, name: item.name, precent: item.precent, availableBalances: item.availableBalances, totalSpending: item.availableBalances, totalIncome: 0, type: 1, monthNumber: month, yearNumber: year };
                            }
                            return obj;
                        });
                        axios({
                            url: 'http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/create-list-basket',
                            method: 'POST',
                            headers: {
                                authorization: accessToken
                            },
                            data: dataListJar
                        }).then((res) => {
                            setisLoading(false);
                            dispatch(reload_IU(idReload + 1));
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else {
                    axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
                        monthNumber: parseInt(month - 1),
                        yearNumber: parseInt(year)
                    }, {
                        headers: { authorization: accessToken },
                    }).then((res) => {
                        const dataListJar = res.data.map((item, index) => {
                            var obj;
                            if (item.availableBalances >= 0) {
                                var obj = { userId: item.userId, name: item.name, precent: item.precent, availableBalances: item.availableBalances, totalSpending: 0, totalIncome: item.availableBalances, type: 1, monthNumber: month, yearNumber: year };
                            }
                            else {
                                var obj = { userId: item.userId, name: item.name, precent: item.precent, availableBalances: item.availableBalances, totalSpending: item.availableBalances, totalIncome: 0, type: 1, monthNumber: month, yearNumber: year };
                            }
                            return obj;
                        });

                        axios({
                            url: 'http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/create-list-basket',
                            method: 'POST',
                            headers: {
                                authorization: accessToken
                            },
                            data: dataListJar
                        })
                            .then((res2) => {
                                // res2.data.map((item, index) => {
                                //     if (item.availableBalances > 0) {
                                //         axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction',
                                //             {
                                //                 userId: idUser,
                                //                 basketId: item.id,
                                //                 createDate: now,
                                //                 moneyTransaction: parseFloat(dataListJar[index].availableBalances),
                                //                 type: 1,
                                //                 note: `Tiền dư của lọ ${item.name} tháng ${now.getMonth() - 1}`,
                                //                 typeBasket: 1,
                                //                 nameBasket: item.name
                                //             },
                                //             {
                                //                 headers: {
                                //                     authorization: accessToken
                                //                 }
                                //             }).then((res3) => {
                                //                 return;
                                //             })
                                //     }
                                //     else if (item.availableBalances < 0) {
                                //         axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction',
                                //             {
                                //                 userId: idUser,
                                //                 basketId: item.id,
                                //                 createDate: now,
                                //                 moneyTransaction: parseFloat(dataListJar[index].availableBalances),
                                //                 type: -1,
                                //                 note: `Tiền thiếu của lọ ${item.name} tháng ${now.getMonth() - 1}`,
                                //                 typeBasket: 1,
                                //                 nameBasket: item.name
                                //             },
                                //             {
                                //                 headers: {
                                //                     authorization: accessToken
                                //                 }
                                //             }).then((res3) => {
                                //                 return;
                                //             })
                                //     }
                                //     return;

                                // });
                                setisLoading(false);
                                dispatch(reload_IU(idReload + 1));
                            }).catch((err) => {
                                console.log(err);
                            });
                    }).catch((err) => {
                        console.log(err);
                    })
                }

            }
            if (res.data.length != 0) {
                setdataListJar(res.data);
                setdataPieChart(res.data.map((item, index) => {
                    let randomColor = colorJar[index]
                    var obj = { id: item.id, name: item.name, population: item.precent, color: randomColor, legendFontColor: '#000', legendFontSize: 15 };
                    return obj;
                }));
                var totalIncomeItem = 0;
                var totalSpendingItem = 0;
                res.data.map((item) => {
                    totalIncomeItem += item.totalIncome;
                })
                settotalIncome(totalIncomeItem);
                res.data.map((item) => {
                    totalSpendingItem += item.totalSpending
                })
                settotalSpending(totalSpendingItem);
                axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-value-toltal-income-tranferMoney`, {
                    userId: idUser,
                    month: parseInt(month),
                    year: parseInt(year),
                    typeBasket: 1,
                    pageSize: 1000,
                    pageNumber: 0
                }, {
                    headers: { authorization: accessToken },
                }).then((res) => {
                    setmoneyTransaction(parseInt(res.data));
                }).catch((err) => {
                    console.log(err);
                })
                setisLoading(false);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [idReload, month, year]);
    useEffect(() => {
        setisLoading(true);
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/user/${idUser}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                setName(res.data.name);
                setavtPic(res.data.urlPic);
                setisLoading(false);
                dispatch(reload_IU(idReload + 1));
            }).catch((err) => {
                console.log(err);
            })
    }, [idIU])
    useEffect(() => {
        setisLoading(true);
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
            {
                type: 1,
                userId: idUser,
                year: year,
                month: month,
                typeBasket: 1,
                isDay: false,
                isWeek: true,
            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setisLoading(false);
                setlabels(
                    res.data.map((item, index) => {
                        return `Tuần ${index + 1}`;
                    })
                );
                setdatasets(
                    res.data.map((item) => {
                        return parseInt(item);
                    })
                )
            }).catch((err) => {
                console.log(err);
            })
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
            {
                type: -1,
                userId: idUser,
                year: year,
                month: month,
                typeBasket: 1,
                isDay: false,
                isWeek: true,
            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setisLoading(false);
                setdatasets2(
                    res.data.map((item) => {
                        return parseInt(item);
                    })
                )
            }).catch((err) => {
                console.log(err);
            });
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-type-and-type-basket',
            {
                userId: idUser,
                year: year,
                basketId: null,
                month: month,
                type: null,
                typeBasket: 1,
                pageSize: 5,
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
                        name: name,
                        nameBasket: item.nameBasket,
                    };
                    return obj;
                }));
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload, month, year]);
    useEffect(() => {
        setdata({
            labels: labels,
            datasets: [
                {
                    data: datasets,
                    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                },
                {
                    data: datasets2,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
                },
            ],
        });
    }, [datasets, datasets2]);
    const chartConfig = {
        barPercentage: 0.5,
        categoryPercentage: 0.8,
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    };
    const hanldMyContract = () => {
        Linking.openURL('https://www.facebook.com/kiritokun.1125');
    }
    const [session, setsession] = useState("");
    const vietnamTime = moment().tz('Asia/Ho_Chi_Minh');
    useEffect(() => {
        const hour = vietnamTime.hour();
        if (hour >= 6 && hour < 12) {
            setsession('Chào buổi sáng !');
        } else if (hour >= 12 && hour < 18) {
            setsession('Chào buổi chiều!');
        } else if (hour >= 18 && hour < 24) {
            setsession('Chào buổi tối!');
        } else {
            setsession('Chào buổi khuya!');
        }
    }, [vietnamTime.hour()]);
    return (
        <>
            {loading &&
                <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator color='#16C0E5' size='large' />
                </SafeAreaView>
            }
            {(loading == false) &&


                <SafeAreaView style={styles.container} >
                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <CalendarPicker
                                    scrollable={true}
                                    onMonthChange={onDateChange}
                                    initialView='months'
                                    selectMonthTitle='Năm '
                                    months={["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]}
                                >
                                </CalendarPicker>
                            </View>
                        </View>
                    </Modal> */}
                    <ScrollView style={styles.scrollview}>
                        <View style={styles.containerTop}>
                            <View style={styles.containerTopImage}>
                                <Image source={{ uri: avtPic }} style={{ height: 60, width: 60, borderRadius: 40, }} />
                            </View>
                            <View style={styles.containerTopName}>
                                <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#000', fontSize: 16, }}>{session}</Text>
                                </View>
                                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
                                </View>
                            </View>
                            <View style={styles.containerTopIcon}>
                                <TouchableOpacity onPress={hanldMyContract} style={{ margin: 10, }}>
                                    <Image style={{ tintColor: '#000', height: 24, width: 24 }} source={require('../../../assets/icons/support.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView scrollEnabled={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={styles.containerInfoWallet}>
                            {
                                dataIncomeAndSpending.map((item, index) => {
                                    if (now.getMonth() + 1 == month) {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                index == 0 ?
                                                    navigation.navigate("Exchange", {
                                                        typeXL: 1
                                                    }) :
                                                    navigation.navigate("Exchange", {
                                                        typeXL: -1
                                                    });
                                            }} key={item.id} style={styles.containerItem}>
                                                <View style={styles.containerItemTop}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Image source={require('../../../assets/icons/wallet.png')} style={{ height: 20, width: 20, tintColor: item.color }} />
                                                        <Text style={{ color: '#000', fontSize: 16, marginLeft: 10, }}>{item.name}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={{ color: '#000', fontSize: 16, marginTop: 10, marginLeft: 10, marginRight: 10, }}>{moneyFormat(item.price)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }
                                    return <View key={item.id} style={styles.containerItem}>
                                        <View style={styles.containerItemTop}>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Image source={require('../../../assets/icons/wallet.png')} style={{ height: 20, width: 20, tintColor: item.color }} />
                                                <Text style={{ color: '#000', fontSize: 16, marginLeft: 10, }}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ color: '#000', fontSize: 16, marginTop: 10, marginLeft: 10, marginRight: 10, }}>{moneyFormat(item.price)}</Text>
                                        </View>
                                    </View>
                                })
                            }
                        </ScrollView>
                        <ScrollView scrollEnabled={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={styles.containerInfoWallet}>

                        </ScrollView>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Tháng: </Text>
                            <SelectDropdown
                                data={dataMonth}
                                defaultButtonText={month}
                                buttonTextStyle={{ fontSize: 16, }}
                                onSelect={(selectedItem, index) => {
                                    const newDate = new Date(year, parseInt(selectedItem) - 1, 2);
                                    // Chặn ngày tương lai tương lai
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
                                            <Text style={{ fontSize: 16 }}>{month}</Text>
                                        </View>
                                    );
                                }}
                                buttonStyle={styles.containerSelectDropDown}
                            />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, }}>, năm : </Text>
                            <SelectDropdown
                                data={dataYear}
                                defaultButtonText={year}
                                buttonTextStyle={{ fontSize: 16, }}
                                onSelect={(selectedItem, index) => {
                                    const newDate = new Date(parseInt(selectedItem), month, 2);
                                    setSelectedDate(newDate);
                                    setYear(parseInt(selectedItem));
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <AntDesign name={isOpened ? 'down' : 'right'} color={'black'} size={16} />;
                                }}
                                renderCustomizedButtonChild={value => {
                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                            <Text style={{ fontSize: 16 }}>{year}</Text>
                                        </View>
                                    );
                                }}
                                buttonStyle={styles.containerSelectDropDown}
                            />
                        </View>
                        <View style={styles.containerListJar}>
                            <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Danh sách lọ</Text>
                            <View style={styles.containerListJarItem}>
                                {
                                    dataListJar.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate("DetailJar", { id: item.id, name: item.name, money: item.availableBalances, income: item.totalIncome, spending: item.totalSpending, month: month, year: year, typeBasket: 1 });
                                            }} key={item.id} style={styles.containerListJarItem_Item}>
                                                <View style={{ flex: 0.2, height: "100%", justifyContent: 'center', marginLeft: 10, }}>
                                                    <View style={{ backgroundColor: colorJar[index], height: 50, width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../assets/icons/jar.png')} style={{ tintColor: '#000' }} />
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.7, height: "100%", justifyContent: 'center' }}>
                                                    <View style={{ flex: 0.3333, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                                        {
                                                            item.availableBalances >= 0 ?
                                                                <Text style={{ color: '#339900', fontSize: 16, }}>{moneyFormat(item.availableBalances)}</Text>
                                                                : <Text style={{ color: 'red', fontSize: 16, }}>{moneyFormat(item.availableBalances)}</Text>
                                                        }
                                                    </View>
                                                    <View style={{ flex: 0.3333, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ color: '#000', fontSize: 16, }}>Khả dụng</Text>
                                                        <Text style={{ color: '#000', fontSize: 16, }}>{(item.totalIncome == 0 && item.totalSpending == 0) ? 0 : (item.totalIncome == 0 && item.totalSpending != 0) ? ((item.totalIncome - item.totalSpending) / item.totalSpending * 100).toFixed(2) : ((item.totalIncome - item.totalSpending) / item.totalIncome * 100).toFixed(2)} %</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.1, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                                    <AntDesign name="right" size={14} color="#000" />
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.containerBody}>
                                <View style={styles.containerListJar}>
                                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Thống kê thu - chi của các tuần trong tháng {month}</Text>
                                    <View style={styles.containerListJars}>
                                        <ScrollView horizontal={true} style={{ marginTop: 20, marginBottom: 20 }}>
                                            <LineChart
                                                data={data}
                                                width={Dimensions.get('window').width - 30}
                                                height={250}
                                                yAxisLabel="VND "
                                                chartConfig={chartConfig}
                                                showBarTops={true}
                                                withHorizontalLabels={true}
                                                horizontalLabelRotation={-60}
                                                style={{ marginLeft: 10, marginRight: 10, borderRadius: 20, }}
                                                bezier
                                            />
                                        </ScrollView>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                <View
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: 'green',
                                                        alignSelf: 'center',
                                                        marginVertical: 5,
                                                    }}
                                                />
                                                <Text style={{ color: '#000', fontSize: 16, }}> Thu nhập</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: 'red',
                                                        alignSelf: 'center',
                                                        marginVertical: 5,
                                                    }}
                                                />
                                                <Text style={{ color: '#000', fontSize: 16, }}> Chi tiêu</Text>
                                            </View>
                                        </View>
                                        <View style={styles.containerBottom}>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate("Chart", { id: null, name: null });
                                            }} style={styles.bottom} >
                                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <View style={styles.containerBody}>
                                <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Lịch sử giao dịch </Text>
                                </View>
                                <ScrollView style={{ marginTop: 20, marginRight: 10, maxHeight: 320 }}>
                                    {
                                        dataHistory.map((item, index) => {
                                            const date = new Date(item.createDate);
                                            return (
                                                <View key={index} style={styles.containerItemR}>
                                                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                                        <View style={{ backgroundColor: item.color, height: 50, width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image source={require('../../../assets/icons/jar.png')} style={{ tintColor: '#000' }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 0.45, }}>
                                                        <View style={{ marginBottom: 10, }}>
                                                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.note}</Text>
                                                        </View>
                                                        <Text>{item.nameBasket}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
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
                                <View style={styles.containerBottom}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("History", { id: null, name: null, year: year, month: month, typeBasket: 1 });
                                    }} style={styles.bottom} >
                                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem tất cả</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20, marginLeft: 20, }}>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerListJar}>
                            <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Cơ cấu các lọ</Text>
                            <View style={styles.containerListJars}>
                                <PieChart
                                    data={dataPieChart}
                                    height={200}
                                    width={width}
                                    chartConfig={chartConfigPie}
                                    accessor="population"
                                    paddingLeft='10'
                                />
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("SetPercentJar", {
                                        month: month,
                                        year: year
                                    });
                                }} style={styles.buttonStyle}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Cập nhật, Thêm lọ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, }}></View>
                    </ScrollView>
                </SafeAreaView>
            }
        </>
    );

}


export default Home;