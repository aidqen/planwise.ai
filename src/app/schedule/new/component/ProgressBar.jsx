const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;
  
    return (
      <div className="w-full h-2 bg-gray-200 rounded-md">
        <div
          className="h-2 bg-green-500 rounded-md"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
}