import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restoreCurrentUser } from '../../store/slices/authSlice.js'

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    if (token) dispatch(restoreCurrentUser())
  }, [dispatch, token])

  return children
}