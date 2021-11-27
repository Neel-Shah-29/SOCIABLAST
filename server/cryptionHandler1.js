const crypto = require('crypto');
const secret = 'pppppppppppppppppppppppppppppppp';

const Encrypt = (Roomcode) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptedRoomcode = Buffer.concat([
        cipher.update(Roomcode),
        cipher.final(),
    ]);
    return { iv: iv.toString("hex"), roomcode: encryptedRoomcode.toString("hex") };
}

const Decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        Buffer.from(secret),
        Buffer.from(encryption.iv, "hex")
    );
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.roomcode, "hex")),
        decipher.final()
    ])
    return decryptedPassword.toString();
}

module.exports = { Encrypt, Decrypt };