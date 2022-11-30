import "./Home.css";
import React, { useState, useEffect } from "react";
import Slice from "./Slice";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Modal from "./Modal";

export default function Home(props) {
  const [disableds, setDisableds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sale, setSale] = useState(false);
  const page = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [count, setCount] = useState(
    () => JSON.parse(sessionStorage.getItem("count")) || 0
  );

  useEffect(() => {
    sessionStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSale(!sale);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function Loading() {
    return (
      <div>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  function Sale() {
    return (
      <div className="alert alert-warning">
        <h4> 모달 팝업 누르세요! </h4>
        <h4> Error 사항 </h4>
        <p>7초뒤 사라짐</p>
      </div>
    );
  }

  return (
    <div>
      <Slice></Slice>
      <br />
      <br />
      <div className="container text-center">
        {sale === false ? <Sale /> : null}
        <Button variant="outline-secondary" onClick={openModal}>
          모달팝업
        </Button>
        <Modal open={modalOpen} close={closeModal} header="Modal heading">
          <main> {props.children} </main>
          <h4>Cart 가격 증감 & 총가격 구현중 Error</h4>
          <h4>Login 후 페이지 이동 Error</h4>
          <h4>더보기 버튼 누르고 상품 누른뒤 새로고침 Error</h4>
        </Modal>
        <div className="row row-cols-3">
          {props.datas.map((a, i) => {
            return (
              <div className="col" key={i}>
                <img
                  src={"https://qdcv0272.github.io/apple" + (i + 1) + ".png"}
                  width="40%"
                  alt="img"
                  onClick={() => {
                    page(`List/${i + 1}`);
                  }}
                />

                <h4>{props.datas[i].title}</h4>
                <p>{props.datas[i].content}</p>
                <p>{props.datas[i].price}</p>
              </div>
            );
          })}
        </div>
        {loading === true ? <Loading /> : null}
        <Button
          variant="outline-secondary"
          onClick={(e) => {
            Promise.all([
              axios.get("https://qdcv0272.github.io/Datas2.json"),
              axios.get("https://qdcv0272.github.io/Datas3.json"),
            ])
              .then((result) => {
                setLoading(true);
                setCount(count + 1);
                if (count === 0) {
                  setLoading(false);
                  let copy = [...props.datas, ...result[0].data];
                  props.setDatas(copy);
                } else if (count === 1) {
                  setLoading(false);
                  let copy = [...props.datas, ...result[1].data];
                  props.setDatas(copy);
                } else {
                  setLoading(false);
                  alert("상품이 없음 버튼 Disabled");
                  setDisableds(!disableds);
                }
              })
              .catch(() => {
                setLoading(false);
                alert("요청 실패");
              });
          }}
          disabled={disableds}
        >
          더 보기
        </Button>
      </div>
    </div>
  );
}
