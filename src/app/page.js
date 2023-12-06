import Image from 'next/image';
import Link from 'next/link';


export default () => {
    return (
        <main>
            <div className="py-16 px-4 mx-auto max-w-screen-xl text-gray-900">
                <div className="mb-14">
                    <div className='flex justify-center items-center mb-6'>
                        <Image src="/logo-big.png" width="220" height="237" className='mr-3' alt='Logo' />
                    </div>
                    <div className='text-center'>
                        <h2 className="mb-4 text-5xl tracking-tight font-extrabold">Data Generator</h2>
                        <p className="text-xl text-gray-600 font-semibold">Data Generation Platform for Statistical Learning and Machine Learning.</p>
                    </div>
                    <div className="text-center font-bold mt-10">
                        <Link href="/generate" className="transition-colors duration-600 ease-in-out rounded px-8 py-4 bg-gray-200 hover:bg-gray-300 text-lg text-gray-800">Start</Link>
                        <Link href="/about" className="transition-colors duration-600 ease-in-out rounded px-8 py-4 bg-gray-200 hover:bg-gray-300 text-lg text-gray-800 ml-4">Learn More</Link>
                    </div>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
        </main>
    )
}
