

/**
 * SERVICES DE GERENCIAMENTO DE USUÁRIOS
 */
const UserServices = {
    
    /**
     * Autenticação de usuário
     */
    login: async (email:string, password:string): Promise<{success: boolean, message?: string}> => {
        //Simula um atrasado de 1seg
        await new Promise((resolve) => setInterval(resolve, 1000));
        
        if (email == 'teste@teste.com' && password == '123456')
            return { success: true }
        else
            return { success: false, message: 'Login incorreto' };
    },

    /**
     * Solicita ao servidor uma nova senha  
     */
    resetPassword: async (email: string): Promise<{ success: boolean }> => {
        //Simula um atrasado de 1seg
        await new Promise((resolve) => setInterval(resolve, 1000));
        return { success: true };
    },

    /**
     * Remove todos os vinculos do usuário com o back-end
     */
    logout: async (): Promise<{success: boolean}> => {
        //Simula um atrasado de 1seg
        new Promise((resolve) => setInterval(resolve, 1000));
        return { success: true };
    }
}

export default UserServices;