import Skeleton from "react-loading-skeleton";
/**
 * Renders a textexual result.
 * @param {string} title -  Title of the ip/domain result.
 * @param {string} value -  specific value of the ip/domain result.
 * @param {boolean} isLoading - If true shows loading skeleton.
 * @returns 
 */
export default function TextResultItem({ title, value, isLoading }) {
  return (
    <div className="results__item results__ip-address  flow-content">
      <h3 className="results__item__title">{title}</h3>
      <p className="results__item__value text">
        {isLoading ? <Skeleton /> : value}
      </p>
    </div>
  );
}