import React, {useState, Fragment} from 'react'
import { Page } from './components'
import style from './App.module.css'
import { Button, Form, FloatingLabel, Alert } from 'react-bootstrap'

const defaultConfig = {
  url: '',
  width: 700,
  height: 400,
  resize: false,
  alias: '',
  autoplay: false,
}

function App() {
  const [iframes, setIframes] = useState([ { ...defaultConfig, name:'iframe_1' } ])
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false)

  const addIframe = () => {
    if (iframes.filter(iframe => iframe.name === name).length !== 0){
      setShowError(true)
      return
    }
    setIframes([ ...iframes, { ...defaultConfig, name: name }])
    setName('')
  }

  const applyChanges = (config) => {
    const arrayOfIframes = iframes
    const index = arrayOfIframes.findIndex(elem => elem.name === config.name)
    if (index || index === 0){
      arrayOfIframes[index] = config
      setIframes([ ...arrayOfIframes ])
    }
  }

  const deleteIframe = (name) => {
    const arrayOfIframes = iframes.filter(elem => elem.name !== name)
    setIframes(arrayOfIframes)
  }

  return (
    <div className={style.app_container}>
      <div className={style.header}>
        <h3>Page Header</h3>
      </div>
      <div className={style.nameContainer}>
        <FloatingLabel label='Iframe name'>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setShowError(false)}
          />
        </FloatingLabel>
        <Button
          onClick={addIframe}
          className={style.addBtn}
        >
          Add iframe
        </Button>
        {showError && (
          <Alert variant={'warning'}>Iframe with the same name is already exists!</Alert>
        )}
      </div>
      <Fragment>
        {iframes.map((iframe) => {
          return (
            <Page 
              key={iframe.name} 
              config={iframe}
              applyChanges={applyChanges}
              deleteIframe={deleteIframe}
            />
          )
        })}
      </Fragment>
    </div>
  );
}

export default App;
