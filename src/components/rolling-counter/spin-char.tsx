import styles from './spin-char.module.sass'

export interface Props {
	value: string
}

export default function SpinChar({ value }: Props) {
	let char = value[0]

	return (
		<div className={styles.wrapper}>
			{/*<div className={styles.nextChar}>{char}</div>*/}
			<div className={styles.char}>{char}</div>
		</div>
	)
}
