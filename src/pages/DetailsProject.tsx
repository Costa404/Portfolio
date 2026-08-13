import { useModal } from "./useModal";
import DetailsModal from "./DetailsModal";

const DetailsProject = () => {
  const { isModalOpenDetails, setIsModalOpenDetails, projectData } = useModal();

  return (
    <>
      {isModalOpenDetails && projectData && (
        <DetailsModal
          title={projectData.title}
          description={projectData.description}
          backend={projectData.backend}
          frontend={projectData.frontend}
          architecture={projectData.architecture}
          onClose={() => {
            setIsModalOpenDetails(false);
          }}
        />
      )}
    </>
  );
};

export default DetailsProject;
