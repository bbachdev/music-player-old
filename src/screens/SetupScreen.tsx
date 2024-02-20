import { useState } from 'react';
import Welcome from '../components/setup/Welcome';
import LibrarySelection from '@/components/setup/LibrarySelection';
import ThemeSelection from '@/components/setup/ThemeSelection';
import AdditionalSettings from '@/components/setup/AdditionalSettings';

export default function SetupScreen() {
  const [step, setStep] = useState<number>(0);

  return (
    <div className={`flex flex-col min-h-[100vh]`}>
      {step === 0 && <Welcome setStep={setStep}/>}
      {step === 1 && <ThemeSelection setStep={setStep}/>}
      {step === 2 && <LibrarySelection setStep={setStep}/>}
      {step === 3 && <AdditionalSettings setStep={setStep}/>}
    </div>
  )
}