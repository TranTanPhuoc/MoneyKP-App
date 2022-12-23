import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/RegisterStyles";
function Register(){
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container} >
            <Text>Màn hình 2</Text>
        </SafeAreaView>
    );
}

export default Register;