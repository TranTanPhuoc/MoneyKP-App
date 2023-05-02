import { Text, SafeAreaView, Alert, Image, } from 'react-native';


function NewScreen({ navigation }) {
    
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <Text style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>Tính năng đang phát triển</Text>
        </SafeAreaView>
    );
}


export default NewScreen;