import { convertToRaw, convertFromRaw } from 'draft-js';

export const saveEditorStateToLocalStorage = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  localStorage.setItem('editorContent', JSON.stringify(rawContentState));
};

export const loadEditorStateFromLocalStorage = (EditorState) => {
  const rawContentState = localStorage.getItem('editorContent');
  if (rawContentState) {
    const contentState = convertFromRaw(JSON.parse(rawContentState));
    return EditorState.createWithContent(contentState);
  }
  return EditorState.createEmpty();
};
