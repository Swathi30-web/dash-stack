import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Talks to json-server (see db.json). Change the URL here, or set VITE_API_URL
 * in a .env file, when you move to a real backend.
 */
export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    throw new Error(`Cannot reach the API at ${API_URL}. Start it with: npm run server`)
  }
  if (!res.ok) throw new Error(`Request failed (${res.status} ${res.statusText})`)
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T)
}

export const api = {
  list: <T,>(resource: string) => request<T[]>(`/${resource}`),
  get: <T,>(resource: string, id: number) => request<T>(`/${resource}/${id}`),
  create: <T,>(resource: string, body: Omit<T, 'id'>) =>
    request<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(body) }),
  update: <T,>(resource: string, id: number, patch: Partial<T>) =>
    request<T>(`/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  remove: (resource: string, id: number) => request<void>(`/${resource}/${id}`, { method: 'DELETE' }),
}

type WithId = { id: number }

/**
 * Loads a json-server collection and gives you add / update / remove helpers.
 * Every helper waits for the server, then updates the list, so the UI always
 * matches what is really saved in db.json.
 */
export function useResource<T extends WithId>(resource: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const alive = useRef(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.list<T>(resource)
      if (alive.current) { setItems(data); setError(null) }
    } catch (e) {
      if (alive.current) setError((e as Error).message)
    } finally {
      if (alive.current) setLoading(false)
    }
  }, [resource])

  useEffect(() => {
    alive.current = true
    reload()
    return () => { alive.current = false }
  }, [reload])

  const add = async (body: Omit<T, 'id'>) => {
    const created = await api.create<T>(resource, body)
    if (alive.current) setItems(l => [...l, created])
    return created
  }

  const update = async (id: number, patch: Partial<T>) => {
    const saved = await api.update<T>(resource, id, patch)
    if (alive.current) setItems(l => l.map(x => (x.id === id ? saved : x)))
    return saved
  }

  /** Optimistic version: the UI changes instantly and rolls back if the save fails. */
  const updateOptimistic = async (id: number, patch: Partial<T>) => {
    const before = items
    setItems(l => l.map(x => (x.id === id ? { ...x, ...patch } : x)))
    try {
      await api.update<T>(resource, id, patch)
    } catch (e) {
      if (alive.current) { setItems(before); setError((e as Error).message) }
    }
  }

  const remove = async (id: number) => {
    await api.remove(resource, id)
    if (alive.current) setItems(l => l.filter(x => x.id !== id))
  }

  return { items, loading, error, reload, add, update, updateOptimistic, remove }
}

/** Red banner shown when the API can't be reached. */
export const ApiError = ({ message, onRetry }: { message: string | null; onRetry?: () => void }) =>
  message ? (
    <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/40 dark:bg-red-500/10">
      <span>{message}</span>
      {onRetry && <button onClick={onRetry} className="font-bold underline">Retry</button>}
    </div>
  ) : null
