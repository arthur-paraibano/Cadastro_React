import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}

export default LoadingSpinner;