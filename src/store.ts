import { configure, makeAutoObservable, observable } from 'mobx'
import { AsyncTrunk, ignore } from 'mobx-sync'

configure({ enforceActions: 'never' })

export interface Project {
	id: number
	name: string
	rate: number
	color: string
}

export interface Timer {
	projectId: number
	started: boolean
}

class Store {
	@observable apiToken: string | null = null
	@observable projects: Project[] = []
	@ignore @observable loaded = false
	@ignore @observable showSettings = false

	@observable currentTimer: Timer | null = null

	constructor() {
		makeAutoObservable(this)
	}
}

const store = new Store()

const trunk = new AsyncTrunk(store, {
	storage: localStorage,
})

trunk.init().then((res) => {
	store.loaded = true
})

export default store
