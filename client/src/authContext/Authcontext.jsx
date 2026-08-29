import { createContext,useContext,useEffect,useState } from 'react';
import { checkUserAuthStatusAPI } from '../apis/user/User';
import { useQuery } from '@tanstack/react-query'


export const Authcontext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated]= useState(false);
    const {isError,isLoading,data,isSuccess} = useQuery({
        queryFn:checkUserAuthStatusAPI,
        queryKey:["checkAuth"],
        retry: false,
    });

    useEffect(() => {
        if(isSuccess) {
            setIsAuthenticated(data?.isAuthenticated === true);
        }
    },
[data,isSuccess]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return(
        <Authcontext.Provider
        value = {{isAuthenticated,isError,isLoading,isSuccess,login,logout}}>
            {children}
        </Authcontext.Provider>

    );
};

export const useAuth = () => {
    return useContext(Authcontext);
}
