// import { Page } from '@/payload-types'
// import React from 'react'

// type Props = {
//   block: Extract<Page['layout'][0], { blockType: 'contact-us-form' }>
// }
// function ContactUsFormBlock({ block }: Props) {
//   console.log('block', block)
//   return <div>ContactUsFormBlock</div>
// }

// export default ContactUsFormBlock

'use client'

import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  block: Extract<Page['layout'][0], { blockType: 'contact-us-form' }>
}

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

function ContactUsFormBlock({ block }: Props) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!block.form || typeof block.form !== 'object') return

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    try {
      setFormState({ loading: true, error: null, success: false })

      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data).map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
      })

      if (!res.ok) throw new Error('Failed to submit form')

      setFormState({ loading: false, error: null, success: true })
      formRef.current?.reset() // reset form fields
    } catch (err) {
      console.error(err)
      setFormState({ loading: false, error: 'Failed to submit', success: false })
    }
  }

  useEffect(() => {
    if (formState.success) {
      const timeout = setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [formState.success])

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      {typeof block?.form === 'object' && (
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">{block.heading}</h2>

          <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
            {block.form.fields?.map((field: any) => {
              const commonProps = {
                name: field.name,
                id: field.name,
                required: field.required,
                className:
                  'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400',
              }

              switch (field.blockType) {
                case 'text':
                case 'email':
                case 'number':
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.name} className="block mb-1 font-medium">
                        {field.label}
                      </label>
                      <input type={field.blockType} {...commonProps} />
                    </div>
                  )

                case 'country':
                case 'state':
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.name} className="block mb-1 font-medium">
                        {field.label}
                      </label>
                      <input type="text" {...commonProps} />
                    </div>
                  )

                case 'select':
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.name} className="block mb-1 font-medium">
                        {field.label}
                      </label>
                      <select {...commonProps}>
                        <option value="">Select an option</option>
                        {field.options?.map((opt: any) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )

                case 'textarea':
                  return (
                    <div key={field.id}>
                      <label htmlFor={field.name} className="block mb-1 font-medium">
                        {field.label}
                      </label>
                      <textarea rows={5} {...commonProps}></textarea>
                    </div>
                  )

                case 'checkbox':
                  return (
                    <div key={field.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        onChange={(e) =>
                          ((
                            e.target.form?.elements.namedItem(field.name) as HTMLInputElement
                          ).value = e.target.checked ? 'true' : 'false')
                        }
                      />
                      <label htmlFor={field.name}>{field.label}</label>
                    </div>
                  )

                case 'message':
                  return (
                    <div key={field.id} className="text-sm text-gray-600 italic">
                      {field.message?.root?.children?.[0]?.children?.[0]?.text}
                    </div>
                  )

                default:
                  return null
              }
            })}

            {formState.error && <div className="text-red-600">{formState.error}</div>}
            {/* {formState.success && <div className="text-green-600">Submitted successfully 🎉</div>} */}
            {formState.success && block.form?.confirmationMessage ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded text-green-800 mt-6">
                <RichText data={block.form.confirmationMessage} />
              </div>
            ) : (
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-lg font-medium transition"
              >
                {formState.loading ? 'Submitting...' : block.form.submitButtonLabel || 'Submit'}
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}

export default ContactUsFormBlock
