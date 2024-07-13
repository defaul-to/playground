import CustomVideoPlayer from "./videoplayer";

const videoInfo = {
  url: 'https://api.defaul.to/video',
  anime: 'Call of the Night',
  title: 'Die dritte Nacht: Da kam aber viel raus',
  intro: {
      start: 105,
      end: 194,
  },
};

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full max-w-[60rem] mx-auto flex gap-4 py-4 flex-col bg-black text-white">
        <div>
          <div className="">
            <CustomVideoPlayer videoInfo={videoInfo}/>
          </div>
          <h1 className="text-xl text-blue-600 font-bold">{videoInfo.anime}</h1>
          <h1 className="text-xl">{videoInfo.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default App