<<<<<<< HEAD
const crypto = require('crypto');
const secret = 'pppppppppppppppppppppppppppppppp';

const encrypt = (Password) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(Password),
        cipher.final(),
    ]);
    return { iv: iv.toString("hex"), roomcode: encryptedPassword.toString("hex") };
}

const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        Buffer.from(secret),
        Buffer.from(encryption.iv, "hex")
    );
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.roomcode, "hex")),
=======
const crypto=require('crypto');
const secret='pppppppppppppppppppppppppppppppp';

const encrypt=(Password)=>{
    const iv=Buffer.from(crypto.randomBytes(16));
    const cipher=crypto.createCipheriv('aes-256-ctr',Buffer.from(secret),iv);

    const encryptedPassword=Buffer.concat([
        cipher.update(Password),
        cipher.final(),
    ]);
    return {iv:iv.toString("hex"),password:encryptedPassword.toString("hex")};
}

const decrypt=(encryption)=>{
    const decipher=crypto.createDecipheriv(
        'aes-256-ctr',
        Buffer.from(secret),
        Buffer.from(encryption.iv,"hex")    
    );
    const decryptedPassword=Buffer.concat([
        decipher.update(Buffer.from(encryption.password,"hex")),
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
        decipher.final()
    ])
    return decryptedPassword.toString();
}

<<<<<<< HEAD
module.exports = { encrypt, decrypt };
=======
module.exports={encrypt,decrypt};
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
