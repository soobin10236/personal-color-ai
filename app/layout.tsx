import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI 퍼스널 컬러 진단",
    description: "모바일 웹 기반 AI 퍼스널 컬러 진단 서비스",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="bg-gray-100 min-h-screen">
                {/* 모바일 컨테이너 - 아이폰 프로 맥스 너비 (430px) 기준 */}
                <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-lg">
                    {children}
                </div>
            </body>
        </html>
    );
}
