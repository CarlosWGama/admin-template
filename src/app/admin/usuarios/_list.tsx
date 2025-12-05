"use client";
import { useEffect, useState } from "react"
import UserServices from "@/services/user";
import Link from "next/link";
import { AppButton, AppInput, AppLoader, AppModal, AppSelect } from "@/themes/components";
import { getFlashData } from "@/helpers/router";
import { useSearchParams } from "next/navigation";

export default function UserList() {

    const params = useSearchParams();
    const [users, setUsers] = useState<any[]>([]);
    const [userRemove, setUserRemove] = useState<any>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(Number(params.get('page') ?? 1));
    const [pagination, setPagination] = useState<any>(null);
    const [filter, setFilter] = useState({
        name: '',
        email: '',
        admin: '-1',
    })

    // ======================================================================
    const getUsers = async (page: number) => {
        const { success, users, pagination } = await UserServices.getAll(page, filter);
        if (success) {
            setUsers(users);
            setPagination(pagination);
        }
        setLoading(false);
    }
    // -----------
    const handleRemove = async (user: any) => {
        setUserRemove(user);
        setSuccess(null);
        setError(null);
    }
    // -----------
    const handleModalConfirm = async () => {
        setLoading(true);
        setUserRemove(null);
        await UserServices.delete(userRemove.id)
        setSuccess('Usuário excluido com sucesso!');
        getUsers(1);
    }
    // -----------
    const handleModalCancel = async () => {
        setUserRemove(null);
    }
    // -----------
    const handlePage = async (newPage: number) => {
        setPage(newPage);
        getUsers(newPage);
    }
    // -----------
    useEffect(() => {
        //Recupera usuário
        getUsers(page);
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
            {/* FILTRO [INICIO] */}
            <h3 className="text-[18px] font-bold">Filtros</h3>
            <div className="flex flex-col border-b-[2px] border-[#dedede] p-2">
                <div className="flex gap-2">
                    <AppInput type="text" label="Nome" value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} />
                    <AppInput type="email" label="Email" value={filter.email} onChange={(e) => setFilter({ ...filter, email: e.target.value })} />

                    <AppSelect label="Admininistrador" value={filter.admin} onChange={(e) => setFilter({ ...filter, admin: e.target.value })}>
                        <option value="-1">Todos</option>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </AppSelect>

                </div>
                <AppButton title="Filtrar" className="w-[100px]" type="outline" onClick={() => getUsers(page)} />
            </div>
            {/* FILTRO [FIM] */}

            {success && <p className="bg-[#6eef01] px-5 text-center rounded-full color-[white] p-1">{success}</p>}
            {error && <p className="bg-[tomato] px-5 text-center rounded-full color-[white] p-1">{error}</p>}

            {loading && <div className="flex justify-center"><AppLoader size={50} className="self-center" /></div>}
            {!loading && <div className="overflow-x-auto">
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

                {pagination && <div className="flex justify-end mt-[20px]">
                    {!pagination.firstPage && <AppButton title="Anterior" className="mr-[10px]" icon="arrow-left-a" form="round" onClick={() => handlePage(page - 1)} />}
                    {!pagination.lastPage && <AppButton title="Proximo" className="ml-[10px]" icon="arrow-right-a" form="round" onClick={() => handlePage(page + 1)} />}
                </div>}
            </div>}

            {userRemove && <AppModal title="Remover usuário">
                <p>Deseja realmente remover o usuário {userRemove.name} ({userRemove.email})?</p>
                <div className="flex justify-between p-[20px]">
                    <AppButton title="Sim" icon="checkmark" form="round" color="#428f01" onClick={handleModalConfirm} />
                    <AppButton title="Cancelar" icon="close" color="tomato" form="round" onClick={handleModalCancel} />
                </div>

            </AppModal>}
        </>
    )
}