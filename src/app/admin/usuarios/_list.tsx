"use client";
import { useEffect, useState } from "react"
import UserServices from "@/services/user";
import Link from "next/link";
import { AppButton, AppModal } from "@/themes/components";
import { getFlashData } from "@/helpers/router";

export default function UserList() {

    const [ users, setUsers ] = useState<any[]>([]);
    const [ userRemove, setUserRemove ] = useState<any>(null);
    const [ success, setSuccess ] = useState<string|null>(null);
    const [ error, setError ] = useState<string|null>(null);
    
    // ======================================================================
    const getUsers = async () => {
        const response = await UserServices.getAll();
        if (response.success) setUsers(response.users);
    }
    // -----------
    const handleRemove = async (user: any) => {
        setUserRemove(user);
        setSuccess(null);
        setError(null);
    }
    // -----------
    const handleModalConfirm = async () => {
        setUserRemove(null);
        await UserServices.delete(userRemove.id)
        setSuccess('Usuário excluido com sucesso!');
    }
    // -----------
    const handleModalCancel = async () => {
        setUserRemove(null);
    }
    // -----------
    useEffect(() => {
        //Recupera usuário
        getUsers();
        //Recupera mensagem 
        (() => {
            const data = getFlashData();
            if (data?.success) setSuccess(data.success);
            if (data?.error) setError(data.error);
        })()
        
    }, []);
    // ======================================================================
    return (
        <>
            { success && <p className="bg-[#6eef01] px-5 text-center rounded-full color-[white] p-1">{success}</p> }
            { error && <p className="bg-[tomato] px-5 text-center rounded-full color-[white] p-1">{error}</p> }
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    {/* HEADER  */}
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Nome</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Admin</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>

                    {/* DADOS */}
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{user.admin ? 'ADMININISTRADOR' : 'USUÁRIO'}</td>
                                
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <Link href={`/admin/usuarios/editar/${user.id}`}>
                                        <i className="ion-edit text-[20px] text-[#1aab67] mx-[10px] cursor-pointer" />
                                    </Link>
                                    <i className="ion-ios-trash text-[20px] text-[#ed1b2d]  mx-[10px] cursor-pointer" onClick={() => handleRemove(user)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {userRemove && <AppModal title="Remover usuário">
                <p>Deseja realmente remover o usuário {userRemove.name} ({userRemove.email})?</p>
                <div className="flex justify-between p-[20px]">
                    <AppButton title="Sim" icon="checkmark" form="round" color="#428f01" onClick={handleModalConfirm}/>
                    <AppButton title="Cancelar" icon="close" color="tomato" form="round" onClick={handleModalCancel}/>
                </div>

            </AppModal>}  
        </>
    )
}