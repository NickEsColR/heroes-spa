import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en SearchPage", () => {
    test("debe de mostrar a Batman y el input con el valor del queryString", () => {
        render(
            <MemoryRouter initialEntries={["/search?q=Batman"]}>
                <SearchPage />
            </MemoryRouter>
        );
        screen.debug();

        const input = screen.getByRole("textbox");
        expect(input.value).toBe("Batman");

        const img = screen.getByRole("img");
        expect(img.src).toBe("http://localhost/heroes/dc-batman.jpg");

        const alert = screen.queryByLabelText("Search a hero");
        expect(alert).toBeFalsy();

        const alertDanger = screen.queryByLabelText("No hero with");
        expect(alertDanger).toBeFalsy();
    });

    test("debe de mostrar un error si no se encuentra el heroe", () => {
        render(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <SearchPage />
            </MemoryRouter>
        );

        const alertDanger = screen.getByText("No hero with");
        expect(alertDanger).toBeTruthy();

        const alertInfo = screen.queryByText("Search a hero");
        expect(alertInfo).toBeFalsy();
    });

    test("debe de llamar el navigate a la pantalla nueva", () => {
        const inputVal = "batman";
        render(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {
            target: {
                name: "searchText",
                value: inputVal,
            },
        });

        const form = screen.getByRole("form");
        fireEvent.submit(form);

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputVal}`);
    });
});
