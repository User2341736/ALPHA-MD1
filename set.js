const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUhqSmZ3dDkvOUhodFNGQWliRkw5M3UvekZldm8rOUZ4NmNXY2t1a3Awcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTFqUHp2WmtYUzU4ZFlqSS9idFFjQ2d1UEIxM2pYOTFjZTZ6UHBzaGx4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTDR1RytBNjhVNVlOc2hhTEFiZGNiTUNUUVVta0ZxM3M4akp3ZENGRTJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMcm9MTmhkZGlVelN2YmxNSk9jOXlIaFVOMnJlU210d1pZZWNydUwyTHdRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVPVjRsZGZkUVRmdlhoTlVzMXpXc1FMdnNwRkJIWE5KQTVydU5aL204WEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFteXMxQW9HZGdNSGJKV1JMVkl4RVJYZHZ6a3Rla1d2b3BTM0tkT25yRG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVAzbWFDamVoakRUWGdqWTFCZXhMOElmandmTnpDVHlKU2x0N0lrQ1RuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1RJck9Ia25jd0VRd1lJeVVxUDdvVGNHV0FXOU0vV0V5SEdiWk42WUVVMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI5aGZibFBMM2JvbzVrTUNGMUxQdkVURFNncWV2Q1g1OUs0S20vTmxzR21qV3E4Y00wd3VENllYaTlQWnMzWnpVR3liMHRQVGIzamR1WjRZTnNlNkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODgsImFkdlNlY3JldEtleSI6InZraitjUVdiaFZhdUZjRDZCYWcwNEhkQ0VGang3Tkc0YVVvbktPSkZSVlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZnblljVnBQUkJHNkx5Tk51blB2VXciLCJwaG9uZUlkIjoiYTYzNjc1ZDEtYWJlYy00MjgzLWEyNzktZmFjN2U0YzA5MDMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im01L3R2ZmpJV1Y5aklnbWlLTHpaZ1Nlb2MrRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRUk9jaVRhbUlTY2VSSllzRGVGN1B1SE9LbUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVkFDQkdLMkwiLCJtZSI6eyJpZCI6IjI2Mzc3NTYxNDYyNzoxMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVBSOThVR0VPMnp2N2dHR0EwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic3ZET1VmMzFkTEVsWUEzMDNXcVRKLzhYT2hXOWt0NjRRK1FjcjNaN2xGQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiemdXaDBTaUVsNmI3bC9nUEtwSExmckZCMjkzUmFaNUJCOVBuY2YzdEp2eTFMOVdIQU5ZQnIxaWpjRUFmT1UzaXVLNGhZUUN6THo3b0pmUFBha29BQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9QSWVoYnZGSlc1bTVsaXdOeEo3bWp4TkQ3dUt4ZmJLZE5DZHpIKzlGWjB2K011dFhPdyt5eklnQmY5bHBwZWJsdFZNRDlPWTVxMndHM3Z4dGhYTkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc1NjE0NjI3OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJMd3psSDk5WFN4SldBTjlOMXFreWYvRnpvVnZaTGV1RVBrSEs5MmU1UlEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkwOTIwOTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR1RzIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Don T",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 263775614627",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DON-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
