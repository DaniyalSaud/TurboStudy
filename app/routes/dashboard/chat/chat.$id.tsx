import React from 'react'
import { useParams } from 'react-router'
import type { Route } from '../+types'

export default function DynamicChatPage({params}: Route.ComponentProps) {
  
    return (
    <div>DynamicChatPage{params.id}</div>
  )
}
