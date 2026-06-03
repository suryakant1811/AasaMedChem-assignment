type TableProps = {
  headers: string[];
  rows: (React.ReactNode | string)[][];
  className?: string;
};

export function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 ${className}`}>
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 border-t border-slate-200">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
