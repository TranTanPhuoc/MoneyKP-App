import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerTop:{
        flex:0.1,
        display:'flex',
        flexDirection:'row',
        marginRight:10,
        marginLeft:10,
        alignItems:'center',
    },
    containerBody:{
        flex:0.7,
        justifyContent:'center',
        alignItems:'center',
    },
    containerInput:{
        display:'flex',
        flexDirection:'row',
        borderWidth:1,
        marginRight:10,
        marginLeft:10,
        borderRadius:20,
        alignItems:"center",
        marginTop:20,
    },
    containerBottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        paddingRight:10,
        marginTop:40,
    },
    bottom:{
        flex:1,
        height:60,
        backgroundColor:'#FF8247',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        marginLeft:10,
    },
    containerFooter:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default styles;