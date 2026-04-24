import { useNavigate } from "react-router-dom";
import { ArrowSideIcon } from "../assets/icons";


const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 text-sm text-textSecondary flex items-center gap-3 font-bold"
    >
      <ArrowSideIcon />
      <span>Go back</span>
    </button>
  );
};

export default BackButton;