import { Image, ScrollView, View } from 'react-native';
import { Text, SafeAreaView } from 'react-native';
import styles from "./styles/DetailOtherStyles";
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
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
function DetailOther({ navigation, route }) {
    // Định dạng tiền tệ VNĐ
    const { id, name, } = route.params;
    const [moneyR, setmoneyR] = useState(1);
    const [moneyChart, setMoneyChart] = useState(1);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const [hidden, sethidden] = useState(false);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const idReload = useSelector(state => state.reload.idReload);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataPieChart, setdataPieChart] = useState([]);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                var moneyI = 0;
                var moneyT = 0;
                setData(res.data.map((item) => {
                    var objtemp = {
                        id: item.id, name: item.name, population: item.precent, userId: item.userId, precent: item.precent, totalIncome: item.totalIncome,
                        totalSpending: item.totalSpending, availableBalances: item.availableBalances, moneyPurpose: item.moneyPurpose, isCash: item.isCash, quantity: item.quantity
                    };
                    moneyI += item.availableBalances;
                    moneyT += item.moneyPurpose;
                    return objtemp;
                }));
                setmoneyR(moneyI);
                setMoneyChart(moneyT);
            }).catch((err) => {
                console.log(err);
            });
    }, [idReload])
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.length !== 0 && res.data.length > 1) {
                    setdataPieChart(res.data.map((item, index) => {
                        var precent = 0;
                        if(parseInt(moneyChart) == 0){
                             precent = 100;
                        }
                        else{
                            precent = parseInt(item.moneyPurpose) / parseInt(moneyChart);
                        }
                        let randomColor = colorJar[index]
                        var obj = { id: item.id, name: item.name, population: precent, color: randomColor, legendFontColor: '#000', legendFontSize: 15 };
                        return obj;
                    }));
                }
                else if (res.data.length == 1) {
                    setdataPieChart(res.data.map((item, index) => {
                        let randomColor = colorJar[index]
                        var obj = { id: item.id, name: item.name, population: 100, color: randomColor, legendFontColor: '#000', legendFontSize: 15 };
                        return obj;
                    }));
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [moneyChart]);
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
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Tổng số tiền {name}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <Text style={{ fontSize: 35, fontWeight: '700' }}>{moneyFormat(moneyR)}</Text>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("JarOther", { id: id, name: name });
                    }} style={styles.bottom} >
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Thêm mục mới</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={styles.containerBody}>
                        <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>Danh sách các mục</Text>
                            <TouchableOpacity onPress={() => sethidden(!hidden)} style={{ marginRight: 20, }}>
                                {
                                    hidden ? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden &&
                            <ScrollView style={{ marginTop: 10, marginLeft: 10, marginRight: 10, maxHeight: 150 }}>
                                {
                                    data.map((item, index) => {
                                        if (item != null) {
                                            return (
                                                <TouchableOpacity key={index} onPress={
                                                    () => {
                                                        navigation.navigate("Detail", {
                                                            id: id, name: name, itemName: item.name, money: item.availableBalances, idJar: item.id,
                                                            moneyPurpose: item.moneyPurpose, availableBalances: item.availableBalances, status: item.status, isCash: item.isCash, quantity: item.quantity
                                                        });
                                                    }} style={styles.buttomItem}>
                                                    <View
                                                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginLeft: 10, marginRight: 10 }}>
                                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                            <View style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                                {
                                                                    id == 4 && item.isCash &&
                                                                    <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/money.png')} />
                                                                }
                                                                {
                                                                    id == 4 && !item.isCash &&
                                                                    <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/stock.png')} />
                                                                }
                                                                {
                                                                    id != 4 &&
                                                                    <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/money.png')} />
                                                                }
                                                            </View>
                                                            <Text style={{ fontSize: 16, marginLeft: 15, fontWeight: 'bold', marginRight: 15, }}> {item.name}</Text>
                                                            {
                                                                id == 4 && !item.isCash &&
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15, }}> Số lượng: {item.quantity}</Text>
                                                            }
                                                            {
                                                                id != 4 &&
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15, }}>({(item.availableBalances / item.moneyPurpose * 100).toFixed(2)} %)</Text>
                                                            }
                                                            {
                                                                id != 4 && (item.status == 1 || item.moneyPurpose == item.availableBalances) &&
                                                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/checked.png')} />
                                                            }

                                                        </View>
                                                        <Text style={{ fontSize: 16, marginRight: 10 }}>{moneyFormat(item.availableBalances)}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                    })

                                }
                            </ScrollView>
                        }
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("HistoryOther", { id: id, name: name });
                            }} style={styles.bottom} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}> Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                        </View>
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <View style={{ marginTop: 20, marginLeft: 20, justifyContent: 'space-between', marginRight: 20, }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Cơ cấu các mục {name}</Text>
                        {
                            dataPieChart.length !== 0 &&
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
                        }
                        {
                            dataPieChart.length === 0 &&
                            <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#C0C0C0' }}>Không tìm thấy dữ liệu</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}


export default DetailOther;