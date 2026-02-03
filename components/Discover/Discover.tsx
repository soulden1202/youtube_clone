import React from "react";
import { topics } from "../../utils/constants";
import DiscoverItem from "./Atoms/DiscoverItem";
import { useDiscover } from "./Hooks/useDiscover";
import styles from "./Styles/Discover.module.css";

const Discover = () => {
  const { activeTopic } = useDiscover();

  return (
    <div className={styles.discoverContainer}>
      <p className={styles.title}>Popular Topics</p>
      <div className={styles.itemsWrapper}>
        {topics.map((item) => (
          <DiscoverItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            isActive={activeTopic === item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
