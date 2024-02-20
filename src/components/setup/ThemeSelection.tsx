import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from '../providers/ThemeProvider';
import { Config } from '@/util/config';

interface ThemeSelectionProps {
  setStep: Dispatch<SetStateAction<number>>
  setConfig: Dispatch<SetStateAction<Config>>
}

export default function ThemeSelection({setStep, setConfig}: ThemeSelectionProps) {
  const {setTheme} = useTheme()
  //TODO: Move this list to other file
  const accentColors = [
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500"
  ]

  function saveTheme() {
    setStep(2)
  }

  function toggleTheme(choice: "light" | "dark") {
    setTheme(choice)
    setConfig((prev) => ({...prev, theme: choice}))
  }

  function selectAccentColor() {

  }

  return (
    <>
      <div className={`my-auto flex flex-col justify-center items-center h-full`}>
        <div className={`flex flex-col items-center mb-4`}>
          <h1 className={`font-semibold text-3xl`}>Select your theme</h1>
          <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Choose the theme you'd like to use for the app.`}</p>
        </div>
        <div className={`flex flex-row items-center w-fit space-x-8`}>
          <button className={`bg-slate-100 hover:bg-slate-100/90 border-[1px] border-solid border-slate-300 text-black px-4 py-2 rounded-md mr-4 h-24 w-24`} onClick={() => toggleTheme('light')}>
            <div className={`flex flex-col items-center justify-center`}>
              <MdOutlineWbSunny/>
              <span>Light</span>
            </div>
          </button>
          <button className={`bg-slate-700 hover:bg-slate-700/90 text-white px-4 py-2 rounded-md h-24 w-24`} onClick={() => toggleTheme('dark')}>
            <div className={`flex flex-col items-center justify-center`}>
              <FaMoon/>
              <span>Dark</span>
            </div>
          </button>
        </div>
        <p className={`mt-8`}>Choose an accent color:</p>
        <div className={`mt-4 flex flex-row gap-2`}>
          {accentColors.map(color => (
            <button key={color} className={`${color} text-white px-4 py-2 rounded-full h-10 w-10`}>
              
            </button>
          ))}
        </div>
        <Button className={`mt-8 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={() => saveTheme()}>Next</Button>
        <button className={`mt-2`} onClick={() => setStep(0)}>
          <span className={`underline text-sm`}>{`< Back`}</span>
        </button>
      </div>
    </>
  )
}