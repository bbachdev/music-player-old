import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface WelcomeProps {
  setStep: Dispatch<SetStateAction<number>>
}

export default function Welcome({setStep}: WelcomeProps) {
  return (
    <div className={`my-auto flex flex-col justify-center items-center h-full`}>
      <img src="/tauri.svg" alt="Music App Logo" className={`w-48 h-48`} />
      <h1 className={`mt-8 font-semibold text-4xl`}>Welcome to Music App</h1>
      <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Let's set up a few things before we get started.`}</p>
      <Button className={`mt-4 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={() => setStep(1)} size={`lg`}>Begin</Button>
    </div>
  )
}