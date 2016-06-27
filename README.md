# media-recorder-stream

The [Media Recorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) in the browser as a readable stream

```
npm install media-recorder-stream
```

## Usage

``` js
var getMedia = require('getusermedia')
var recorder = require('media-recorder-stream')

getMedia({video: true, audio: true}, function (err, media) {
  if (err) throw err

  var stream = recorder(media, {interval: 1000})

  stream.on('data', function (data) {
    console.log('recorded video data:', data)
  })

  // lets display the recorded video as well
  video.src = URL.createObjectURL(stream.media)
  video.autoplay = true
  document.body.appendChild(video)
})
```

## API

#### `var stream = recorder(media, options)`

`media` is a [`MediaStream` object](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API)
from the `getUserMedia` API.

Options include

``` js
{
  interval: 1000, // at which ms interval you want to capture video (defaults to 1s)
}
```

All other options are passed to the Media Recorder constructor

#### `stream.destroy()`

Will destroy the recording stream

#### `stream.media`

The media source stream associated with this stream. You can create a blob url from this and pass it to a video tag to play the recorded video locally.

#### `stream.recorder`

The associated Media Recorder instance.

## License

MIT
