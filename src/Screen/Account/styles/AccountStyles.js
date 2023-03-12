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
        marginTop: 10,
        display:'flex',
        flexDirection:'row',
        flex:1,
        marginLeft:15,
    },
    containerTopImage:{
        flex:0.15,
        justifyContent:'center',   
        alignItems:'center'
    },
    containerTopName:{
        flex:0.7,
        marginLeft:10,
    },
    containerTopIcon:{
        flex:0.15,
        justifyContent:'center',   
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
    },
    containerEditInfo:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:15,
        marginLeft:15,
    },
    containerPrInfo:{
        marginTop:20,
        height:120,
        backgroundColor:"#E6E6FA",
        borderRadius:20,
    },
    containerPrInfoItem:{
        height:60,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flex:1,
    },
    containerPrInfo1:{
        marginTop:20,
        height:180,
        backgroundColor:"#E6E6FA",
        borderRadius:20,
    },
    containerPrInfo2:{
        marginTop:20,
        height:60,
        backgroundColor:"#E6E6FA",
        borderRadius:20,
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