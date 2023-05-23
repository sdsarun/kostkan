import axios from "axios";
import { createContext, useContext, useReducer } from "react";

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
            body: {}
        },
        response: {
            headers: {},
            body: {}
        }
    });

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

    function setHeader() {

    }

    async function sendRequest() {
        try {
            if (!message.request.url) return;
            console.log("sender ", message);

            const res = await axios(message.request);

            dispatch({
                type: "RECEIVE_RESPONSE",
                payload: {
                    headers: res.headers,
                    body: res.data
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const senderDispatch = {
        setMethod,
        setURL,
        setHeader,
        sendRequest,
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
                    method
                }
            }
        }

        case "SET_URL": {
            const { url } = action.payload;
            return {
                ...message,
                request: {
                    ...message.request,
                    url
                }
            }
        }

        case "RECEIVE_RESPONSE": {
            const { headers, body } = action.payload;
            return {
                ...message,
                response: {
                    headers,
                    body,
                }
            }
        }
    }
}