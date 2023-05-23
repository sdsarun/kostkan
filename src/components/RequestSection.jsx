import { Combobox, Listbox, Tab } from "@headlessui/react";
import { useState, Fragment } from "react";
import { headerKeys } from "../shared/headerkeys.js";
import { mediaKeys } from "../shared/mediakeys.js"
import { useHeaders, useHeadersDispatch } from "../shared/headersContext";
import HeaderDetail from "./HeadersDetail";
import { useSender, useSenderDispatch } from "../shared/senderContext.jsx";
import { Editor } from "@monaco-editor/react";


export default function RequestSection() {
  const headers = useHeaders();
  const { createHeader } = useHeadersDispatch();

  const { request } = useSender();
  const { setMethod, setURL, sendRequest, setBody } = useSenderDispatch();

  const [code, setCode] = useState("");

  function handleSend(e) {
    const actionType = e.type;

    if (actionType === "click") {
      sendRequest();
    } else if (actionType === "keydown") {
      const keyPress = e.key;
      if (keyPress === "Enter") {
        sendRequest();
      }
    }
  }

  return (

    <div className="border-b-4">
      <div className="">
        <h1 className="text-3xl font-bold">Request</h1>
      </div>
      <div className="flex items-center w-full gap-x-2 text-2xl">
        <div className="h-full">
          <select className="border-2 border-gray-300 h-full pl-2 pr-10 rounded-md py-2" onChange={(e) => setMethod(e.target.value)}>
            <option value="get">GET</option>
            <option value='post'>POST</option>
            <option value='put'>PUT</option>
            <option value='patch'>PATCH</option>
            <option value='delete'>DELETE</option>
          </select>
        </div>
        <div>
        </div>
        <div className="w-full h-full">
          <input className="border-2 border-gray-300 bg-gray-50 w-full h-full px-2 rounded-md py-2 text-gray-700 focus:outline-gray-400 " type="url" onChange={(e) => setURL(e.target.value.trim())} onKeyDown={(e) => handleSend(e)} />
        </div>
        <div className="h-full">
          <button className="h-full px-6 bg-orange-500 text-white rounded-md text-center hover:bg-orange-400 py-2" onClick={(e) => handleSend(e)}>Send</button>
        </div>
      </div>
      <div >
        <Tab.Group>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <Tab.List className="flex items-center gap-x-2">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? "border-b-2  border-orange-500 transition-all font-semibold ring-0 outline-none" : "text-gray-500"}>
                      Params
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment} className="hover:text-orange-400 active:border-b-2 focus:border-b-2 focus:border-orange-500 transition-all focus:font-semibold">
                  {({ selected }) => (
                    <button className={selected ? "border-b-2 border-orange-500 transition-all font-semibold ring-0 outline-none" : "text-gray-500"}>
                      Body
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment} className="hover:text-orange-400 active:border-b-2 focus:border-b-2 focus:border-orange-500 transition-all focus:font-semibold">
                  {({ selected }) => (
                    <button className={selected ? "border-b-2 border-orange-500 transition-all font-semibold ring-0 outline-none" : "text-gray-500"}>
                      Headers
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </div>
          <div className="min-h-[400px] max-h-[400px] overflow-scroll">
            <Tab.Panels>
              <Tab.Panel>
                Content - 1
              </Tab.Panel>
              <Tab.Panel>
                <div className="h-96 border-2">
                  <Editor
                    // className="h-full"
                    value={request.data}
                    // value={code}
                    defaultLanguage="json"
                    defaultValue=""
                    onChange={(text) => setBody(text)}
                    options={{
                      minimap: false,
                      fontSize: "14px",
                      tabSize: 2
                    }} />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="w-full text-left">
                  <table className="w-full h-full">
                    <thead>
                      <tr className="border-b-2">
                        <th className="w-1/12 border-r-2 hover:bg-orange-300" title="Add header"> <button className="text-center w-full" onClick={() => createHeader()}>+</button> </th>
                        <th className="w-5/12 text-gray-500 border-r-2">Key</th>
                        <th className="w-5/12 text-gray-500">Value</th>
                        <th className="w-1/12"></th>
                      </tr>
                    </thead>
                    <tbody className="w-full ">
                      {headers.map((header, index) => {
                        return <HeaderDetail key={index} name={header.name} value={header.value} index={index} />
                      })}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  )
}