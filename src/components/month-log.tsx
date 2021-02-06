import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'

function MonthLog() {
	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				This Month
			</Typography.Title>
		</div>
	)
}

export default observer(MonthLog)
