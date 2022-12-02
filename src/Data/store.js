import { configureStore, createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    // {
    //   id: "testid",
    //   title: "testtitle",
    //   content: "testcontent",
    //   price: 1,
    //   count: 1,
    // },
  ],

  reducers: {
    addItem(state, action) {
      const findId = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      if (findId === -1) {
        state.push(action.payload);
      } else {
        alert("상품이 이미추가되었습니다.");
        plus(state[findId].count++);
      }
    },

    plus(state, action) {
      const findId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[findId].count++;
    },
    subtract(state, action) {
      const findId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      if (state[findId].count > 0) {
        state[findId].count -= 1;
      } else {
        alert("수량이 0이므로 삭제 버튼을 눌러주세요!");
      }
    },
    deleteItem(state, action) {
      const deleteindex = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(deleteindex, 1);
    },
  },
});

export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});

export const { addItem, plus, deleteItem, subtract, price } = cart.actions;
