export default function SongList() {
  const songs = []
  for (let i = 0; i < 100; i++) {
    songs.push(`Song ${i}`)
  }
  return (
    <>
      <h2>Songs</h2>
      <ul>
        {songs.map((song) => {
          return <li key={song}>{song}</li>
        })}
      </ul>
    </>
  )
}