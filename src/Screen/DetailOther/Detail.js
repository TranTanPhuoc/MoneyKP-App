import { Alert, ScrollView, View } from 'react-native';
import { Text, SafeAreaView } from 'react-native';
import styles from "./styles/DetailStyle";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Import FireBase
import { initializeAuth, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useDispatch, useSelector } from 'react-redux';
import { colorJar } from '../../../assets/AppColors/AppColors';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { reload_IU } from '../../redux/action/ActionRedux';
function Detail({ navigation, route }) {
    const { id, name, itemName, money, idJar, moneyPurpose, status, availableBalances, isCash, quantity } = route.params;
    const [moneyR, setMoneyR] = useState(parseInt(money));
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const idReload = useSelector(state => state.reload.idReload);
    const [hidden, sethidden] = useState(false);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataHistory, setdataHistory] = useState([]);
    const [hidden2, sethidden2] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [labels, setlabels] = useState(["1", "2", "3", "4"]);
    const [datasets, setdatasets] = useState([0, 0, 0, 0,]);
    const [datasets2, setdatasets2] = useState([0, 0, 0, 0,]);
    const dispatch = useDispatch();
    const [dataChart, setdataChart] = useState({
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

    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-basketId/${idUser}/${idJar}`, {
            headers: { authorization: accessToken },
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
        });
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
            {
                type: 1,
                userId: idUser,
                basketId: id,
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
                basketId: id,
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
                setdatasets2(
                    res.data.map((item) => {
                        return parseInt(item);
                    })
                )
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload])
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        categoryPercentage: 0.8,

    };

    useEffect(() => {
        setdataChart({
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
        })
    }, [datasets, datasets2]);

    const deleteItem = () => {
        axios.delete(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${idJar}`, {
            headers: { authorization: accessToken },
        }).then((res) => {
            dispatch(reload_IU(idReload + 1));
            navigation.goBack();
        }).catch((err) => {
            console.log(err)
        });
    };

    const updateStatus = () => {
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/update-status/${idJar}/1`,
            {
            },
            {
                headers: {
                    authorization: accessToken
                }
            }
        ).then((res) => {
            dispatch(reload_IU(idReload + 1));
            Alert.alert("Thông báo", "Cập nhật trạng thái thành công")
            navigation.goBack();
        }).catch((err) => {
            console.log(err);
        })
    }
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
                        Chi tiết
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.viewBody_Top}>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                id == 4 && isCash &&
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/money.png')} />
                            }
                            {
                                id == 4 && !isCash &&
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/stock.png')} />
                            }
                            {
                                id != 4 &&
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/money.png')} />
                            }
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', marginLeft: 15, marginRight: 15 }}>{name}</Text>
                            {
                                id != 4 && (status == 1 || moneyPurpose == availableBalances) &&
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/checked.png')} />
                            }
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ExchangeOther");
                            }}>
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/add.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#000', fontSize: 25, fontWeight: 'bold', marginTop: 5 }}>{itemName}</Text>

                    </View>
                </View>
                {
                    id != 4 &&
                    <View style={styles.containerMoney}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Số tiền {name} của mục</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ fontSize: 25, fontWeight: '700' }}>{moneyFormat(moneyPurpose)}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>Mức độ hoàn thành : {moneyR / moneyPurpose * 100} %</Text>
                        </View>
                    </View>
                }
                <View style={styles.containerMoney}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Tổng số tiền</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <Text style={{ fontSize: 35, fontWeight: '700' }}>{moneyFormat(moneyR)}</Text>
                    </View>
                    {
                        id == 4 && !isCash &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Số lượng cổ phiếu hiện có: {quantity}</Text>
                        </View>
                    }
                </View>

                <View style={{ marginTop: 20, }}>
                    <View style={styles.containerBody}>
                        <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Lịch sử giao dịch {itemName}</Text>
                            <TouchableOpacity onPress={() => sethidden(!hidden)} style={{ marginRight: 20, }}>
                                {
                                    hidden ? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden &&
                            <ScrollView style={{ marginTop: 20, marginLeft: 20, marginRight: 20, maxHeight: 150 }}>
                                {
                                    dataHistory.map((item, index) => {
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
                                                <View style={{ flex: 0.35 }}>
                                                    {
                                                        (item.type == 1) ?
                                                            <Text style={{ color: '#339900', fontSize: 16, fontWeight: 'bold' }}>+ {moneyFormat(item.moneyTransaction)}</Text> :
                                                            <Text style={{ color: '#EE0000', fontSize: 16, fontWeight: 'bold' }}>- {moneyFormat(item.moneyTransaction)}</Text>
                                                    }
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                        }
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("History", { id: idJar, name: itemName });
                            }} style={styles.bottom} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, }}>
                        <View style={styles.containerBody}>
                            <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Xem biểu đồ giao dịch lọ {itemName}</Text>
                                <TouchableOpacity onPress={() => sethidden2(!hidden2)} style={{ marginRight: 20, }}>
                                    {
                                        hidden2 ? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                    }
                                </TouchableOpacity>
                            </View>
                            {
                                !hidden2 &&
                                <>
                                    <ScrollView horizontal={true}>
                                        <LineChart
                                            data={dataChart}
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
                                </>
                            }
                            <View style={styles.containerBottom}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Chart", { id: idJar, name: itemName });
                                }} style={styles.bottom} >
                                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 20, marginLeft: 20, }}>
                            </View>
                        </View>
                    </View>
                    {
                        id != 4 && money - moneyPurpose == 0 && status == 0
                        &&
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={styles.button} onPress={updateStatus} >
                                <Text style={{ fontSize: 16, color: 'green', fontWeight: '600' }}>Xác nhận hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        itemName != "Tiền mặt" &&
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={styles.button} onPress={deleteItem} >
                                <Text style={{ fontSize: 16, color: 'red', fontWeight: '600' }}>Xóa mục</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ marginTop: 20, }}>
                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Detail;