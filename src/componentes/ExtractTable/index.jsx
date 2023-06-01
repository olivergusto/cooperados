import { useEffect, useState } from "react";

import { Table } from "react-bootstrap";

import "./styles.css";

import { ExtractTableLine } from "../ExtractTableLine";

export function ExtractTable(props) {

  useEffect(() => {}, [props?.movimentationList]);

  {console.log(props?.movimentationList)}

  const getTableLines = () => {
    return (
      <>
        {props?.movimentationList?.slice(0).reverse().map((moviment) => {
          return moviment?.id ? (
            <ExtractTableLine key={moviment.id} moviment={moviment} />
          ) : (
            ""
          );
        })}
      </>
    );
  };

  return (
    <div className="extract-table">
      <Table responsive striped bordered hover variant="light" size="sm">
        <thead>
          <tr className="extract-table-head">
            <th className="extract-table-head-date">Data</th>
            <th className="extract-table-head-hora">Hora</th>
            <th className="extract-table-head-transaction-type">Tipo de transação</th>
            <th className="extract-table-head-value">Valor</th>
          </tr>
        </thead>
        <tbody>{getTableLines()}</tbody>
      </Table>
    </div>
  );
}
