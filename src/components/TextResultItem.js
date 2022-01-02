import Skeleton from "react-loading-skeleton";

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