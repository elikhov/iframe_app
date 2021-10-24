import { Page } from './components'
import style from './App.module.css'

function App() {
  return (
    <div className={style.app_container}>
      <div className={style.header}>
        <h3>Page Header</h3>
      </div>
      <Page />
      <div className={style.footer}>
        <h3>Page Footer</h3>
      </div>
    </div>
  );
}

export default App;
