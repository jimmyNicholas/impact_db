import { ClassPageInfoPanelProps } from "./class-page-info-panel-interface";

export const ClassPageInfoPanel = ({
  ...infoPanelProps
}: ClassPageInfoPanelProps) => {
  const classMetaInfo = [
    {
      label: "Course: ",
      text: infoPanelProps.course || "",
    },
    {
      label: "Class: ",
      text: infoPanelProps.className || "",
    },
    {
      label: "Teachers: ",
      text:
        infoPanelProps?.teacherOne && infoPanelProps?.teacherTwo
          ? `${infoPanelProps.teacherOne} and ${infoPanelProps.teacherTwo}`
          : "",
    },
    {
      label: "Students: ",
      text: infoPanelProps.studentNumber || "",
    },
  ];

  return (
    <>
      <div className="grid grid-flow-row grid-cols-4 items-center bg-base-300 my-2 rounded-lg">
        {classMetaInfo.map((info, index) => (
            <div key={index} className="">
              <h4 className="label text-info-content font-bold">{info.label}</h4>
              <p className="text-info-content text-nowrap">{info.text}</p>
            </div>
        ))}
      </div>
    </>
  );
};
