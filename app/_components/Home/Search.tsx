import React, { useState, useEffect, useCallback } from 'react';
import { ActionIcon, Loader, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IRecipe[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useCallback(
    async (searchQuery: string) => {
      try {
        setLoading(true);
        setSearchResults(undefined);
        const response = await fetch(`/api/recipes?name=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [] // empty dependency array because we don't want to recreate the debounced function on each render
  );

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        debouncedSearch(query);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className='relative'>
      <TextInput
        size='lg'
        className='py-3'
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Search for recipes'
        radius={12}
        rightSection={
          <ActionIcon variant='transparent'>
            <IconSearch size={18} color='black' />
          </ActionIcon>
        }
      />

      {query && (
        <div className='absolute mt-3 w-full rounded-2xl border w-100 overflow-y-auto h-64 bg-white'>
          <ul>
            {loading && (
              <li className='flex justify-center mt-3'>
                <Loader />
              </li>
            )}
            {searchResults &&
              (searchResults.length > 0 ? (
                searchResults.map((recipe) => (
                  <li
                    className='px-6 py-3 hover:bg-gray truncate'
                    key={recipe.id}
                  >
                    <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                  </li>
                ))
              ) : (
                <li className='px-6 py-3'>No recipes found</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
