import { Dispatch, SetStateAction, useState } from 'react';
import Welcome from '../components/setup/Welcome';
import LibrarySelection from '@/components/setup/LibrarySelection';
import ThemeSelection from '@/components/setup/ThemeSelection';
import AdditionalSettings from '@/components/setup/AdditionalSettings';
import { Config } from '@/util/config';

interface SetupScreenProps {
  setCurrentScreen: Dispatch<SetStateAction<string>>
}

export default function SetupScreen({ setCurrentScreen }: SetupScreenProps) {
  const [step, setStep] = useState<number>(0);
  const [config, setConfig] = useState<Config>(
    {
      libraryPaths: [],
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      accentColor: "bg-sky-500",
      discordRichPresenceEnabled: false,
      lyricDownloadsEnabled: false,
      homeSort: {type: "added", direction: "desc"},
      artistSort: {type: "added", direction: "desc"}
    }
  );

  function completeSetup() {
    //Go to music screen
    setCurrentScreen("music");
  }

  return (
    <div className={`flex flex-col min-h-[100vh]`}>
      {step === 0 && <Welcome setStep={setStep}/>}
      {step === 1 && <ThemeSelection setStep={setStep} config={config} setConfig={setConfig}/>}
      {step === 2 && <LibrarySelection setStep={setStep} config={config} setConfig={setConfig}/>}
      {step === 3 && <AdditionalSettings setStep={setStep} config={config} setConfig={setConfig} onFinish={completeSetup}/>}
    </div>
  )
}