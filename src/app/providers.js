"use client"


import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes'
const Providers = ({ children }) => {

    return (<>

        <Toaster />
        <ThemeProvider>
            {children}
        </ThemeProvider>

    </>)
}

export default Providers;