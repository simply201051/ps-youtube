# ps-youtube
AngularJS 延遲載入 Youtube 影片

## Usage
  -load js
  ```html
  <script src="angular.js"></script>
  <script src="ps-youtube.min.js"></script>
  ```

  -module
  ```js
  angular.module('MyApp', ['ps-youtube'])
  ```
  -html
  ```html
  <div ps-youtube video-id="videoId" video-name="videoName"></div>
  <!-- or -->
  <ps-youtube video-id="videoId" video-name="videoName" video-quantity="max"></ps-youtube>
  ```
## Directive options
  - `video-id` 影片ID  
  - `video-name` 影片名稱，用於替代圖片 `<img>` 的 alt 。  
  - `video-quality` 替代圖片解析度<br/>
    1. `mq` 320×180<br/>
    2. `hq` 480×360<br/>
    3. `sd` 640×480 預設值<br/>
    4. `max` 1920×1080<br/>
