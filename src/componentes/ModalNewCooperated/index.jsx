import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./styles.css";

export function ModalNewCooperated(props) {
  const newCooperatedForm = React.createRef();
  const newCooperatedName = React.createRef();
  const newCooperatedEmail = React.createRef();
  const newCooperatedBirthdate = React.createRef();

  const [showModal, setShowModal] = useState(false);
  const [btnModalNewCooperatedDisabled, setBtnModalNewCooperatedDisabled] =
    useState(false);

  useEffect(() => {
    document.addEventListener("ModalNewCooperated", () => setShowModal(true));
  });

  const closeModalNewCooperated = () => {
    setShowModal(false);
    setBtnModalNewCooperatedDisabled(false);
  };

  const createNewCooperated = () => {
    setBtnModalNewCooperatedDisabled(true);
    try {
      if (newCooperatedForm?.current?.checkValidity()) {
        let cooperatedList = props?.cooperatedList || [];
        let notValid = cooperatedList.some(
          (cooperated) => cooperated?.name === newCooperatedName?.current?.value
        );

        if (notValid) {
          window.alert("Já existe um cooperado com esse nome!");
        } else {
          let cooperated = new Object();
          cooperated.id = new Date().getTime();
          cooperated.name = newCooperatedName?.current?.value;
          cooperated.email = newCooperatedEmail?.current?.value;
          cooperated.birthdate = newCooperatedBirthdate?.current?.value;
          cooperated.balance = 0;
          cooperated.movimentationList = [];

          let event = new CustomEvent("RegisterNewCooperated", {
            detail: { cooperated },
          });
          document.dispatchEvent(event);
          closeModalNewCooperated();
          window.alert("Cooperado cadastrado com sucesso!");
        }
      } else {
        newCooperatedForm?.current?.reportValidity();
      }
    } catch (e) {
      console.warn("Ocorreu um erro ao tentar cadastrar um novo cooperado.");
    } finally {
      setBtnModalNewCooperatedDisabled(false);
    }
  };

  return (
    <>
      <Modal
        className="modal-new-cooperated"
        centered
        show={showModal}
        onHide={closeModalNewCooperated}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar cooperado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={newCooperatedForm}>
            <Form.Group className="mb-3" controlId="NewCooperatedForm.Name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                placeholder="Digite o nome do cooperado..."
                autoFocus
                minLength={1}
                maxLength={250}
                required
                ref={newCooperatedName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="NewCooperatedForm.Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
                ref={newCooperatedEmail}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="NewCooperatedForm.Birthdate"
            >
              <Form.Label>Data nascimento</Form.Label>
              <Form.Control type="date" required ref={newCooperatedBirthdate} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={createNewCooperated}
            disabled={btnModalNewCooperatedDisabled}
          >
            Cadastrar
          </Button>
          <Button
            variant="secondary"
            onClick={closeModalNewCooperated}
            disabled={btnModalNewCooperatedDisabled}
          >
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
