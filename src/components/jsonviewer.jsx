import { useRef } from "react";

const Viewer = ({ data }) => {
    const jsonViewerRef = useRef(null);

    const handleCopy = () => {
        const jsonData = JSON.stringify(data, null, 2);
        const el = document.createElement('textarea');
        el.value = jsonData;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const renderJson = (jsonData) => {
        if (Array.isArray(jsonData)) {
            return (
                <ul className="pl-4 ml-4 border-l border-gray-500">
                    {jsonData.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-yellow-500">"</span>
                            {renderJson(item)}
                            <span className="text-yellow-500">"</span>
                            {index !== jsonData.length - 1 && <span className="text-yellow-500">,</span>}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof jsonData === 'object') {
            return (
                <ul className="pl-4 ml-4 border-l border-gray-500">
                    {Object.entries(jsonData).map(([key, value], index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-green-400">"</span>
                            <span className="font-semibold text-blue-400">{key}</span>
                            <span className="text-green-400">"</span>
                            <span className="text-yellow-500">: </span>
                            {renderJson(value)}
                            {index !== Object.keys(jsonData).length - 1 && <span className="text-yellow-500">,</span>}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return (
                <span>
                    <span className="text-pink-400">"</span>
                    {jsonData}
                    <span className="text-pink-400">"</span>
                </span>
            );
        }
    };

    return (
        <div className="rounded-lg bg-gray-800 text-white p-4 relative" ref={jsonViewerRef}>
            <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-green-300">JSON Viewer</div>
                <button
                    className="px-2 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white text-sm"
                    onClick={handleCopy}
                >
                    Copy
                </button>
            </div>
            {renderJson(data)}
        </div>
    );
};

export default Viewer;