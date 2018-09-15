import userReducer from "./userReducer"
import "../setupTest"
jest.mock("../services/users")


const users = [
    {
        id: "5b9c1c50b1773032ec664c2f",
        username: "eesim",
        name: "Essi Esimerkki",
        adult: true,
        blogs: [
            {
                _id: "5b9c1d05b1773032ec664c35",
            }
        ]
    },
    {
        id: "5b9c1c61b1773032ec664c30",
        username: "nimpio",
        name: "Niklas Impiö",
        adult: true,
        blogs: [
            {
                _id: "5b9c1ca0b1773032ec664c31"
            },
            {
                _id: "5b9c1cbab1773032ec664c32"
            }
        ]
    }
]


describe("userReducer", () => {

    it("should return initialState", () => {
        expect(userReducer(undefined, {})).toEqual([])
    })

    it("should handle INIT_USERS", () => {
        const initAction = {
            type : "INIT_USERS",
            data : users
        }
        expect(userReducer([], initAction)).toEqual(users)
    })
})