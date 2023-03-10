import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5FA',
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
        borderWidth:0.5,
        marginRight:20,
        marginLeft:20,
        borderRadius:20,
        alignItems:"center",
        marginTop:20,
    },
    containerBottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:40,
    },
    bottom:{
        flex:1,
        backgroundColor:'#FF8247',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginRight:30,
        marginLeft:30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop:15,
        paddingBottom:15,
    },
    containerFooter:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default styles;