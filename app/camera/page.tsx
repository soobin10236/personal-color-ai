'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { compressAndConvertImage } from '@/utils/imageCompression';

export default function CameraPage() {
    const webcamRef = useRef<Webcam>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const videoConstraints = {
        facingMode: 'user', // 전면 카메라
        width: 1280,
        height: 720,
    };

    // 카메라 로드 완료 시 호출
    const handleUserMedia = () => {
        console.log('✅ 카메라가 준비되었습니다.');
        setIsCameraReady(true);
        setCameraError(null);
    };

    // 카메라 에러 시 호출
    const handleUserMediaError = (error: string | DOMException) => {
        console.error('❌ 카메라 오류:', error);
        setCameraError(
            typeof error === 'string'
                ? error
                : '카메라 접근 권한이 거부되었거나 카메라를 찾을 수 없습니다.'
        );
        setIsCameraReady(false);
    };

    const handleCapture = useCallback(async () => {
        if (!webcamRef.current) {
            console.error('❌ webcamRef.current가 null입니다.');
            alert('카메라가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        setIsCapturing(true);
        try {
            console.log('📸 이미지 캡처 시도 중...');

            // 스크린샷 캡처
            const imageSrc = webcamRef.current.getScreenshot();

            console.log('캡처 결과:', imageSrc ? `성공 (${imageSrc.length} bytes)` : '실패 (null)');

            if (!imageSrc) {
                alert('이미지 캡처에 실패했습니다.\n카메라가 화면에 표시되고 있는지 확인해주세요.');
                return;
            }

            console.log('🗜️ 이미지 압축 시작...');
            // 이미지 압축 및 Base64 변환
            const compressedBase64 = await compressAndConvertImage(imageSrc);

            console.log('=== 캡처된 이미지 정보 ===');
            console.log('원본 크기:', imageSrc.length, 'bytes');
            console.log('압축 후 크기:', compressedBase64.length, 'bytes');
            console.log('압축 Base64 데이터 (앞 100자):', compressedBase64.substring(0, 100));

            setCapturedImage(compressedBase64);
            console.log('✅ 이미지 캡처 및 압축 완료!');
        } catch (error) {
            console.error('❌ 이미지 처리 중 오류:', error);
            alert(`이미지 처리 중 오류가 발생했습니다.\n${error}`);
        } finally {
            setIsCapturing(false);
        }
    }, []);

    const handleRetake = () => {
        setCapturedImage(null);
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* 카메라 또는 캡처된 이미지 */}
            {!capturedImage ? (
                <>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMedia={handleUserMedia}
                        onUserMediaError={handleUserMediaError}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* 카메라 에러 메시지 */}
                    {cameraError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 max-w-sm mx-4">
                                <h3 className="text-red-800 font-bold text-lg mb-2">❌ 카메라 오류</h3>
                                <p className="text-red-700 text-sm">{cameraError}</p>
                                <p className="text-red-600 text-xs mt-3">
                                    • PC인 경우: 웹캠이 연결되어 있는지 확인하세요<br />
                                    • 브라우저에서 카메라 권한을 허용했는지 확인하세요
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 카메라 로딩 중 */}
                    {!isCameraReady && !cameraError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                            <div className="text-white text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                <p className="text-lg font-semibold">카메라 준비 중...</p>
                            </div>
                        </div>
                    )}

                    {/* 타원형 가이드라인 오버레이 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-[280px] h-[360px]">
                            {/* 타원형 테두리 */}
                            <div className="absolute inset-0 rounded-[50%] border-4 border-white opacity-80"></div>

                            {/* 가이드 텍스트 */}
                            <div className="absolute -top-12 left-0 right-0 text-center">
                                <p className="text-white text-sm font-semibold drop-shadow-lg">
                                    얼굴을 가이드라인에 맞춰주세요
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <img
                    src={capturedImage}
                    alt="Captured"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* 하단 버튼 영역 */}
            <div className="absolute bottom-0 left-0 right-0 pb-8 flex justify-center gap-4">
                {!capturedImage ? (
                    <button
                        onClick={handleCapture}
                        disabled={isCapturing || !isCameraReady}
                        className="bg-white hover:bg-gray-100 disabled:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                        {isCapturing ? '처리 중...' : !isCameraReady ? '카메라 준비 중...' : '📸 촬영하기'}
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleRetake}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-colors duration-200"
                        >
                            🔄 다시 찍기
                        </button>
                        <button
                            onClick={() => alert('추후 AI 분석 API와 연동됩니다')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-colors duration-200"
                        >
                            ✅ 진단하기
                        </button>
                    </>
                )}
            </div>

            {/* 뒤로가기 버튼 */}
            <div className="absolute top-4 left-4">
                <a
                    href="/"
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                    ← 뒤로
                </a>
            </div>
        </div>
    );
}
