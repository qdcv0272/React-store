import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, plus, subtract } from "../Data/store";

export default function Cart(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state;
  });
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>상품명</th>
            <th>제품</th>
            <th>수량</th>
            <th>가격</th>
            <th>추가 변경</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.cart.map((a, i, array) => {
            let total = [];
            total[i] = Number(data.cart[i].count * data.cart[i].price);
            return (
              <tr key={i}>
                <td>{data.cart[i].id}</td>
                <td>{data.cart[i].title}</td>
                <td>{data.cart[i].content}</td>
                <td>{data.cart[i].count}</td>
                <td>{`${total[i]} 원`}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      dispatch(plus(data.cart[i].id));
                    }}
                  >
                    ➕
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      dispatch(subtract(data.cart[i].id));
                    }}
                  >
                    ➖
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      dispatch(deleteItem(data.cart[i].id));
                    }}
                  >
                    ✖️
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
