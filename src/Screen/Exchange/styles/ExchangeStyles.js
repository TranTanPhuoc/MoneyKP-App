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
     containerTop:{
        marginTop:20,
        height:40,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'#E6E6FA',
        borderRadius:20,
        flex:1,
        display:'flex',
        flexDirection:'row'
     },
     containerInputMoney:{
        marginTop:20,
        height:70,
        marginLeft:15,
        marginRight:15,
        flex:1,
        display:'flex',
        flexDirection:'row',
     },
     containerMoneyWords:{
        height:60,
        marginLeft:15,
        marginRight:15,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
     }
});

export default styles;