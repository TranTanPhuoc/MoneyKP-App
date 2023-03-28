import { ScrollView, View } from 'react-native';
import { Text, SafeAreaView } from 'react-native';
import styles from "./styles/DetailJarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';
// Import FireBase
import { initializeAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
function DetailJar({ navigation, route }) {
    const { id, name, money, income, spending } = route.params;
    const moneyR = parseInt(money);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const [dataHistory, setdataHistory] = useState([]);
    const [hidden, sethidden] = useState(false);
    const [hidden2, sethidden2] = useState(false);
    const data = [
        { id: 1, name: 'Thu nhập', price: income, color: '#03fc41', icon: require('../../../assets/icons/add.png') },
        { id: 2, name: 'Chi tiêu', price: spending, color: '#fc3030', icon: require('../../../assets/icons/minus.png') },
    ];
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataChart, setdataChart] = useState({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "16", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", ""],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [labels, setlabels] = useState([]);
    const [datasets, setdatasets] = useState([]);
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-basketId/${idUser}/${id}`, {
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
                typeBasket: 1
            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setlabels(
                    res.data.map((item, index) => {
                        return index + 1;
                    }),
                );
                setdatasets(
                    res.data.map((item) => {
                        return item;
                    })
                )
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload]);

    useEffect(() => {
        setdataChart({
            labels: labels,
            datasets: [{ data: datasets }],
        })
    }, [datasets]);
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        categoryPercentage: 0.8,

    };
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
                        {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.containerMoney}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Tổng số tiền còn lại</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <Text style={{ fontSize: 35, fontWeight: '700' }}>{moneyFormat(moneyR)}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <ScrollView scrollEnabled={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={styles.containerInfoWallet}>
                        {
                            data.map((item) => {
                                return (
                                    <View key={item.id} style={styles.containerItem}>
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
                                );
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={styles.containerBody}>
                        <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Lịch sử giao dịch lọ {name}</Text>
                            <TouchableOpacity onPress={() => sethidden(!hidden)} style={{ marginRight: 20, }}>
                                {
                                    hidden ? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden &&
                            <ScrollView style={{ marginTop: 20, marginLeft: 10, marginRight: 10, maxHeight: 320 }}>
                                {
                                    dataHistory.map((item, index) => {
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
                                                    {
                                                        (item.type == 1) ? <Text>Thu nhập</Text> : <Text>Chi tiền</Text>
                                                    }
                                                </View>
                                                <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
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
                                navigation.navigate("History", { id: id, name: name });
                            }} style={styles.bottom} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={styles.containerBody}>
                        <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Xem biểu đồ giao dịch lọ {name}</Text>
                            <TouchableOpacity onPress={() => sethidden2(!hidden2)} style={{ marginRight: 20, }}>
                                {
                                    hidden2 ? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden2 &&
                            <ScrollView horizontal={true}>
                                <BarChart
                                    data={dataChart}
                                    width={Dimensions.get('window').width + 160}
                                    height={250}
                                    yAxisLabel="VND "
                                    chartConfig={chartConfig}
                                    showBarTops={true}
                                    withHorizontalLabels={true}
                                    horizontalLabelRotation={-60}
                                />
                            </ScrollView>
                        }
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Chart", { id: id, name: name });
                            }} style={styles.bottom} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}


export default DetailJar;