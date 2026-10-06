import { Link, useNavigate } from 'react-router-dom'
import { FormPage, PageHead } from '../ui'
import { uid, usePersisted } from '../store'

export type Member = { id: string; name: string; role: string; email: string; photo: string }

const seed: Member[] = [
  ['Jason Price', 'Admin', 'janick_parisian@yahoo.com'], ['Jukkoe Sisao', 'CEO', 'sibyl_kozey@gmail.com'], ['Harriet King', 'CTO', 'nadia_block@hotmail.com'], ['Lenora Benson', 'Lead', 'feil.wallace@kunde.us'],
  ['Olivia Reese', 'Strategist', 'kemmer.hattie@cremin.us'], ['Bertha Valdez', 'CEO', 'loraine.koelpin@tromp.io'], ['Harriett Payne', 'Digital Marketer', 'nannie_west@estrella.tv'], ['George Bryant', 'Social Media', 'delmer.kling@gmail.com'],
  ['Lily French', 'Strategist', 'lucienne.herman@hotmail.com'], ['Howard Adkins', 'CEO', 'wiegand.leonor@herman.us'], ['Earl Bowman', 'Digital Marketer', 'waino_altenwerth@nicolette.tv'], ['Patrick Padilla', 'Social Media', 'octavia.nienow@gleichner.net'],
].map(([name, role, email], i) => ({ id: `seed${i + 1}`, name, role, email, photo: `/img/team${i + 1}.jpg` }))

export const useTeam = () => usePersisted<Member[]>('ds.team', seed)

export default function Team() {
  const [team] = useTeam()
  return (
    <>
      <PageHead title="Team"><Link to="/team/new" className="btn-primary">Add New Member</Link></PageHead>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {team.map(m => (
          <div key={m.id} className="card px-4 py-8 text-center">
            <img src={m.photo} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <h3 className="mt-4 font-bold">{m.name}</h3><p className="my-1 text-sm muted">{m.role}</p><p className="break-all text-sm">{m.email}</p>
          </div>))}
      </div>
    </>
  )
}

export function AddMember() {
  const [, setTeam] = useTeam()
  const nav = useNavigate()
  return (
    <FormPage title="Add Team Member" upload="Upload Photo" cta="Add Now"
      onSubmit={(v, photo) => {
        setTeam(t => [...t, { id: uid(), name: `${v.first} ${v.last}`.trim(), role: v.position || 'Member', email: v.email, photo: photo ?? '/img/avatar.jpg' }])
        nav('/team')
      }}
      fields={[
        { name: 'first', label: 'First Name', ph: 'Enter first Name', req: true }, { name: 'last', label: 'Last Name', ph: 'Enter Last Name' },
        { name: 'email', label: 'Your email', ph: 'Enter your email', type: 'email', req: true }, { name: 'phone', label: 'Phone Number', ph: 'Enter phone number', type: 'tel' },
        { name: 'position', label: 'Position', ph: 'Enter position' }, { name: 'gender', label: 'Gender', ph: '', options: ['Male', 'Female', 'Other'] }]} />
  )
}
