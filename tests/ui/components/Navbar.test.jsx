import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en Navbar", () => {

    const contextValue = {
        logged: true,
        user: {
            name: "Juan"
        },
        logout: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("debe de mostrar el nombre del usuario", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Juan")).toBeTruthy();
    });

    test("debe de llamar el logout y navigate cuando se hace click en el boton", () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByText("Logout")
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(contextValue.logout).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
});
