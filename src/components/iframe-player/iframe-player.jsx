import React, { Component } from 'react'

import style from './iframe-player.module.css'

export class IframePlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    window.addEventListener('message', this.messageHandler)
  }

  componentWillUnmount(){
    window.removeEventListener('message', this.messageHandler)
  }

  messageHandler = (event) => {
    if (event?.data && event.data?.alias === this.props.config?.alias){
      const sender = event.data?.sender ? event.data.sender : 'PARTNER SITE'
      this.setState((prevState) => {
        return {
          messages: [...prevState.messages, {date: new Date().toLocaleTimeString('en-US'), ...event.data, sender: sender }]
        }
      })
    }
  }

  render (){
    const {url, width, height, resize, name, alias } = this.props.config;
    const { messages } = this.state;
    return(
      <div className={style.container}>
        <div>{'IFrame name - ' + name}</div>
        <div className={style.console}>
          {messages.map((value) => {
            return <span>{value.date + ' - ' + value.sender +  ' - ' + alias + ': '}{value?.event ?? value?.action}</span>
          })}
        </div>
        { url ?
          <iframe 
            src={url}
            allow={"encrypted-media; gyroscope; autoPlay; fullscreen"} 
            width={Number.parseInt(width)} 
            height={Number.parseInt(height)} 
            sandbox="allow-storage-access-by-user-activation || allow-scripts || allow-same-origin || allow-popups"
            title='external player'
            style={ resize ? { resize: 'both', overflow: 'auto' } : {} }
            name={name}
            id={'iframe_'+name}
          />
          :
          <div style={{width: width, height: height}} className={style.square}>
            <span>Поле Url не может быть пустым!</span>
          </div>
        }
      </div>
    )
  }
}