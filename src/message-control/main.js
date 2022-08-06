const { ipcMain } = require('electron')
const sqllie3 = require('sqlite3')

const database = new sqllie3.Database('./public/database.db', err => {
    if(err) console.error('Database opening error: ', err);
})

ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    database.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows)
    })
}); 