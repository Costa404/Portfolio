import { useModal } from "./useModal";
import DetailsModal from "./DetailsModal";

const DetailsProject = () => {
  const { isModalOpenDetails, setIsModalOpenDetails, projectData } = useModal();

  // console.log("modalOpenDetails", isModalOpenDetails);
  // console.log("projectData", projectData);

  return (
    <div className="text-center p-6">
      {isModalOpenDetails && projectData && (
        <DetailsModal
          title={projectData.title}
          description={projectData.description}
          backend={projectData.backend}
          frontend={projectData.frontend}
          onClose={() => {
            setIsModalOpenDetails(false);
          }}
        />
      )}
    </div>
  );
};

export default DetailsProject;
