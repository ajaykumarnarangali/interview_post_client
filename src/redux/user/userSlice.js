import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem('user'));
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: savedUser || null
    },
    reducers: {
        SignIn: (state, action) => {
                state.currentUser = action.payload,
                localStorage.setItem("user", JSON.stringify(action.payload));
        },
        SignOut: (state) => {
            state.currentUser=null,
            localStorage.removeItem("user");
        }
    }
})

export default userSlice.reducer
export const {SignIn,SignOut}=userSlice.actions