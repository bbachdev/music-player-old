export default function ArtistList() {

  const artists = []
  for (let i = 0; i < 100; i++) {
    artists.push(`Artist ${i}`)
  }

  return (
    <>
      <h2>Artists</h2>    
      <ul>
        {artists.map((artist) => {
          return <li key={artist}>{artist}</li>
        })}
      </ul>
    </>
  )
}