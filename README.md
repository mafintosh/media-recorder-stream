# media-recorder-stream

The [Media Recorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) in the browser as a readable stream

```
npm install media-recorder-stream
```

## Usage

``` js
var recorder = require('media-recorder-stream')

var stream = recorder({
  video: true,
  audio: false
})

stream.on('data', function (data) {
  console.log('recorded video data:', data)
})

stream.on('ready', function () {
  // lets display the recorded video as well
  video.src = URL.createObjectURL(stream.media)
  video.autoplay = true
  document.body.appendChild(video)
})
```

## API

#### `var stream = recorder(options)`

Options include

``` js
{
  interval: 1000, // at which ms interval you want to capture video (defaults to 1s)
  video: true, // do you want to capture video
  audio: false // do you want to capture audio
}
```

All other options are passed to the Media Recorder constructor

#### `stream.destroy()`

Will destroy the recording stream

#### `stream.on('ready')`

Emitted when the stream is ready to record. The properties below will be null if accessed before

#### `stream.media`

The media source stream associated with this stream. You can create a blob url from this and pass it to a video tag to play the recorded video locally.

#### `stream.recorder`

The associated Media Recorder instance.

## License

MIT
