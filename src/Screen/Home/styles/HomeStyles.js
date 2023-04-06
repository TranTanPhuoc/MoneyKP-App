import { Platform, StatusBar, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollview: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 80,
    },
    containerTop: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    containerTopImage: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTopName: {
        flex: 0.6,
        marginLeft: 10,
        width: "100%",
    },
    containerTopIcon: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    containerInfoWallet: {
        marginTop: 15,
        flex: 1,
    },
    containerItem: {
        flex: 0.5,
        backgroundColor: '#E6E6FA',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#999999',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        height: 80,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
    },
    containerItemTop: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerListJar: {
        marginTop: 20,
    },
    containerListJarItem: {
        marginTop: 20,
        width: "100%",
        backgroundColor: '#E6E6FA',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#999999',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 40,
    },
    containerListJarItem_Item: {
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        flex: 1,
    },
    containerListJars: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#f5866e',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
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
    containerItemSelect: {
        height: 80,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: 10, backgroundColor: '#E6E6FA',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#999999',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 20,
        marginRight: 10,
    },
    buttom: {
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        height: 30,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#999999',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 20,
    },
});

export default styles;