'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form  from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])
  

  

    const editPrompt = async (e) => {
      e.preventDefault()
      setSubmitting(true)

      if(!promptId) return alert('Prompt ID not found')

      try {
        const res = await fetch(`/api/prompt/${promptId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            tag: post.tag
          })
        })

        if (res.ok) {
          router.push('/')
          // setSubmitting(false)
          // setPost({
          //   prompt: '',
          //   tag: ''
          // })
        }
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <Form
      type="Edit"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt