import { observer } from 'mobx-react-lite'
import styles from './header.module.sass'
import { SettingOutlined } from '@ant-design/icons'
import store from '../store'

function Header() {
	function onSettingsClick() {
		store.showSettings = !store.showSettings
	}

	return (
		<div className={styles.header}>
			<div className={styles.projects}>
				{store.projects.map((project) => (
					<div style={{ background: project.color }}>{project.name}</div>
				))}
			</div>
			<SettingOutlined className={styles.settingsIcon} onClick={onSettingsClick} />
		</div>
	)
}

export default observer(Header)
