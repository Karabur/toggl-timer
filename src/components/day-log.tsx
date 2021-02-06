import { observer } from 'mobx-react-lite'
import { Typography } from 'antd'

function DayLog() {
	return (
		<div>
			<Typography.Title level={3} className={'centered'}>
				Today
			</Typography.Title>
		</div>
	)
}

export default observer(DayLog)
