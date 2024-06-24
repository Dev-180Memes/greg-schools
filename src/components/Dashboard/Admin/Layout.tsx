import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';
import MainContent from '../MainContent';
import { decodeJWT } from '@/utils/decodeToken';
import { useRouter } from 'next/router';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeJWT(token);
            if (!decodedToken) {
                router.push('/admin/auth');
            }

            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                router.push('/admin/auth');
            }
        } else {
            router.push('/admin/auth');
        }
    }, [router]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar 
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 flex flex-col">
                <Navbar 
                    toggleSidebar={toggleSidebar}
                />
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </div>
    )
}

export default Layout