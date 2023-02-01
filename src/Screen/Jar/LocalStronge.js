import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveObjectOrder = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(value.id, jsonValue);
    } catch (e) {}
  };

  export const getAllOrder = async () => {
    let list_order;
    let new_listOrder = [];
    try {
      let keys = await AsyncStorage.getAllKeys();
      list_order = await AsyncStorage.multiGet(keys);
      list_order.forEach((list) => {
        new_listOrder.push(JSON.parse(list[1]));
      });
      // await AsyncStorage.multiRemove(value);
    } catch (e) {
      console.log(e);
    }
    return new_listOrder[0].data;
  };
  export const update = async (value,id) => {
    try {
      var valueOrder = await AsyncStorage.getItem(id);
      valueOrder = JSON.parse(valueOrder).data;
      valueOrder[value.id-1] = value;
      const key = {id : "1", data: valueOrder}
      await AsyncStorage.setItem(id,JSON.stringify( key));
    //   console.log(valueOrder);
    } catch (error) {}
  };
  