const stream = require('readable-stream')

module.exports = createRecordStream

function createRecordStream (media, opts) {
  if (!opts) opts = {}

  const rs = stream.Readable()
  let top = 0
  let btm = 0
  const buffer = []

  rs.recorder = null
  rs.media = null

  rs._read = noop
  rs.destroyed = false
  rs.destroy = function (err) {
    if (rs.destroyed) return
    rs.destroyed = true
    stop()
    if (err) rs.emit('error', err)
    rs.emit('close')
    rs.recorder = null
    rs.media = null
  }

  rs.stop = function () {
    rs.once('data', function () {
      rs.push(null)
    })
    stop()
  }

  rs.media = media
  rs.recorder = new window.MediaRecorder(media, opts)
  rs.recorder.addEventListener('dataavailable', function (ev) {
    push(ev.data)
  })
  rs.recorder.start(opts.interval || 1000)

  return rs

  function stop () {
    rs.recorder.stop()

    const video = rs.media.getVideoTracks()
    const audio = rs.media.getAudioTracks()

    video.forEach(trackStop)
    audio.forEach(trackStop)
  }

  function trackStop (track) {
    track.stop()
  }

  function push (blob) {
    const r = new window.FileReader()
    const index = top++

    r.addEventListener('loadend', function () {
      const buf = Buffer.from(new Uint8Array(r.result))
      const i = index - btm

      while (buffer.length < i) buffer.push(null)
      buffer[i] = buf
      while (buffer.length && buffer[0]) {
        const next = buffer.shift()
        btm++
        rs.push(next)
      }
    })

    r.readAsArrayBuffer(blob)
  }
}

function noop () {}
