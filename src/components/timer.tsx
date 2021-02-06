import { observer } from 'mobx-react-lite'
import styles from './timer.module.sass'

function Timer() {
	return <div className={styles.header}></div>
}

export default observer(Timer)
