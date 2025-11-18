import Cookies from 'js-cookie';

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
            const user = {email, id: 1, name: 'Teste'};
            Cookies.set('user', JSON.stringify(user));
            return { success: true }
        } else
            return { success: false, message: 'Login incorreto' };
    },

    /**
     * Retorna o usuário autenticado
     * @returns 
     */
    getCurrentUser: () => {        
        const user =  Cookies.get('user');
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
        Cookies.remove('user');
        return { success: true };
    },

    /**
     * Retorna todos os usuários do sistema
     * @returns 
     */
    getAll: async(): Promise<{success: boolean, users?: any[]}>  => {
        new Promise((resolve) => setInterval(resolve, 2000));

        return {success: true, users: [
            {id: 1, name: 'Teste', email: 'teste@teste.com', admin: false},
            {id: 2, name: 'Admin', email: 'admin@teste.com', admin: true},
            {id: 3, name: 'Carlos', email: 'carlos@teste.com', admin: false}
        ]}
    },

    /**
     * Retorna dados de um unico usuário
     * @returns 
     */
    getById: async(id: number): Promise<{success: boolean, user: any}>  => {
        new Promise((resolve) => setInterval(resolve, 1000));
        if (id == 1)
            return {success: true, user: {id: 1, name: 'Teste', email: 'teste@teste.com', admin: false}}
        else    
            return {success: false, user: null}
    },

    /**
     * Cria um usuário
     * @param user 
     * @returns 
     */
    create: async (user:any): Promise<{success: boolean, error?: string}> => {
       new Promise((resolve) => setInterval(resolve, 1000));
       return { success: true};
    },

    /**
     * Atualiza um usuário
     * @param user 
     * @returns 
     */
    update: async (user:any): Promise<{success: boolean, error?: string}> => {
       new Promise((resolve) => setInterval(resolve, 1000));
       return { success: true};
    },

    /**
     * Remove um usuário
     * @param user 
     * @returns 
     */
    delete: async (id: number): Promise<{success: boolean}> => {
       new Promise((resolve) => setInterval(resolve, 1000));
       return { success: true};
    }


}

export default UserServices;