import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Config } from '@/util/config';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface AdditionalSettingsProps {
  setStep: Dispatch<SetStateAction<number>>
  config: Config,
  setConfig: Dispatch<SetStateAction<Config>>
}

export default function AdditionalSettings({setStep, config, setConfig}: AdditionalSettingsProps) {

  function toggleDiscordRichPresence() {
    setConfig((prev) => ({...prev, discordRichPresenceEnabled: !prev.discordRichPresenceEnabled}))
  }

  function toggleLyricDownloads() {
    setConfig((prev) => ({...prev, lyricDownloadsEnabled: !prev.lyricDownloadsEnabled}))
  }

  return (
    <div className={`my-auto flex flex-col justify-center items-center h-full`}>
      <div className={`flex flex-col items-center mb-4`}>
        <h1 className={`font-semibold text-2xl`}>Additional Settings</h1>
        <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Customize additional options below:`}</p>
      </div>
      <div className={`mt-2 flex flex-col gap-4`}>
        <div className="flex items-center space-x-2">
          <Switch className={`bg-black`} id="discord" />
          <Label htmlFor="discord">Enable Discord Rich Presence</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="lyrics" />
          <Label htmlFor="lyrics">Allow Lyric Downloads for Library</Label>
        </div>
      </div>
      <Button className={`mt-8 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={() => setStep(2)} size={`lg`}>Finish</Button>
      <button className={`mt-2`} onClick={() => setStep(2)}>
        <span className={`underline text-sm`}>{`< Back`}</span>
      </button>
    </div>
  )
}