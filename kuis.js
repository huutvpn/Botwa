const sheet = require('./sheet');

module.exports = (msg, text) => {
    if (text === '1') {
        msg.reply('✏️ Soal: Rukun Islam ada berapa?');
    }
    if (text === '5') {
        msg.reply('✅ Benar! Nilai 100');
        sheet('Siswa WA', msg.from, 100);
    }
};