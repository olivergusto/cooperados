import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

import "./styles.css";

import { CooperatedTableLine } from "../CooperatedTableLine";

export function CooperatedTable(props) {
  const [cooperatedList] = useState(props?.cooperatedList || []);

  useEffect(() => {}, [props?.cooperatedList]);

  const getTableLines = () => {
    return (
      <>
        {cooperatedList?.map((cooperated) => {
          return cooperated?.id ? (
            <CooperatedTableLine key={cooperated.id} cooperated={cooperated} />
          ) : (
            ""
          );
        })}
      </>
    );
  };

  return (
    <Table responsive striped bordered hover variant="light" size="sm">
      <thead>
        <tr className="cooperated-table-head">
          <th className="cooperated-table-head-id">Id</th>
          <th className="cooperated-table-head-name">Nome</th>
          <th className="cooperated-table-head-action">Data de nascimento</th>
          <th className="cooperated-table-head-action">Ações</th>
        </tr>
      </thead>
      <tbody>{getTableLines()}</tbody>
    </Table>
  );
}
