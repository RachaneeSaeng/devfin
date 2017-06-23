importScripts('/build/workbox.js')

const wb = new WorkboxSW()

wb.router.registerRoute('/*', wb.strategies.networkFirst())