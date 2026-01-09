import imageCompression from 'browser-image-compression';

/**
 * Base64 이미지를 File 객체로 변환
 */
function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

/**
 * 이미지를 압축하고 Base64 문자열로 변환
 * @param base64Image - Base64 형식의 이미지 데이터
 * @returns 압축된 Base64 이미지 문자열
 */
export async function compressAndConvertImage(base64Image: string): Promise<string> {
    try {
        // Base64를 File 객체로 변환
        const imageFile = base64ToFile(base64Image, 'captured-image.jpg');

        // 압축 옵션
        const options = {
            maxSizeMB: 0.5, // 최대 0.5MB
            maxWidthOrHeight: 1024, // 최대 너비/높이 1024px
            useWebWorker: true,
            fileType: 'image/jpeg',
        };

        // 이미지 압축
        const compressedFile = await imageCompression(imageFile, options);

        // Blob을 Base64로 변환
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const base64data = reader.result as string;
                resolve(base64data);
            };
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('이미지 압축 중 오류:', error);
        throw error;
    }
}
