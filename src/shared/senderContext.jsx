import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useHeaders } from "./headersContext";

const SenderContext = createContext({});
const SenderDispatch = createContext();

export function useSender() {
  return useContext(SenderContext);
}

export function useSenderDispatch() {
  return useContext(SenderDispatch);
}

export function SenderProvider({ children }) {
  const [message, dispatch] = useReducer(senderReducer, {
    request: {
      method: "GET",
      url: "",
      headers: {},
      data: {}
    },
    response: {
      headers: {},
      data: {}
    }
  });

  const headers = useHeaders();

  useEffect(() => {
    let loading = true;
    if (loading) {
      setHeaders()
    }
    return () => loading = false;
  }, [headers])

  console.log("Headers : ", headers);
  console.log("sender : ", message);

  function setMethod(method) {
    dispatch({
      type: "SET_METHOD",
      payload: {
        method
      }
    })
  }

  function setURL(url) {
    dispatch({
      type: "SET_URL",
      payload: {
        url
      }
    })
  }

  function setHeaders() {
    dispatch({
      type: "SET_HEADERS",
      payload: {
        headers,
      }
    })
  }

  function setBody(data) {
    dispatch({
      type: "SET_BODY",
      payload: {
        data
      }
    })
  }

  async function sendRequest() {
    try {
      if (!message.request.url) return;

      console.log("sender ", message);
      const res = await axios(message.request);
      const { data, config, headers, request, status, statusText } = res;
      dispatch({
        type: "RECEIVE_RESPONSE",
        payload: {
          headers,
          data,
          status,
          statusText,
          request,
          config
        }
      })
    } catch (error) {
      const { message: statusText, response: { status, data } } = error;
      console.log(message, status, data);
      dispatch({
        type: "RECEIVE_RESPONSE",
        payload: {
          statusText,
          status,
          data,
        }
      })
    }
  }

  const senderDispatch = {
    setMethod,
    setURL,
    sendRequest,
    setHeaders,
    setBody,
  }

  return (
    <SenderContext.Provider value={message}>
      <SenderDispatch.Provider value={senderDispatch}>
        {children}
      </SenderDispatch.Provider>
    </SenderContext.Provider>
  )
}

function senderReducer(message, action) {
  switch (action.type) {
    case "SET_METHOD": {
      const { method } = action.payload;
      return {
        ...message,
        request: {
          ...message.request,
          method,
        }
      }
    }

    case "SET_URL": {
      const { url } = action.payload;
      return {
        ...message,
        request: {
          ...message.request,
          url,
        }
      }
    }

    case "SET_BODY": {
      const { data } = action.payload;
      return {
        ...message,
        request: {
          ...message.request,
          data
        }
      }
    }

    case "SET_HEADERS": {
      const { headers } = action.payload;
      const extractedObject = headers.reduce((prev, header) => {
        const { name, value} = header;
        return { ...prev, [name]: value };
      }, {});
      return {
        ...message,
        headers: extractedObject,
      }
    }

    case "RECEIVE_RESPONSE": {
      return {
        ...message,
        response: {
          ...action.payload
        }
      }
    }
  }
}