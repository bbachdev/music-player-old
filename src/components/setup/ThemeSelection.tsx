import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface ThemeSelectionProps {
  setStep: Dispatch<SetStateAction<number>>
}

export default function ThemeSelection({setStep}: ThemeSelectionProps) {

  function saveTheme() {
    setStep(2)
  }

  function toggleTheme() {
  }

  function selectAccentColor() {
    
  }

  return (
    <>
      <div className={`my-auto flex flex-col justify-center items-center h-full`}>
        <div className={`flex flex-col items-center mb-4`}>
          <h1 className={`font-semibold text-3xl`}>Select your theme</h1>
          <p className={`mt-2 text-slate-700`}>{`Choose the theme you'd like to use for the app.`}</p>
        </div>
        <div className={`flex flex-row items-center`}>
          <Button className={`px-4 py-2 rounded-md mr-4`} variant={`outline`}>Light</Button>
          <Button className={`bg-slate-700 hover:bg-slate-700/90 text-white px-4 py-2 rounded-md`}>Dark</Button>
        </div>
        <Button className={`mt-8 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={() => saveTheme()}>Next</Button>
        <button className={`mt-2`} onClick={() => setStep(0)}>
          <span className={`underline text-sm`}>{`< Back`}</span>
        </button>
      </div>
    </>
  )
}