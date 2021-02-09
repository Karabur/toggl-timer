import { observer } from 'mobx-react-lite'
import styles from './timer.module.sass'
import { Button } from 'antd'
import store from '../store'
import { mixColors } from '@adso-ts/mix-colors'
import RollingCounter from './rolling-counter'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function Timer() {
	const [time, setTime] = useState(12303)

	useEffect(() => {
		const timer = setInterval(() => setTime((time) => time + 1), 5000)
		return () => clearInterval(timer)
	}, [])

	return (
		<div>
			<RollingCounter className={styles.timer} value={time} format={'time'} />
			<RollingCounter className={styles.moneyTimer} value={50.22} format={'money'} />
			<div className={styles.buttons}>
				{store.projects.map((project) => (
					<Button
						key={project.id}
						className={styles.startButton}
						style={{ background: mixColors(project.color, '#fff', 25) }}
					>
						Start {project.name}
					</Button>
				))}
			</div>
		</div>
	)
}

export default observer(Timer)
