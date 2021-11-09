import React, { Component } from 'react'

import { Settings, IframePlayer } from '../'
import { outputMessages, inputMessages, sendMessage } from '../../utils/messages'

import style from './page.module.css'

export class Page extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount(){
    window.addEventListener('message', this.handler)
  }

  componentWillUnmount(){
    window.removeEventListener('message', this.handler)
  }

  handler = (event) => {
    const { config } = this.props
    if (config.autoplay && event?.data){
      if (event.data?.event === inputMessages.ready && event.data?.alias === config?.alias){
        sendMessage({ ...outputMessages.play, alias: config.alias}, config.name)
      }
    }
  }
  render(){
    const { config, applyChanges, deleteIframe } = this.props

    return (
      <div className={style.container}>
        <Settings
          config={config}
          applyChanges={applyChanges}
          deleteIframe={deleteIframe}
        />
        <div className={style.frame_container}>
          <IframePlayer config={config} />
        </div>
      </div>
    )
  }
}