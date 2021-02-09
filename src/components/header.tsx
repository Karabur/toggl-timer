import { observer } from 'mobx-react-lite'
import styles from './header.module.sass'
import { SettingOutlined } from '@ant-design/icons'
import store from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function Header() {
	function onSettingsClick() {
		store.showSettings = !store.showSettings
	}

	return (
		<div className={styles.header}>
			<div className={styles.projects}>
				{store.projects.map((project) => (
					<div key={project.id} style={{ background: project.color }}>
						{project.name}
					</div>
				))}
			</div>
			<div className={styles.status}>
				<FontAwesomeIcon className={styles.statusIcon} icon={faCoffee} />
			</div>

			<div className={styles.rightBlock}>
				<SettingOutlined className={styles.settingsIcon} onClick={onSettingsClick} />
			</div>
		</div>
	)
}

export default observer(Header)
