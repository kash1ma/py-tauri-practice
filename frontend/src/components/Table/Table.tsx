import React from "react";

export type Column<T> = {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
}: TableProps<T>) => {
  return (
    <table style={{ width: "90%", borderCollapse: "collapse", margin: "0 auto" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => {
          const key = record[rowKey];
          return (
            <tr key={String(key) ?? `${index}`}>
              {columns.map((col) => {
                const value = col.dataIndex ? record[col.dataIndex] : null;

                return (
                  <td
                    key={col.key}
                    style={{ border: "1px solid #ccc", padding: "8px" }}
                  >
                    {col.render
                      ? col.render(value, record, index)
                      : (value !== undefined ? value : "-")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;