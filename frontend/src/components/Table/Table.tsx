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
  
  const tableStyles: React.CSSProperties = {
    width: "90%",
    borderCollapse: "collapse",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflowX: "auto"
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: "#f8f9fa",
    color: "#333",
    fontWeight: 600,
    textAlign: "left",
    padding: "12px 15px",
    borderBottom: "2px solid #dee2e6",
    position: "sticky",
    top: 0
  };

  const cellStyles: React.CSSProperties = {
    padding: "12px 15px",
    borderBottom: "1px solid #dee2e6",
    verticalAlign: "middle"
  };

  const rowStyles = (index: number): React.CSSProperties => ({
    transition: "background-color 0.2s ease",
    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa", 
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyles}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={headerStyles}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => {
            const key = record[rowKey];
            return (
              <tr 
                key={String(key) ?? `${index}`} 
                style={rowStyles(index)}
              >
                {columns.map((col) => {
                  const value = col.dataIndex ? record[col.dataIndex] : null;
                  return (
                    <td key={col.key} style={cellStyles}>
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
    </div>
  );
};

export default Table;