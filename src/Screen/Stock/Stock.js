import { Alert, ScrollView, View } from 'react-native';
import { Text, SafeAreaView } from 'react-native';
import styles from "./styles/stockStyles";
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import axios from 'axios';
function Stock({ navigation, route }) {
    const [stock, setStock] = useState("");
    const [dataStock, setDataStock] = useState([]);
    const [nameStock, setNameStock] = useState("Không có dữ liệu");
    const [codeStock, setCodeStock] = useState("");
    const [money, setMoney] = useState(0);
    const [priceStock, setPriceStock] = useState(0);
    useEffect(() => {
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
            
            axios({
                url: 'https://finance.vietstock.vn/company/tradinginfo',
                method: 'POST',
                headers: {
                    'Content-Type':'text/plain'
                },
                data: `code=${codeStock}&s=0&t=&__RequestVerificationToken=bx-iabZXI1TIAkI4_J0Cmz5Bb2_sru91ot_TXq8nd0JNxhjOIr9UOzeZNBj3Bmw5fMNH6_Iw-b47M5KsCf2pQeW_s-hL6a28_y3I_ghgX9g1`
            }
            ).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [nameStock])
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
                        Chứng khoán
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.bodyContainerSearch}>
                    <TextInput maxLength={3} onChangeText={x => {
                        setStock(x);
                    }
                    }
                        value={stock} placeholder="Vui lòng nhập từ khóa cổ phiếu" style={{ flex: 1, fontSize: 20, height: "100%" }} />
                    <AntDesign name="search1" size={24} color="black" />
                </View>
                <View style={styles.bodyContainerField}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>
                        Tên cổ phiếu :
                    </Text>
                    <View style={styles.bodyContainerSearch}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>
                            {nameStock} {
                                codeStock != "" ? `(${codeStock})` : ""
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.bodyContainerField}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>
                        Giá thị trường của 1 cổ phiếu:
                    </Text>
                    <View style={styles.bodyContainerSearch}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>
                            {nameStock} {
                                codeStock != "" ? `(${codeStock})` : ""
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.bodyContainerField}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>
                        Số lượng cổ phiếu:
                    </Text>
                    <View style={styles.bodyContainerSearch}>
                        <TextInput keyboardType='number-pad' onChangeText={x => {
                            setMoney(x)
                        }} placeholder="0" placeholderTextColor={'#000'} style={{ fontSize: 20, flex: 1, }}>{money}</TextInput>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Stock;