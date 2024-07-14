### private anime streaming website (playground environment) - will most likely contain broken, unstable or unoptimized code
###### you've been warned! feel free to reuse my code or contact me to dev such a website for you if you like what you are seeing. projects I do for fun are the ones I can put thousands of hours into. would love to have a team on my side. ``bs.to`` wasn't interested in automating their website and the ``anfilix.tv`` admin didn't want to give me read-only database access.

**requirements:**
- [Node.js](https://nodejs.org/)

**how to run this:**
```shell
npm install
npm run dev
```

**this react.js app was built using:**
- [Vite.js](https://vitejs.dev/) - to set-up the project in less than a minute
- [TailwindCSS](https://tailwindcss.com/) - to style html elements inside the html code using classes
- [ReactPlayer](https://github.com/cookpete/react-player) - to have a solid video player base I can customize
- [Material Icons](https://mui.com/material-ui/material-icons/) - to have some clean icons for ui
- [heroicons](https://heroicons.com/) - same as above

and maybe more ready-to-use solutions to come. will keep this updated.

as of now the backend (database, api) remains private.

Current Features:
- video player
  - [x] big play icon before the video started
  - [x] skip intro button (timestamps have to be passed to the video player for this to show up)
  - [x] fullscreen support
  - [x] custom controls (copied the layout from the crunchyroll player)
    - [x] current time
    - [x] video length 
    - [x] slider
    - [x] enter/exit fullscreen
    - [x] pause/resume/repeat video playback
    - [ ] settings
    - [ ] volume changer
    - [ ] skip to the next video in a playlist 
  - [x] stop displaying controls when mouse hasn't moved for x seconds while hovering the video player
  - [x] stop displaying 'skip intro' button after x seconds in the intro have been passed
  - [x] show controls and skip intro button when hovering over the video player
  - [x] slider changes the current displayed time
  - [x] slider changes to the new time only when releasing the mouse
  - [x] video doesn't start from 0:00 again when finished playing
  - [x] video controls remain visible when the video is over
  - [ ] when moving the slider, the slider should show a small image of the current target frame

https://github.com/user-attachments/assets/4e784e1b-f3a1-4954-b599-4c019b7833e7
