
const output = (value) => {
  return {
    action: value
  }
}

export const outputMessages = {
  play: output('play'),
  stop: output('stop'),
  pause: output('pause'),
  mute: output('mute'),
  unmute: output('unmute')
}

export const inputMessages = {
  ready: 'ready'
}

export const sendMessage = (message, name) => {
  const iframe = window.frames[name];
  if(iframe){
    iframe.postMessage(message, '*')
    window.postMessage(message, '*')
  }
}