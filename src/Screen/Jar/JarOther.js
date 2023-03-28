import { ScrollView, View } from 'react-native';
import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import styles from "./styles/JarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
// Import FireBase
import { initializeAuth, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { reload_IU } from '../../redux/action/ActionRedux';
import { Modal } from 'react-native';
import { useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { colorJar } from '../../../assets/AppColors/AppColors';
function JarOther({ navigation, route }) {
    const { id, name } = route.params;
    const [JarOther, setJarOther] = useState("");
    const [money, setMoney] = useState("");
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [dateGD, setDate] = useState(selectedDate);
    const [dateNote, setdateNote] = useState(selectedDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    const [typeTS, setTypeTS] = useState("Tiền mặt");
    const [colorTSTienMat, setcolorTSTienMat] = useState(colorJar[2]);
    const [colorTSCoPhieu, setColorTSCoPhieu] = useState("#fff");
    const hanldPressTienMat = () => {
        setTypeTS("Tiền mặt");
        setcolorTSTienMat(colorJar[2]);
        setColorTSCoPhieu("#fff");
    }
    const hanldPressCoPhieu = () => {
        setTypeTS("Cổ phiếu");
        setcolorTSTienMat("#fff");
        setColorTSCoPhieu(colorJar[5]);
    }
    const [stock, setStock] = useState("");
    const [dataStock, setDataStock] = useState([]);
    const [nameStock, setNameStock] = useState("Không có dữ liệu");
    const [codeStock, setCodeStock] = useState("");
    const [priceStock, setPriceStock] = useState(0);
    const [slStock, setslStock] = useState(0);
    useEffect(() => {
        Platform.OS === "android" ?
            axios.get(`https://finance.vietstock.vn/search-stock?query=${stock}&page=1&pageSize=1`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                    'Cookie': 'ASP.NET_SessionId=j0zzpsplrfboyomyruq3rwae; language=vi-VN'
                },
            })
                .then((res) => {
                    setDataStock(res.data.data[0]);
                }).catch((err) => {
                    console.log(err);
                })
            :
            axios.get(`https://finance.vietstock.vn/search-stock?query=${stock}&page=1&pageSize=1`, {
                headers: {

                },
            })
                .then((res) => {
                    setDataStock(res.data.data[0]);
                }).catch((err) => {
                    console.log(err);
                })
    }, [stock]);

    useEffect(() => {
        if (stock != '') {
            if (dataStock != undefined) {
                if (dataStock.FullName == undefined) {
                    setNameStock("Không có dữ liệu");
                    setCodeStock("");
                }
                else {
                    setNameStock(dataStock.FullName);
                    setCodeStock(dataStock.Code);
                }
            }
        }
        else {
            setNameStock("Không có dữ liệu");
            setCodeStock("");
        }
    }, [dataStock]);
    useEffect(() => {
        if (nameStock == "Không có dữ liệu") {
            setPriceStock(0);
        }
        else {
            axios.get(`http://54.250.86.78:5000?code=${codeStock}`)
                .then((res) => {
                    setPriceStock(res.data.LastPrice);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }, [nameStock]);
    const slStockFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    const hanldhanldAddJarOther = () => {
        var mess = "";

        if (id == 4) {
            if (id == 4 && typeTS == "Cổ phiếu") {
                if (parseInt(priceStock * slStock) == 0) {
                    mess += "Số tiền không được bằng 0";
                    Alert.alert("Thông báo", mess);
                }
                else {
                    axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket',
                        {
                            userId: idUser,
                            name: codeStock,
                            precent: 0,
                            availableBalances: parseInt(priceStock * slStock),
                            totalSpending: 0,
                            totalIncome: 0,
                            type: id,
                            status: 0,
                            moneyPurpose: 1000000000,
                            datedComplete: dateGD,
                            createdDate: selectedDate
                        },
                        {
                            headers: {
                                authorization: accessToken
                            }
                        }).then((res) => {
                            dispatch(reload_IU(idReload + 1));
                            Alert.alert("Thông báo", "Thêm thành công");
                            navigation.goBack();

                        }).catch((err) => {
                            console.log(err);
                        })
                }
            }
            else {
                if (money == 0) {
                    mess += "Số tiền không được bằng 0";
                    Alert.alert("Thông báo", mess);
                }
                else {
                    axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-cash-basket/${idUser}/4`, {
                        headers: { authorization: accessToken },
                    })
                        .then((res) => {
                            axios.put(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${res.data.id}`,
                                {
                                    id: res.data.id,
                                    userId: res.data.userId,
                                    name: res.data.name,
                                    precent: res.data.precent,
                                    availableBalances: parseInt(res.data.availableBalances) + parseInt(money),
                                    totalSpending: res.data.totalSpending,
                                    totalIncome: res.data.totalIncome,
                                    createdDate: res.data.createdDate,
                                    datedComplete: res.data.datedComplete,
                                    moneyPurpose: 1000000000,
                                    status: res.data.status,
                                    type: 4,
                                    isCash: 1,

                                },
                                {
                                    headers: {
                                        authorization: accessToken
                                    }
                                }).then((res) => {
                                    dispatch(reload_IU(idReload + 1));
                                    navigation.goBack();
                                }).catch((err) => {
                                    console.log(err);
                                })
                        }).catch((err) => {
                            console.log(err);
                        })
                }
            }
        }
        else {
            var mess = "";
            if (money == 0) {
                mess += "Số tiền không được bằng 0";
            }
            if (JarOther == "") {
                mess += "\nTên mục không được rỗng ";
            }
            if (money == 0 || JarOther == "") {
                Alert.alert("Thông báo", mess);
            }
            if( money > 1000000000){
                Alert.alert("Thông báo","Số tiền nhập phải dưới 1 tỷ")
            }
            else {
                const date = new Date(dateGD);
                if (selectedDate.getTime() <= date.getTime()) {
                    axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket',
                        {
                            userId: idUser,
                            name: JarOther,
                            precent: 0,
                            availableBalances: 0,
                            totalSpending: 0,
                            totalIncome: 0,
                            type: id,
                            status: 0,
                            moneyPurpose: money,
                            datedComplete: dateGD,
                            createdDate: selectedDate
                        },
                        {
                            headers: {
                                authorization: accessToken
                            }
                        }).then((res) => {
                            dispatch(reload_IU(idReload + 1));
                            Alert.alert("Thông báo", "Thêm thành công");
                            navigation.goBack();

                        }).catch((err) => {
                            console.log(err);
                        })
                }
                else {
                    Alert.alert("Thông báo", "Ngày hoàn thành phải sau ngày hiện tại hoặc bằng ngày hiện tại");
                }
            }
        }
    }
    useEffect(() => {
        if (dateGD != "") {
            const newDate = new Date(dateGD);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        }
    }, [dateGD]);

    const onDateChange = (date) => {
        setDate(date);
        setModalVisible(!modalVisible);
    }
    const [moneyR, setMoneyR] = useState("");
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };
    useEffect(() => {
        if (money > 0) {
            setMoneyR(moneyFormat(parseInt(money)));
        } else {
            setMoneyR("");
        }
    }, [money]);

    useEffect(() => {
        if (money > 0) {
            setMoneyR(moneyR.toString().replace("₫", "").replace(" ", ""));
        }
        else {
            setMoneyR("");
        }
    }, [moneyR]);
    return (
        <SafeAreaView style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CalendarPicker onDateChange={onDateChange}>
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
                        Thêm mục {name} mới
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            {
                id == 4 &&
                <View style={{ backgroundColor: colorTSTienMat, height: 40, width: "100%", display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={hanldPressTienMat} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, }}>Thêm tiền mặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldPressCoPhieu} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: colorTSCoPhieu }}>
                        <Text style={{ fontSize: 16, }}>Thêm cổ phiếu</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                id == 4 && typeTS == "Tiền mặt" &&
                <>
                    <View style={styles.viewBody}>
                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/wallet.png')} />
                        </View>
                        <View style={{ flex: 0.85, justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                            <TextInput keyboardType='number-pad' onChangeText={x => {
                                if (money > 100) {
                                    const arr = x.split(".");
                                    var moneyG = "";
                                    if (arr.length > 0) {
                                        arr.map((x) => {
                                            moneyG += x;
                                        });
                                        setMoney(moneyG);
                                    }
                                    else {
                                        setMoney(x)
                                    }
                                }
                                else {
                                    setMoney(x)
                                }

                            }} placeholderTextColor={'#000'} style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, fontSize: 16, }} placeholder='Nhập tiền'>{moneyR}</TextInput>
                        </View>
                    </View>
                </>
            }
            {
                id == 4 && typeTS == "Cổ phiếu" &&
                <>
                    <View style={styles.bodyContainerField}>
                        <View style={styles.bodyContainerSearch}>
                            <TextInput maxLength={3} onChangeText={x => {
                                setStock(x);
                            }
                            }
                                value={stock} placeholder="Vui lòng nhập từ khóa cổ phiếu" style={{ flex: 1, fontSize: 16, height: "100%" }} />
                            <AntDesign name="search1" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.bodyContainerField}>
                        <Text style={{ fontSize: 16, marginBottom: 10, }}>
                            Tên cổ phiếu :
                        </Text>
                        <View style={styles.bodyContainerSearch}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>
                                {nameStock} {
                                    codeStock != "" ? `(${codeStock})` : ""
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bodyContainerField}>
                        <Text style={{ fontSize: 16, marginBottom: 10, }}>
                            Giá thị trường của 1 cổ phiếu:
                        </Text>
                        <View style={styles.bodyContainerSearch}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>
                                {slStockFormat(priceStock)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bodyContainerField}>
                        <Text style={{ fontSize: 16, marginBottom: 10, }}>
                            Số lượng cổ phiếu:
                        </Text>
                        <View style={styles.bodyContainerSearch}>
                            <TextInput keyboardType='number-pad' onChangeText={x => {
                                setslStock(x)
                            }} placeholder="0" placeholderTextColor={'#000'} style={{ fontSize: 16, flex: 1, }}>{slStock}</TextInput>
                        </View>
                    </View>
                    <View style={styles.bodyContainerField}>
                        <Text style={{ fontSize: 16, marginBottom: 10, }}>
                            Số tiền để mua cổ phiếu
                        </Text>
                        <View style={styles.bodyContainerSearch}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>
                                {slStockFormat(priceStock * slStock)}
                            </Text>
                        </View>
                    </View>
                </>
            }
            {
                id != 4 &&
                <>
                    <View style={styles.viewBody}>
                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/jar.png')} />
                        </View>
                        <View style={{ flex: 0.85, justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                            <TextInput value={JarOther} onChangeText={x => setJarOther(x)} style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, fontSize: 16, }} placeholder='Nhập tên mục cần thêm' />
                        </View>
                    </View>
                    <View style={styles.viewBody}>
                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/wallet.png')} />
                        </View>
                        <View style={{ flex: 0.85, justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                            <TextInput keyboardType='number-pad' onChangeText={x => {
                                if (money > 100) {
                                    const arr = x.split(".");
                                    var moneyG = "";
                                    if (arr.length > 0) {
                                        arr.map((x) => {
                                            moneyG += x;
                                        });
                                        setMoney(moneyG);
                                    }
                                    else {
                                        setMoney(x)
                                    }
                                }
                                else {
                                    setMoney(x)
                                }

                            }} placeholderTextColor={'#000'} style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, fontSize: 16, }} placeholder='Nhập tiền'>{moneyR}</TextInput>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewBody}>
                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/calendar.png')} />
                        </View>
                        <View style={{ flex: 0.85, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 50, borderRadius: 20, borderWidth: 0.5, paddingLeft: 15, width: "100%", display: 'flex', flexDirection: 'row' }}>
                                <View style={{ flex: 0.8, width: "100%", justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, }}>{dateNote}</Text>
                                </View>
                                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/icons/reset.png')} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            }
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={hanldhanldAddJarOther} style={styles.buttonStyle}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


export default JarOther;