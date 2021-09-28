import TextResultItem from "../../components/TextResultItem";

export default function TextResults() {
  return (
    <div className="results__info-container">
      {
        textResults.map((textResult, index) => (
          <TextResultItem key={index} {...textResult}/>
        ))
      }
    </div>
  );
}

const textResults = [
  {
    title: 'IP Address',
    value: '192.212.174.101',
  },
  {
    title: 'Location',
    value: 'Brooklyn, NY 10001',
  },
  {
    title: 'Timezone',
    value: 'UTC-05:00',
  },
  {
    title: 'ISP',
    value: 'SpaceX Starlink',
  }
]