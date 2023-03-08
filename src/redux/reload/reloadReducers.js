const initialState = {
    isAuthenticated: false,
    idReload: null,
  };
  
  const reloadReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'RELOAD_IU':
        return {
          ...state,
          isAuthenticated: true,
          idReload: action.payload,
        };
      case 'SEND_PHOTO_SUCCESS':
        return{
          ...state,
          isAuthenticated: true,
          money: action.payload.money,
          note : action.payload.note,
          date : action.payload.date
        }
      default:
        return state;
    }
  };
  
export default reloadReducer;