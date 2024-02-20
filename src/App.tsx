import "./App.css";
import { useEffect, useState } from "react";
import MusicScreen from './screens/MusicScreen';
import { Config, getConfigFile } from './util/config';
import SetupScreen from './screens/SetupScreen';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Spinner from './components/ui/spinner';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("");

  //Default config
  const [config, setConfig] = useState<Config>({
    libraryPaths: [],
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    accentColor: "bg-sky-500",
    discordRichPresenceEnabled: false,
    lyricDownloadsEnabled: false,
    homeSort: {type: "added", direction: "desc"},
    artistSort: {type: "added", direction: "desc"}
  });
  
  useEffect(() => {
    const getConfig = async () => {
      setIsLoading(true);
      try {
        const config = await getConfigFile();
        console.log("Config:", config)
        if(config) {
          setConfig(config);
          setCurrentScreen("music");
        }else{
          //Go to Setup screen
          setCurrentScreen("setup");
        }
        //TODO: Save to Context
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        
        setIsLoading(false);
      }
    };

    getConfig();
  }, []); 

  return (
    <ThemeProvider defaultTheme="system" storageKey="musicAppTheme">
      <div className={`dark:bg-slate-800 dark:text-white`}>
        {!isLoading && currentScreen && 
          (currentScreen === "music" ? <MusicScreen config={config}/> : <SetupScreen setCurrentScreen={setCurrentScreen}/>)
        }
        {isLoading && 
          (<div>
            <Spinner/>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
