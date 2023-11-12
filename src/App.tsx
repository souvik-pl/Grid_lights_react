import useApp from "./App.hook";
import styles from "./App.module.css";

function App() {

  const {
    state,
    lightClickHandler,
  } = useApp();

  return (
    <main className={styles.main}>
      {
        Object.entries(state).map((light: [string, boolean | null]) => (
          <div key={light[0]} className={styles.grid_light}>
            {
              light[1] !== null && (
                <div 
                  className={
                    light[1] === true ? 
                    `${styles.light_normal} ${styles.light_on}` : `${styles.light_normal}`
                  }
                  onClick={lightClickHandler(light)}
                >
                  {light[0]}
                </div>
              )
            }
          </div>
        ))
      }
    </main>
  )
}

export default App