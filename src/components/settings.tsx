import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd'
import store from '../store'
import { loadData } from '../toggl-api'
import styles from './settings.module.sass'
import { GithubPicker } from 'react-color'

interface FormData {
	apiToken: string
}

function Settings() {
	const [refreshing, setRefreshing] = useState(false)
	const [showPickers, setShowPickers] = useState<{ [id: number]: boolean }>({})

	function togglePicker(id: number) {
		const newVal = { ...showPickers }
		newVal[id] = !newVal[id]
		setShowPickers(newVal)
	}

	function close() {
		store.showSettings = false
	}

	function onChange(values: Partial<FormData>) {
		if (values.apiToken !== undefined) store.apiToken = values.apiToken
	}

	async function refresh() {
		setRefreshing(true)
		try {
			await loadData()
		} finally {
			setRefreshing(false)
		}
	}

	return (
		<Modal
			visible={store.showSettings}
			title={'Settings'}
			onOk={close}
			onCancel={close}
			footer={
				<div>
					<Button onClick={close} size={'large'}>
						Close
					</Button>
				</div>
			}
		>
			<Form
				initialValues={{
					apiToken: store.apiToken,
				}}
				onValuesChange={onChange}
				size={'large'}
			>
				<Form.Item label={'Toggl Api token'} name={'apiToken'}>
					<Input />
				</Form.Item>
				<Button loading={refreshing} onClick={refresh} type={'primary'}>
					Sync Data
				</Button>
				<div className={styles.projects}>
					<Typography.Title level={3}>Projects</Typography.Title>
					{store.projects.map((p) => (
						<div className={styles.project} key={p.id}>
							<Typography.Title className={styles.projectName} level={5}>
								{p.name}
							</Typography.Title>
							<InputNumber
								className={styles.rate}
								value={p.rate}
								onChange={(v) => {
									console.log(v)
									p.rate = (v as any) || 0
								}}
								formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ''}
							/>
							<div
								className={styles.colorBox}
								style={{ background: p.color }}
								onClick={() => togglePicker(p.id)}
							>
								{showPickers[p.id] && (
									<GithubPicker
										width={'212px'}
										className={styles.colorPicker}
										color={p.color}
										onChange={(c) => (p.color = c.hex)}
										triangle={'hide'}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</Form>
		</Modal>
	)
}

export default observer(Settings)
