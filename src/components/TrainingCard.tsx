import type { Training } from '../types';

interface TrainingCardProps {
  training: Training;
}

const statusConfig = {
  planned: { label: 'Programada', style: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'En curso', style: 'bg-amber-100 text-amber-800' },
  completed: { label: 'Finalizada', style: 'bg-green-100 text-green-800' },
};

function TrainingCard({ training }: TrainingCardProps) {
  const status = statusConfig[training.status];

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Capacitación</p>
          <h3 className="mt-1 font-semibold text-slate-900">{training.title}</h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${status.style}`}>
          {status.label}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><span className="font-medium text-slate-800">Instructor:</span> {training.instructor}</p>
        <p><span className="font-medium text-slate-800">Fecha:</span> {training.date}</p>
        <p><span className="font-medium text-slate-800">Duración:</span> {training.duration}</p>
      </div>
    </article>
  );
}

export default TrainingCard;