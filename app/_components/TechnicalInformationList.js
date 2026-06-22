import H2 from "./H2";
import UL from "./Ul";

function TechnicalInformationList({ data, header, icon }) {
  return (
    <section className="flex flex-col gap-3 px-10">
      <span className="flex items-center justify-center gap-2 text-gold border-b-[0.05rem] border-gold pb-1 w-full">
        {icon}
        <H2>{header}</H2>
      </span>
      <UL>
        {data.map((info, i) => (
          <li className="self-start" key={i}>
            {info}
          </li>
        ))}
      </UL>
    </section>
  );
}

export default TechnicalInformationList;
