import { Button, DatePickerAndroid, Platform, ScrollView, View } from 'react-native';
import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import styles from "./styles/ChartStyles";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Modal } from 'react-native';
// Import FireBase
import { initializeAuth, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelector } from 'react-redux';

function Chart({ navigation, route }) {
    const { id, name } = route.params;
    const dataTK = ['Theo tháng', 'Theo năm'];
    const [valuesDefaut, setvaluesDefaut] = useState("Theo tháng");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [year, setYear] = useState(selectedDate.getFullYear());

    const [labels, setlabels] = useState(["1", "2", "3", "4"]);
    const [datasets, setdatasets] = useState([0, 0, 0, 0,]);
    const [datasets2, setdatasets2] = useState([0, 0, 0, 0,]);
    const [labels1, setlabels1] = useState(["1", "2", "3", "4"]);
    const [datasets3, setdatasets3] = useState([0, 0, 0, 0,]);
    const [datasets4, setdatasets4] = useState([0, 0, 0, 0,]);
    const onDateChange = (date) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        setModalVisible(!modalVisible);
        setMonth(newDate.getMonth() + 1);
        setYear(newDate.getFullYear());
    }
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const idReload = useSelector(state => state.reload.idReload);
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
    const [data1, setdata1] = useState({
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
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
            {
                type: 1,
                userId: idUser,
                basketId: id,
                year: year,
                month: month,
                typeBasket: 1,
                isDay: true,
                isWeek: false,
            },
            {
                headers: {
                    authorization: accessToken
                }
            }).then((res) => {
                setlabels(
                    res.data.map((item, index) => {
                        return `Ngày ${index + 1}`;
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
                isDay: true,
                isWeek: false,
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
        // Tuần
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
                setlabels1(
                    res.data.map((item, index) => {
                        return `Tuần ${index + 1}`;
                    })
                );
                setdatasets3(
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
                setdatasets4(
                    res.data.map((item) => {
                        return parseInt(item);
                    })
                )
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
    useEffect(() => {
        setdata1({
            labels: labels1,
            datasets: [
                {
                    data: datasets3,
                    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                },
                {
                    data: datasets4,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
                },
            ],
        });
    }, [datasets3, datasets4]);
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        categoryPercentage: 0.8,

    };
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
                        {
                            valuesDefaut == "Theo tháng" &&
                            <CalendarPicker
                                scrollable={true}
                                onMonthChange={onDateChange}
                                initialView='months'
                                months={["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]}
                            >
                            </CalendarPicker>
                        }
                        {
                            valuesDefaut == "Theo năm" &&
                            <CalendarPicker
                                scrollable={true}
                                onMonthChange={onDateChange}
                                initialView='years'
                            >
                            </CalendarPicker>
                        }
                    </View>
                </View>
            </Modal>
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
                        Xem biểu đồ thống kê {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                {/* <View style={styles.containerItem}>
                    <SelectDropdown
                        data={dataTK}
                        defaultButtonText={valuesDefaut}
                        buttonTextStyle={{ fontSize: 16, }}
                        onSelect={(selectedItem, index) => {
                            setvaluesDefaut(selectedItem);
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

                </View> */}
                {
                    (valuesDefaut == "Theo tháng" || valuesDefaut == "Theo năm") &&
                    <View style={styles.containerItemSelect}>
                        <TouchableOpacity style={styles.buttom} onPress={() => setModalVisible(true)} >
                            <Text>
                                {valuesDefaut == "Theo tháng" ? 'Chọn tháng' : ' Chọn năm'}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, }}>{selectedDate.toLocaleDateString('VN', { month: 'long', year: 'numeric' })}</Text>
                    </View>
                }
                <ScrollView horizontal={true}>
                    <LineChart
                        data={data}
                        width={Dimensions.get('window').width + 1400}
                        height={250}
                        yAxisLabel="VND "
                        chartConfig={chartConfig}
                        showBarTops={true}
                        withHorizontalLabels={true}
                        horizontalLabelRotation={-60}
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
                <ScrollView horizontal={true} style={{ marginTop: 20, marginBottom: 20 }}>
                    <LineChart
                        data={data1}
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
            </ScrollView>

        </SafeAreaView>
    );
}

export default Chart;