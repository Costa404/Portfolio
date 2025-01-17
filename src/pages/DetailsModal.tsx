import React from "react";
import ReactDOM from "react-dom";

interface DetailsModalProps {
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-[80vh] overflow-auto rounded-lg p-4 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="gap-10">
          <div className="flex justify-center">
            <h1 className="text-center font-bold">Technical Details</h1>
          </div>

          <p className="mt-8">
            I made this app because I love the gym, so I mixed something useful
            with something I enjoy. It lets me track my workouts easily, add
            exercises, set reps, and see my progress. I built everything on the
            homepage with functional modals, except for the "Workout History"
            section, which is a separate page. It's mobile-friendly, so it works
            anywhere. It keeps things simple and intuitive while still letting
            users track their workouts, add exercises, and leave comments all in
            one place.
          </p>
          <h4 className="mt-8 font-semibold">Backend</h4>
          <p className="mt-4">
            For the backend, I used Node.js to set everything up. I connected it
            with Apollo Server for GraphQL, which helps manage data requests in
            a flexible way. <br /> The server runs on Express.js, making it easy
            to handle routes and middleware. The data is stored in MongoDB,
            which is a NoSQL database, i use Mongoose to make working with the
            database easier. <br /> For real-time features, I added Socket.IO to
            ensure that when a user adds a new set with an exercise, it updates
            instantly on the display. This way, the user gets immediate feedback
            on what was added. <br />
            In short, the backend is built to be fast, flexible, and able to
            handle real-time communication.
          </p>
          <h4 className="mt-8 font-semibold">Frontend</h4>
          <p className="mt-4">
            Setting up the frontend was a bit easier compared to the backend. I
            used React with TypeScript, which helped keep things organized and
            type-safe. For styling, I went with Bootstrap and some inline
            styling. I also added Zustand for state management, mainly to handle
            things like modals smoothly. Even though the app is small, I
            included lazy loading to optimize performance a bit.
          </p>
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
