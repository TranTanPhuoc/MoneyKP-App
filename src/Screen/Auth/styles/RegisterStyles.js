import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});

export default styles;