import { Text, SafeAreaView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/WalletStyles";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
// Import FireBase
import { initializeAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useState } from 'react';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
function Wallet({ navigation }) {
    const width = Dimensions.get('window').width;
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
     // Ngày hiện tại
     const [selectedDate, setSelectedDate] = useState(new Date());
     // Tháng hiện tại
     const [month, setMonth] = useState(selectedDate.getMonth() + 1);
     // Năm hiện tại
     const [year, setYear] = useState(selectedDate.getFullYear());
    const idUser = auth.currentUser.uid;
    const idReload = useSelector(state => state.reload.idReload);
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataIncomeAndSpending, setdataIncomeAndSpending] = useState([]);
    const [totalIncome, settotalIncome] = useState(10);
    const [totalSpending, settotalSpending] = useState(5);
    const [dataDS, setdataDS] = useState([
        { id: 4, name: "Tài sản", money: 0 },
        { id: 3, name: "Mơ ước", money: 0 },
        { id: 1, name: "6 Lọ", money: 0 },
        { id: 2, name: "Nợ", money: 0 },
    ]);
    // Data biểu đồ tròn
    const [total, settotal] = useState(0);
    const [dataPieChart, setdataPieChart] = useState([
        { id: 1, name: "Thu nhập", population: 50, color: colorJar[0], legendFontColor: '#000', legendFontSize: 15 },
        { id: 2, name: "Chi tiêu", population: 50, color: colorJar[1], legendFontColor: '#000', legendFontSize: 15 },
    ]);
    const dataLineChart = {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2 // optional
            },
            {
                data: [30, 55, 38, 90, 109],
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2 // optional
            }
        ]
    };
    const chartConfigBarChart = {
        backgroundGradientFrom: '#9E9E9E',
        backgroundGradientTo: '#B8B8C8',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
        }
    };
    // Định dạng tiền tệ VNĐ
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        borderWidth: 0.5,
    };
    useEffect(() => {
        setdataIncomeAndSpending(
            [
                { id: 1, name: 'Thu nhập', price: totalIncome, color: '#03fc41', icon: require('../../../assets/icons/add.png') },
                { id: 2, name: 'Chi tiêu', price: totalSpending, color: '#fc3030', icon: require('../../../assets/icons/minus.png') },
            ]
        )
    }, [totalIncome, totalSpending]);
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/1`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
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
            }).catch((err) => {
                console.log(err);
            });
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-asset-by-userId/${idUser}`, {
                monthNumber: parseInt(month),
                yearNumber: parseInt(year)
            },
            {
                headers: { authorization: accessToken },
            })
            .then((res) => {
                const listdata = res.data.map((item) => {
                    return item;
                })
                setdataDS(
                    [
                        { id: 4, name: "Tài sản", money: listdata[0] },
                        { id: 3, name: "Mơ ước", money: listdata[1] },
                        { id: 1, name: "6 Lọ", money: listdata[2] },
                        { id: 2, name: "Nợ", money: listdata[3] },
                    ]
                )
            }).catch((err) => {
                console.log(err);
            });
    }, [idReload])
    useEffect(() => {
        const totalMoney = totalIncome + totalSpending;
        var precentIncome = 100;
        var precentSpeeding = 0;
        if (totalIncome == 0 && totalSpending == 0) {
            precentIncome = 100;
            precentSpeeding = 0;
        }
        else {
            precentIncome = totalIncome / totalMoney * 100;
            precentSpeeding = totalSpending / totalMoney * 100;
        }

        setdataPieChart([
            { id: 1, name: "Thu nhập", population: precentIncome, color: colorJar[0], legendFontColor: '#000', legendFontSize: 15 },
            { id: 2, name: "Chi tiêu", population: precentSpeeding, color: colorJar[1], legendFontColor: '#000', legendFontSize: 15 },
        ]);
        settotal(totalIncome - totalSpending);
    }, [totalIncome, totalSpending])
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView style={styles.scrollview}>
                <LinearGradient colors={['#c2387c', '#8390e6']} style={styles.containerHeader}>
                    <View style={styles.containerHeaderTop}>
                        <PieChart
                            data={dataPieChart}
                            height={150}
                            width={width}
                            chartConfig={chartConfigPie}
                            accessor="population"
                            paddingLeft='10'
                        />
                    </View>
                    <View style={styles.containerHeaderBottom}>
                        <Text style={{ color: "#fff", fontSize: 18, }}>Tài sản</Text>
                        <Text style={{ color: "#fff", fontSize: 18, }}>{moneyFormat(total)}</Text>
                    </View>
                </LinearGradient>
                <ScrollView scrollEnabled={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={styles.containerInfoWallet}>
                    {
                        dataIncomeAndSpending.map((item) => {
                            return (
                                <View key={item.id} style={styles.containerItem}>
                                    <View style={styles.containerItemTop}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Image source={require('../../../assets/icons/wallet.png')} style={{ height: 20, width: 20, tintColor: item.color }} />
                                            <Text style={{ color: '#000', fontSize: 18, marginLeft: 10, }}>{item.name}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: '#000', fontSize: 18, marginTop: 10, marginLeft: 10, marginRight: 10, }}>{moneyFormat(item.price)}</Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.containerListJar}>
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Danh sách lọ</Text>
                    <View style={styles.containerListJarItem}>
                        {
                            dataDS.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        (index == 2) ?
                                            navigation.goBack()
                                            :
                                            navigation.navigate("DetailOther", { name: item.name, id: item.id, money: item.money });

                                    }} key={item.id} style={styles.containerListJarItem_Item}>
                                        <View style={{ flex: 0.2, height: "100%", justifyContent: 'center', marginLeft: 10, }}>
                                            <View style={{ backgroundColor: colorJar[index], height: 50, width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/icons/jar.png')} style={{ tintColor: '#000' }} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.7, height: "100%", }}>
                                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{ color: '#FF4040', fontSize: 16, }}>{moneyFormat(item.money)}</Text>
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
                <View style={styles.containerListJar}>
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Thống kê tài sản</Text>
                    <View style={styles.containerListJars}>
                        <LineChart
                            data={dataLineChart}
                            width={width - 40}
                            height={200}
                            chartConfig={chartConfigBarChart}
                            withInnerLines={false}
                            withOuterLines={false}
                            withDots={false}
                            withShadow={false}
                            fromZero={true}
                            bezier

                        />
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Thống kê tài sản nợ</Text>
                    <View style={styles.containerListJars}>
                        <LineChart
                            data={dataLineChart}
                            width={width - 40}
                            height={200}
                            chartConfig={chartConfigBarChart}
                            withInnerLines={false}
                            withOuterLines={false}
                            withDots={false}
                            withShadow={false}
                            fromZero={true}
                            bezier

                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Wallet;