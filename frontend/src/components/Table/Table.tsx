import React from "react";

export type Column<T> = {
  key: keyof T;
  title?: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

function Table<T>({ data, columns }: TableProps<T>) {
  if (!data || data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}
            >
              {col.title || String(col.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={String(col.key)} style={{ border: "1px solid #ccc", padding: "8px" }}>
                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;