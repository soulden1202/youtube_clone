import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "../Styles/Discover.module.css";

interface DiscoverItemProps {
  name: string;
  icon: ReactNode;
  isActive: boolean;
}

const DiscoverItem: React.FC<DiscoverItemProps> = ({ name, icon, isActive }) => {
  const itemClass = isActive ? styles.activeTopicItem : styles.topicItem;

  return (
    <Link href={`/?topic=${name}`} key={name}>
      <div className={itemClass}>
        <span className={styles.iconSpan}>{icon}</span>
        <span className={styles.nameSpan}>{name}</span>
      </div>
    </Link>
  );
};

export default DiscoverItem;
