const { render, screen } = require("@testing-library/react");
const { PublicRoute } = require("../../src/router/PublicRoute");
const { AuthContext } = require("../../src/auth");
const { MemoryRouter, Routes, Route } = require("react-router-dom");

describe("Pruebas en PublicRoute", () => {
    test("debe mostrar el children si no esta autenticado", () => {
        const contextValue = {
            logged: false,
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>PublicRoute</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText("PublicRoute")).toBeTruthy();
    });

    test("debe navegar si esta autenticado", () => {
        const contextValue = {
            logged: true,
            user: {
                name: "Juan",
            },
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <PublicRoute>
                                    <h1>PublicRoute</h1>
                                </PublicRoute>
                            }
                        />
                        <Route path="marvel" element={<h1>Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.queryByText("Marvel")).toBeTruthy();
    });
});
