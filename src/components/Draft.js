import React, { useState, useEffect } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import EditorComponent from './Editor';
import ToastNotification from './ToastNotifcation';
import { saveEditorStateToLocalStorage, loadEditorStateFromLocalStorage } from './utils';
import 'draft-js/dist/Draft.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Draft = () => {
  const [editorState, setEditorState] = useState(() => loadEditorStateFromLocalStorage(EditorState));
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedState = loadEditorStateFromLocalStorage(EditorState);
    if (savedState) {
      setEditorState(savedState);
    }
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    if (!selectionState.isCollapsed()) {
      setEditorState(editorState);
      return;
    }

    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockText = block.getText();
    const blockType = block.getType();

    if (blockType === 'unstyled') {
      let newContentState;
      let newEditorState;

      if (blockText === '# ') {
        newContentState = Modifier.removeRange(
          contentState,
          selectionState.merge({
            anchorOffset: 0,
            focusOffset: 2,
          }),
          'backward'
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        );
        newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');
      } else if (blockText === '* ') {
        newContentState = Modifier.removeRange(
          contentState,
          selectionState.merge({
            anchorOffset: 0,
            focusOffset: 2,
          }),
          'backward'
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        );
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'BOLD');
      } else if (blockText === '** ') {
        newContentState = Modifier.removeRange(
          contentState,
          selectionState.merge({
            anchorOffset: 0,
            focusOffset: 3,
          }),
          'backward'
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        );
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'RED');
      } else if (blockText === '*** ') {
        newContentState = Modifier.removeRange(
          contentState,
          selectionState.merge({
            anchorOffset: 0,
            focusOffset: 4,
          }),
          'backward'
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        );
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
      } else if (blockText === '``` ') {
        newContentState = Modifier.removeRange(
          contentState,
          selectionState.merge({
            anchorOffset: 0,
            focusOffset: 4,
          }),
          'backward'
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        );
        newEditorState = RichUtils.toggleBlockType(newEditorState, 'code-block');
      } else {
        setEditorState(editorState);
        return;
      }

      setEditorState(newEditorState);
      return;
    }

    setEditorState(editorState);
  };

  const handleSave = () => {
    saveEditorStateToLocalStorage(editorState);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const customStyleMap = {
    RED: {
      color: 'red',
    },
  };

  return (
    <div className="container mt-3">
      <h1> Demo Editor by Kiran Acharya </h1>
      <EditorComponent
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        customStyleMap={customStyleMap}
      />
      <button
        onClick={handleSave}
        className="btn btn-primary mt-3"
      >
        Save
      </button>
      <ToastNotification showToast={showToast} setShowToast={setShowToast} />
    </div>
  );
};

export default Draft;
