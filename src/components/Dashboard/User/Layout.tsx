import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';
import MainContent from '../MainContent';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

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