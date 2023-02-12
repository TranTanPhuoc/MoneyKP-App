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
      default:
        return state;
    }
  };
  
export default reloadReducer;