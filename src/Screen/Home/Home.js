import { Text, SafeAreaView, ScrollView, View, Image, FlatList, Dimensions, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/HomeStyles";
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';
import 'intl/locale-data/jsonp/en';
import { AntDesign } from '@expo/vector-icons';
import { PieChart, BarChart } from "react-native-chart-kit";
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
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';
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
    // Ngày hiện tại
    const [selectedDate, setSelectedDate] = useState(new Date());
    // Tháng hiện tại
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    // Năm hiện tại
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [labels, setlabels] = useState([]);
    // Data biểu đồ cột của thu nhập
    const [datasets, setdatasets] = useState([]);
    const [data, setdata] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    });
    // const onDateChange = (event, selectedDate) => {
    //     if (selectedDate) {
    //         const newDate = new Date(selectedDate);
    //         setSelectedDate(newDate);
    //         Platform.OS === 'android' ? setShowPicker(false) : setShowPicker(true);
    //     }
    // };
    const onDateChange = (date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        setModalVisible(!modalVisible);
        setMonth(newDate.getMonth() + 1);
        setYear(newDate.getFullYear());
    }
    // Data biểu đồ cột của chi tiêu
    const [datasets2, setdatasets2] = useState([]);
    const [data2, setdata2] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    });
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
                { id: 1, name: 'Thu nhập', price: totalIncome, color: '#03fc41', icon: require('../../../assets/icons/add.png') },
                { id: 2, name: 'Chi tiêu', price: totalSpending, color: '#fc3030', icon: require('../../../assets/icons/minus.png') },
            ]
        )
    }, [totalIncome, totalSpending]);

    useEffect(() => {
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
            monthNumber: parseInt(month),
            yearNumber: parseInt(year)
        }, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                if (res.data.length == 0) {
                    const dataListJar = [
                        {
                            userId: idUser,
                            name: "Cần thiết",
                            precent: 50,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        },
                        {
                            userId: idUser,
                            name: "Giáo dục",
                            precent: 10,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        },
                        {
                            userId: idUser,
                            name: "Tiết kiệm",
                            precent: 15,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        },
                        {
                            userId: idUser,
                            name: "Hưởng thụ",
                            precent: 10,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        },
                        {
                            userId: idUser,
                            name: "Đầu tư",
                            precent: 10,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        },
                        {
                            userId: idUser,
                            name: "Từ thiện",
                            precent: 5,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: 1,
                            monthNumber: month,
                            yearNumber: year,
                        }
                    ]
                    axios({
                        url: 'http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/create-list-basket',
                        method: 'POST',
                        headers: {
                            authorization: accessToken
                        },
                        data: dataListJar
                    }).then((res) => {
                        dispatch(reload_IU(idReload + 1));
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else {
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
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload,month,year]);
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/user/${idUser}`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                setName(res.data.name);
                setavtPic(res.data.urlPic);
                dispatch(reload_IU(idReload + 1));
            }).catch((err) => {
                console.log(err);
            })
    }, [idIU])
    useEffect(() => {
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
            {
                type: 1,
                userId: idUser,
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
                    })
                );
                setdatasets(
                    res.data.map((item) => {
                        return item;
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
                typeBasket: 1
            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setdatasets2(
                    res.data.map((item) => {
                        return item;
                    })
                )
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload]);
    useEffect(() => {
        setdata({
            labels: labels,
            datasets: [
                {
                    data: datasets,
                },
            ],
        })
        setdata2({
            labels: labels,
            datasets: [
                {
                    data: datasets2,
                },
            ],
        })
    }, [datasets]);
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
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CalendarPicker  onDateChange={onDateChange}>
                        </CalendarPicker>
                    </View>
                </View>
            </Modal>
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
                        dataIncomeAndSpending.map((item) => {
                            return (
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate("Exchange");
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
                        })
                    }
                </ScrollView>
                <ScrollView scrollEnabled={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} style={styles.containerInfoWallet}>

                </ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Ngày : {selectedDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                    <TouchableOpacity style={styles.buttom} onPress={() => setModalVisible(true)} >
                        <Text>
                            Chọn tháng
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Danh sách lọ</Text>
                    <View style={styles.containerListJarItem}>
                        {
                            dataListJar.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("DetailJar", { id: item.id, name: item.name, money: item.totalIncome - item.totalSpending, income: item.totalIncome, spending: item.totalSpending });
                                    }} key={item.id} style={styles.containerListJarItem_Item}>
                                        <View style={{ flex: 0.2, height: "100%", justifyContent: 'center', marginLeft: 10, }}>
                                            <View style={{ backgroundColor: colorJar[index], height: 50, width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/icons/jar.png')} style={{ tintColor: '#000' }} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.7, height: "100%", }}>
                                            <View style={{ flex: 0.4, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{ color: '#FF4040', fontSize: 16, }}>{moneyFormat(item.totalIncome)}</Text>
                                            </View>
                                            <View style={{ flex: 0.2, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ color: '#000', fontSize: 16, }}>Khả dụng</Text>
                                                <Text style={{ color: '#000', fontSize: 16, }}>{(item.totalIncome == 0 && item.totalSpending == 0) ? 0 : ((item.totalIncome - item.totalSpending) / item.totalIncome * 100).toFixed(2)} %</Text>
                                            </View>
                                            <View style={{ flex: 0.3, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: '#000', fontSize: 16, }}>Tiền khả dụng: </Text>
                                                <Text style={{ color: 'red', fontSize: 16, }}>{moneyFormat(item.totalIncome - item.totalSpending)}</Text>
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
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Báo cáo thu nhập của tháng {month}</Text>
                    <View style={styles.containerListJars}>
                        <ScrollView horizontal={true} style={{ marginTop: 20, marginBottom: 20 }}>
                            <BarChart
                                data={data}
                                width={Dimensions.get('window').width + 200}
                                height={250}
                                yAxisLabel="VND "
                                chartConfig={chartConfig}
                                showBarTops={true}
                                withHorizontalLabels={true}
                                horizontalLabelRotation={-60}
                                style={{ marginLeft: 10, marginRight: 10, borderRadius: 20, }}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{ color: '#000', fontSize: 22, marginLeft: 10, marginRight: 10, }}>Báo cáo chi tiêu của tháng {month}</Text>
                    <View style={styles.containerListJars}>
                        <ScrollView horizontal={true} style={{ marginTop: 20, marginBottom: 20 }}>
                            <BarChart
                                data={data2}
                                width={Dimensions.get('window').width + 200}
                                height={250}
                                yAxisLabel="VND "
                                chartConfig={chartConfig}
                                showBarTops={true}
                                withHorizontalLabels={true}
                                horizontalLabelRotation={-60}
                                style={{ marginLeft: 10, marginRight: 10, borderRadius: 20, }}
                            />
                        </ScrollView>
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
                            navigation.navigate("SetPercentJar",{
                                month : month,
                                year : year
                            });
                        }} style={styles.buttonStyle}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Chỉnh sửa tỉ lệ, thêm lọ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Home;