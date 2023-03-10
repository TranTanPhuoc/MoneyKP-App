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

function Exchange({ navigation }) {
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
            setDate(datePic);
            const newDate = new Date(datePic);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));

        }
    }, [noteGD, moneyPic, datePic]);
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
        const units = ["", "M???t ", "Hai ", "Ba ", "B???n ", "N??m ", "S??u ", "B???y ", "T??m ", "Ch??n "];
        const teens = ["", "M?????i m???t ", "M?????i hai ", "M?????i ba ", "M?????i b???n ", "M?????i l??m ", "M?????i s??u ", "M?????i b???y ", "M?????i t??m ", "M?????i ch??n "];
        const tens = ["", "M?????i ", "Hai M????i ", "Ba M????i ", "B???n M????i ", "N??m M????i ", "S??u M????i ", "B???y M????i ", "T??m M????i ", "Ch??n M????i "];
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
                    words += units[Math.floor(quotient / 1000000000)] + "T??? ";
                    quotient = quotient % 1000000000;
                }
                if (quotient > 99999999) {
                    words += units[Math.floor(quotient / 100000000)] + "Tr??m  ";
                    quotient = quotient % 100000000;
                    if (quotient < 999999) {
                        words += "Tri???u "
                    }
                }
                if (quotient > 9999999) {
                    words += tens[Math.floor(quotient / 10000000)];
                    quotient = quotient % 10000000;
                    if (quotient < 999999) {
                        words += "Tri???u "
                    }
                }
                if (quotient > 999999) {
                    words += units[Math.floor(quotient / 1000000)] + "Tri???u ";
                    quotient = quotient % 1000000;
                }
                if (quotient > 99999) {
                    words += units[Math.floor(quotient / 100000)] + "Tr??m ";
                    quotient = quotient % 100000;
                    if (quotient < 999) {
                        words += "Ng??n "
                    }
                }
                if (quotient > 9999) {
                    words += tens[Math.floor(quotient / 10000)];
                    quotient = quotient % 10000;
                    if (quotient < 999) {
                        words += "Ng??n "
                    }
                }
                if (quotient > 999) {
                    words += units[Math.floor(quotient / 1000)] + "Ng??n ";
                    quotient = quotient % 1000;
                }
                if (quotient > 99) {
                    words += units[Math.floor(quotient / 100)] + "Tr??m ";
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
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    useEffect(() => {
        if (parseFloat(money) > 0) {
            setWordsMoney(convertVNDToWords(money) + "?????ng");
            setMoneyR(moneyFormat(parseFloat(money)));

        } else {
            setWordsMoney("");
            setMoneyR(0);
        }
    }, [money])
    useEffect(() => {
        if (parseFloat(money) > 0) {
            setMoneyR(moneyR.toString().replace("???", ""));
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
    // Nh???n bi???t h??? hay n??? hay gi???c m?? hay t??i s???n
    const [typeBasket, settypeBasket] = useState(1);
    const [availableBalancesI, setavailableBalancesI] = useState(0);
    useEffect(() => {
        const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/1`, {
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
    }, [idReload]);
    const onDateChange = (date) => {
        setDate(date);
        setModalVisible(!modalVisible);
    }
    const clearField = () => {
        setMoney(0);
        setDate(selectedDate);
        setNoteGD("");
        setTagGD("");
    }
    useEffect(() => {
        (type == 2) ?
            setNoteGD(`Chuy???n ti???n t??? l??? ${valuesDefaut} sang ${valuesDefautTo}`)
            : (isSelected) ?
                setNoteGD('Ti???n ph??n b??? ?????u cho t???t c??? c??c l???') : setNoteGD("")
    }, [type, isSelected]);
    useEffect(() => {
        if (dateGD != "") {
            const newDate = new Date(dateGD);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        }
    }, [dateGD])
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const onHanldSave = () => {
        var mess = "";
        if (money == 0) {
            mess += "S??? ti???n ph??t sinh giao d???ch kh??ng ???????c b???ng 0";
        }
        if (dateGD == "") {
            mess += "\nNg??y giao d???ch kh??ng ???????c r???ng ";
        }
        if (noteGD == "") {
            mess += "\nGhi ch?? giao d???ch kh??ng ???????c r???ng ";
        }
        if (money == 0 || noteGD == "" || dateGD == "") {
            Alert.alert("Th??ng b??o", mess);
        }
        if (money != 0 && noteGD != "" && dateGD != "") {
            if (type != 2 && !isSelected) {
                axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction',
                    {
                        userId: idUser,
                        basketId: idJar,
                        createDate: dateGD,
                        moneyTransaction: parseFloat(money),
                        type: type,
                        note: noteGD,
                        typeBasket: typeBasket
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
                                    availableBalances: availableBalancesI + income,
                                    totalSpending: totalSpending,
                                    totalIncome: income,
                                    type: 1,
                                },
                                {
                                    headers: {
                                        authorization: accessToken
                                    }
                                }).then((res) => {
                                    // (res.status == 200)? console.log('L??u thu nh???p th??nh c??ng') : null;
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
                                    availableBalances: availableBalancesI - spending,
                                    totalSpending: spending,
                                    totalIncome: totalIncome,
                                    type: 1,
                                },
                                {
                                    headers: {
                                        authorization: accessToken
                                    }
                                }).then((res) => {
                                    (res.status == 200) ? console.log('L??u chi ti??u th??nh c??ng') : null;
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
                        Alert.alert("Th??ng b??o", "L??u th??nh c??ng")
                        clearField();
                        navigation.navigate('Exchange');
                    }

                }).catch((err) => {
                    Alert.alert("Th??ng b??o", "L??u giao d???ch l???i")
                    console.log(err)
                })
            }
            else if (type == 2) {
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
                        (res.status == 200) ? console.log('L??u chi ti??u th??nh c??ng') : null;
                        setidIU(idReload + 1);
                        const item = idReload + 1;
                        dispatch(reload_IU(item));
                        setColorSelect("#FF9999");
                        setColorSelectTo("#FF9999");
                    }).catch((err) => {
                        console.log(err);
                    })
                Alert.alert("Th??ng b??o", "L??u th??nh c??ng")
                clearField();
                navigation.navigate('Exchange');
            }
            else if (type == 1 && isSelected) {
                axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/distribute-money',
                    {
                        userId: idUser,
                        money: parseFloat(money),
                        createdDate: dateGD,
                        note: noteGD
                    },
                    {
                        headers: {
                            authorization: accessToken
                        }
                    }).then((res) => {
                        (res.status == 200) ? console.log('L??u chi ti??u th??nh c??ng') : null;
                        setidIU(idReload + 1);
                        const item = idReload + 1;
                        dispatch(reload_IU(item));
                        setColorSelect("#FF9999");
                        setColorSelectTo("#FF9999");
                        setSelection(false);
                    }).catch((err) => {
                        console.log(err);
                    })
                Alert.alert("Th??ng b??o", "L??u th??nh c??ng")
                clearField();
                navigation.navigate('Exchange');
            }
        }
    }

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
            <ScrollView style={styles.scrollview}>
                <View style={styles.containerTop}>
                    <TouchableOpacity onPress={hanldThuNhap} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorThuNhap }}>
                        <Text style={{ fontSize: 16 }}>Thu nh???p</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChiTieu} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorChiTieu }}>
                        <Text style={{ fontSize: 16 }}>Chi ti??u</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChuyenTien} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorChuyenTien }}>
                        <Text style={{ fontSize: 16 }}>Chuy???n ti???n</Text>
                    </TouchableOpacity>
                </View>
                {
                    type == -1 &&
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                        <TouchableOpacity onPress={
                            () => {
                                navigation.navigate('CameraExchange');
                            }
                        } style={{ width: 130, borderWidth: 0.5, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16 }}>Th??m nhanh</Text>
                            <Entypo name="camera" size={24} color="black" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.containerInputMoney}>
                    <View style={{ flex: 0.2, justifyContent: 'flex-start', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16 }}>S??? ti???n</Text>
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
                                        Alert.alert("L???i", `Kh??ng nh???p qu?? 10 t???`)
                                    }
                                    setMoney(moneyG);
                                }
                                else{
                                    setMoney(x)
                                }
                            
                        }} placeholder="0" placeholderTextColor={'#000'} style={{ fontSize: 30, flex: 1, }}>{moneyR}</TextInput>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ width: 50, height: 30, backgroundColor: '#F0A587', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>VN??</Text>
                        </View>
                    </View>
                </View>
                {money != null &&
                    <View style={styles.containerMoneyWords}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', textAlign: 'center' }}>{wordsMoney}</Text>
                    </View>
                }

                {
                    (type == 2) && <Text style={{ fontSize: 20, marginLeft: 20, }}>L??? g???i :</Text>
                }
                {
                    type == 1 && !isSelected &&
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
                                            <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nh???n ????? thay ?????i</Text>
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
                                            <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nh???n ????? thay ?????i</Text>
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
                    <View style={{ display: 'flex', flexDirection: 'row', fontSize: 20, marginLeft: 20, marginRight: 20, marginTop: 15, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>Ph??n b??? ?????u cho t???t c??? c??c l??? </Text>
                    </View>
                }
                {
                    (type == 2) &&
                    <View>
                        <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 15, }}>L??? nh???n :</Text>
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
                                                <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, }}>Nh???n ????? thay ?????i</Text>
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
                                    `Chuy???n ti???n t??? l??? ${valuesDefaut} sang ${valuesDefautTo}`
                                    : (isSelected) ?
                                        'Ti???n ph??n b??? ?????u cho t???t c??? c??c l???' : noteGD
                            } onChangeText={x => setNoteGD(x)} placeholder='Nh???p ch?? th??ch giao d???ch' style={{ fontSize: 16, marginLeft: 10, marginRight: 20, }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>

                    </View>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>H???y</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHanldSave} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>L??u</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Exchange;