const { Readable } = require('streamx')
const FIFO = require('fast-fifo')
const b4a = require('b4a')

module.exports = class MediaRecorderStream extends Readable {
  constructor (media, opts = {}) {
    super()

    this.media = media
    this.queued = new FIFO()
    this.recorder = null
    this.stopped = false
    this.interval = opts.interval || 1000
    this.options = opts
  }

  _open (cb) {
    if (this.stopped) {
      cb(null)
      return
    }

    this.recorder = new window.MediaRecorder(this.media, this.options)
    this.recorder.addEventListener('dataavailable', (ev) => this._queue(ev.data))
    this.recorder.start(this.interval)

    cb(null)
  }

  _queue (blob) {
    const next = { buffer: null }
    this.queued.push(next)

    const r = new window.FileReader()

    r.addEventListener('loadend', () => {
      next.value = b4a.from(r.result)

      while (true) {
        const btm = this.queued.peek()
        if (!btm || !btm.value) return
        this.queued.shift()
        this.push(btm.value)
      }
    })

    r.readAsArrayBuffer(blob)
  }

  stop () {
    this.stopped = true

    if (this.recoder === null) {
      this.push(null)
      return
    }

    this.recorder.stop()
    const video = this.media.getVideoTracks()
    const audio = this.media.getAudioTracks()

    for (const m of video) m.stop()
    for (const m of audio) m.stop()

    this.once('data', () => this.push(null))
  }
}
