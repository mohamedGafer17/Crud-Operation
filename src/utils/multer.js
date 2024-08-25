import fs from 'fs'
import multer  from "multer";
import { nanoid } from "nanoid";
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url)


export const fileValidation = {
    image: ["image/jpeg", 'image/png', 'image/gif'],
    file: ["application/pdf", 'application/msword'],
}
export function fileUpload(customPath = "general", customValidation = []) {

    const filePath = `uploads/${customPath}`
    const fullPath = path.join(__dirname, `../../${filePath}`)
    console.log(fullPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath , { recursive: true })
    }
    const storage = multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, fullPath)
        },
        filename:(req, file, cb) => {
            const uniqueFileName = nanoid() + "_" + file.originalname
            file.finalDest = `${filePath}/${uniqueFileName}`
            cb(null, uniqueFileName)
        }
    })

    function fileFilter(req, file, cb ) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        }else{
            cb(new Error("In-valid Format", { cause : 400}), false)
        }
    }

    const upload = multer({ fileFilter, storage })
    return upload
}
export default fileUpload