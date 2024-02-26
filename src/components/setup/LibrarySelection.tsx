import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { open } from '@tauri-apps/api/dialog';
import { ImCross } from "react-icons/im";
import { homeDir } from '@tauri-apps/api/path';
import { Button } from '../ui/button';
import { Config, SubsonicEntity } from '@/util/config';

import { RiComputerLine } from "react-icons/ri";
import { FaCloud } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface LibrarySelectionProps {
  setStep: Dispatch<SetStateAction<number>>
  config: Config,
  setConfig: Dispatch<SetStateAction<Config>>
}

export default function LibrarySelection({setStep, config, setConfig}: LibrarySelectionProps) {
  {/* TODO: Look into using array instead for performance reasons */}
  // const [folders, setFolders] = useState<Set<string|SubsonicEntity>>(new Set(config.libraryPaths))
  const [folders, setFolders] = useState<Set<string|SubsonicEntity>>(new Set())

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

  function addSubsonic() {

  }

  function removeFolder(folder: string) {
    folders.delete(folder)
    setFolders(new Set(folders))
  }

  function nextStep() {
    //setConfig((prev) => ({...prev, libraryPaths: [...folders]}))
    setStep(3)
  }

  return (
    <div className={`my-auto flex flex-col justify-center items-center h-full`}>
      <div className={`flex flex-col items-center mb-4`}>
        <h1 className={`font-semibold text-3xl`}>Select your music library</h1>
        <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Choose the folder(s) where your music is located:`}</p>
      </div>
      {/* Folder List */}
      {folders.size === 0 && <p className={`text-slate-700 dark:text-slate-300 my-4`}>No folders selected</p>}
        <ul className={`mb-2 w-1/5`}>
          {[...folders].map(folder => {
            if(typeof folder === "string"){
                return <li key={folder} className={`even:bg-slate-200 odd:bg-slate-300 dark:even:bg-slate-600 dark:odd:bg-slate-700 p-2 w-full flex flex-row items-center`}>
                <>
                  <button className={`mr-4`} onClick={() => removeFolder(folder)}><ImCross className={`text-lg text-red-500/90`} /></button>
                  <span>{folder}</span>
                </>
              </li>
            }else{
              return <li key={folder.id} className={`even:bg-slate-200 odd:bg-slate-300 dark:even:bg-slate-600 dark:odd:bg-slate-700 p-2 w-full flex flex-row items-center`}>
                <>
                  <button className={`mr-4`} onClick={() => removeFolder(folder.id)}><ImCross className={`text-lg text-red-500/90`} /></button>
                  <span>{`${folder.username} - ${folder.url}`}</span>
                </>
              </li>
            } 
          }
          )}
        </ul>
      <div className={`flex flex-col`}>
        <Dialog>
          <DialogTrigger asChild>
            <button onClick={addSubsonic} className={`mt-4 dark:bg-slate-700 dark:hover:bg-slate-700/90 dark:text-white rounded-md h-24 px-4 bg-slate-100 hover:bg-slate-100/90 border-slate-300 text-black`}>
              <div className={`flex flex-row items-center`}>
                <FaCloud className={`inline-block mr-4 text-3xl`}/>
                <div className={`flex flex-col mx-auto`}>
                  <span className={`font-semibold text-lg`}>Add Server Library</span>
                  <span className={`text-sm`}>Connect to a Subsonic-compatible server.</span>
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className={`text-white`}>
            <DialogHeader>
              <DialogTitle>Add Server Library</DialogTitle>
              <DialogDescription>
                Enter the connection details for your server below.
              </DialogDescription>
            </DialogHeader>
            <div className={`flex flex-col`}>
              <label htmlFor="server">Server URL</label>
              <input type="text" id="server" name="server" className={`text-black border-2 border-slate-300 dark:border-slate-700 rounded-md p-2`} />
            </div>
            <div className={`flex flex-col`}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" className={`text-black border-2 border-slate-300 dark:border-slate-700 rounded-md p-2`} />
            </div>
            <div className={`flex flex-col`}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className={`text-black border-2 border-slate-300 dark:border-slate-700 rounded-md p-2`} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={`outline`}>Cancel</Button>
              </DialogClose>
              <Button>Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <button onClick={addFolder} className={`mt-4 dark:bg-slate-700 dark:hover:bg-slate-700/90 dark:text-white rounded-md h-24 px-4 bg-slate-100 hover:bg-slate-100/90 border-slate-300 text-black`}>
          <div className={`flex flex-row items-center`}>
            <RiComputerLine className={`inline-block mr-4 text-3xl`}/>
            <div className={`flex flex-col mx-auto`}>
              <span className={`font-semibold text-lg`}>Add Local Folder</span>
              <span className={`text-sm`}>Choose a folder from your device.</span>
            </div>
          </div>
        </button>
      </div>
      <Button className={`mt-8 text-md`} onClick={nextStep} size={`lg`} disabled={folders.size === 0}>Next</Button>
      <button className={`mt-2`} onClick={() => setStep(1)}>
        <span className={`underline text-sm`}>{`< Back`}</span>
      </button>
    </div>
  )
}