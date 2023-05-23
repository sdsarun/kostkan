import { Combobox, Tab } from '@headlessui/react';
import DOMPurify from 'dompurify';
import { useSender } from '../shared/senderContext';
import { Editor } from '@monaco-editor/react';
import { Fragment } from 'react';

export default function ResponseSection() {
  const { response } = useSender();
  const data = response.data;
  const cleanUpMarkup = DOMPurify.sanitize(data);
  return (
    <div >
      <div>
        <h1 className="text-3xl font-bold">Response</h1>
      </div>
      <div>
        <Tab.Group>
          <div className="flex items-center justify-between">
            <div className="">
              <Tab.List className="flex items-center gap-x-2">
                <Tab.List className="flex items-center gap-x-2">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button className={selected ? "border-b-2  border-orange-500 transition-all font-semibold ring-0 outline-none" : "text-gray-500"}>
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
                  <Tab as={Fragment} className="hover:text-orange-400 active:border-b-2 focus:border-b-2 focus:border-orange-500 transition-all focus:font-semibold">
                    {({ selected }) => (
                      <button className={selected ? "border-b-2 border-orange-500 transition-all font-semibold ring-0 outline-none" : "text-gray-500"}>
                        Preview
                      </button>
                    )}
                  </Tab>
                </Tab.List>
              </Tab.List>
            </div>
            <div>
              <div>
                <span className="text-green-600">{`${response.status || ""} ${response.statusText || ""}`}</span>
                {/* <span>802 ms</span> */}
                {/* <span>853 B</span> */}
              </div>
            </div>
          </div>
          <div>
            <Tab.Panels>
              <div className="h-screen overflow-scroll">
                <div>
                  <Tab.Panel className="font-mono">
                    <div className="h-screen border-2">
                      {
                        response.data ?
                          <Editor
                            value={response.data}
                            defaultLanguage="json"
                            options={{
                              fontSize: "14px",
                              readOnly: true
                            }} />
                        : null
                      }
                    </div>
                  </Tab.Panel>
                </div>
                <div>
                  <Tab.Panel>
                    Content - 2
                  </Tab.Panel>
                </div>
                <div>
                  <Tab.Panel>
                    {!data ? null : <div dangerouslySetInnerHTML={{ __html: cleanUpMarkup }} />}
                  </Tab.Panel>
                </div>
              </div>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  )
}