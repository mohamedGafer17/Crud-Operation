import QRCode from 'qrcode'

export const generateQRcode = async(data)=>{
    const result = await QRCode.toDataURL(JSON.stringify(data));
    return result;
};