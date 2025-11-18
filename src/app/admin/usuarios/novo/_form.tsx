"use client";
import { AppButton, AppInput, AppMainContainer, AppSelect } from "@/themes/components";
import { Formik } from "formik";
import * as Yup from 'yup';
import UserServices from "@/services/user";
import { useRouter } from "next/navigation";
import { setFlashData } from "@/helpers/router";
import { useState } from "react";

// ===========================================================================
export default function UsuarioForm() {

    const router = useRouter();
    const [ error, setError ] = useState<string|null>(null);
    // ===========================================================================
    const handleOnSubmit = async (data:any) => {
        setError(null);
        const { success, error } =  await UserServices.create(data);
        if (success) {
            setFlashData({success: 'Usuário cadastrado com sucesso'});
            router.replace('/admin/usuarios');
        } else if (error) {
            setError(error);
        }
    }
    // ===========================================================================
    return (    
        <Formik
            initialValues={{name: '', email: '', password: '', admin: false}}
            validationSchema={Yup.object({
                name: Yup.string().required('Campo obrigatório'),
                email: Yup.string().required('Campo obrigatório').email('Campo precisa ser um email'),
                password: Yup.string().required('Campo obrigatório').min(6, 'Campo precisa ter pelo menos 6 caracteres')
            })}
            onSubmit={handleOnSubmit}
            >
            {({handleChange, handleSubmit, isSubmitting, isValid, errors}) => (
                <form>
                        <AppInput placeholder="Digite seu nome" label="Nome:" name="name" onChange={handleChange} icon="person" error={errors.name} />
                        <AppInput placeholder="Digite seu email" label="Email:" name="email" onChange={handleChange} icon="email" error={errors.email} />
                        <AppInput placeholder="Digite sua senha" label="Senha:" name="password" type="password" onChange={handleChange} icon="locked" openPassword  error={errors.password}/>
                        <AppSelect label="Nível:" onChange={handleChange} name="admin">
                            <option value="1">Administrador</option>
                            <option value="0">Usuário</option>
                        </AppSelect>

                        {error && <p className="my-3 text-[tomato] text-[15px]">{error}</p>}
                        <AppButton title="Salvar" icon="checkmark" onClick={() => handleSubmit()} disabled={!isValid || isSubmitting}/>

                </form>
            )}
        </Formik>
        
    )
}