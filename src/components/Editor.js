import React from 'react';
import { Editor } from 'draft-js';

const EditorComponent = ({ editorState, handleKeyCommand, onChange, customStyleMap }) => {
  return (
    <div className="border rounded p-3 bg-light" style={{ minHeight: '400px' }}>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        customStyleMap={customStyleMap}
        placeholder="Type here..."
      />
    </div>
  );
};

export default EditorComponent;
