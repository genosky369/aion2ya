import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 relative">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>Contact: <a href="mailto:aion2ya@gmail.com" className="hover:text-foreground transition-colors underline">aion2ya@gmail.com</a></p>
          <p className="mt-2">© 2025 AION2YA. All rights reserved.</p>
        </div>
      </div>

      {/* 숨겨진 아이콘 - 레거시 사이트 접근용 */}
      <Link
        href="/legacy-home"
        className="absolute left-4 bottom-4 opacity-20 hover:opacity-100 transition-opacity duration-300 group"
        title="Legacy Site"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-transform">
          A2
        </div>
      </Link>
    </footer>
  )
}
