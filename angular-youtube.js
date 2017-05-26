(function(angular, document, window) {
	"use strict";
	angular.module("ps-youtube", [])
		.factory('youtubePlayer', youtubePlayer)
		.directive("psYoutube", psYoutube)
		.run(psYoutubeRun);

	function youtubePlayer() {
		var ids = 0;
		var youtubePlayer = {
			addPlayer: addPlayer,
			newElementId: newElementId,
			players: [],
			pausePlayingVideo: pausePlayingVideo
		};
		return youtubePlayer

		function addPlayer(player) {
			youtubePlayer.players.push(player);
		}

		function newElementId() {
			ids++;
			return 'youtube-' + ids;
		}

		function pausePlayingVideo() {
			youtubePlayer.players.forEach(function(player) {
				if (player.state === 1) player.pauseVideo();
			})
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
				videoName: "="
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
				$element.bind("click", embedVideo);
			}

			function createImage() {
				var file = ["mq", "hq", "sd", "max"].indexOf($attrs.videoQuality) !== -1 ? $attrs.videoQuality + "default.jpg" : "sddefault.jpg";
				var src = "//img.youtube.com/vi/" + $scope.videoId + "/" + file;
				var alt = $scope.videoName || "youtube video";
				var img = angular.element('<img src="' + src + '" alt=' + alt + '">');
				return img;
			}

			function embedVideo(event) {
				var id = youtubePlayer.newElementId();
				var embed = angular.element('<div id="' + id + '"></div>');
				var playerVars = angular.extend({
					autoplay: 1,
					rel: 0
				}, $scope.playerOptions);
				$element.empty();
				$element.append(embed);
				$scope.player = newPlayer(id);

				function newPlayer(id) {
					var player = new YT.Player(id, {
						videoId: $scope.videoId,
						playerVars: playerVars,
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					});
					youtubePlayer.addPlayer(player);
					return player;
				}

				function onPlayerReady(event) {
					event.target.playVideo();
				}

				function onPlayerStateChange(event) {
					var state = event.data;
					if (state === 1) youtubePlayer.pausePlayingVideo();
					$scope.player.state = state;
					$scope.$emit("youtube.stateChange");
				}
			}
		}
	}

	psYoutubeRun.$inject = ['$rootScope'];

	function psYoutubeRun($rootScope) {
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