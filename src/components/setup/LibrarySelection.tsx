import { Dispatch, SetStateAction, useState } from 'react'
import { open } from '@tauri-apps/api/dialog';
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { homeDir } from '@tauri-apps/api/path';
import { Button } from '../ui/button';
import { Config } from '@/util/config';

interface LibrarySelectionProps {
  setStep: Dispatch<SetStateAction<number>>
  setConfig: Dispatch<SetStateAction<Config>>
}

export default function LibrarySelection({setStep, setConfig}: LibrarySelectionProps) {
  const [folders, setFolders] = useState<Set<string>>(new Set())

  async function addFolder() {
    const selectedFolders = await open({
      directory: true,
      multiple: true,
      defaultPath: await homeDir()
    });
    if (Array.isArray(selectedFolders)) {
      // user selected multiple directories
      setFolders(new Set([...folders, ...selectedFolders]))
    } else if (selectedFolders === null) {
      // user cancelled the selection; do nothing
    } else {
      // user selected a single directory
      setFolders(new Set([...folders, selectedFolders]))
    }
  }

  function removeFolder(folder: string) {
    folders.delete(folder)
    setFolders(new Set(folders))
  }

  return (
    <div className={`my-auto flex flex-col justify-center items-center h-full`}>
      <div className={`flex flex-col items-center mb-4`}>
        <h1 className={`font-semibold text-3xl`}>Select your music library</h1>
        <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Choose the folder(s) where your music is located.`}</p>
      </div>
      {/* Folder List */}
        <ul className={`mb-2 w-1/5`}>
          {[...folders].map(folder => (
            <li key={folder} className={`bg-slate-100 p-2 w-full flex flex-row items-center`}>
              <>
                <button className={`mr-4`} onClick={() => removeFolder(folder)}><ImCross className={`text-lg text-red-500/90`} /></button>
                <span>{folder}</span>
              </>
            </li>
          ))}
        </ul>
      <button onClick={addFolder}>
        <FaPlus className={`inline-block mr-2`}/><span className={`underline`}>Add Folder</span>
      </button>
      <Button className={`mt-8 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={() => setStep(3)} size={`lg`}>Next</Button>
      <button className={`mt-2`} onClick={() => setStep(1)}>
        <span className={`underline text-sm`}>{`< Back`}</span>
      </button>
    </div>
  )
}