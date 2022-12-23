import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/AccountStyles";
function Account(){
    return(
        <SafeAreaView style={styles.container} >
            <Text>Account</Text>
        </SafeAreaView>
    );
}

  
export default Account;