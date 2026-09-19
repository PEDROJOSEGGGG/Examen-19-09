import type { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
}

function InstructorCard({ instructor }: InstructorCardProps) {
  const statusStyle = instructor.status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-slate-100 text-slate-700';

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden text-amber-700 font-semibold text-lg flex-shrink-0">
          {instructor.avatarUrl
            ? <img src={instructor.avatarUrl} alt={`Avatar de ${instructor.name}`} className="w-full h-full object-cover" />
            : instructor.name.charAt(0).toUpperCase()
          }
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{instructor.name}</h3>
          <p className="text-sm text-slate-500 truncate">{instructor.email}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium truncate">
          {instructor.specialty}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle}`}>
          {instructor.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </div>
    </article>
  );
}

export default InstructorCard;