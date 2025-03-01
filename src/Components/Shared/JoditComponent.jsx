import React, { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";
const JoditComponent = ({ content, setContent }) => {
  const editor = useRef(null);
  const editorComponent = useMemo(() => {
    return (
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent) => setContent(newContent)}
        config={{
          readonly: false,
          toolbarSticky: false,
          minHeight: 600,
        }}
      />
    );
  });
  return <div className="mt-6 ">{editorComponent}</div>;
};

export default JoditComponent;
