import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-600 mb-6 shadow-lg shadow-emerald-500/10">
          <FileQuestion className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-medium text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
