import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeOtherStyles";
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
import { reload_IU } from '../../redux/action/ActionRedux';
import { colorJar } from '../../../assets/AppColors/AppColors';

function ExchangeOther({ navigation }) {
    const [money, setMoney] = useState("");
    const [wordsMoney, setWordsMoney] = useState("");
    const [colorSelect, setColorSelect] = useState("#FF9999");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateGD, setDate] = useState(selectedDate);
    const [noteGD, setNoteGD] = useState("");
    const [colorSelectTo, setColorSelectTo] = useState("#FF9999");
    const [dataJarTo, setdataJarTo] = useState([]);
    const [valuesDefautTo, setvaluesDefautTo] = useState("");
    const idReload = useSelector(state => state.reload.idReload);
    const dispatch = useDispatch();
    const [idIU, setidIU] = useState(idReload);
    const [colorLo, setcolorLo] = useState(colorJar[0]);
    const [colorTS, setcolorTS] = useState(colorJar[1]);
    const [colorTSNap, setcolorTSNap] = useState(colorJar[8]);
    const [colorTSRut, setcolorTSRut] = useState("");
    const [colorNo, setcolorNo] = useState("");
    const [colorNoThem, setcolorNoThem] = useState(colorJar[5]);
    const [colorNoGiam, setcolorNoGiam] = useState("");
    const [colorMoUoc, setcolorMoUoc] = useState("");
    const [colorMoUocThem, setcolorMoUocThem] = useState(colorJar[5]);
    const [colorMoUocChuyen, setcolorMoUocChuyen] = useState("");
    const [typeBasket, settypeBasket] = useState(4);
    const [type, settype] = useState(1);
    const [dateNote, setdateNote] = useState(selectedDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    const [moneyPurpose, setmoneyPurpose] = useState();
    const [status, setstatus] = useState();
    const [createdDate, setcreatedDate] = useState();
    const [datedComplete, setdatedComplete] = useState();
    const hanldTaiSan = () => {
        setcolorLo("#E6E6FA");
        setcolorTS(colorJar[1]);
        setcolorNo("#E6E6FA");
        setcolorMoUoc("#E6E6FA");
        settypeBasket(4);
    }
    const hanldTaiSanNap = () => {
        setcolorTSNap(colorJar[8]);
        setcolorTSRut("#E6E6FA");
        settypeBasket(4);
        settype(1);
    }
    const hanldTaiSanRut = () => {
        setcolorTSRut(colorJar[9]);
        setcolorTSNap("#E6E6FA");
        settypeBasket(4);
        settype(-1);
    }
    const hanldMoUoc = () => {
        setcolorTS("#E6E6FA");
        setcolorMoUoc(colorJar[2]);
        setcolorNo("#E6E6FA");
        setcolorLo("#E6E6FA");
        settypeBasket(3);
    }
    const hanldMoUocThem = () => {
        setcolorMoUocThem(colorJar[5]);
        setcolorMoUocChuyen("#E6E6FA");
        settypeBasket(3);
        settype(1);
    }
    const hanldMoUocChuyen = () => {
        setcolorMoUocChuyen(colorJar[6]);
        setcolorMoUocThem("#E6E6FA");
        settypeBasket(3);
        settype(2);
    }
    const hanldNo = () => {
        setcolorTS("#E6E6FA");
        setcolorNo(colorJar[3]);
        setcolorLo("#E6E6FA");
        setcolorMoUoc("#E6E6FA");
        settypeBasket(2);
    }
    const hanldNoThem = () => {
        setcolorNoThem(colorJar[5]);
        setcolorNoGiam("#E6E6FA");
        settype(1);
    }
    const hanldNoGiam = () => {
        setcolorNoGiam(colorJar[6]);
        setcolorNoThem("#E6E6FA");
        settype(-1);
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
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 3,
        });
    };
    useEffect(() => {
        if (money > 0) {
            setWordsMoney(convertVNDToWords(money) + "Đồng");
            setMoneyR(moneyFormat(parseFloat(money)));

        } else {
            setWordsMoney("");
            setMoneyR(0);
        }
    }, [money]);

    useEffect(() => {
        if (money > 0) {
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
    const [dataJarTemp, setdataJarTemp] = useState([]);
    const [valuesDefaut, setvaluesDefaut] = useState("");

    const onDateChange = (date) => {
        setDate(date);
        setModalVisible(!modalVisible);
    }
    const clearField = () => {
        setMoney(0);
        setDate(selectedDate);
        setNoteGD(selectedDate);
    }
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
        if (money == 0 || noteGD == "" || dateGD == "") {
            Alert.alert("Thông báo", mess);
        }
        if (money != 0 && noteGD != "" && dateGD != "") {
            if (type != 2) {
                if (type == 1) {
                    if (availableBalancesI + parseInt(money) > moneyPurpose) {
                        Alert.alert("Thông báo", `Nhập tiền đã vượt mức tiền đã thiết lập trước đó \n Số tiền cần nhập thấp hơn ${moneyPurpose - availableBalancesI}`)
                    }
                    else {
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
                                    if (availableBalancesI + parseInt(money) < moneyPurpose) {
                                        axios.put(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${idJar}`,
                                            {
                                                id: idJar,
                                                userId: idUser,
                                                name: nameJar,
                                                precent: precentJar,
                                                availableBalances: availableBalancesI + parseInt(money),
                                                totalSpending: totalSpending,
                                                totalIncome: income,
                                                createdDate: createdDate,
                                                datedComplete: datedComplete,
                                                moneyPurpose: moneyPurpose,
                                                status: status
                                            },
                                            {
                                                headers: {
                                                    authorization: accessToken
                                                }
                                            }).then((res) => {
                                                setidIU(idReload + 1);
                                                const item = idReload + 1;
                                                dispatch(reload_IU(item));
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                    }
                                    else if (availableBalancesI + parseInt(money) == moneyPurpose) {
                                        axios.put(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${idJar}`,
                                            {
                                                id: idJar,
                                                userId: idUser,
                                                name: nameJar,
                                                precent: precentJar,
                                                availableBalances: availableBalancesI + parseInt(money),
                                                totalSpending: totalSpending,
                                                totalIncome: income,
                                                createdDate: createdDate,
                                                datedComplete: datedComplete,
                                                moneyPurpose: moneyPurpose,
                                                status: 1
                                            },
                                            {
                                                headers: {
                                                    authorization: accessToken
                                                }
                                            }).then((res) => {
                                                setidIU(idReload + 1);
                                                const item = idReload + 1;
                                                dispatch(reload_IU(item));
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                    }
                                }
                                Alert.alert("Thông báo", "Lưu thành công")
                                clearField();
                                navigation.navigate('ExchangeOther');
                            }
                        }).catch((err) => {
                            Alert.alert("Thông báo", "Lưu giao dịch lỗi")
                            console.log(err)
                        })
                    }
                }
                if (type == -1) {
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
                            if (type == -1) {
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
                                        createdDate: createdDate,
                                        datedComplete: datedComplete,
                                        moneyPurpose: moneyPurpose,
                                        status: status
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
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                            }
                            Alert.alert("Thông báo", "Lưu thành công")
                            clearField();
                            navigation.navigate('ExchangeOther');
                        }
                    }).catch((err) => {
                        Alert.alert("Thông báo", "Lưu giao dịch lỗi")
                        console.log(err)
                    })

                }

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
                        (res.status == 200) ? console.log('Lưu chi tiêu thành công') : null;
                        setidIU(idReload + 1);
                        const item = idReload + 1;
                        dispatch(reload_IU(item));
                        setColorSelect("#FF9999");
                    }).catch((err) => {
                        console.log(err);
                    })
                Alert.alert("Thông báo", "Lưu thành công")
                clearField();
                navigation.navigate('ExchangeOther');
            }
        }
    }
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const idUser = auth.currentUser.uid;
    const [idJar, setisJar] = useState();
    const [idJarTo, setidJarTo] = useState();
    const [totalIncome, settotalIncome] = useState();
    const [totalSpending, settotalSpending] = useState();
    const [nameJar, setNameJar] = useState("");
    const [precentJar, SetprecentJar] = useState();
    const [availableBalancesI, setavailableBalancesI] = useState(0);
    useEffect(() => {
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${typeBasket}/0`, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                if (res.data.length != 0) {
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
                            setmoneyPurpose(item.moneyPurpose);
                            setstatus(item.status);
                            setdatedComplete(item.datedComplete);
                            setcreatedDate(item.createdDate);
                        }
                        return obj;
                    }));
                    setdataJarTemp(res.data.map((item) => {
                        var objtemp = {
                            id: item.id, name: item.name, population: item.precent, userId: item.userId,
                            precent: item.precent, totalIncome: item.totalIncome, totalSpending: item.totalSpending,
                            availableBalances: item.availableBalances, moneyPurpose: item.moneyPurpose, datedComplete: item.datedComplete,
                            createdDate: item.createdDate, status: item.status
                        };
                        return objtemp;
                    }));
                    setdataJarTo(res.data.map((item, index) => {
                        var obj = item.name;
                        if (index == 0) {
                            setvaluesDefautTo(item.name)
                            setidJarTo(item.id)
                        }
                        return obj;
                    }));
                }
                else {
                    setDataJar([]);
                    setdataJarTemp([]);
                    setvaluesDefaut("");
                    setisJar()
                    settotalIncome();
                    settotalSpending();
                    setNameJar();
                    SetprecentJar();
                    setavailableBalancesI();
                    setmoneyPurpose();
                    setstatus();
                    setdatedComplete();
                    setcreatedDate();
                }

            }).catch((err) => {
                console.log(err);
            })
    }, [idReload, typeBasket]);
    useEffect(() => {
        if (type != 2) {
            setNoteGD("")
        }
        else {
            setNoteGD(`Chuyển tiền từ lọ ${valuesDefaut} sang ${valuesDefautTo}`);
        }
    }, [type, valuesDefaut, valuesDefautTo]);
    useEffect(() => {
        if (dateGD != "") {
            const newDate = new Date(dateGD);
            setdateNote(newDate.toLocaleDateString('VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        }
    }, [dateGD])
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
                    <TouchableOpacity onPress={hanldTaiSan} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorTS }}>
                        <Text style={{ fontSize: 16 }}>Tài sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldMoUoc} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorMoUoc }}>
                        <Text style={{ fontSize: 16 }}>Mơ ước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldNo} style={{ flex: 0.33333, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorNo }}>
                        <Text style={{ fontSize: 16 }}>Nợ</Text>
                    </TouchableOpacity>
                </View>
                {typeBasket == 4 &&
                    <View style={[styles.containerTop, { marginLeft: 40, marginRight: 40 }]}>
                        <TouchableOpacity onPress={hanldTaiSanNap} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorTSNap }}>
                            <Text style={{ fontSize: 16 }}>Nạp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldTaiSanRut} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorTSRut }}>
                            <Text style={{ fontSize: 16 }}>Rút</Text>
                        </TouchableOpacity>
                    </View>
                }
                {typeBasket == 2 &&
                    <View style={[styles.containerTop, { marginLeft: 40, marginRight: 40 }]}>
                        <TouchableOpacity onPress={hanldNoThem} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorNoThem }}>
                            <Text style={{ fontSize: 16 }}>Thêm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldNoGiam} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorNoGiam }}>
                            <Text style={{ fontSize: 16 }}>Giảm</Text>
                        </TouchableOpacity>
                    </View>
                }
                {typeBasket == 3 &&
                    <View style={[styles.containerTop, { marginLeft: 40, marginRight: 40 }]}>
                        <TouchableOpacity onPress={hanldMoUocThem} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorMoUocThem }}>
                            <Text style={{ fontSize: 16 }}>Thêm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldMoUocChuyen} style={{ flex: 0.5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorMoUocChuyen }}>
                            <Text style={{ fontSize: 16 }}>Chuyển</Text>
                        </TouchableOpacity>
                    </View>
                }
                {typeBasket != 4 && dataJarTemp.length > 0 &&
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}>
                            Số tiền cần thêm vào để hoàn thành ước mơ là :{'\n'}{moneyFormat(moneyPurpose - availableBalancesI)}</Text>
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
                    (type == 2) &&
                    <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 15, }}>Mục mơ ước gởi :</Text>
                }
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
                                    setmoneyPurpose(item.moneyPurpose);
                                    setstatus(item.status);
                                    setdatedComplete(item.datedComplete);
                                    setcreatedDate(item.createdDate);
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
                {
                    (type == 2) &&
                    <View>
                        <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 15, }}>Mục mơ ước nhận :</Text>
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
                            <TextInput value={noteGD} onChangeText={x => setNoteGD(x)} placeholder='Nhập chú thích giao dịch' style={{ fontSize: 16, marginLeft: 10, marginRight: 20, }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>

                    </View>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHanldSave} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default ExchangeOther;