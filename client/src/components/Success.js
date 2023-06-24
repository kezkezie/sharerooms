import React from 'react'

export default function Success({message}) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                <h1>{message}</h1>
            </div>
        </div>
    )
}
