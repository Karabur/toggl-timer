import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'
import styles from './month-log.module.sass'
import classnames from 'classnames'
import { format, getDate, getDaysInMonth, getHours, getMinutes } from 'date-fns'
import { useEffect, useState } from 'react'

const days = Array.from(Array(getDaysInMonth(Date.now()))).map((v, i) => i)

function MonthLog() {
	const [curTime, setCurTime] = useState(Date.now())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurTime(Date.now)
		}, 10000)
		return () => clearInterval(timer)
	}, [])

	const curDay = getDate(Date.now())
	const currentTimeOffset = `${((getHours(curTime) * 60 + getMinutes(curTime)) / 1440) * 100}%`

	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				{format(Date.now(), 'MMMM')}
			</Typography.Title>
			<div className={styles.list}>
				{days.map((day) => (
					<div className={styles.line}>
						<div className={styles.day}>{day}</div>
						<div className={classnames(styles.dayBox, { [styles.active]: curDay === day })}>
							{curDay === day ? (
								<div className={styles.currentTimeMark} style={{ left: currentTimeOffset }} />
							) : (
								false
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(MonthLog)
