import Link from 'next/link'


export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br  via-indigo-900 to-slate-900 text-white px-4 text-center">
            <h1 className="text-9xl font-extrabold mb-6 drop-shadow-lg">404</h1>
            <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg text-purple-300 mb-8 max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
            <Link href="/">
                <div className="px-8 sm:px-10 py-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 rounded-xl font-bold flex items-center gap-2 sm:gap-3 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm sm:text-base">Back to home</span>
                </div>
            </Link>
        </div>
    )
}
