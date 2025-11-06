
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
        
        if (email == 'teste@teste.com' && password == '123456') {
            const user = {email, id: 1, nome: 'Teste'};
            sessionStorage.setItem('user', JSON.stringify(user));
            return { success: true }
        } else
            return { success: false, message: 'Login incorreto' };
    },

    /**
     * Retorna o usuário autenticado
     * @returns 
     */
    getCurrentUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
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
        sessionStorage.removeItem('user');
        return { success: true };
    }
}

export default UserServices;