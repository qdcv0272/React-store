import "./List.css";
import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import { useDispatch } from "react-redux";
import { addItem } from "../Data/store";
import Review1 from "./Review1";

export default function List(props) {
  const dispatch = useDispatch();
  const page = useNavigate();
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState();
  const [disabled, setDisabled] = useState(true);
  const arrId = id - 1;

  useEffect(() => {
    let str = localStorage.getItem("history"); // 들고와
    if (str == null) {
      // str 못들고와 없으면
      str = [];
    } else {
      str = JSON.parse(str);
    }

    str.push(id); //params
    if (str.length <= 3) {
      // 3개 까지
      str = new Set(str);
      str = [...str];
    } else {
      str = [...str];
      str.shift();
    }

    localStorage.setItem("history", JSON.stringify(str));
    setHistory(str);
  }, [id]);

  function Listed(props) {
    return (
      <div className="col">
        <h3>최근 본 상품</h3>
        {history.map((item, i) => {
          if (history.length > 3) {
            let copy = [...history];
            copy.shift();
            setHistory(copy);
          } else {
            return (
              <div className="pt-5" key={i}>
                {
                  <img
                    src={
                      "https://qdcv0272.github.io/apple" + Number(item) + ".png"
                    }
                    width="20%"
                    alt="최근본 상품"
                    onClick={() => {
                      page(`../List/${item}`);
                    }}
                  />
                }
              </div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <img
              src={"https://qdcv0272.github.io/apple" + id + ".png"}
              width="60%"
              alt="img"
            />
          </div>
          <div
            className="col"
            style={{
              margin: 100,
            }}
          >
            <h1 className="pt5">{props.datas[arrId].title}</h1>
            <h4>{props.datas[arrId].content}</h4>
            <p>{props.datas[arrId].price}</p>
          </div>
          <Listed />
        </div>
        <div className="container text-center">
          <div className="row row-cols-2" style={{ marginBottom: 10 }}>
            <Button
              variant="outline-secondary"
              onClick={() => {
                dispatch(
                  addItem({
                    id: arrId,
                    title: props.datas[arrId].title,
                    content: props.datas[arrId].content,
                    price: props.datas[arrId].price,
                    count: 1,
                  })
                );
                setCount(1);
                if (count === 1) {
                  setDisabled(!disabled);
                }
              }}
              disabled={!disabled}
            >
              주문하기
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                page("../Cart");
              }}
            >
              장바구니
            </Button>
          </div>
        </div>

        <Tabs
          defaultActiveKey="Review"
          className="justify-content-center"
          style={{
            marginTop: 100,
          }}
        >
          <Tab eventKey="profile" title="Profile">
            <Review1 />
          </Tab>
          <Tab eventKey="Review" title="Review">
            <Review />
          </Tab>
          <Tab eventKey="Q&A" title="Q&A">
            3
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
