import { app, BrowserWindow,ipcMain } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800, // 高
    width: 1200, // 宽
    frame: false, // 是否创建frameless窗口
    fullscreenable: true, // 是否允许全屏
    center: true, // 是否出现在屏幕居中的位置
    backgroundColor: '#fff', // 背景色，用于transparent和frameless窗口
    titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
    resizable: true, // 是否允许拉伸大小
    transparent: false, // 是否是透明窗口（仅macOS）
    vibrancy: 'ultra-dark', // 窗口模糊的样式（仅macOS）
    webPreferences: {
      backgroundThrottling: false // 当页面被置于非激活窗口的时候是否停止动画和计时器
    }
    // ... 以及其他可选配置
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

ipcMain.on('min', e=> mainWindow.minimize());
ipcMain.on('max', e=> {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
});
ipcMain.on('close', e=> mainWindow.close());