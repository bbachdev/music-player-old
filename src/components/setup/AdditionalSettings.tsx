import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import { Config } from '@/util/config';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { appLocalDataDir } from '@tauri-apps/api/path';
import Spinner from '../ui/spinner';
import { BaseDirectory, createDir, exists, writeTextFile } from '@tauri-apps/api/fs';

interface AdditionalSettingsProps {
  setStep: Dispatch<SetStateAction<number>>
  config: Config,
  setConfig: Dispatch<SetStateAction<Config>>,
  onFinish: () => void
}

export default function AdditionalSettings({setStep, config, setConfig, onFinish}: AdditionalSettingsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [discordRichPresenceEnabled, setDiscordRichPresenceEnabled] = useState<boolean>(config.discordRichPresenceEnabled)
  const [lyricDownloadsEnabled, setLyricDownloadsEnabled] = useState<boolean>(config.lyricDownloadsEnabled)

  function toggleDiscordRichPresence() {
    setDiscordRichPresenceEnabled((prev) => !prev)
  }

  function toggleLyricDownloads() {
    setLyricDownloadsEnabled((prev) => !prev)
  }

  async function finish() {
    // setConfig((prev) => ({...prev, discordRichPresenceEnabled, lyricDownloadsEnabled}))
    setIsLoading(true)
    //et dataDir = await appLocalDataDir()

    let configToSave = {
      ...config,
      discordRichPresenceEnabled,
      lyricDownloadsEnabled
    }

    setConfig(configToSave)

    //If app data directory doesn't exist, create it
    if(!await exists(``,{dir: BaseDirectory.AppLocalData})) {
      await createDir(``, {dir: BaseDirectory.AppLocalData})
    }

    await writeTextFile(`config.json`, JSON.stringify(configToSave), { dir: BaseDirectory.AppLocalData });
    setIsLoading(false)
    onFinish()
  }

  return (
    <div className={`my-auto flex flex-col justify-center items-center h-full`}>
      <div className={`flex flex-col items-center mb-4`}>
        <h1 className={`font-semibold text-2xl`}>Additional Settings</h1>
        <p className={`mt-2 text-slate-700 dark:text-slate-300`}>{`Customize additional options below:`}</p>
      </div>
      <div className={`mt-2 flex flex-col gap-4`}>
        <div className="flex items-center space-x-2">
          <Switch id="discord" checked={discordRichPresenceEnabled} onCheckedChange={toggleDiscordRichPresence}/>
          <Label htmlFor="discord">Enable Discord Rich Presence</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="lyrics" checked={lyricDownloadsEnabled} onCheckedChange={toggleLyricDownloads}/>
          <Label htmlFor="lyrics">Allow Lyric Downloads for Library</Label>
        </div>
      </div>
      <Button className={`mt-8 text-md bg-sky-500 hover:bg-sky-500/90`} onClick={finish} size={`lg`}>
        {isLoading && <Spinner size={20} color={"black"} />}
        {!isLoading && `Finish`}
      </Button>
      <button className={`mt-2`} onClick={() => setStep(2)}>
        <span className={`underline text-sm`}>{`< Back`}</span>
      </button>
    </div>
  )
}