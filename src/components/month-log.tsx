import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'
import { format, getDate, getDaysInMonth, getHours, getMinutes } from 'date-fns'
import { useEffect, useState } from 'react'
import LineLog from './line-log'

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
	const currentOffset = (getHours(curTime) * 60 + getMinutes(curTime)) / 1440

	const lines = days.map((day) => ({
		title: `${day + 1}`,
		currentOffset: curDay === day ? currentOffset : null,
	}))

	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				{format(Date.now(), 'MMMM')}
			</Typography.Title>

			<LineLog lines={lines} />
		</div>
	)
}

export default observer(MonthLog)
