import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

export const HeaderSlice = createSlice({
  name: "Header",
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

// export des actions
export const { changeTitle } =
  HeaderSlice.actions;

// export du reducer pour le store
export default HeaderSlice.reducer;
