import axios from 'axios'
import store from './store'

const apiUrl = 'https://api.track.toggl.com/api/v9/'

const request = axios.create({
	baseURL: apiUrl,
	transformRequest: (data, headers) => {
		const token = Buffer.from(`${store.apiToken}:api_token`, 'utf8').toString('base64')
		headers.authorization = `Basic ${token}`
		return data
	},
})

export async function loadData() {
	const workspaces = await request.get('workspaces')
	const newProjects = []
	for (let workspace of workspaces.data) {
		const projects = await request.get(`workspaces/${workspace.id}/projects`)
		for (let project of projects.data) {
			if (!project.active) continue
			const existing = store.projects.find((p) => p.id === project.id)
			newProjects.push({
				id: project.id,
				name: project.name,
				rate: existing?.rate || 0,
				color: existing?.color || '#333',
			})
		}
	}
	store.projects = newProjects
}
