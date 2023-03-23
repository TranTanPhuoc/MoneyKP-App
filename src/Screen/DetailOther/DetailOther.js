import { ScrollView, View } from 'react-native';
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
    const { id, name, money } = route.params;
    const [moneyR, setmoneyR] = useState(parseInt(money));
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
                setData(res.data.map((item) => {
                    var objtemp = { id: item.id, name: item.name, population: item.precent, userId: item.userId, precent: item.precent, totalIncome: item.totalIncome, totalSpending: item.totalSpending, availableBalances: item.availableBalances };
                    moneyI += item.availableBalances;
                    return objtemp;
                }));
                setmoneyR(moneyI);
            }).catch((err) => {
                console.log(err);
            });
    }, [idReload])
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                if (res.data.length !== 0 && res.data.length > 1) {
                    setdataPieChart(res.data.map((item, index) => {
                        const precent = parseInt(item.availableBalances) / parseInt(moneyR);
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
    }, [moneyR]);
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
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Tổng số tiền còn lại</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <Text style={{ fontSize: 35, fontWeight: '700' }}>{moneyFormat(moneyR)}</Text>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("JarOther", { id: id, name: name });
                    }} style={styles.bottom} >
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}> Thêm mục mới</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={styles.containerBody}>
                        <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>Danh sách các mục</Text>
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
                                                <View key={index} style={{
                                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50,
                                                    borderWidth: 0.5, marginBottom: 10, paddingHorizontal: 10, borderRadius: 20, borderColor: 'black', backgroundColor: '#fff',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 1,
                                                    },
                                                    shadowColor: '#999999',
                                                    shadowOpacity: 0.5,
                                                    shadowRadius: 2
                                                }}>
                                                    <Text style={{ fontSize: 18 }}>{index + 1}. {item.name}</Text>
                                                    <Text style={{ fontSize: 18, marginRight: 10 }}>{moneyFormat(item.availableBalances)}</Text>
                                                </View>
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
                                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}> Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, marginLeft: 20, }}>
                        </View>
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <View style={{ marginTop: 20, marginLeft: 20, justifyContent: 'space-between', marginRight: 20, }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Cơ cấu các mục {name}</Text>
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
                                <Text style={{ fontSize: 18, color: '#C0C0C0' }}>Không tìm thấy dữ liệu</Text>
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