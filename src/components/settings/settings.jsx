import React, { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'

import style from './settings.module.css'

const defaultConfig = {
  url: '',
  width: 700,
  height: 400,
  resize: false
}

export const Settings = ({
  setCurrentConfig
}) => {
  const [config, setConfig] = useState(defaultConfig);

  return (
    <div className={style.container}>
      <FloatingLabel label='Url'>
        <Form.Control
          value={config.url}
          onChange={(e) => setConfig({ ...config, 'url': e.target.value })}
        />
      </FloatingLabel>
      <FloatingLabel label='Width'>
        <Form.Control
          value={config.width}
          onChange={(e) => setConfig({ ...config, 'width': e.target.value })}
        />
      </FloatingLabel>
      <FloatingLabel label='Height'>
        <Form.Control
          value={config.height}
          onChange={(e) => setConfig({ ...config, 'height': e.target.value })}
        />
      </FloatingLabel>
      <Form.Group>
        <Form.Label>Enable resize</Form.Label>
        <Form.Check value={config.resize} onChange={() => setConfig({ ...config, 'resize': !config.resize })}/>
      </Form.Group>
      <Button 
        onClick={() => setCurrentConfig(config)}
      >
        Generate/Update iframe
      </Button>
    </div>
  )
}