// pages/minha-pagina.tsx
import DatabaseStatus from '@/components/db-status';

const DbStatus: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à minha página</h1>
      <DatabaseStatus />
      
    </div>
  );
};

export default DbStatus;