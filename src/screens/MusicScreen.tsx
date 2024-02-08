import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ArtistList from '../components/ArtistList';
import SongList from '../components/SongList';
import AlbumList from '../components/AlbumList';

export default function MusicScreen() {
  return (
    <>
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