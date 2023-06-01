import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import "./styles.css";

export function ModalExtractCooperated() {
  const [showModal, setShowModal] = useState(false);

  const closeModalViewCooperated = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        className="modal-extract-cooperated"
        centered
        show={showModal}
        onHide={closeModalViewCooperated}
      >
        <Modal.Header closeButton>
          <Modal.Title>Extrato:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          SALDO:
          <br />
          <Table responsive striped bordered hover variant="light" size="sm">
            <thead>
              <tr className="cooperated-table-head">
                <th className="cooperated-table-head-id">Id</th>
                <th className="cooperated-table-head-name">Operação</th>
                <th className="cooperated-table-head-action">Data</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}
