import styles from './line-log.module.sass'
import classNames from 'classnames'

export interface Line {
	currentOffset: number | null
	title: string
}

export interface Props {
	lines: Line[]
}

export default function LineLog({ lines }: Props) {
	return (
		<div className={styles.list}>
			{lines.map((line) => (
				<div className={styles.line}>
					<div className={styles.lineTitle}>{line.title}</div>
					<div className={classNames(styles.lineBox, { [styles.active]: line.currentOffset !== null })}>
						{line.currentOffset !== null ? (
							<div className={styles.currentMark} style={{ left: `${line.currentOffset * 100}%` }} />
						) : (
							false
						)}
					</div>
				</div>
			))}
		</div>
	)
}
