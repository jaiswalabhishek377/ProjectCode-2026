import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "content"}
        control={control} 
        render={({field : {onChange}})=> (
        <Editor
            onEditorChange={onChange}
            defaultValue={defaultValue}/>
        )}
        />
    </div>
  )
}

export default RTE