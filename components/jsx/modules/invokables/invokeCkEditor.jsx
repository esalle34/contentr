import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from './elements/ckEditorClassic';
import { i18n } from "~/operations/modules/mandatory/i18n/services/index";


const InvokeCkEditor = (args) => {

    return <CKEditor
        editor={ClassicEditor}
        data={typeof args.data != "undefined" ? args.data : undefined}
        onChange={(event, editor) => {
            const data = editor.getData();
            editor.sourceElement.closest(".ckEditor").nextSibling.value = data;
        }}
    />

}

export default InvokeCkEditor;