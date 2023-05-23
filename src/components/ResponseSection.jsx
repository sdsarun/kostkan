import JSONViewer from 'react-json-viewer';
import { Combobox, Tab } from '@headlessui/react';
import DOMPurify from 'dompurify';
import { useSender } from '../shared/senderContext';

export default function ResponseSection() {
  const message = useSender();
  // console.log("REsponse : ", message)
  const data = message.response.body;
  const cleanUpMarkup = DOMPurify.sanitize(data);
  return (
    <div >
      <div>
        <h1 className="text-3xl font-bold">Response</h1>
      </div>
      <div>
        <Tab.Group>
          <div className="flex items-center justify-between">
            <div className="text-xl">
              <Tab.List className="flex items-center gap-x-2">
                <Tab>Body</Tab>
                <Tab>Header</Tab>
                <Tab>Preview</Tab>
              </Tab.List>
            </div>
            <div>
              <div>
                <span>200 OK</span>
                <span>802 ms</span>
                <span>853 B</span>
              </div>
            </div>
          </div>
          <div>
            <Tab.Panels>
              <div className="h-screen overflow-scroll">
                <div>
                  <Tab.Panel className="font-mono">
                    <JSONViewer json={data} />
                  </Tab.Panel>
                </div>
                <div>
                  <Tab.Panel>
                    Content - 2
                  </Tab.Panel>
                </div>
                <div>
                  <Tab.Panel>
                  {!data ? null : <div dangerouslySetInnerHTML={{ __html: cleanUpMarkup }} /> }
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