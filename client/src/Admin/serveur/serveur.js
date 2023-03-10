import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

export default function serveur() {
  return (
    <h1>{window.location.state.id}Serveur </h1>
  )
}
