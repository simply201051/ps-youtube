(function(angular, document) {
	'use strict';
	angular.module('ps-youtube', [])
		.directive('psYoutube', psYoutube)
		.run(psYoutubeRun);

	function psYoutube() {
		var youtube = {
			restrict: 'EA',
			scope: {
				videoId: '=',
				videoNmae: '=',
				autoplay: '@'
			},
			template: '<button class="play-button"></button>',
			link: link
		};
		return youtube;

		function link($scope, $element, $attrs) {
			var img = createImage();
			activate();

			function activate() {
				$element.addClass('youtube-container');
				$element.append(img);
				$element.bind('click', embedVideo);
			}

			function createImage() {
				var file = ['mq', 'hq', 'sd', 'max'].indexOf($attrs.quality) !== -1 ? $attrs.quality + 'default.jpg' : 'sddefault.jpg';
				var src = '//img.youtube.com/vi/' + $scope.videoId + '/' + file;
				var alt = $scope.videoName || 'youtube video';
				var img = angular.element('<img src="' + src + '" alt=' + alt + '>');
				return img;
			}

			function embedVideo() {
				var autoplay = $scope.autoplay || 1;
				var src = 'https://www.youtube.com/embed/' + $scope.videoId + '?autoplay=' + autoplay + '&rel=0';
				var iframe = angular.element('<iframe src="' + src + '" frameborder="0"></iframe>');
				$element.empty();
				$element.append(iframe);
			}
		}
	}

	function psYoutubeRun() {
		var style = '.youtube-container{position:relative;padding-top:56.25%;background-color:#000;overflow:hidden}.youtube-container .play-button{width:90px;height:60px;background-color:#333;box-shadow:0 0 30px rgba(0,0,0,.6);z-index:1;opacity:.8;border-radius:6px}.youtube-container img{width:100%;top:-16.82%;left:0;opacity:.7}.youtube-container .play-button:before{content:"";border-style:solid;border-width:15px 0 15px 26px;border-color:transparent transparent transparent #fff}.youtube-container .play-button,.youtube-container img{cursor:pointer}.youtube-container .play-button,.youtube-container .play-button:before,.youtube-container iframe,.youtube-container img{position:absolute}.youtube-container .play-button,.youtube-container .play-button:before{top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%)}.youtube-container iframe{height:100%;width:100%;top:0;left:0}';
		var styleElement = angular.element('<style type="text/css">' + style + '</style>');
		angular.element(document)
			.find('head')
			.append(styleElement);
	}
})(angular, document);