import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api'

const CreatePost = () => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage("")

        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            await createPost(formData)
            form.reset()
            navigate("/feed")
        } catch (error) {
            setMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <section className="create-post">
      <div className="page-heading">
        <h1>Create Post</h1>
        <p>Share an image and add a caption.</p>
      </div>

        <form onSubmit={handleSubmit}>
            <label>
              Image
              <input type="file" name="image" accept="image/jpeg,image/png,image/webp" required />
            </label>

            <label>
              Caption
              <input type="text" name="caption" placeholder="Enter caption" maxLength="300" required />
            </label>

            {message && <p className="form-message form-error">{message}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
        </form>
    </section>
  )
}

export default CreatePost
