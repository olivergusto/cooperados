import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.css";

export function ModalEditCooperated() {
  const editCooperatedForm = React.createRef();
  const editCooperatedName = React.createRef();
  const editCooperatedEmail = React.createRef();
  const editCooperatedBirthdate = React.createRef();

  const [cooperated, setCooperated] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.addEventListener("ModalEditCooperated", (event) => {
      setCooperated(event?.detail?.cooperated || {});
      setShowModal(true);
    });
  });

  const closeModalEditCooperated = () => {
    setShowModal(false);
  };

  const updateEditedCooperated = () => {
    try {
      if (editCooperatedForm?.current?.checkValidity()) {
        cooperated.name = editCooperatedName?.current?.value;
        cooperated.email = editCooperatedEmail?.current?.value;
        cooperated.birthdate = editCooperatedBirthdate?.current?.value;

        let event = new CustomEvent("UpdateEditedCooperated", {
          detail: { cooperated },
        });
        document.dispatchEvent(event);
        closeModalEditCooperated();
        window.alert("Cooperado atualizado com sucesso!");
      } else {
        editCooperatedForm?.current?.reportValidity();
      }
    } catch (e) {
      console.warn("Ocorreu um erro ao tentar atualizar um novo cooperado.");
    }
  };

  return (
    <>
      <Modal
        className="modal-edit-cooperated"
        centered
        show={showModal}
        onHide={closeModalEditCooperated}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar cooperado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={editCooperatedForm}>
            <Form.Group className="mb-3" controlId="EditCooperatedForm.Id">
              <Form.Label>Id</Form.Label>
              <Form.Control
                defaultValue={cooperated.id}
                autoFocus
                minLength={1}
                maxLength={250}
                required
                ref={editCooperatedName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditCooperatedForm.Name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                defaultValue={cooperated.name}
                placeholder="Digite o nome do cooperado..."
                autoFocus
                minLength={1}
                maxLength={250}
                required
                ref={editCooperatedName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditCooperatedForm.Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={cooperated.email}
                type="email"
                placeholder="name@example.com"
                required
                ref={editCooperatedEmail}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="EditCooperatedForm.Birthdate"
            >
              <Form.Label>Data nascimento</Form.Label>
              <Form.Control
                defaultValue={cooperated.birthdate}
                type="date"
                required
                ref={editCooperatedBirthdate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={updateEditedCooperated}>
            Salvar
          </Button>
          <Button variant="danger" onClick={closeModalEditCooperated}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
