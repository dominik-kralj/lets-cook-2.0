import Link from 'next/link';

function Home() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex space-x-4">
                <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Signup
                </Link>

                <Link
                    href="/auth/login"
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Home;
