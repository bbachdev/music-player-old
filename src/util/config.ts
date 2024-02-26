import { exists, readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

const CONFIG_FILE_NAME = 'config.json';

export type Config = {
  libraryPaths: string|SubsonicEntity[];
  theme: "light" | "dark"
  accentColor: string; //TODO Potentially restrict to a list of colors
  discordRichPresenceEnabled: boolean;
  lyricDownloadsEnabled: boolean;
  homeSort: Sorting; //Default sorting for the home screen
  artistSort: Sorting; //Sorting when the user selects an artist
}

export type SubsonicEntity = {

}

type Sorting = {
  type: string; //TODO: Potentially restrict to a list of types
  direction: "asc" | "desc";
}

export async function getConfigFile() : Promise<Config | undefined> {
  if(await exists(CONFIG_FILE_NAME, {dir: BaseDirectory.AppData})) {
    let file = await readTextFile(CONFIG_FILE_NAME, {dir: BaseDirectory.AppData});
    let config = JSON.parse(file) as Config;
    return config;
  }else{
    return undefined;
  }
}

export async function saveConfig(config: Config) {
  await writeTextFile({path: CONFIG_FILE_NAME, contents: JSON.stringify(config)}, {dir: BaseDirectory.AppData});
}