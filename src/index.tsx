import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { WalletProviders } from "./contexts/WalletContext";
import ContractContextProvider from "./contexts/ContractContext";
import { Empire } from "./pages/empire";

createRoot(document.getElementById("app") as HTMLElement).render(
    <>
        <WalletProviders>
            <ContractContextProvider>
                <StrictMode>
                    <BrowserRouter>
                    <Routes>
                        {/* <Route path="/" element={<UnderDevelopment />} /> */}
                        <Route path="/" element={<Empire />} />
                    </Routes>
                    </BrowserRouter>
                </StrictMode>
            </ContractContextProvider>
        </WalletProviders>
        <ToastContainer
            autoClose={5000}
            hideProgressBar
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
    </>
);