import { config } from "~/config";
import type { Cabin } from "~/domain";
import { allowsDogs, hasSauna } from "~/domain";

interface CabinCardProps {
  cabin: Cabin;
}
export const CabinCard = ({ cabin }: CabinCardProps) => {
  return (
    <article>
      <header>
        <a href={`${config.DAYSOFF_BASEURL}${cabin.link}`}>
          <h2>{cabin.title}</h2>
        </a>
      </header>
      {allowsDogs(cabin) && "🐶"}
      {hasSauna(cabin) && "🧖"}
      <img src={`${config.DAYSOFF_BASEURL}${cabin.images[0]}`} alt="" />
      <details>
        <summary>Beskrivelse</summary>
        <p dangerouslySetInnerHTML={{ __html: cabin.description }} />
      </details>
    </article>
  );
};
