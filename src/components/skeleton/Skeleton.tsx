import { FC } from "react";
import "./Skeleton.scss";

/* 
  This is extremely hacky,
  A better solution can be implented to initialize an iterable so we can map through html elements.
 */
const emptyStates: number[] = [1, 2, 3, 4, 5, 6];

const Skeleton: FC = () => {
  return (
    <>
      <ul className="skeleton">
        {emptyStates.map((n) => (
          <div key={n}>
            <li className="skeleton__list">
              <div className="skeleton__profile-container">
                <div className="skeleton__image"></div>
                <div className="skeleton__username"></div>
              </div>
            </li>
            <hr className="skeleton__separator" />
          </div>
        ))}
      </ul>
    </>
  );
};

export default Skeleton;
