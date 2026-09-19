import { useState } from 'react';
import Modal from '../components/Modal';
import InstructorCard from '../components/InstructorCard';
import { useCreateInstructor, useInstructors } from '../hooks/useInstructors';
import type { InstructorStatus } from '../types';

const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

function InstructorsPage() {
  const { data: instructors = [], isLoading, isError } = useInstructors();
  const createInstructor = useCreateInstructor();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState<InstructorStatus>('active');

  const resetForm = () => {
    setName('');
    setEmail('');
    setSpecialty('');
    setStatus('active');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createInstructor.mutateAsync({ name, email, specialty, status });
    resetForm();
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de Instructores</h2>
          <p className="text-slate-500 mt-1">Administra el equipo encargado de las capacitaciones</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + Nuevo instructor
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-xl px-5 py-3">
          <p className="text-sm">Total de instructores</p>
          <p className="text-2xl font-bold">{instructors.length}</p>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl px-5 py-3">
          <p className="text-sm">Instructores activos</p>
          <p className="text-2xl font-bold">{instructors.filter(instructor => instructor.status === 'active').length}</p>
        </div>
      </div>

      {isLoading && <p className="text-center py-12 text-slate-500">Cargando instructores...</p>}
      {isError && <p className="text-center py-12 text-red-600">No se pudieron cargar los instructores.</p>}
      {!isLoading && !isError && instructors.length === 0 && (
        <p className="text-center py-12 text-slate-500">Aún no hay instructores registrados.</p>
      )}
      {!isLoading && !isError && instructors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {instructors.map(instructor => <InstructorCard key={instructor.id} instructor={instructor} />)}
        </div>
      )}

      <Modal isOpen={modalOpen} title="Nuevo instructor" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Nombre completo
            <input required value={name} onChange={event => setName(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="Nombre del instructor" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Correo electrónico
            <input required type="email" value={email} onChange={event => setEmail(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="instructor@empresa.com" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Especialidad
            <input required value={specialty} onChange={event => setSpecialty(event.target.value)} className={`${inputClass} mt-1.5`} placeholder="Liderazgo, Excel, seguridad..." />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Estado
            <select value={status} onChange={event => setStatus(event.target.value as InstructorStatus)} className={`${inputClass} mt-1.5`}>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </label>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg">Cancelar</button>
            <button type="submit" disabled={createInstructor.isPending} className="px-4 py-2 text-sm text-white bg-brand-800 hover:bg-brand-700 rounded-lg disabled:opacity-50">
              {createInstructor.isPending ? 'Guardando...' : 'Crear instructor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default InstructorsPage;