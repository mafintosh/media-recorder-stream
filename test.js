const test = require('tape')

const recorder = require('.')

const constraint = { audio: true, video: false }

test('Buffer is emit when passing media stream', t => {
  navigator.mediaDevices.getUserMedia(constraint).then(media => {
    const stream = recorder(media, { interval: 1000 })

    stream.on('data', function (data) {
      t.ok(data instanceof Buffer)
      t.end()
    })
  })
})

test('recorder should return a destroy method', t => {
  navigator.mediaDevices.getUserMedia(constraint).then(media => {
    const stream = recorder(media, { interval: 1000 })

    t.ok(stream.destroy, 'contains destroy property')
    t.ok(typeof stream.destroy === 'function', 'destroy property is a function')
    t.end()
  })
})

test('recorder should return a media method', t => {
  navigator.mediaDevices.getUserMedia(constraint).then(media => {
    const stream = recorder(media, { interval: 1000 })

    t.ok(stream.media, 'contains media property')
    t.ok(stream.media instanceof MediaStream, 'is an instance of MediaStream') // eslint-disable-line
    t.end()
  })
})

test('recorder should return a recorder method', t => {
  navigator.mediaDevices.getUserMedia(constraint).then(media => {
    const stream = recorder(media, { interval: 1000 })

    t.ok(stream.recorder, 'contains recorder property')
    t.ok(stream.recorder instanceof MediaRecorder, 'is an instance of MediaRecorder') // eslint-disable-line
    t.end()
  })
})
