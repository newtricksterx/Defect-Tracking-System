import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {

        const { user } = useContext(AuthContext);

        if (!user) {
            return null;
        }
            
        return <Component {...props} />;
    };
}