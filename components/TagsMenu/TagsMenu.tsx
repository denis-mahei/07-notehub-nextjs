'use client';

import { TAG_LIST } from '@/constants';
import Link from 'next/link';
import { useState } from 'react';

import css from './TagsMenu.module.css';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button 
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link 
            href="/notes/filter/All" 
            className={css.menuLink}
            onClick={() => setIsOpen(false)}
          >
            All notes
          </Link>
        </li>
        {TAG_LIST.map((tag) => (
          <li key={tag.id} className={css.menuItem}>
            <Link 
              href={`/notes/filter/${tag.name}`} 
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              {tag.name}
            </Link>
          </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;