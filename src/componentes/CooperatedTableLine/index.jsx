import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import "./styles.css";
import { useEffect } from "react";

export function CooperatedTableLine({ cooperated }) {
  useEffect(() => {}, [cooperated]);

  const viewCooperated = () => {
    let event = new CustomEvent("ModalViewCooperated", {
      detail: { cooperated },
    });
    document.dispatchEvent(event);
  };

  const editCooperated = () => {
    let event = new CustomEvent("ModalEditCooperated", {
      detail: { cooperated },
    });
    document.dispatchEvent(event);
  };

  const deleteCooperated = () => {
    let confirmed = window.confirm(
      "Tem certeza que deseja deletar o cooperado?"
    );
    if (confirmed) {
      let event = new CustomEvent("DeleteCooperated", {
        detail: { cooperated },
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <tr className="cooperated-table-line">
      <td>{cooperated.id}</td>
      <td>{cooperated.name}</td>
      <td>{cooperated.birthdate}</td>
      <td>
        <Button variant="primary" onClick={viewCooperated}>
          Ver
        </Button>
        <Button variant="success" onClick={editCooperated}>
          Editar
        </Button>
        <Button variant="danger" onClick={deleteCooperated}>
          Deletar
        </Button>
      </td>
    </tr>
  );
}
