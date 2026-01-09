import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * API Route - 외부 API 프록시
 * 별도의 백엔드 서버 없이 Next.js Serverless Function을 통해 외부 API 호출
 */
export async function GET(request: NextRequest) {
    try {
        // 외부 테스트 API 호출 (JSONPlaceholder)
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

        console.log('=== 외부 API 응답 ===');
        console.log('Status:', response.status);
        console.log('Data:', response.data);

        // 성공 응답 반환
        return NextResponse.json({
            success: true,
            message: 'API 통신 테스트 성공',
            data: response.data,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('API 호출 오류:', error);

        // 에러 응답 반환
        return NextResponse.json(
            {
                success: false,
                message: 'API 통신 테스트 실패',
                error: error.message,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
