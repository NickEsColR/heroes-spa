import { authReducer, types } from "../../../src/auth";

describe("Pruebas en authReducer", () => {
    test("debe de retornar el estado por defecto", () => {
        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });

    test("debe de autenticar y colocar el name del usuario", () => {
        const action = {
            type: types.login,
            payload: {
                name: "Fernando",
            },
        };
        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ logged: true, user: { name: "Fernando" } });
    });

    test("debe de borrar el name del usuario y logged en false", () => {
        const action = {
            type: types.logout,
        };
        const state = authReducer({ logged: true, name: "Pedro" }, action);
        expect(state).toEqual({ logged: false });
    });
});
