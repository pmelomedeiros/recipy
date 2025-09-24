interface ErrorMessageProps {
  title: string;
  description: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  title, 
  description, 
  showRetryButton = false, 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-red-600 dark:text-red-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
            {title}
          </h3>
          <p className="text-red-600 dark:text-red-400 mt-1">
            {description}
          </p>
          {showRetryButton && onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}