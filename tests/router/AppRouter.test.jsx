import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe("Pruebas en AppRouter", () => {
    test("debe de mostrar el login sin no está autenticado", () => {
        const contextValue = {
            logged: false,
        };
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        screen.debug();
        expect(screen.getAllByText("Login").length).toBe(1);
    });

    test("debe de mostrar el componente de Marvel si está autenticado", () => {
        const contextValue = {
            logged: true,
            user: {
                name: "Juan",
            },
        };
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
    });
});
