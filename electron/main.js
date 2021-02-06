const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const { default: installExtension, REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer')

let mainWindow

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		show: false,
		webPreferences: {
			webSecurity: false,
		},
	})
	mainWindow.loadURL(
		!app.isPackaged
			? process.env.ELECTRON_START_URL
			: url.format({
					pathname: path.join(__dirname, '../index.html'),
					protocol: 'file:',
					slashes: true,
			  })
	)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('ready', () => {
	installExtension([REACT_DEVELOPER_TOOLS, MOBX_DEVTOOLS])
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err))
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
