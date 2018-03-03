'use strict'

import { app, BrowserWindow } from 'electron'
import createMenu from './menu'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let willQuitApp = false
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', e => {
    if (willQuitApp) {
      // user want to quit app
      mainWindow = null
    } else {
      // user just want hide app
      e.preventDefault()
      mainWindow.hide()
    }
  })
}

app.on('ready', () => {
  createWindow()
  createMenu(app)
})

app.on('before-quit', () => {
  willQuitApp = true
})

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show()
  }
})
