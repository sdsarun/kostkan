import { createContext, useContext, useReducer } from "react";

const HeadersContext = createContext([{}]);
const HeadersDispatch = createContext({});

export function useHeaders() {
  return useContext(HeadersContext);
}

export function useHeadersDispatch() {
  return useContext(HeadersDispatch);
}

export function HeadersProvider({ children }) {
  const [headers, dispatch] = useReducer(headersReducer, []);

  console.log(headers);

  function inputHeaderName(newName, index) {
    dispatch({
      type: "INPUT_NAME",
      payload: {
        index,
        newName,
      }
    })
  }

  function inputHeaderValue(newValue, index) {
    dispatch({
      type: "INPUT_VALUE",
      payload: {
        index,
        newValue,
      }
    })
  }

  function createHeader() {
    dispatch({
      type: "ADD_HEADERS",
      payload: {
        id: crypto.randomUUID(),
        name: "",
        value: ""
      }
    })
  }

  function deleteHeader(index) {
    dispatch({
      type: "DELETE_HEADERS",
      payload: {
        index
      }
    })
  }

  const headersDispatch = {
    inputHeaderName,
    inputHeaderValue,
    createHeader,
    deleteHeader
  }

  return (
    <HeadersContext.Provider value={headers}>
      <HeadersDispatch.Provider value={headersDispatch}>
        {children}
      </HeadersDispatch.Provider>
    </HeadersContext.Provider>
  )
}

function headersReducer(headers, action) {
  switch (action.type) {
    case "INPUT_NAME": {
      const { newName, index } = action.payload;
      const updateState = headers.map((header, idx) => {
        if (idx === index) {
          return {
            ...header,
            name: newName
          }
        }
        return header;
      })

      return updateState;
    }

    case "INPUT_VALUE": {
      const { newValue, index } = action.payload;
      const updateState = headers.map((header, idx) => {
        if (idx === index) {
          return {
            ...header,
            value: newValue
          }
        }
        return header;
      })

      return updateState;
    }

    case "ADD_HEADERS": {
      const { name, value, id } = action.payload;
      console.log("adding. ", name, value);
      return [
        ...headers,
        {
          id,
          name,
          value,
        }
      ]
    }

    case "DELETE_HEADERS": {
      const { index } = action.payload;
      return headers.filter((header, idx) => idx !== index);
    }
  }
}