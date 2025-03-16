import { LabeledText } from "../text/LabeledText";

interface InfoPanelProps {
    course: string;
    className: string;
    teacherOne?: string;
    teacherTwo?: string;
    studentNumber: number;
};

const InfoPanel = ({...infoPanelProps}: InfoPanelProps) => {

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
          <div className="grid grid-flow-col items-center bg-slate-300 p-4 my-2 gap-4 rounded-lg">
            {classMetaInfo.map((info, index) => (
              <LabeledText key={index} label={info.label} text={info.text} />
            ))}
          </div>
        </>
      )
}

export default InfoPanel;