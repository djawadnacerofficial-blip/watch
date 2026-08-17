import cloudinary from "../Config/cloudinaryConfig.js"

export function uploadImg(buffer) {

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
        stream.end(buffer)
    })
    
}

export async function deleteImg(publicId) {
    return await cloudinary.uploader.destroy(publicId)
}