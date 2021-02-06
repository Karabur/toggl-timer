import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'
import styles from './day-log.module.sass'
import { useEffect, useState } from 'react'
import { getHours, getMinutes, getSeconds } from 'date-fns'
import classnames from 'classnames'

const hours = Array.from(Array(24)).map((v, i) => i)
const hoursStr = hours.map((hour) => `${hour < 10 ? '0' : ''}${hour}:00`)

function DayLog() {
	const [curTime, setCurTime] = useState(Date.now())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurTime(Date.now)
		}, 10000)
		return () => clearInterval(timer)
	}, [])

	const curHour = getHours(curTime)
	const currentTimeOffset = `${((getMinutes(curTime) * 60 + getSeconds(curTime)) / 3600) * 100}%`

	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				Today
			</Typography.Title>
			<div className={styles.list}>
				{hours.map((hour) => (
					<div className={styles.line}>
						<div className={styles.hour}>{hoursStr[hour]}</div>
						<div className={classnames(styles.hourBox, { [styles.active]: curHour === hour })}>
							{curHour === hour ? (
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

export default observer(DayLog)
