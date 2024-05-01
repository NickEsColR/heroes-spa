import { types } from "../../../../src/auth";

describe("Pruebas en Types", () => {
    test("should return this types", () => {
        expect(types).toEqual({
            login: "[auth] login",
            logout: "[auth] logout",
        });
    });
});
