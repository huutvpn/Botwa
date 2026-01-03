import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import { Boom } from "@hapi/boom";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log("📱 Scan QR pakai WhatsApp");
    }

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        startBot();
      }
    }

    if (connection === "open") {
      console.log("✅ Bot WhatsApp Online!");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (text === "menu") {
      await sock.sendMessage(from, {
        text: `🤖 *BOT AUTO REPLY*
1. menu
2. halo
3. info
Ketik perintah di atas`
      });
    } 
    else if (text === "halo") {
      await sock.sendMessage(from, { text: "Halo juga 👋" });
    } 
    else if (text === "info") {
      await sock.sendMessage(from, { text: "Ini bot WhatsApp siap pakai 🚀" });
    }
  });
}

startBot();