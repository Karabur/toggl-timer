import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getHours, getMinutes, getSeconds } from 'date-fns'
import LineLog from './line-log'

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
	const currentTimeOffset = (getMinutes(curTime) * 60 + getSeconds(curTime)) / 3600

	const lines = hours.map((hour) => ({
		title: hoursStr[hour],
		currentOffset: hour === curHour ? currentTimeOffset : null,
	}))

	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				Today
			</Typography.Title>
			<LineLog lines={lines} />
		</div>
	)
}

export default observer(DayLog)
