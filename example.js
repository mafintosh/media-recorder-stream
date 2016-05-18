var record = require('./')

var stream = record({video: true, audio: false, interval: 1000})
var video = document.createElement('video')

stream.on('ready', function () {
  video.src = window.URL.createObjectURL(stream.media)
  video.autoplay = true
  document.body.appendChild(video)
})

stream.on('data', function (data) {
  console.log('recording', data)
})
