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
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

function Chart({ navigation, route }) {
    const { id, name } = route.params;
    const dataTK = ['Theo tháng', 'Theo năm'];
    const dataJar = ['Thu nhập', 'Chi tiêu'];
    const [typeData, settypeData] = useState(1);
    const [valuesDefaut, setvaluesDefaut] = useState("Theo tháng");
    const [selectDefaut, setselectDefaut] = useState("Thu nhập");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    const [year, setYear] = useState(selectedDate.getFullYear());
    const [labels, setlabels] = useState([]);
    const [datasets, setdatasets] = useState([]);
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
    const [data, setdata] = useState({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "16", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", ""],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });
    useEffect(() => {
        if (valuesDefaut == "Theo năm") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
                    userId: idUser,
                    basketId: id,
                    year: year,
                    month: 0,
                    typeBasket: 1
                },
                {
                    headers: {
                        authorization: accessToken
                    }
                }).then((res) => {

                    setdata({
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                        datasets: [
                            {
                                data: res.data,
                            },
                        ],
                    })
                }).catch((err) => {
                    console.log(err);
                })
        } else if (valuesDefaut == "Theo tháng") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
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
        }

    }, [month]);

    useEffect(() => {
        if (valuesDefaut == "Theo năm") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
                    userId: idUser,
                    basketId: id,
                    year: year,
                    month: 0,
                    typeBasket: 1
                },
                {
                    headers: {
                        authorization: accessToken
                    }
                }).then((res) => {

                    setdata({
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                        datasets: [
                            {
                                data: res.data,
                            },
                        ],
                    })
                }).catch((err) => {
                    console.log(err);
                })
        } else if (valuesDefaut == "Theo tháng") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
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
        }

    }, [year]);

    useEffect(() => {
        if (valuesDefaut == "Theo năm") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
                    userId: idUser,
                    basketId: id,
                    year: year,
                    month: 0,
                    typeBasket: 1
                },
                {
                    headers: {
                        authorization: accessToken
                    }
                }).then((res) => {

                    setdata({
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                        datasets: [
                            {
                                data: res.data,
                            },
                        ],
                    })
                }).catch((err) => {
                    console.log(err);
                })
        } else if (valuesDefaut == "Theo tháng") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
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
        }

    }, [valuesDefaut]);

    useEffect(() => {
        if (valuesDefaut == "Theo năm") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
                    userId: idUser,
                    basketId: id,
                    year: year,
                    month: 0,
                    typeBasket: 1
                },
                {
                    headers: {
                        authorization: accessToken
                    }
                }).then((res) => {

                    setdata({
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                        datasets: [
                            {
                                data: res.data,
                            },
                        ],
                    })
                }).catch((err) => {
                    console.log(err);
                })
        } else if (valuesDefaut == "Theo tháng") {
            axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-chart',
                {
                    type: typeData,
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
        }

    }, [selectDefaut]);

    useEffect(() => {
        if (valuesDefaut == "Theo tháng") {
            setdata({
                labels: labels,
                datasets: [
                    {
                        data: datasets,
                    },
                ],
            })
        }
    }, [datasets])

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
                        <CalendarPicker
                            scrollable={true}
                            onDateChange={onDateChange}
                        >
                        </CalendarPicker>
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
                        Xem biểu đồ thống kê
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

                    <SelectDropdown
                        data={dataJar}
                        defaultButtonText={selectDefaut}
                        buttonTextStyle={{ fontSize: 16, }}
                        onSelect={(selectedItem, index) => {
                            setselectDefaut(selectedItem);
                            (selectedItem == 'Thu nhập') ? settypeData(1) : settypeData(-1);
                        }}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={16} />;
                        }}
                        renderCustomizedButtonChild={value => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16 }}>{selectDefaut}</Text>
                                </View>
                            );
                        }}
                        buttonStyle={styles.containerSelectDropDown}
                    />
                </View>
                {
                    (valuesDefaut == "Theo tháng" || valuesDefaut == "Theo năm") &&
                    <View style={styles.containerItemSelect}>
                        <TouchableOpacity style={styles.buttom} onPress={() => setModalVisible(true)} >
                            <Text>
                                Chọn tháng
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, }}>Tháng: {selectedDate.toLocaleDateString('VN', { month: 'long', year: 'numeric' })}</Text>
                    </View>
                }
                <ScrollView horizontal={true}>
                    <BarChart
                        data={data}
                        width={(valuesDefaut == "Theo tháng") ? Dimensions.get('window').width + 160 : Dimensions.get('window').width + 50}
                        height={250}
                        yAxisLabel="VND "
                        chartConfig={chartConfig}
                        showBarTops={true}
                        withHorizontalLabels={true}
                        horizontalLabelRotation={-60}
                    />
                </ScrollView>

            </ScrollView>

        </SafeAreaView>
    );
}

export default Chart;