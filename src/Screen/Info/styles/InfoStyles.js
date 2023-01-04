import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollview:{
        marginLeft:10,
        marginRight:10, 
        marginBottom:80,
     },
});

export default styles;