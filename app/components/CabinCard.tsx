import { allowsDogs, CabinDetailed, DAYSOFF_BASEURL, hasSauna } from "~/domain";

interface CabinCardProps {
  cabin: CabinDetailed;
}
const CabinCard = ({ cabin }: CabinCardProps) => {
  return (
    <article>
      <header>
        <a href={`${DAYSOFF_BASEURL}${cabin.link}`}>
          <h2>{cabin.title}</h2>
        </a>
      </header>
      {allowsDogs(cabin) && "🐶"}
      {hasSauna(cabin) && "🧖"}
      <img src={`${DAYSOFF_BASEURL}${cabin.images[0]}`} alt="" />
      <details>
        <summary>Beskrivelse</summary>
        <p dangerouslySetInnerHTML={{ __html: cabin.description }} />
      </details>
    </article>
  );
};

export default CabinCard;
