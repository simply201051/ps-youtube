# ps-youtube
AngularJS lazy load youtube video

## Usage
  -load js
  ```html
  <script src="./angular.js"></script>
  <script src="./angular-youtube.min.js"></script>
  ```

  -module
  ```js
  angular.module('MyApp', ['ps-youtube'])
  ```
  -html
  ```html
  <!-- use variable -->
  <div ps-youtube="player" video-id="video.id"></div>
  <!-- or string -->
  <div ps-youtube video-id="'your video id'"></div>
  ```
## Directive options
  - `ps-youtube` player
  - `video-id` video id is required
  - `video-name` video name add this attribute to `<img alt="videoName">`
  - `video-quality` image quality<br/>
    1. `mq` 320×180<br/>
    2. `hq` 480×360<br/>
    3. `sd` 640×480 `default`<br/>
    4. `maxres` 1920×1080<br/>
  - `player-options` default { autoplay: 1, rel: 0 }<br/>
  refer [youtube player parameters](https://developers.google.com/youtube/player_parameters)

## Reference
  [How to “Lazy Load” Embedded YouTube Videos](https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743)
