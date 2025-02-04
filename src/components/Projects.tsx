import { PROJECTS } from "../constants/Projects";
import { useModal } from "../pages/useModal";

const Projects = () => {
  const {
    setSelectedVideo,
    setModalOpen,

    setIsModalOpenDetails,
    setProjectData,
  } = useModal();

  const stylebtn =
    "mb-4 mr-2 rounded bg-neutral-800 px-2 py-1 text-sm font-medium text-neutral hover";

  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">Projects</h1>
      <div>
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="mb-8 flex flex-wrap lg:justify-center items-center"
          >
            <div className="w-full lg:w-1/4">
              <img
                src={project.image}
                alt={project.title}
                className="mb-6 rounded min-w-[150px] max-w-[150px] max-h-[150px] min-h-[150px] w-full h-auto"
              />
            </div>
            <div className="w-full max-w-xl lg:w-3/4">
              <h6 className="mb-4 font-semibold">{project.title}</h6>
              <div className="mb-4 flex flex-wrap gap-2">
                <a href={project.appPreview} className={stylebtn}>
                  View Live App
                </a>
                {index < 3 && (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setProjectData(project.technicalDetails ?? null);
                      setIsModalOpenDetails(true);
                    }}
                    className={stylebtn}
                  >
                    Technical Details
                  </a>
                )}

                {index < 3 && (
                  <a
                    className={stylebtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedVideo(project.videoDemo ?? null);
                      setModalOpen(true);
                    }}
                  >
                    Video Demo
                  </a>
                )}
                <a href={project.gitHubRepository} className={stylebtn}>
                  Github repository
                </a>
              </div>
              <p className="mb-4 text-neutral-400">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-2 rounded bg-neutral-800 px-2 py-1 text-sm font-medium text-purple-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
