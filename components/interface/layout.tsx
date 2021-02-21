import Head from 'next/head'

import { FaCloudSun } from 'react-icons/fa'

interface LayoutProps {
    children: React.ReactNode,
    title: string,
    isDay: boolean
}

export default function LayoutComponent(props: LayoutProps) {
    return (
        <div className={"w-full h-screen flex flex-col items-center justify-center transition-colors duration-500 " + ((props.isDay) ? "bg-blue-500" : "bg-gray-800")}>
            <Head>
                <title>{props.title}</title>
            </Head>

            <header className="container mx-auto flex justify-center items-center h-32 mb-8 select-none">
                <h1 className="font-bold sm:text-5xl text-3xl flex items-end "><FaCloudSun className="sm:text-7xl text-5xl mr-4" /> Weather App</h1>
            </header>

            <main className="container mx-auto flex flex-col justify-center items-center">
                {props.children}
            </main>

            <footer>

            </footer>
        </div>
    )
}