import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import "./styles.css";

import { CooperatedTable } from "../CooperatedTable";
import { ModalNewCooperated } from "../ModalNewCooperated";
import { ModalViewCooperated } from "../ModalViewCooperated";
import { ModalEditCooperated } from "../ModalEditCooperated";

export function Cooperated() {
  const [cooperatedList, setCooperatedList] = useState([]);

  useEffect(() => {
    document.addEventListener("RegisterNewCooperated", (event) =>
      registerNewCooperated(event)
    );
    document.addEventListener("UpdateEditedCooperated", (event) =>
      updateEditedCooperated(event)
    );
    document.addEventListener("DeleteCooperated", (event) =>
      deleteCooperated(event)
    );
    document.addEventListener("MovimentExecuted", (event) =>
      executeMoviment(event)
    );
  });

  function executeMoviment(event) {
    const movimentedCooperated = event?.detail?.cooperated;
    let exist = cooperatedList.some(
      (cooperated) => cooperated?.id === movimentedCooperated?.id
    );
    if (exist) {
      const cooperatedListAux = cooperatedList.map((cooperated) => {
        if (movimentedCooperated?.id === cooperated?.id) {
          cooperated.balance = movimentedCooperated?.balance;
          cooperated.movimentationList = [
            ...movimentedCooperated.movimentationList,
          ];
        }
        return cooperated;
      });
      setCooperatedList([...cooperatedListAux]);
      const cooperated = cooperatedList.find(
        (cooperated) => movimentedCooperated?.id === cooperated?.id
      );
      let event = new CustomEvent("ModalViewCooperated", {
        detail: { cooperated },
      });
      document.dispatchEvent(event);
    }
  }

  function deleteCooperated(event) {
    const cooperatedToDelete = event?.detail?.cooperated;
    let indexAux = undefined;
    if (Array.isArray(cooperatedList)) {
      for (let index in cooperatedList) {
        let cooperated = cooperatedList[index];
        if (cooperated?.id === cooperatedToDelete?.id) {
          indexAux = index;
          break;
        }
      }
    }
    if (indexAux !== undefined) {
      cooperatedList.splice(indexAux, 1);
      setCooperatedList([...cooperatedList]);
    }
  }

  function updateEditedCooperated(event) {
    const editedCooperated = event?.detail?.cooperated;
    let exist = cooperatedList.some(
      (cooperated) => cooperated?.id === editedCooperated?.id
    );
    if (exist) {
      const cooperatedListAux = cooperatedList.map((cooperated) => {
        if (editedCooperated?.id === cooperated?.id) {
          cooperated.name = editedCooperated?.name;
          cooperated.email = editedCooperated?.email;
          cooperated.birthdate = editedCooperated?.birthdate;
        }
        return cooperated;
      });
      setCooperatedList([...cooperatedListAux]);
    }
  }

  function registerNewCooperated(event) {
    const newCooperated = event?.detail?.cooperated;
    let notValid = cooperatedList.some(
      (cooperated) => cooperated?.name === newCooperated?.name
    );
    if (!notValid && newCooperated?.id) {
      cooperatedList.push(newCooperated);
      setCooperatedList([...cooperatedList]);
    }
  }

  const openCreateNewCooperated = () => {
    document.dispatchEvent(new CustomEvent("ModalNewCooperated"));
  };

  return (
    <div className="cooperated-container">
      <header>
        <div></div>
        <h4>Cooperados</h4>
        <Button variant="success" onClick={openCreateNewCooperated}>
          Cadastrar
        </Button>
      </header>
      <CooperatedTable cooperatedList={cooperatedList} />
      <ModalNewCooperated cooperatedList={cooperatedList} />
      <ModalViewCooperated />
      <ModalEditCooperated />
    </div>
  );
}
