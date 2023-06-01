import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./styles.css";

import { ExtractTable } from "../ExtractTable";

export function ModalViewCooperated() {
  const [cooperated, setCooperated] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.addEventListener("ModalViewCooperated", (event) => {
      setCooperated(event?.detail?.cooperated || {});
      setShowModal(true);
    });
  });

  useEffect(() => {}, [cooperated]);

  const closeModalViewCooperated = () => {
    setShowModal(false);
  };

  const deposit = () => {
    let value = window.prompt("Qual valor deseja sacar?");
    if (isNaN(value)) {
      window.alert("Use apenas número real para sacar um valor!");
    } else {
      value = parseFloat(value);
      if (value < 0) {
        value *= -1;
      }
      if (value === 0) {
        window.alert("Valor invalido!");
      } else {
        const moviment = new Object();
        moviment.id = new Date().getTime();
        moviment.date = new Date();
        moviment.transactionType = "Deposito";
        moviment.value = value;

        cooperated.balance += value;
        cooperated.movimentationList.push(moviment);

        let event = new CustomEvent("MovimentExecuted", {
          detail: { cooperated },
        });
        document.dispatchEvent(event);
      }
    }
  };

  const withdraw = () => {
    let value = window.prompt("Qual valor deseja sacar?");
    if (isNaN(value)) {
      window.alert("Use apenas número real para sacar um valor!");
    } else {
      value = parseFloat(value);
      if (value < 0) {
        value *= -1;
      }
      if (value === 0) {
        window.alert("Valor invalido!");
      } else if (cooperated?.balance < value) {
        window.alert("Você não tem saldo suficiente para sacar esse valor!");
      } else {
        const moviment = new Object();
        moviment.id = new Date().getTime();
        moviment.date = new Date();
        moviment.transactionType = "Saque";
        moviment.value = value;

        cooperated.balance -= value;
        cooperated.movimentationList.push(moviment);

        let event = new CustomEvent("MovimentExecuted", {
          detail: { cooperated },
        });
        document.dispatchEvent(event);
      }
    }
  };

  return (
    <>
      <Modal
        className="modal-view-cooperated"
        centered
        show={showModal}
        onHide={closeModalViewCooperated}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cooperado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Id: {cooperated.id}
          <br />
          Nome: {cooperated.name}
          <br />
          Email: {cooperated.email}
          <br />
          Data de nascimento: {cooperated.birthdate}
          <hr />
          Saldo: R$ {cooperated.balance?.toFixed(2)}
          <hr />
          <ExtractTable movimentationList={cooperated?.movimentationList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={withdraw}>
            Sacar
          </Button>
          <Button variant="success" onClick={deposit}>
            Depositar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
