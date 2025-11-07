import App from "next/app";
import React from "react";

export interface AppMainContainerProps {
    title: string;
    children?: React.ReactNode;
}

export default function AppMainContainer({title, children}: AppMainContainerProps) {

    return (
         <main className="flex flex-col flex-1">
            {/* HEADER */}
            <header className="min-h-[100px] bg-(--background-primary) p-[50px] rounded-es-xl mb-[30px]">
                <h1 className="font-bold text-[30px]" > {title} </h1>
            </header>

            <section className="flex-1 bg-(--background-primary) p-[15px] rounded-ss-xl">
                {children}
            </section>

        </main>
    )

}