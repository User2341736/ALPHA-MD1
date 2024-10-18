const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURMcnZoaVVZSTFzWTF3dEN0ay92K2tYbkpObXg1Qkk1dE1rOHRPZk5Gbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkdqckJFbzNGY21JbW1kWHZyVEYxZldyOGFzb1hqV3hmMUpGc0toZmpIRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRmloMGkxQXo0Rm5UUXZjTEFDTHc4dTRGSStFNSsvZVdoclNwV3JyMUUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqVkdLVzhqSFpISUhKT1JXQUd2aFk3bWIxdzdnREJzaWVLRVFIQjlkOUFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9LNnhsSDUrcGhjNy8zbVJSZ3VqY090bUlTbndQQzZLckM3cVlMNk1GbUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1OeDlYZlBuaTh4VWlEQ0FtM21pcVk0bHBJc1g1aTE1bzRBMXZMdGhURjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0p0WHFwT3FGL0xhZ1Jsby9GNTA0eVRqT3pjbG5WM0hySDdJTWVkMnJuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUFdsSnoxWG1wMVVlcXNINjZySXpHN21XbHpTdENGVlkxV2MrQkE5YlIyOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5hTmdadGlITllYSjhvT1dSc0RGTDFiT25GaEowN2xsVHhlRkRtSWdhZHNCTE1vVTlSZjVJMlVDQndDdWxza2ZDbkwrUlE5VnRHK3cwWEVmeXo5Tmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IkU4QllBdVVHamIvUEVTZUJ0VlBzUnZkVFppaWN5WklGMWptZXVTRXoxTFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZlcDdZSjI3UmFlSkluekdEdnp5WUEiLCJwaG9uZUlkIjoiZDc4M2JiNmUtZDZhZi00Mjk0LWI3OTctMzA1OWY0MDA1ODM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktHYVVxbWVma2ZVK0tJR1NRUXVJZEV4dXVObz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpOUdJcloyaHQ3cXR2c29zelpyZ3RjRHZOVjQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVNWQ1o5TFIiLCJtZSI6eyJpZCI6IjI2MzcxOTkyOTg1OTozNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmJ3Nm9rQ0VLSzF5N2dHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMkNyeUprMUQ3Ym1aUVJKaC9nY0FHVG56d0dqRDArMFkxeDRQZzhuQlN3bz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVU91WnNLcklLWXJSZm5VZlRoZG03R1dRakFObElEanhKcXpPK2VxM1JXL1dVNmk2dDR2ZG0rU00vZmE5Y2RDd2ZNYThmZlN4TldCbUJCckNYdW9xREE9PSIsImRldmljZVNpZ25hdHVyZSI6IjRiYVhjbkRxbDBUYXd1bXZ0VHdkZHpKM0hicW5KMGhoRlNkSWxJeTNOVER6KzN2RFVmSVlHTkVRN21URFNYL1lOR3VHNmVDdW02U3E3T3hGenA5TGp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE5OTI5ODU5OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRncThpWk5RKzI1bVVFU1lmNEhBQms1ODhCb3c5UHRHTmNlRDRQSndVc0sifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkyODg4NzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTmpJIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "The MASTER CO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 263719929859",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MASTER CO-𝐌𝐃',
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
