import { AppMainContainer } from "@/themes/components";
import UsuarioForm from "./_form";

export const metadata = {
    title: 'Editar usuário'
}

// ===========================================================================
export default async function UsuariosEditarPage({params}: any) {

    const { userID } = await params;
    
    // ===========================================================================
    return (
        <AppMainContainer title="Editar usuário">
            <UsuarioForm userID={userID}/>
        </AppMainContainer>
    )
}