import React, { useState } from 'react'
import { Form, Button, FloatingLabel, DropdownButton, Dropdown } from 'react-bootstrap'

import { outputMessages, sendMessage} from '../../utils/messages'

import style from './settings.module.css'

const dropdownButtons = [
  {name: 'Play', action: outputMessages.play },
  {name: 'Stop', action: outputMessages.stop },
  {name: 'Pause', action: outputMessages.pause },
  {name: 'Mute', action: outputMessages.mute },
  {name: 'Unmute', action: outputMessages.unmute },
]


export const Settings = ({
  config,
  applyChanges,
  deleteIframe
}) => {
  const [conf, setConf] = useState(config);

  const apply = (config) => {
    applyChanges(config)
    let iframeElement = document.getElementById('iframe_'+config.name)
    if(iframeElement){
      iframeElement.src = iframeElement.src
    }
  }

  return (
    <div className={style.container}>
      <FloatingLabel label='Url'>
        <Form.Control
          className={style.url}
          value={conf.url}
          onChange={(e) => setConf({ ...conf, 'url': e.target.value })}
        />
      </FloatingLabel>
      <FloatingLabel label='Alias'>
        <Form.Control
          value={conf.alias}
          onChange={(e) => setConf({ ...conf, 'alias': e.target.value })}
        />
      </FloatingLabel>
      <FloatingLabel label='Width'>
        <Form.Control
          value={conf.width}
          className={style.width}
          onChange={(e) => setConf({ ...conf, 'width': e.target.value })}
        />
      </FloatingLabel>
      <FloatingLabel label='Height'>
        <Form.Control
          value={conf.height}
          className={style.height}
          onChange={(e) => setConf({ ...conf, 'height': e.target.value })}
        />
      </FloatingLabel>
      <div className={style.checkboxes}>
        <div className={style.checkboxContainer}>
          <span>Autoplay</span>
          <Form.Check value={conf.autoplay} onChange={() => setConf({ ...conf, 'autoplay': !conf.autoplay })}/>
        </div>
        <div className={style.checkboxContainer}>
          <span>Enable resize</span>
          <Form.Check value={conf.resize} onChange={() => setConf({ ...conf, 'resize': !conf.resize })}/>
        </div>
      </div>
      <Button
        onClick={() => apply(conf)}
        className={style.btn}
      >
        Apply
      </Button>
      <DropdownButton title={'Send action'}>
        {dropdownButtons.map((button, index) => {
          return (
            <Dropdown.Item key={index}>
              <Button 
                className={style.actionButton} 
                onClick={() => sendMessage({ ...button.action, alias: conf.alias }, conf.name)}
              >
                {button.name}
              </Button>
            </Dropdown.Item>
          )
        })}
      </DropdownButton>
      <Button
        onClick={() => deleteIframe(conf.name)}
        className={style.btn}
        variant={'danger'}
      >
        Delete
      </Button>
    </div>
  )
}