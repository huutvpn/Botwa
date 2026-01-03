module.exports = (msg, text) => {
    if (text.includes('harga')) {
        msg.reply('💰 Harga mulai 10.000');
    }
    if (text.includes('admin')) {
        msg.reply('👤 Admin akan membalas segera');
    }
};