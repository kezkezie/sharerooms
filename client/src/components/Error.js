import React from 'react'

export default function Error({message}) {
  return (
    <div>
        <div class="alert alert-danger" role="alert">
  {message}
</div>
    </div>
  )
}
