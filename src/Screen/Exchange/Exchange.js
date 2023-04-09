import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeStyles";
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import { Modal } from 'react-native';

// Import FireBase
import { initializeAuth, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reload_IU, send_Photo_Success } from '../../redux/action/ActionRedux';
import { Entypo } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

function Exchange({ navigation, route }) {

    const [colorThuNhap, setcolorThuNhap] = useState("#F9B79C");
    const [colorChiTieu, setcolorChiTieu] = useState(""); // "#91D8E5"
    const [colorChuyenTien, setcolorChuyenTien] = useState(""); // "#fedcba"
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [money, setMoney] = useState("");
    const [wordsMoney, setWordsMoney] = useState("");
    const [colorSelect, setColorSelect] = useState("#FF9999");
    const [colorSelectTo, setColorSelectTo] = useState("#FF9999");
    const [modalVisible, setModalVisible] = useState(false);
    const [dateGD, setDate] = useState(selectedDate);
    const [noteGD, setNoteGD] = useState("");
    const [tagGD, setTagGD] = useState("");
    const [type, setType] = useState(1);
    const idReload = useSelector(state => state.reload.idReload);
    const moneyPic = useSelector(state => state.reload.money);
    const notePic = useSelector(state => state.reload.note);
    const datePic = useSelector(state => state.reload.date);
    const [isSelected, setSelection] = useState(false);
    useEffect(() => {
        if (moneyPic != undefined && notePic != undefined && datePic != undefined) {
            hanldChiTieu();
            setMoney(parseInt(moneyPic));
            setNoteGD(notePic);
            const newDate = new Date(datePic);
            setDate(newDate);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        }
    }, [idReload]);
    const dispatch = useDispatch();
    const [idIU, setidIU] = useState(idReload);
    const [dateNote, setdateNote] = useState(selectedDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    const hanldThuNhap = () => {
        setcolorThuNhap("#F9B79C");
        setcolorChiTieu("#E6E6FA");
        setcolorChuyenTien("#E6E6FA");
        setType(1);
    }

    const hanldChiTieu = () => {
        setcolorThuNhap("#E6E6FA");
        setcolorChiTieu("#91D8E5");
        setcolorChuyenTien("#E6E6FA");
        setType(-1);
        setSelection(false);
    }
    const hanldChuyenTien = () => {
        setcolorThuNhap("#E6E6FA");
        setcolorChiTieu("#E6E6FA");
        setcolorChuyenTien("#fedcba");
        setType(2);
        setSelection(false);
    }
    function convertVNDToWords(amount) {
        const units = ["", "Một ", "Hai ", "Ba ", "Bốn ", "Năm ", "Sáu ", "Bảy ", "Tám ", "Chín "];
        const teens = ["", "Mười một ", "Mười hai ", "Mười ba ", "Mười bốn ", "Mười lăm ", "Mười sáu ", "Mười bảy ", "Mười tám ", "Mười chín "];
        const tens = ["", "Mười ", "Hai Mươi ", "Ba Mươi ", "Bốn Mươi ", "Năm Mươi ", "Sáu Mươi ", "Bảy Mươi ", "Tám Mươi ", "Chín Mươi "];
        let words = "";
        let remainingAmount = amount;
        let unit = 0;
        while (remainingAmount > 0) {
            var divisor = Math.pow(1000, unit);
            var quotient = Math.floor(remainingAmount / divisor);
            remainingAmount -= quotient * divisor;
            unit += 1;

            if (quotient > 0) {
                if (quotient > 999999999) {
                    words += units[Math.floor(quotient / 1000000000)] + "Tỷ ";
                    quotient = quotient % 1000000000;
                }
                if (quotient > 99999999) {
                    words += units[Math.floor(quotient / 100000000)] + "Trăm  ";
                    quotient = quotient % 100000000;
                    if (quotient < 999999) {
                        words += "Triệu "
                    }
                }
                if (quotient > 9999999) {
                    words += tens[Math.floor(quotient / 10000000)];
                    quotient = quotient % 10000000;
                    if (quotient < 999999) {
                        words += "Triệu "
                    }
                }
                if (quotient > 999999) {
                    words += units[Math.floor(quotient / 1000000)] + "Triệu ";
                    quotient = quotient % 1000000;
                }
                if (quotient > 99999) {
                    words += units[Math.floor(quotient / 100000)] + "Trăm ";
                    quotient = quotient % 100000;
                    if (quotient < 999) {
                        words += "Ngàn "
                    }
                }
                if (quotient > 9999) {
                    words += tens[Math.floor(quotient / 10000)];
                    quotient = quotient % 10000;
                    if (quotient < 999) {
                        words += "Ngàn "
                    }
                }
                if (quotient > 999) {
                    words += units[Math.floor(quotient / 1000)] + "Ngàn ";
                    quotient = quotient % 1000;
                }
                if (quotient > 99) {
                    words += units[Math.floor(quotient / 100)] + "Trăm ";
                    quotient = quotient % 100;
                }
                if (quotient > 10 && quotient < 20) {
                    words += teens[quotient - 10];
                    quotient = quotient % 10;
                } else {
                    words += tens[Math.floor(quotient / 10)];
                    words += units[quotient % 10];
                }
                words += " ";
            }
        }
        return words;
    }
    const [moneyR, setMoneyR] = useState(parseFloat(money));
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };
    useEffect(() => {
        if (parseFloat(money) > 0) {
            setWordsMoney(convertVNDToWords(money) + "Đồng");
            setMoneyR(moneyFormat(parseFloat(money)));

        } else {
            setWordsMoney("");
            setMoneyR(0);
        }
    }, [money])
    useEffect(() => {
        if (parseFloat(money) > 0) {
            setMoneyR(moneyR.toString().replace("₫", ""));
        }
        else {
            setMoneyR(0);
        }
    }, [moneyR])
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const [dataJar, setDataJar] = useState([]);
    const [dataJarTo, setdataJarTo] = useState([]);
    const [dataJarTemp, setdataJarTemp] = useState([]);
    const [valuesDefaut, setvaluesDefaut] = useState("");
    const [valuesDefautTo, setvaluesDefautTo] = useState("");
    const [idJar, setisJar] = useState();
    const [idJarTo, setidJarTo] = useState();
    const [totalIncome, settotalIncome] = useState();
    const [totalSpending, settotalSpending] = useState();
    const [nameJar, setNameJar] = useState("");
    const [precentJar, SetprecentJar] = useState();
    const idUser = auth.currentUser.uid;
    // Nhận biết hủ hay nợ hay giấc mơ hay tài sản
    const [typeBasket, settypeBasket] = useState(1);
    const [availableBalancesI, setavailableBalancesI] = useState(0);
    // Tháng hiện tại
    const [month, setMonth] = useState(selectedDate.getMonth() + 1);
    // Năm hiện tại
    const [year, setYear] = useState(selectedDate.getFullYear());
    useEffect(() => {
        const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
            monthNumber: parseInt(month),
            yearNumber: parseInt(year)
        },
            {
                headers: { authorization: accessToken },
            })
            .then((res) => {
                setDataJar(res.data.map((item, index) => {
                    var obj = item.name;
                    if (index == 0) {
                        setvaluesDefaut(item.name)
                        setisJar(item.id)
                        settotalIncome(item.totalIncome);
                        settotalSpending(item.totalSpending);
                        setNameJar(item.name);
                        SetprecentJar(item.precent);
                        setavailableBalancesI(item.availableBalances);
                    }
                    return obj;
                }));
                setdataJarTo(res.data.map((item, index) => {
                    var obj = item.name;
                    if (index == 0) {
                        setvaluesDefautTo(item.name)
                        setidJarTo(item.id)
                    }
                    return obj;
                }));
                setdataJarTemp(res.data.map((item) => {
                    var objtemp = { id: item.id, name: item.name, population: item.precent, userId: item.userId, precent: item.precent, totalIncome: item.totalIncome, totalSpending: item.totalSpending, availableBalances: item.availableBalances };
                    return objtemp;
                }));

            }).catch((err) => {
                console.log(err);
            })
    }, [idReload, month, year]);
    const now = new Date(); // lấy thời gian hiện tại
    const onDateChange = (date) => {
        const newDate = new Date(date);
        if (now < newDate) {
            setModalVisible(!modalVisible);
            setDate(now);
            Alert.alert("Thông báo", "Không được chọn trước ngày hiện tại");
        }
        else {
            setDate(newDate);
            setModalVisible(!modalVisible);
        }

    }
    const clearField = () => {
        setMoney(0);
        setDate(selectedDate);
        setNoteGD("");
        setTagGD("");
        setWordsMoney("");
    }
    useEffect(() => {
        (type == 2) ?
            setNoteGD(`Chuyển tiền từ lọ ${valuesDefaut} sang ${valuesDefautTo}`)
            : (isSelected) ?
                setNoteGD('Tiền phân bố đều cho tất cả các lọ') : setNoteGD("")
    }, [type, isSelected, idJarTo]);
    useEffect(() => {
        if (dateGD != "") {
            const newDate = new Date(dateGD);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
            setMonth(newDate.getMonth() + 1);
            setYear(newDate.getFullYear());
        }
    }, [dateGD])
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const onHanldSave = () => {
        var mess = "";
        if (money == 0) {
            mess += "Số tiền phát sinh giao dịch không được bằng 0";
        }
        if (dateGD == "") {
            mess += "\nNgày giao dịch không được rỗng ";
        }
        if (noteGD == "") {
            mess += "\nGhi chú giao dịch không được rỗng ";
        }
        if (now.getMonth() + 1 != dateGD.getMonth() + 1) {
            mess += "\n Chỉ phát sinh giao dịch trong tháng hiện tại!";
        }
        if (money == 0 || noteGD == "" || dateGD == "" || now.getMonth() + 1 != dateGD.getMonth() + 1) {
            Alert.alert("Thông báo", mess);
        }
        if (money != 0 && noteGD != "" && dateGD != "" && now.getMonth() + 1 == dateGD.getMonth() + 1) {
            if (type != 2 && !isSelected) {
                axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction',
                    {
                        userId: idUser,
                        basketId: idJar,
                        createDate: dateGD,
                        moneyTransaction: parseFloat(money),
                        type: type,
                        note: `${noteGD}(${valuesDefaut})`,
                        typeBasket: typeBasket,
                    },
                    {
                        headers: {
                            authorization: accessToken
                        }
                    }
                ).then((res) => {
                    if (res.status == 200) {
                        if (type == 1) {
                            const income = parseInt(totalIncome) + parseInt(money);
                            axios.put(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${idJar}`,
                                {
                                    id: idJar,
                                    userId: idUser,
                                    name: nameJar,
                                    precent: precentJar,
                                    availableBalances: availableBalancesI + parseInt(money),
                                    totalSpending: totalSpending,
                                    totalIncome: income,
                                    type: 1,
                                    monthNumber: month,
                                    yearNumber: year,
                                },
                                {
                                    headers: {
                                        authorization: accessToken
                                    }
                                }).then((res) => {
                                    // (res.status == 200)? console.log('Lưu thu nhập thành công') : null;
                                    setidIU(idReload + 1);
                                    const item = idReload + 1;
                                    dispatch(reload_IU(item));
                                    clearField();
                                }).catch((err) => {
                                    console.log(err);
                                })
                        }
                        else if (type == -1) {
                            const spending = parseInt(totalSpending) + parseInt(money);
                            axios.put(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${idJar}`,
                                {
                                    id: idJar,
                                    userId: idUser,
                                    name: nameJar,
                                    precent: precentJar,
                                    availableBalances: availableBalancesI - parseInt(money),
                                    totalSpending: spending,
                                    totalIncome: totalIncome,
                                    monthNumber: month,
                                    yearNumber: year,
                                    type: 1,
                                },
                                {
                                    headers: {
                                        authorization: accessToken
                                    }
                                }).then((res) => {
                                    (res.status == 200) ? console.log('Lưu chi tiêu thành công') : null;
                                    setidIU(idReload + 1);
                                    const item = idReload + 1;
                                    dispatch(reload_IU(item));
                                    setColorSelect("#FF9999");
                                    dispatch(send_Photo_Success(undefined, undefined, undefined));
                                    clearField();
                                }).catch((err) => {
                                    console.log(err);
                                })
                        }
                        Alert.alert("Thông báo", "Lưu thành công")
                        clearField();
                        navigation.goBack();
                    }

                }).catch((err) => {
                    Alert.alert("Thông báo", "Lưu giao dịch lỗi")
                    console.log(err)
                })
            }
            else if (type == 2) {
                if (idJar == idJarTo) {
                    Alert.alert("Thông báo", "Không được chọn lọ trùng nhau")
                }
                else {
                    axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/transfer-money',
                        {
                            userId: idUser,
                            sentBasketId: idJar,
                            receiveBasketId: idJarTo,
                            money: parseFloat(money),
                            createdDate: dateGD,
                            note: noteGD
                        },
                        {
                            headers: {
                                authorization: accessToken
                            }
                        }).then((res) => {
                            (res.status == 200) ? console.log('Lưu chi tiêu thành công') : null;
                            setidIU(idReload + 1);
                            const item = idReload + 1;
                            dispatch(reload_IU(item));
                            setColorSelect("#FF9999");
                            setColorSelectTo("#FF9999");
                        }).catch((err) => {
                            console.log(err);
                        })
                    Alert.alert("Thông báo", "Lưu thành công")
                    clearField();
                    navigation.goBack();
                }
            }
            else if (type == 1 && isSelected) {
                axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/distribute-money',
                    {
                        userId: idUser,
                        money: parseFloat(money),
                        createdDate: dateGD,
                        note: noteGD,
                        monthNumber: parseInt(month),
                        yearNumber: parseInt(year)
                    },
                    {
                        headers: {
                            authorization: accessToken
                        }
                    }).then((res) => {
                        (res.status == 200) ? console.log('Lưu chi tiêu thành công') : null;
                        setidIU(idReload + 1);
                        const item = idReload + 1;
                        dispatch(reload_IU(item));
                        setColorSelect("#FF9999");
                        setColorSelectTo("#FF9999");
                        setSelection(false);
                    }).catch((err) => {
                        console.log(err);
                    })
                Alert.alert("Thông báo", "Lưu thành công")
                clearField();
                navigation.goBack();
            }
        }
    }
    useEffect(() => {
        if (route.params != undefined) {
            const { typeXL } = route.params;
            if (typeXL == 1) {
                setcolorThuNhap("#F9B79C");
                setcolorChiTieu("#E6E6FA");
                setcolorChuyenTien("#E6E6FA");
                setType(1);
            }
            else if (typeXL == -1) {
                setcolorThuNhap("#E6E6FA");
                setcolorChiTieu("#91D8E5");
                setcolorChuyenTien("#E6E6FA");
                setType(-1);
                setSelection(false);
            }
        }
    }, [route.params])
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
                        <CalendarPicker
                            onDateChange={onDateChange}
                            months={["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]}
                            nextTitle='Trước'
                            previousTitle='Sau'
                            weekdays={["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]}
                            selectMonthTitle='Tháng '
                            selectYearTitle='Năm '
                        >
                        </CalendarPicker>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.scrollview}>
                <View style={styles.containerTop}>
                    <TouchableOpacity onPress={hanldThuNhap} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorThuNhap }}>
                        <Text style={{ fontSize: 16 }}>Thu nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChiTieu} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorChiTieu }}>
                        <Text style={{ fontSize: 16 }}>Chi tiêu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChuyenTien} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorChuyenTien }}>
                        <Text style={{ fontSize: 16 }}>Chuyển tiền</Text>
                    </TouchableOpacity>
                </View>
                {
                    type == -1 &&
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                        <TouchableOpacity onPress={
                            () => {
                                navigation.navigate('CameraPic');
                            }
                        } style={{ width: 50, borderWidth: 0.5, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, display: 'flex', flexDirection: 'row' }}>
                            {/* <Text style={{ fontSize: 16 }}>Thêm nhanh</Text> */}
                            <Entypo name="camera" size={24} color="black" style={{}} />
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.containerInputMoney}>
                    <View style={{ flex: 0.2, justifyContent: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16 }}>Số tiền</Text>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput keyboardType='number-pad' onChangeText={x => {
                            const arr = x.split(".");
                            var moneyG = "";
                            if (arr.length > 0) {
                                arr.map((x) => {
                                    moneyG += x;
                                });
                                if (moneyG > 10000000001) {
                                    Alert.alert("Lỗi", `Không nhập quá 10 tỷ`)
                                }
                                setMoney(moneyG);
                            }
                            else {
                                setMoney(x)
                            }


                        }} placeholder="0" placeholderTextColor={'#000'} style={{ fontSize: 30, flex: 1, }}>{moneyR}</TextInput>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ width: 50, height: 30, backgroundColor: '#F0A587', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>VNĐ</Text>
                        </View>
                    </View>
                </View>
                {money != null &&
                    <View style={styles.containerMoneyWords}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', textAlign: 'center' }}>{wordsMoney}</Text>
                    </View>
                }

                {
                    (type == 2) && <Text style={{ fontSize: 16, marginLeft: 20, }}>Lọ gởi :</Text>
                }
                {
                    type == 1 &&
                    <View style={styles.containerJar}>
                        <SelectDropdown
                            data={dataJar}
                            disabled={isSelected ? true : false}
                            defaultButtonText={valuesDefaut}
                            buttonTextStyle={{ fontSize: 16, }}
                            onSelect={(selectedItem, index) => {
                                setvaluesDefaut(selectedItem);
                                (index == 0) ? setColorSelect("#FF9999") : (index == 1) ? setColorSelect("#6699FF") :
                                    (index == 2) ? setColorSelect("#FF6600") : (index == 3) ? setColorSelect("#00EE00") :
                                        (index == 4) ? setColorSelect("#8DEEEE") : setColorSelect("#F4A460")
                                dataJarTemp.map((item, index) => {
                                    if (selectedItem == item.name) {
                                        setisJar(item.id)
                                        settotalIncome(item.totalIncome);
                                        settotalSpending(item.totalSpending);
                                        setNameJar(item.name);
                                        SetprecentJar(item.precent);
                                        setavailableBalancesI(item.availableBalances);
                                    }
                                })
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={18} />;
                            }}
                            renderCustomizedButtonChild={value => {
                                return (
                                    <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center', flex: 1 }}>
                                        <View style={{ flex: 0.3, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[styles.containercustomSelectDropDown, { backgroundColor: colorSelect }]}>
                                                <Image source={require('../../../assets/icons/jar.png')} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 22, marginLeft: 20 }}>{valuesDefaut}</Text>
                                            <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nhấn để thay đổi</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            buttonStyle={styles.containerSelectDropDown}
                        />
                    </View>
                }
                {
                    type != 1 &&
                    <View style={styles.containerJar}>
                        <SelectDropdown
                            data={dataJar}
                            defaultButtonText={valuesDefaut}
                            buttonTextStyle={{ fontSize: 16, }}
                            onSelect={(selectedItem, index) => {
                                setvaluesDefaut(selectedItem);
                                (index == 0) ? setColorSelect("#FF9999") : (index == 1) ? setColorSelect("#6699FF") :
                                    (index == 2) ? setColorSelect("#FF6600") : (index == 3) ? setColorSelect("#00EE00") :
                                        (index == 4) ? setColorSelect("#8DEEEE") : setColorSelect("#F4A460")
                                dataJarTemp.map((item, index) => {
                                    if (selectedItem == item.name) {
                                        setisJar(item.id)
                                        settotalIncome(item.totalIncome);
                                        settotalSpending(item.totalSpending);
                                        setNameJar(item.name);
                                        SetprecentJar(item.precent);
                                        setavailableBalancesI(item.availableBalances);
                                    }
                                })
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={18} />;
                            }}
                            renderCustomizedButtonChild={value => {
                                return (
                                    <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center', flex: 1 }}>
                                        <View style={{ flex: 0.3, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[styles.containercustomSelectDropDown, { backgroundColor: colorSelect }]}>
                                                <Image source={require('../../../assets/icons/jar.png')} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 22, marginLeft: 20 }}>{valuesDefaut}</Text>
                                            <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nhấn để thay đổi</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            buttonStyle={styles.containerSelectDropDown}
                        />
                    </View>
                }
                {
                    type == 1 &&
                    <View style={{ display: 'flex', flexDirection: 'row', fontSize: 16, marginLeft: 20, marginRight: 20, marginTop: 15, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>Phân bổ đều cho tất cả các lọ </Text>
                    </View>
                }
                {
                    (type == 2) &&
                    <View>
                        <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 15, }}>Lọ nhận :</Text>
                        <View style={styles.containerJar}>
                            <SelectDropdown
                                data={dataJarTo}
                                defaultButtonText={valuesDefautTo}
                                buttonTextStyle={{ fontSize: 16, }}
                                onSelect={(selectedItem, index) => {
                                    setvaluesDefautTo(selectedItem);
                                    (index == 0) ? setColorSelectTo("#FF9999") : (index == 1) ? setColorSelectTo("#6699FF") :
                                        (index == 2) ? setColorSelectTo("#FF6600") : (index == 3) ? setColorSelectTo("#00EE00") :
                                            (index == 4) ? setColorSelectTo("#8DEEEE") : setColorSelectTo("#F4A460")
                                    dataJarTemp.map((item, index) => {
                                        if (selectedItem == item.name) {
                                            setidJarTo(item.id)
                                        }
                                    })
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={18} />;
                                }}
                                renderCustomizedButtonChild={value => {
                                    return (
                                        <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center', flex: 1 }}>
                                            <View style={{ flex: 0.3, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={[styles.containercustomSelectDropDown, { backgroundColor: colorSelectTo }]}>
                                                    <Image source={require('../../../assets/icons/jar.png')} />
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 22, marginLeft: 20 }}>{valuesDefautTo}</Text>
                                                <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nhấn để thay đổi</Text>
                                            </View>
                                        </View>
                                    );
                                }}
                                buttonStyle={styles.containerSelectDropDown}
                            />
                        </View>
                    </View>
                }
                <View style={styles.containerNote}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 60, display: 'flex', flexDirection: 'row', borderRadius: 20, }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/calendar.png')} />
                        </View>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, display: 'flex', flexDirection: 'row', width: "100%", }}>
                            <View style={{ flex: 0.8, width: "100%" }}>
                                <Text style={{ fontSize: 16, }}>{dateNote}</Text>
                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../../assets/icons/reset.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/icons/note.png')} />
                        </View>
                        <View style={{ flex: 0.8, justifyContent: 'center', borderBottomWidth: 1 }}>
                            <TextInput value={
                                (type == 2) ?
                                    `Chuyển tiền từ lọ ${valuesDefaut} sang ${valuesDefautTo}`
                                    : (isSelected) ?
                                        'Tiền phân bổ tất cả các lọ' : noteGD
                            } onChangeText={x => setNoteGD(x)} placeholder='Nhập chú thích giao dịch' style={{ fontSize: 16, marginLeft: 10, marginRight: 20, }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>

                    </View>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                        clearField();
                    }} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHanldSave} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Exchange;