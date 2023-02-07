import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5FA',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerheader:{
      height:50,
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'row',
    },
    containerheader_icon:{
      flex:0.2,
      justifyContent:'center',
      marginLeft:20,
    },
    containerheader_title:{
      flex:0.6,
      justifyContent:'center',
      alignItems:'center'
    },
    fontTitle:{
      fontSize:18,
      fontWeight:'500'
    },
    viewBody:{
      marginLeft:10,
      marginRight:10,
      marginTop:20,
   },
   viewBody_avt:{
        height:140,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    avt:{
        height:100,
        width:100,
        backgroundColor:'red',
        borderRadius:100,
    },
    camera:{
        height:40,
        width:40,
        backgroundColor:"#C0C0C0",
        top:-25,
        right:-20,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    containerFunc:{
        height:200,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        margin:5,
    },
    funcItem:{
      flex:0.33333,
      marginLeft:10,
      marginRight:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:0.4,
    },
    funcItemLast:{
      flex:0.33333,
      marginLeft:10,
      marginRight:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    },
    button:{
      height:60,
      backgroundColor: '#fff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      margin:5,
      justifyContent:'center',
      alignItems:'center'
    }
});

export default styles;