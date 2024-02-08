export default function AlbumList() {

  const albums = []
  for (let i = 0; i < 100; i++) {
    albums.push(`Album ${i}`)
  }

  return (
    <div className={`w-full flex flex-col items-center`}>
      <h2 className={`self-start`}>Albums</h2>
      <ul className={`flex flex-wrap gap-4 items-center`}>
        {albums.map((album) => {
          return <li key={album} className={`w-fit`}>
            <img src="https://via.placeholder.com/120" alt="album cover" />
            <div className={`flex flex-col`}>
              <p>{album}</p>
              <p>Artist Name</p>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}