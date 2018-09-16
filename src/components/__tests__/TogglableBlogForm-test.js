import React from "react"
import TogglableBlogForm from "../TogglableBlogForm"
import renderer from "react-test-renderer"
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { Adapter } from "../../setupTest"
import { shallow } from "enzyme"

//import store from "../../store"
const mockUser = {
    token: "asdasdasd",
    username: "blaa",
    name: "Jotaki"
}
const middlewares = [thunk]
const initialState = { user: mockUser }
const mockStore = configureStore(middlewares)


describe("SnapshotTest", () => {
    let store
    let wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = shallow(<TogglableBlogForm store={store} />)
    })
    it("renders correnctly", () => {
        const tree = renderer
            .create(wrapper)
            .toJSON()


        expect(tree).toMatchSnapshot()
    })
})