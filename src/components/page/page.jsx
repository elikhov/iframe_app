import React, {useState} from 'react'

import { Settings, IframePlayer } from '../'

import style from './page.module.css'

export const Page = () => {
  const [config, setConfig] = useState(null)

  return (
    <div className={style.container}>
      <Settings
        currentConfig={config}
        setCurrentConfig={(newConfig) => setConfig(newConfig)}
      />
      {config && (
        <IframePlayer
          width={config.width}
          height={config.height}
          url={config.url}
          resize={config.resize}
        />
      )}
    </div>
  )
}