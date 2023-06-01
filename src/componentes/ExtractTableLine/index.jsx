import "./styles.css";

export function ExtractTableLine({ moviment }) {
  return (
    <tr className="extract-table-line">
      <td>{moviment.date?.toISOString().slice(0, 10)}</td>
      <td>{moviment.date?.toISOString().slice(11, 19)}</td>
      <td>{moviment.transactionType}</td>
      <td>{moviment.value?.toFixed(2)}</td>
    </tr>
  );
}
