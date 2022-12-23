import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/LoginStyles";
function Login(){
    const navigation = useNavigation();
    // const chuyenTrang = ()=>{
    //     navigation.navigate('')
    // }
    return(
        <SafeAreaView style={styles.container} >
            <Text>ABC</Text>
        </SafeAreaView>
    );
}

  
export default Login;