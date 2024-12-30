import type { FC } from 'react'
import type { IAllProps } from '@tinymce/tinymce-react'
import { Editor } from '@tinymce/tinymce-react'

export type ScriptType = 'domestic' | 'abroad' | 'local'
export type ScriptMap = {
  [key in ScriptType]: string
}

interface TinymceEditorProps extends IAllProps {
  type?: ScriptType
}

const apiKey: string = import.meta.env.REACT_APP_EDITOR_API_KEY

const scriptSrcMap: ScriptMap = {
  domestic: 'https://cdn.bootcdn.net/ajax/libs/tinymce/7.2.1/tinymce.min.js',
  abroad: 'https://cdn.jsdelivr.net/npm/tinymce@7.2.1/tinymce.min.js',
  local: '/assets/js/tinymce/tinymce.min.js'
}

const TinymceEditor: FC<TinymceEditorProps> = ({ type = 'local', ...props }) => {
  const initParams: any = {
    license_key: 'gpl'
  }
  const useDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches

  const handleEditorChange = (content: string) => {
    console.info('Content was updated:', content)
  }

  if (!apiKey) {
    console.warn('Please supply a valid TinymceEditor api key.')
    return null
  }

  return (
    <>
      <Editor
        {...props}
        apiKey={apiKey}
        tinymceScriptSrc={scriptSrcMap?.[type] ?? undefined}
        init={{
          ...initParams,
          height: 500,
          promotion: false,
          plugins:
            'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap code',
          editimage_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          toolbar:
            'undo redo | image media | bold italic underline strikethrough | fontfamily fontsize blocks | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | rowspacingtop rowspacingbottom lineheight | pagebreak | fullscreen  preview save print | insertfile link anchor codesample | ltr rtl | code',
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          save_onsavecallback: () => {},
          image_advtab: true,
          importcss_append: true,
          image_caption: true,
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          skin: useDarkMode ? 'oxide-dark' : 'oxide',
          content_css: useDarkMode ? 'dark' : 'default',
          language: 'zh_CN',
          language_url: '/assets/js/tinymce/langs/zh_CN.js',
          branding: false,
          ui_mode: 'split',
          font_size_input_default_unit: 'px',
          font_size_formats: '10px 11px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px',
          line_height_formats: '1 1.5 1.75 2 3 4 5'
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  )
}

export default TinymceEditor
