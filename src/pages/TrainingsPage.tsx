import { useState, type FormEvent } from 'react';
import Modal from '../components/Modal';
import TrainingCard from '../components/TrainingCard';
import { useCreateTraining, useTrainings } from '../hooks/useTrainings';
import type { TrainingStatus } from '../types';

const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

function TrainingsPage() {
  const { data: trainings = [], isLoading, isError } = useTrainings();
  const createTraining = useCreateTraining();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState<TrainingStatus>('planned');

  const resetForm = () => {
    setTitle('');
    setInstructor('');
    setDate('');
    setDuration('');
    setStatus('planned');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createTraining.mutateAsync({ title, instructor, date, duration, status });
    resetForm();
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Capacitaciones</h2>
          <p className="text-slate-500 mt-1">Organiza y consulta las capacitaciones del equipo</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
          + Nueva capacitación
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-xl px-5 py-3">
          <p className="text-sm">Total de capacitaciones</p>
          <p className="text-2xl font-bold">{trainings.length}</p>
        </div>
        <div className="bg-amber-100 text-amber-800 rounded-xl px-5 py-3">
          <p className="text-sm">Programadas</p>
          <p className="text-2xl font-bold">{trainings.filter(training => training.status === 'planned').length}</p>
        </div>
      </div>

      {isLoading && <p className="text-center py-12 text-slate-500">Cargando capacitaciones...</p>}
      {isError && <p className="text-center py-12 text-red-600">No se pudieron cargar las capacitaciones.</p>}
      {!isLoading && !isError && trainings.length === 0 && <p className="text-center py-12 text-slate-500">Aún no hay capacitaciones registradas.</p>}
      {!isLoading && !isError && trainings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map(training => <TrainingCard key={training.id} training={training} />)}
        </div>
      )}

      <Modal isOpen={modalOpen} title="Nueva capacitación" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Título
            <input required value={title} onChange={event => setTitle(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="Inducción de seguridad" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Instructor
            <input required value={instructor} onChange={event => setInstructor(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="Nombre del instructor" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-slate-700">Fecha
              <input required type="date" value={date} onChange={event => setDate(event.target.value)} className={`${inputClass} mt-1.5`} />
            </label>
            <label className="block text-sm font-medium text-slate-700">Duración
              <input required value={duration} onChange={event => setDuration(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="2 horas" />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700">Estado
            <select value={status} onChange={event => setStatus(event.target.value as TrainingStatus)} className={`${inputClass} mt-1.5`}>
              <option value="planned">Programada</option>
              <option value="in_progress">En curso</option>
              <option value="completed">Finalizada</option>
            </select>
          </label>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg">Cancelar</button>
            <button type="submit" disabled={createTraining.isPending} className="px-4 py-2 text-sm text-white bg-brand-800 hover:bg-brand-700 rounded-lg disabled:opacity-50">
              {createTraining.isPending ? 'Guardando...' : 'Crear capacitación'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TrainingsPage;