import React from "react";

const DebugData = ({ data }: { data: any }) => {
  if (typeof data === "string") return <pre>{data}</pre>;
  const entries = Object.entries(data).map(([key, value]) => (
    <React.Fragment key={key}>
      <h3>{key}</h3>
      <pre>
        {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
      </pre>
    </React.Fragment>
  ));
  return <>{entries}</>;
};
export default DebugData;
