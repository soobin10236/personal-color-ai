import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    AI 퍼스널 컬러 진단
                </h1>
                <p className="text-gray-600 mb-8">
                    POC 버전 - 카메라 및 통신 테스트
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <Link
                    href="/camera"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors duration-200 shadow-md"
                >
                    📸 카메라 테스트
                </Link>

                <Link
                    href="/test"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors duration-200 shadow-md"
                >
                    🔌 통신 테스트
                </Link>
            </div>

            <div className="text-center text-sm text-gray-500 mt-8">
                <p>모바일 환경에 최적화되어 있습니다</p>
            </div>
        </div>
    );
}
