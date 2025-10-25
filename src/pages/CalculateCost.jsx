import AppHeaderText from "../components/AppHeaderText";
import CostForm from "../features/cost/CostForm";

function CalculateCost() {
  return (
    <div
      className="flex flex-col 
        items-center gap-12 px-3 py-4 md:p-6 min-h-screen">
      <AppHeaderText
        title="International Patient Cost Estimator"
        subtitle="Plan your trip and treatment with our cost estimator."
      />

      <CostForm />
    </div>
  );
}

export default CalculateCost;
