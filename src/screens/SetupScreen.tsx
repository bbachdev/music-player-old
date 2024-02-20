import { useEffect, useState } from 'react';
import Welcome from '../components/setup/Welcome';
import LibrarySelection from '@/components/setup/LibrarySelection';
import ThemeSelection from '@/components/setup/ThemeSelection';
import AdditionalSettings from '@/components/setup/AdditionalSettings';
import { Config } from '@/util/config';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function SetupScreen() {
  const { theme } = useTheme();
  const [step, setStep] = useState<number>(0);
  const [config, setConfig] = useState<Config>(
    {
      libraryPaths: [],
      theme: 'system',
      accentColor: "sky-500",
      discordRichPresenceEnabled: false,
      lyricDownloadsEnabled: false,
      homeSort: {type: "added", direction: "desc"},
      artistSort: {type: "added", direction: "desc"}
    }
  );

  useEffect(() => {
    if(theme === "system") {
      //Check system theme
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if(systemTheme !== config.theme) {
        setConfig({...config, theme: systemTheme});
      }
    }
  }, [config, theme])

  return (
    <div className={`flex flex-col min-h-[100vh]`}>
      {step === 0 && <Welcome setStep={setStep}/>}
      {step === 1 && <ThemeSelection setStep={setStep} setConfig={setConfig}/>}
      {step === 2 && <LibrarySelection setStep={setStep} setConfig={setConfig}/>}
      {step === 3 && <AdditionalSettings setStep={setStep} setConfig={setConfig}/>}
    </div>
  )
}