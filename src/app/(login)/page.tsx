import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppInput } from "@/themes/components";

// ===============================================
export const metadata: Metadata = {
  title: 'Login',
};
// ===============================================
export default function Page() {

    return (<div className="flex h-screen">
        {/* ESQUERDA */}
        <div className="flex-1 justify-center items-center bg-(--background-secondary) hidden lg:flex">
            <Image src="/assets/img/logo-login.png" alt="logo-login" width={580} height={600}/>
        </div>

        {/* DIREITA */}
        <div className="flex flex-1 justify-center items-center bg-(--background-primary) flex-col">

            <div className="w-[336px] flex flex-col">

                <h1 className="ff-default text-[37px] text-center">Entrar</h1>
                <AppInput placeholder="Digite seu email" label="Email" icon="ios-email" iconColor="grey" />
                <AppInput placeholder="Digite sua senha" label="Email" type="password" icon="locked" iconColor="grey" />
                
                <input type="submit" className="rounded-full bg-(--primary-color) text-white p-2 my-10" value="Entrar"></input>

                <p> Não tem conta? <Link href="/(auth)/(register)/page.tsx">Entre em contato com o desenvolvedor</Link></p>
            </div>
        </div>
    
    
    </div>)

}