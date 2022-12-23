import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/WalletStyles";
function Wallet(){
    return(
        <SafeAreaView style={styles.container} >
            <Text>Wallet Screen</Text>
        </SafeAreaView>
    );
}

  
export default Wallet;