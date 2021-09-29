import TextResultItem from "../../components/TextResultItem";

export default function TextResults({ textInfo }) {
  const textResultsList = [
    {
      title: 'IP Address',
      value: textInfo.ip,
    },
    {
      title: 'Location',
      value: textInfo.location,
    },
    {
      title: 'Timezone',
      value: textInfo.timezone,
    },
    {
      title: 'ISP',
      value: textInfo.isp,
    }
  ];

  return (
    <div className="results__info-container">
      {
        textResultsList.map((textResult, index) => (
          <TextResultItem key={index} {...textResult}/>
        ))
      }
    </div>
  );
}
