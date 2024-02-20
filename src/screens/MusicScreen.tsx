import { invoke } from '@tauri-apps/api/tauri';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ArtistList from '../components/ArtistList';
import SongList from '../components/SongList';
import AlbumList from '../components/AlbumList';
import { Config } from '@/util/config';
import Header from '@/components/layout/Header';

interface MusicScreenProps {
    config: Config
}

export default function MusicScreen({config}: MusicScreenProps) {

  async function scan() {
    console.log('scan called')
    await invoke('scan', {paths: config.libraryPaths})
  }

  return (
    <>
      <Header scan={scan}/>
      <PanelGroup autoSaveId="musicPanels" direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <ArtistList/>
        </Panel>
        <PanelResizeHandle className={`border-2`} />
        <Panel minSize={30}>
          <AlbumList/>
        </Panel>
        <PanelResizeHandle className={`border-2`} />
        <Panel defaultSize={30} minSize={20}>
          <SongList/>
        </Panel>
      </PanelGroup>
    </>
  )
}