export default function AlbumList() {

  const albums = []
  for (let i = 0; i < 100; i++) {
    albums.push(`Album ${i}`)
  }

  return (
    <>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => {
          return <li key={album}>
            <img src="https://via.placeholder.com/120" alt="album cover" />
            <div className={`flex flex-col`}>
              <p>{album}</p>
              <p>Artist Name</p>
            </div>
          </li>
        })}
      </ul>
    </>
  )
}