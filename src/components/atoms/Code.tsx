import React from "react";
import { Prism } from "react-syntax-highlighter";

const Code = ({ value: { language, code } }: any) => {
  return (
    <Prism
      useInlineStyles={false}
      language={language}
      PreTag={({ style, ...preProps }) => <pre {...preProps} />}
      CodeTag={({ style, ...preProps }) => <code {...preProps} />}
    >
      {code}
    </Prism>
  );
};

export default Code;
