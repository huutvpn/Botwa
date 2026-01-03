const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const kuis = require('./kuis');
const cs = require('./cs');
const admin = require('./admin');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 BOT SUPER AKTIF 24 JAM');
});

client.on('message', msg => {
    const text = msg.body.toLowerCase();

    if (text === 'menu') {
        msg.reply(
`🤖 MENU BOT
1️⃣ Kuis SD
2️⃣ Info Sekolah
3️⃣ CS / Jualan`
        );
    }
    kuis(msg, text);
    admin(msg, text);
    cs(msg, text);
});

client.initialize();