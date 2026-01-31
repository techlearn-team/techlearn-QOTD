import { CheckCircle2, XCircle, Loader2, Terminal } from 'lucide-react';

const OutputPanel = ({ output }) => {
  if (!output) return null;

  const { status, message, details } = output;

  // Different states: loading, success, error
  const statusConfig = {
    running: {
      icon: Loader2,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconColor: 'text-primary-600',
      textColor: 'text-primary-900',
      animate: true,
    },
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      animate: false,
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      animate: false,
    },
  };

  const config = statusConfig[status] || statusConfig.running;
  const Icon = config.icon;

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-neutral-800 p-2 rounded-lg">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">Output</h3>
      </div>

      {/* Output Content */}
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <Icon 
            className={`w-6 h-6 ${config.iconColor} flex-shrink-0 ${config.animate ? 'animate-spin' : ''}`} 
          />
          <div className="flex-1">
            <p className={`font-semibold ${config.textColor} mb-2`}>
              {message}
            </p>
            {details && (
              <pre className="bg-white rounded p-3 text-sm font-mono text-neutral-700 overflow-x-auto border border-neutral-200">
                {details}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
