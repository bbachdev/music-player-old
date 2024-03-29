import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';

import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from '../providers/ThemeProvider';
import { Config } from '@/util/config';
import { FaCheck } from 'react-icons/fa';

interface ThemeSelectionProps {
  setStep: Dispatch<SetStateAction<number>>
  config: Config,
  setConfig: Dispatch<SetStateAction<Config>>
}

export default function ThemeSelection({setStep, config, setConfig}: ThemeSelectionProps) {
  const {setTheme} = useTheme()
  //TODO: Move this list to other file
  const accentColors = [
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-slate-500",
  ]
  const [selectedAccentColor, setAccentColor] = useState<string>(config.accentColor)

  function saveTheme() {
    setStep(2)
  }

  function toggleTheme(choice: "light" | "dark") {
    setTheme(choice)
    setConfig((prev) => ({...prev, theme: choice}))
  }

  function selectAccentColor(color: string) {
    setAccentColor(color)
    setConfig((prev) => ({...prev, accentColor: color}))
  }

  return (
    <>
      <div className={`my-auto flex flex-col justify-center items-center h-full`}>
        <div className={`flex flex-col items-center mb-4`}>
          <h1 className={`font-semibold text-3xl`}>Select your theme</h1>
          <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Choose the theme you'd like to use for the app.`}</p>
        </div>
        <div className={`flex flex-row items-center w-fit space-x-8`}>
          <button className={`bg-slate-100 hover:bg-slate-100/90 border-[1px] border-solid border-slate-300 text-black rounded-md mr-4 h-24 w-24`} onClick={() => toggleTheme('light')}>
            {config.theme === "light" && <div className={`w-24 h-24 border-2 rounded-md border-slate-700 flex items-center justify-center`}>
              <div className={`flex flex-col items-center justify-center`}>
                <MdOutlineWbSunny/>
                <span>Light</span>
              </div>
            </div>}
            {config.theme === "dark" && <div className={`flex flex-col items-center justify-center`}>
              <MdOutlineWbSunny/>
              <span>Light</span>
            </div>}
          </button>
          <button className={`bg-slate-700 hover:bg-slate-700/90 text-white rounded-md h-24 w-24`} onClick={() => toggleTheme('dark')}>
            {config.theme === "dark" && <div className={`w-24 h-24 border-2 rounded-md border-white flex items-center justify-center`}>
              <div className={`flex flex-col items-center justify-center`}>
                <FaMoon/>
                <span>Dark</span>
              </div>
            </div>}
            {config.theme === "light" && <div className={`flex flex-col items-center justify-center`}>
              <FaMoon/>
              <span>Dark</span>
            </div>}
          </button>
        </div>
        <p className={`mt-8`}>Choose an accent color:</p>
        <div className={`mt-4 flex flex-row gap-2`}>
          {accentColors.map(color => (
            <button key={color} className={`${color} text-white rounded-full h-10 w-10 flex flex-col`} onClick={() => selectAccentColor(color)}>
              {selectedAccentColor === color && <div className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center`}>
              {/* Add Checkmark */}
              <FaCheck className={`w-4 h-4 rounded-full text-white`} />
            </div>}
            </button>
          ))}
        </div>
        <Button className={`mt-8 text-md`} onClick={() => saveTheme()} size={`lg`}>Next</Button>
        {/* <button className={`mt-8 text-md ${selectedAccentColor} hover:${selectedAccentColor}/90`} onClick={() => saveTheme()}>Next</button> */}
        <button className={`mt-2`} onClick={() => setStep(0)}>
          <span className={`underline text-sm`}>{`< Back`}</span>
        </button>
      </div>
    </>
  )
}