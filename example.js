var getMedia = require('getusermedia')
var recorder = require('./')

getMedia({video: true, audio: true}, function (err, media) {
  if (err) throw err

  var stream = recorder(media, {interval: 1000})

  stream.on('data', function (data) {
    console.log('recorded video data:', data)
  })

  // lets display the recorded video as well
  var video = document.createElement('video')
  video.src = URL.createObjectURL(media)
  video.autoplay = true
  document.body.appendChild(video)
})
