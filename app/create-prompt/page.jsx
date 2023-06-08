'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form  from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  

    const createPrompt = async (e) => {
      e.preventDefault()
      setSubmitting(true)

      try {
        const res = await fetch('/api/prompt/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id,
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
      type="Create"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt