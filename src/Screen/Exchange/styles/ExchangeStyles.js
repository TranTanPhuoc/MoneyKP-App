import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5FA',
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
     },
     containerJar:{
      marginRight:15,
      marginLeft:15,
      justifyContent:'center',
      alignItems:'center'
     },
     containerSelectDropDown:{
      width:"100%", 
      borderRadius:10,
      backgroundColor:'#E6E6FA',
      borderWidth:1,
      borderColor:'black',
      height:80,
     },
     containercustomSelectDropDown:{
      height:60,
      width:60,
      justifyContent:"center",
      alignItems:'center',
      borderRadius:20,
     },
     containerNote:{
      marginTop:20,
      height:180,
      backgroundColor:'#fff',
      marginRight:15,
      marginLeft:15,
      borderRadius:20,
      flex:1,
      shadowOffset:{
         width:0,
         height:1,
      },
      shadowColor:'#999999',
      shadowOpacity: 0.5,
      shadowRadius: 2,
     },
     centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
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
});

export default styles;