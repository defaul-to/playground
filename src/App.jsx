import CustomVideoPlayer from "./videoplayer";

// lets assume I have authentication implemented already
// and that the api returns me this data from a video id after passing authentication
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
    <div className="min-h-screen bg-primary">
      <div className="w-full max-w-[60rem] mx-auto flex gap-4 py-4 flex-col bg-primary text-secondary">
        <div className="w-full border border-contrast border-b-1 border-t-0 border-l-0 border-r-0 pb-5 flex">
          <div className="font-pk text-xl">defaul.to</div>
        </div>
        <div>
          <div className="">
            <CustomVideoPlayer videoInfo={videoInfo}/>
          </div>
          <h1 className="mt-5 text-xl text-contrast">{videoInfo.anime}</h1>
          <h1 className="text-2xl">{videoInfo.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default App