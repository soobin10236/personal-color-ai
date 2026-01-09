'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TestPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePingTest = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            // Next.js API Route를 통해 외부 API 호출
            const result = await axios.get('/api/test');

            console.log('=== API 응답 ===');
            console.log('Status:', result.status);
            console.log('Data:', result.data);

            setResponse(result.data);
        } catch (err: any) {
            console.error('API 호출 오류:', err);
            setError(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
            <div className="w-full max-w-md">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        API 통신 테스트
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Next.js API Route를 통한 프록시 통신 테스트
                    </p>
                </div>

                {/* Ping Test 버튼 */}
                <div className="mb-8">
                    <button
                        onClick={handlePingTest}
                        disabled={isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '⏳ 테스트 중...' : '🔌 Ping Test'}
                    </button>
                </div>

                {/* 응답 표시 영역 */}
                {response && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold text-green-800 mb-2">✅ 응답 성공</h3>
                        <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}

                {/* 에러 표시 영역 */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold text-red-800 mb-2">❌ 오류 발생</h3>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* 설명 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <h3 className="font-semibold text-blue-800 mb-2">ℹ️ 테스트 정보</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Next.js API Route (/api/test)</li>
                        <li>• 외부 API: JSONPlaceholder</li>
                        <li>• 목적: n8n 웹훅 연결 전 통신 확인</li>
                    </ul>
                </div>

                {/* 뒤로가기 */}
                <a
                    href="/"
                    className="block text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    ← 홈으로 돌아가기
                </a>
            </div>
        </div>
    );
}
