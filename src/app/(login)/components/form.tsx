"use client";
import { AppInput, AppModal } from "@/themes/components";
import { Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from 'yup';

export default function LoginForm() {
    const [ showResetPasswordModal, setShowResetPasswordModal ] = useState(false);
    // ======================================================
    const onSubmit = ({email, password}: any) => {
        alert(email);
    }
    // ======================================================
    return (
        <>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required('Campo obrigatório').email('Campo precisa ser um email'),
                    password: Yup.string().required('Campo obrigatório').min(6, 'Campo precisa ter pelo menos 6 caracteres')
                })}
                onSubmit={onSubmit}
                >
                {({handleChange, handleSubmit, isSubmitting, isValid, errors}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="w-[336px] flex flex-col">

                            <h1 className="ff-default text-[37px] text-center">Entrar</h1>
                            <AppInput placeholder="EMAIL" name="email" onChange={handleChange} icon="ios-email" error={errors.email} />
                            <AppInput placeholder="SENHA" name="password" type="password" onChange={handleChange} icon="locked" openPassword  error={errors.password}/>
                            
                            <p className="cursor-pointer text-[11px] ff-default text-[#4703D0]" onClick={() => setShowResetPasswordModal(true)}>Esqueci minha senha</p>

                            <input type="submit" className={`rounded-full bg-(--primary-color) text-white p-2 my-5 ${isValid ? 'opacity-100 cursor-pointer' : 'opacity-50'}`} value="Entrar" disabled={isSubmitting || !isValid} ></input>

                            <p className="ff-default text-center"> Não tem conta? Entre em contato com o desenvolvedor</p>
                        </div>
                    </form>
                )}
            </Formik>

            {/* MODAL - RESETAR SENHA */}
            {showResetPasswordModal && <AppModal title="Esqueci a senha" onClose={() => setShowResetPasswordModal(false)}>
                <div className="flex-col flex items-stretch">

                    <Image className="self-center my-10" src="/assets/img/icons/reset-password.png" alt="ícone resetar senha" width={120} height={120} />

                    <p className="text-center ff-default text-[16px]">Digite seu E-mail e clique em "Enviar" para receber um email para redefinir sua senha.</p>

                    <AppInput placeholder="Digite seu email" icon="android-mail" />
                </div>
            </AppModal>}
        </>
    )
}