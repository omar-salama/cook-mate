import { useState } from 'react';

const RecipeList: React.FC<{ tabs: string[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`${
            activeTab === tab ? 'active-tab' : 'inactive-tab'
          } ${index < tabs.length - 1 ? 'me-2' : ''} cursor-pointer`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
