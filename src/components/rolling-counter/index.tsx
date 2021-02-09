import classNames from 'classnames'
import styles from './rolling-counter.module.sass'
import SpinChar from './spin-char'

export interface Props {
	format: 'money' | 'time'
	value: number
	className?: string
}

function pad(v: number) {
	return v >= 10 ? `${v}` : `0${v}`
}

export default function RollingCounter(props: Props) {
	let value = props.value
	let formatted
	if (props.format === 'money') formatted = `$ ${value}`
	else {
		const hours = pad(Math.floor(value / 60 / 60))
		const mins = pad(Math.floor(value / 60) % 60)
		const seconds = pad(value % 60)
		formatted = `${hours}:${mins}:${seconds}`
	}

	return (
		<div className={classNames(styles.container, props.className)}>
			{formatted.split('').map((d, idx) => (
				<SpinChar value={d} key={idx} />
			))}
		</div>
	)
}
