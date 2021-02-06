import { observer } from 'mobx-react-lite'
import React from 'react'
import Header from './components/header'
import Timer from './components/timer'
import Settings from './components/settings'
import store from './store'
import styles from './app.module.sass'
import { Col, Row } from 'antd'
import DayLog from './components/day-log'
import MonthLog from './components/month-log'

function App() {
	if (!store.loaded) return null
	return (
		<div className={styles.app}>
			<Header />
			<Row className={styles.content}>
				<Col flex={'300px'}>
					<DayLog />
				</Col>
				<Col flex={'auto'}>
					<Timer />
				</Col>
				<Col flex={'300px'}>
					<MonthLog />
				</Col>
			</Row>
			<Settings />
		</div>
	)
}

export default observer(App)
