import React, { createContext, useContext, useReducer } from 'react';


const initialState = {
  walletConnected: false,
  currentAddress: "",
  balance:0,
  mapConfig:{},
  records:[]
};

function reducer(state, action) {
  switch (action.type) {
    case 'walletConnected':
      if (action.value) {
        return {
          ...state,
          walletConnected: action.value,
        };
      }
      return {
        ...state,
        walletConnected: action.value,
        currentAddress: "",
      };

    case 'currentAddress':
      return {
        ...state,
        currentAddress: action.value,
      };
    case 'balance':
      return {
        ...state,
        balance: action.value
      }
    case 'mapConfig':
      return {
        ...state,
        mapConfig: action.value
      }
    case 'records':
      console.log(action.value)
      return {
        ...state,
        records: action.value
      }
    default:
      throw new Error();
  }
}

const Context = createContext();

function useStore() {
  return useContext(Context);
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export { useStore, StoreProvider };