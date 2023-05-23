import { Combobox, Listbox, Tab } from "@headlessui/react";
import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json"
import { html } from "@codemirror/lang-html"
import { xml } from "@codemirror/lang-xml"
import { headerKeys } from "../shared/headerkeys.js";
import { mediaKeys } from "../shared/mediakeys.js"
import { useHeaders, useHeadersDispatch } from "../shared/headersContext";
import HeaderDetail from "./HeadersDetail";
import { useSender, useSenderDispatch } from "../shared/senderContext.jsx";

export default function RequestSection() {
  const headers = useHeaders();
  const { createHeader } = useHeadersDispatch();

  const { request } = useSender();
  const { setMethod, setURL, sendRequest, setBody } = useSenderDispatch();

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

  function handleSetBody(text) {
    setBody(text);
  }

  return (
    <div className="border-b-4">
      <div>
        <h1 className="text-3xl font-bold">Request</h1>
      </div>
      <div className="flex items-center w-full h-10 gap-x-2 text-2xl">
        <div className="h-full">
          <select className="border-2 border-gray-300 h-full pl-2 pr-10 rounded-md" onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value='POST'>POST</option>
            <option value='POST'>PUT</option>
            <option value='POST'>PATCH</option>
            <option value='POST'>DELETE</option>
          </select>
        </div>
        <div>
        </div>
        <div className="w-full h-full">
          <input className="border-2 border-gray-300 bg-gray-100 w-full h-full px-2 rounded-md" type="url" onChange={(e) => setURL(e.target.value.trim())} onKeyDown={(e) => handleSend(e)} />
        </div>
        <div className="h-full">
          <button className="h-full px-6 bg-orange-500 text-white rounded-md text-center hover:bg-orange-400" onClick={(e) => handleSend(e)}>Send</button>
        </div>
      </div>
      <div>
        <Tab.Group>
          <div className="flex items-center justify-between">
            <div className="text-xl">
              <Tab.List className="flex items-center gap-x-2">
                <Tab>Params</Tab>
                <Tab>Body</Tab>
                <Tab>Header</Tab>
              </Tab.List>
            </div>
          </div>
          <div>
            <Tab.Panels>
              <Tab.Panel>
                Content - 1
              </Tab.Panel>
              <Tab.Panel>
                <ReactCodeMirror
                  height="250px"
                  onChange={(text) => handleSetBody(text)}
                  extensions={[json(), xml(), html()]}
                  theme={githubLight}
                  style={{ fontSize: 16 }}
                />
              </Tab.Panel>
              <Tab.Panel>
                Content - 3
                <div className="w-full text-left">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="border-2 w-1/12"> <button className="text-center w-full" onClick={() => createHeader()}>+</button> </th>
                        <th className="border-2 w-5/12">Key</th>
                        <th className="border-2 w-5/12">Value</th>
                        <th className="border-2 w-1/12"></th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
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