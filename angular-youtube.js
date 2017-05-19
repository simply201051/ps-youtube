(function(angular, document, window) {
	"use strict";
	angular.module("ps-youtube", [])
		.factory('youtubePlayer', youtubePlayer)
		.directive("psYoutube", psYoutube)
		.run(YoutubeRun);

	function youtubePlayer() {
		var ids = 0;
		var youtubePlayer = {
			newElementId: newElementId,
			players: [],
			push: push
		};
		return youtubePlayer;

		function newElementId() {
			ids++;
			return 'youtube-' + ids;
		}

		function push(player) {
			youtubePlayer.players.push(player);
		}
	}

	psYoutube.$inject = ['youtubePlayer'];

	function psYoutube(youtubePlayer) {
		var youtube = {
			restrict: "EA",
			scope: {
				player: "=psYoutube",
				playerOptions: '=playerOptions',
				videoId: "=",
				videoNmae: "="
			},
			template: '<button class="play-button"></button>',
			link: link
		};
		return youtube;

		function link($scope, $element, $attrs) {
			var img = createImage();
			$scope.$on('youtube.ready', activate);

			function activate() {
				$element.addClass("youtube-container");
				$element.append(img);
				$element.bind("click", embedVideo2);
			}

			function createImage() {
				var file = ["mq", "hq", "sd", "max"].indexOf($attrs.videoQuality) !== -1 ? $attrs.videoQuality + "default.jpg" : "sddefault.jpg";
				var src = "//img.youtube.com/vi/" + $scope.videoId + "/" + file;
				var alt = $scope.videoName || "youtube video";
				var img = angular.element('<img src="' + src + '" alt=' + alt + ">");
				return img;
			}

			function embedVideo2(event) {
				var id = youtubePlayer.newElementId();
				var embed = angular.element('<div id="' + id + '"></div>');
				var playerVars = angular.extend({
					autoplay: 1,
					rel: 0
				}, $scope.playerOptions);
				console.log($scope.playerVars);
				$element.empty();
				$element.append(embed);
				$scope.player = new YT.Player(id, {
					videoId: $scope.videoId,
					playerVars: playerVars,
					events: {
						'onReady': onPlayerReady
					}
				});

				function onPlayerReady(event) {
					event.target.playVideo();
				}
			}

			function embedVideo(event) {
				event.stopPropagation();
				var src = "https://www.youtube.com/embed/" + $scope.videoId + "?autoplay=1&rel=0";
				var iframe = angular.element('<iframe src="' + src + '" frameborder="0"></iframe>');
				$element.empty();
				$element.append(iframe);
			}
		}
	}

	YoutubeRun.$inject = ['$rootScope'];

	function YoutubeRun($rootScope) {
		loadYoutubeApi();
		appendStyle();

		function loadYoutubeApi() {
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			window.onYouTubeIframeAPIReady = function() {
				$rootScope.$broadcast("youtube.ready");
			};
		}

		function appendStyle() {
			var style = '.youtube-container{position:relative;padding-top:56.25%;background-color:#000;overflow:hidden}.youtube-container .play-button{width:90px;height:60px;background-color:#333;box-shadow:0 0 30px rgba(0,0,0,.6);z-index:1;opacity:.8;border-radius:6px}.youtube-container img{width:100%;top:-16.82%;left:0;opacity:.7}.youtube-container .play-button:before{content:"";border-style:solid;border-width:15px 0 15px 26px;border-color:transparent transparent transparent #fff}.youtube-container .play-button,.youtube-container img{cursor:pointer}.youtube-container .play-button,.youtube-container .play-button:before,.youtube-container iframe,.youtube-container img{position:absolute}.youtube-container .play-button,.youtube-container .play-button:before{top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%)}.youtube-container iframe{height:100%;width:100%;top:0;left:0}';
			var styleElement = angular.element('<style type="text/css">' + style + "</style>");
			angular.element(document)
				.find("head")
				.append(styleElement);
		}
	}
})(angular, document, window);