import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
      <h3>404</h3>
      <p>Cette Page est indisponible !!</p>
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
    </div>
  )
}
