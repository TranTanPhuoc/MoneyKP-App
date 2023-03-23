import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import styles from './styles/PhotoStyles'
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { useDispatch } from "react-redux";
import { send_Photo_Success } from "../../redux/action/ActionRedux";
function PhotoCameraPic({ navigation, route }) {
    const { photo } = route.params;
    const dispatch = useDispatch();
    const hanldPressClose = () => {
        navigation.goBack();
    }
    const hanldNext = () => {
        let localUri = photo;
        let formData = new FormData();
        let uriParts = localUri.split(".");
        const path = localUri.split("/");
        let fileType = uriParts[uriParts.length - 1];
        let nameFile = path[path.length - 1];
        const _image = {
            uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""),
            type: `image/${fileType}`,
            name: nameFile,
        };
        formData.append("document", _image);
        axios.post('https://api.mindee.net/v1/products/mindee/expense_receipts/v4/predict', formData, {
            headers: {
                'Authorization': '7734748aa782d2162471ad4fccc411f5',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                const money = response.data.document.inference.pages[0].prediction.total_amount.value;
                const note = response.data.document.inference.pages[0].prediction.supplier.value;
                const date = response.data.document.inference.started_at;
                dispatch(send_Photo_Success(money, note, date));
                navigation.navigate("Tabs");
            })
            .catch((error) => {
                alert("Error");
                console.error(error);
            });




    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, alignItems: "flex-end", width: "100%", justifyContent: 'flex-end', paddingRight: 10, backgroundColor: "#1C1C1C", marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: "row" }}>
                    <TouchableOpacity onPress={hanldPressClose} >
                        <AntDesign name="closecircle" size={32} color="white" style={{ marginTop: 20, marginRight: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.camera}>
                <Image style={{ height: "80%", width: '95%' }} source={{ uri: photo }}>

                </Image>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>

                </View>
                <View style={styles.button}>
                </View>

                <TouchableOpacity onPress={hanldNext} style={styles.button}>
                    <View style={{ width: 60, height: 60, backgroundColor: '#fff', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/icons/right.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PhotoCameraPic;