const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtensions = ['png','jpg','jpeg','gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        const splittedName = file.name.split('.');
        const extension = splittedName[splittedName.length -1];

        if( !validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed`)
        }

        const tempNameFile = uuidv4() + "." + extension;
        uploadPath = path.join( __dirname + '/../uploads/' + folder + tempNameFile);

        file.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }

            resolve(tempNameFile);
        });
    });
}

module.exports = {
    uploadFile
}