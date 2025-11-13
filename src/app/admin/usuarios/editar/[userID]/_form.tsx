"use client";
import { AppButton, AppInput, AppMainContainer, AppSelect } from "@/themes/components";
import { Formik } from "formik";
import * as Yup from 'yup';
import UserServices from "@/services/user";
import { useRouter } from "next/navigation";
import { setFlashData } from "@/helpers/router";
import { useEffect, useState } from "react";

export interface UsuarioFormProps {
    userID: number
}
// ===========================================================================
export default function UsuarioForm({ userID }: UsuarioFormProps) {

    const router = useRouter();
    const [ user, setUser ] = useState({name: '', email: '', password: '', admin: false});
    // ===========================================================================
    const handleOnSubmit = async (data:any) => {
        const { success } =  await UserServices.update(data);
        if (success) {
            setFlashData({success: 'Usuário editado com sucesso'});
            router.replace('/admin/usuarios');
        }
    }
    // -----------------------
    useEffect(() => {
        (async() => {
            const { success, user } = await UserServices.getById(userID);
            if (success) setUser(user);
            else {
                setFlashData({error: 'Usuário não encontrado'});
                router.replace('/admin/usuarios');
            }
        })();
    }, [])
    // ===========================================================================
    return (    
        <Formik
            initialValues={user}
            enableReinitialize
            validationSchema={Yup.object({
                name: Yup.string().required('Campo obrigatório'),
                email: Yup.string().required('Campo obrigatório').email('Campo precisa ser um email'),
                password: Yup.string().min(6, 'Campo precisa ter pelo menos 6 caracteres')
            })}
            onSubmit={handleOnSubmit}
            >
            {({handleChange, handleSubmit, isSubmitting, isValid, errors, values}) => (
                <form>
                        <AppInput placeholder="Digite seu nome" label="Nome:" name="name" onChange={handleChange} icon="person" error={errors.name} value={values.name} />
                        <AppInput placeholder="Digite seu email" label="Email:" name="email" onChange={handleChange} icon="email" error={errors.email} value={values.email} />
                        <AppInput placeholder="Digite sua senha" label="Senha:" name="password" type="password" onChange={handleChange} icon="locked" openPassword  error={errors.password} />
                        <AppSelect label="Nível:" onChange={handleChange} name="admin" value={values.admin ? '1' : '0'}>
                            <option value="1">Administrador</option>
                            <option value="0">Usuário</option>
                        </AppSelect>

                        <AppButton title="Editar" icon="checkmark" onClick={() => handleSubmit()} disabled={!isValid || isSubmitting}/>

                </form>
            )}
        </Formik>
        
    )
}