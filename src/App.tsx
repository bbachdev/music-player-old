import "./App.css";
import { useEffect, useState } from "react";
import MusicScreen from './screens/MusicScreen';
import { getConfigFile } from './util/config';
import SetupScreen from './screens/SetupScreen';
import { ThemeProvider } from './components/providers/ThemeProvider';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("");
  
  useEffect(() => {
    const getConfig = async () => {
      setIsLoading(true);
      try {
        const config = await getConfigFile();
        console.log("Config:", config)
        if(config) {
          //TODO: Save to Context and load Music screen
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
          (currentScreen === "music" ? <MusicScreen /> : <SetupScreen/>)
        }
        {isLoading && 
          (<div>
            Loading...
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
