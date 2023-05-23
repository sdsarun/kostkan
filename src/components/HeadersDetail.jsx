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
      <td><input className="w-full" type="checkbox" onClick={() => setDisabledInput(prev => !prev)} /></td>
      <td><input className="border-2 w-full px-1" type="text" disabled={disabledInput} value={name} onChange={(e) => handleSetName(e.target.value.trim())} /></td>
      <td><input className="border-2 w-full px-1" type="text" disabled={disabledInput} value={value} onChange={(e) => handleSetValue(e.target.value.trim())} /></td>
      <td className="flex justify-center items-center"><input className="w-8" type="image" src={deleteIcon} disabled={disabledInput} onClick={() => handleDelete()} /></td>
    </tr>
  )
}