import { useModal } from "./useModal";
import DetailsModal from "./DetailsModal";

const DetailsProject = () => {
  const { isModalOpenDetails, setIsModalOpenDetails } = useModal();

  console.log("modalOpen", isModalOpenDetails);

  console.log("modalOpen", isModalOpenDetails);

  // useEffect(() => {
  //   console.log("isModalOpen updated in DetailsProject ", isModalOpen);
  // }, [isModalOpen]);

  return (
    <div className="text-center p-6">
      {isModalOpenDetails && (
        <DetailsModal
          onClose={() => {
            setIsModalOpenDetails(false);
          }}
        />
      )}
    </div>
  );
};

export default DetailsProject;
