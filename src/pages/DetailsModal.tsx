import React from "react";
import ReactDOM from "react-dom";

interface DetailsModalProps {
  title: string;
  description: string;
  backend?: string;
  frontend?: string;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  title,
  description,
  backend,
  frontend,
  onClose,
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-[80vh] overflow-auto rounded-lg p-4 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="gap-10">
          <div className="flex justify-center">
            <h1 className="text-center font-bold">{title}</h1>
          </div>

          <p className="mt-8">{description}</p>

          {backend && (
            <>
              <h4 className="mt-8 font-semibold">Backend</h4>
              <p className="mt-4">{backend}</p>
            </>
          )}

          {frontend && (
            <>
              <h4 className="mt-8 font-semibold">Frontend</h4>
              <p className="mt-4">{frontend}</p>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 cursor-pointer"
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("modal-Details")!
  );
};

export default DetailsModal;
