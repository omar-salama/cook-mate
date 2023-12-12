import { useState } from 'react';

const tabs = [
  'All Recipes',
  'Arabian',
  'Asian',
  'Italian',
  'Indian',
  'Chinese',
];

const RecipeList = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex flex-wrap">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`${
            activeTab === tab ? 'active-tab' : 'inactive-tab'
          } ${index < tabs.length - 1 ? 'me-2' : ''} cursor-pointer mb-3 md:mb-0`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
