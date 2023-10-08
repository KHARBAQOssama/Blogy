const path = require('path');
const fs = require('fs');
const projectRoot = process.cwd();

function storeImageGetPath(image){

    return new Promise((resolve, reject) => {
        const mimeTypeRegex = /^data:image\/(\w+);base64,/;
        const mimeMatch = image.match(mimeTypeRegex);
        if (!mimeMatch) {
           resolve(new Error('Invalid image data'));
        }
        const mimeType = mimeMatch[1];
        const base64Data = image.replace(mimeTypeRegex, '');

        const timestamp = Date.now();
        const filename = `image_${timestamp}.${mimeType}`;

        const imagePath = path.join(projectRoot, 'public', 'images','uploads', filename);
        let imageUrl;
        fs.writeFile(imagePath, base64Data, 'base64', (err) => {
            if (err) {
                console.log(err);
                reject(new Error('Failed to store the image'));
            } else {
                imageUrl = `/uploads/${filename}`;
                resolve(imageUrl);
            }
        });
    })
}

function formatDate(inputDateString) {
    const date = new Date(inputDateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

module.exports = {
    storeImageGetPath,
    formatDate,
}