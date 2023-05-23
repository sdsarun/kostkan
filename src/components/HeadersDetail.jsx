import { useState } from "react";
import { useHeadersDispatch } from "../shared/headersContext";
import deleteIcon from "../assets/delete1.svg";

export default function HeaderDetail({ index, name, value }) {
  const [disabledInput, setDisabledInput] = useState(false);
  const { inputHeaderName, inputHeaderValue, deleteHeader } = useHeadersDispatch();

  function handleSetName(newName) {
    inputHeaderName(newName, index);
  }

  function handleSetValue(newValue) {
    inputHeaderValue(newValue, index);
  }

  function handleDelete() {
    deleteHeader(index);
  }

  return (
    <tr>
      <td className="border-r-2 hover:bg-gray-100"><input className="w-full border-r-2" type="checkbox" onClick={() => setDisabledInput(prev => !prev)} /></td>
      <td className="border-r-2"><input className=" w-full px-1 outline-gray-400" type="text" disabled={disabledInput} value={name} placeholder="Key" onChange={(e) => handleSetName(e.target.value.trim())} /></td>
      <td className="border-r-2"><input className=" w-full px-1 outline-gray-400" type="text" disabled={disabledInput} value={value} placeholder="Value" onChange={(e) => handleSetValue(e.target.value.trim())} /></td>
      <td className="flex justify-center items-center "><input className="w-5 hover:bg-gray-100" type="image" src={deleteIcon} disabled={disabledInput} onClick={() => handleDelete()} /></td>
    </tr>
  )
}